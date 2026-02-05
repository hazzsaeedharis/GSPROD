from elasticsearch import Elasticsearch
from typing import List, Dict, Any
import os

# Elasticsearch connection
ES_HOST = os.getenv("ELASTICSEARCH_HOST", "localhost")
ES_PORT = int(os.getenv("ELASTICSEARCH_PORT", "9200"))

es_client = Elasticsearch([f"http://{ES_HOST}:{ES_PORT}"])

# Index name
BUSINESS_INDEX = "businesses"


def init_elasticsearch():
    """Initialize Elasticsearch index with mappings"""
    
    # Index settings and mappings
    index_body = {
        "settings": {
            "analysis": {
                "analyzer": {
                    "german_analyzer": {
                        "type": "custom",
                        "tokenizer": "standard",
                        "filter": ["lowercase", "german_stop", "german_stemmer"]
                    }
                },
                "filter": {
                    "german_stop": {
                        "type": "stop",
                        "stopwords": "_german_"
                    },
                    "german_stemmer": {
                        "type": "stemmer",
                        "language": "german"
                    }
                }
            },
            "number_of_shards": 1,
            "number_of_replicas": 0
        },
        "mappings": {
            "properties": {
                "id": {"type": "keyword"},
                "name": {
                    "type": "text",
                    "analyzer": "german_analyzer",
                    "fields": {
                        "keyword": {"type": "keyword"},
                        "autocomplete": {
                            "type": "search_as_you_type"
                        }
                    }
                },
                "street": {"type": "text"},
                "house_number": {"type": "keyword"},
                "postcode": {"type": "keyword"},
                "city": {
                    "type": "text",
                    "analyzer": "german_analyzer",
                    "fields": {
                        "keyword": {"type": "keyword"}
                    }
                },
                "phone": {"type": "keyword"},
                "email": {"type": "keyword"},
                "website": {"type": "keyword"},
                "location": {"type": "geo_point"},
                "branches": {
                    "type": "text",
                    "analyzer": "german_analyzer"
                },
                "branch_ids": {"type": "keyword"},
                "verlag": {"type": "keyword"},
                "created_at": {"type": "date"},
                "updated_at": {"type": "date"}
            }
        }
    }
    
    # Create index if it doesn't exist
    if not es_client.indices.exists(index=BUSINESS_INDEX):
        es_client.indices.create(index=BUSINESS_INDEX, body=index_body)
        print(f"✅ Elasticsearch index '{BUSINESS_INDEX}' created successfully!")
    else:
        print(f"ℹ️  Elasticsearch index '{BUSINESS_INDEX}' already exists")


def index_business(business_data: Dict[str, Any]):
    """Index a single business document"""
    try:
        es_client.index(
            index=BUSINESS_INDEX,
            id=business_data['id'],
            document=business_data
        )
        return True
    except Exception as e:
        print(f"Error indexing business {business_data.get('id')}: {e}")
        return False


def bulk_index_businesses(businesses: List[Dict[str, Any]]):
    """Bulk index multiple businesses"""
    from elasticsearch.helpers import bulk
    
    actions = [
        {
            "_index": BUSINESS_INDEX,
            "_id": business['id'],
            "_source": business
        }
        for business in businesses
    ]
    
    success, failed = bulk(es_client, actions, stats_only=True)
    print(f"✅ Indexed {success} businesses, {failed} failed")
    return success, failed


def search_businesses_es(
    keyword: str = None,
    location: str = None,
    lat: float = None,
    lon: float = None,
    radius_km: float = 50,
    page: int = 1,
    page_size: int = 20
) -> Dict[str, Any]:
    """
    Search businesses using Elasticsearch
    
    Supports:
    - Full-text search with German stemming
    - Fuzzy matching for typos
    - Geo-distance filtering
    - Pagination
    """
    
    must_queries = []
    filter_queries = []
    
    # Keyword search (fuzzy)
    if keyword:
        must_queries.append({
            "multi_match": {
                "query": keyword,
                "fields": ["name^2", "branches"],
                "fuzziness": "AUTO",
                "analyzer": "german_analyzer"
            }
        })
    
    # Location search (city or postcode)
    if location:
        filter_queries.append({
            "bool": {
                "should": [
                    {"match": {"city": {"query": location, "fuzziness": "AUTO"}}},
                    {"term": {"postcode": location}}
                ],
                "minimum_should_match": 1
            }
        })
    
    # Geo-distance filter (if coordinates provided)
    if lat and lon:
        filter_queries.append({
            "geo_distance": {
                "distance": f"{radius_km}km",
                "location": {
                    "lat": lat,
                    "lon": lon
                }
            }
        })
    
    # Build query
    query = {
        "bool": {
            "must": must_queries if must_queries else [{"match_all": {}}],
            "filter": filter_queries
        }
    }
    
    # Sort by relevance, then by geo-distance if coordinates provided
    sort_criteria = ["_score"]
    if lat and lon:
        sort_criteria.append({
            "_geo_distance": {
                "location": {
                    "lat": lat,
                    "lon": lon
                },
                "order": "asc",
                "unit": "km"
            }
        })
    
    # Execute search
    result = es_client.search(
        index=BUSINESS_INDEX,
        query=query,
        from_=(page - 1) * page_size,
        size=page_size,
        sort=sort_criteria
    )
    
    # Extract results
    hits = result['hits']['hits']
    total = result['hits']['total']['value']
    
    businesses = []
    for hit in hits:
        business = hit['_source']
        business['score'] = hit['_score']
        
        # Add distance if geo-search was performed
        if lat and lon and 'sort' in hit:
            business['distance_km'] = round(hit['sort'][-1], 2)
        
        businesses.append(business)
    
    return {
        "total": total,
        "results": businesses,
        "page": page,
        "page_size": page_size
    }


def autocomplete_location(prefix: str, limit: int = 5) -> List[str]:
    """Autocomplete for city names"""
    result = es_client.search(
        index=BUSINESS_INDEX,
        query={
            "match": {
                "city.autocomplete": {
                    "query": prefix,
                    "operator": "and"
                }
            }
        },
        _source=["city"],
        size=limit,
        collapse={"field": "city.keyword"}
    )
    
    cities = [hit['_source']['city'] for hit in result['hits']['hits']]
    return cities


# Initialize on import
try:
    if es_client.ping():
        print("✅ Connected to Elasticsearch")
        # init_elasticsearch()  # Uncomment to auto-create index
    else:
        print("⚠️  Elasticsearch not available")
except Exception as e:
    print(f"⚠️  Elasticsearch connection error: {e}")
