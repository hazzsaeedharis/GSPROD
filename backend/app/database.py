from sqlalchemy import create_engine, Column, String, Boolean, DateTime, Table, ForeignKey, Text, Integer, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from geoalchemy2 import Geometry
from sqlalchemy.dialects.postgresql import ARRAY, TSVECTOR, JSONB
from datetime import datetime
import os

# Database URL from environment or default
# Railway provides DATABASE_PUBLIC_URL for external connections
# Fall back to DATABASE_URL, then local for development
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    os.getenv(
        "DATABASE_PUBLIC_URL",
        "postgresql://postgres:password@localhost:5432/events_db"
    )
)

# Create engine
engine = create_engine(DATABASE_URL, echo=False)

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


# Note: Junction table not needed with existing events_db schema
# The existing database stores categories as a JSON text field
# business_branches = Table(...)


class Business(Base):
    """Business model for PostgreSQL - mapped to existing events_db schema"""
    __tablename__ = 'businesses'
    
    # Match existing schema
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, index=True)
    street_address = Column(String)
    postal_code = Column(String)
    city = Column(String)
    district = Column(String)
    categories = Column(Text)  # JSON array stored as text
    phone = Column(String)
    email = Column(String)
    website = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    geometry = Column(Geometry('POINT', srid=4326))  # PostGIS geometry
    search_vector = Column(TSVECTOR)
    is_active = Column(Boolean, nullable=False, default=True)
    embedding = Column(ARRAY(Float))
    opening_hours = Column(JSONB)  # Opening hours in JSON format
    
    # Properties for backward compatibility
    @property
    def street(self):
        """Alias for street_address"""
        return self.street_address
    
    @property
    def postcode(self):
        """Alias for postal_code"""
        return self.postal_code
    
    @property
    def location(self):
        """Return geometry for compatibility"""
        return self.geometry
    
    # Note: branches relationship removed as existing DB uses categories field
    # branches = relationship("Branch", secondary=business_branches, back_populates="businesses")


# Note: Branch table not used with existing events_db schema
# Categories are stored as JSON in the businesses.categories field
# class Branch(Base):
#     """Branch/Category model"""
#     __tablename__ = 'branches'
#     ...


# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create all tables
def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")


if __name__ == "__main__":
    init_db()
