# Template Conversion Plan

## Problem
The current search results page is too simplified. We need to use the FULL `branchen.jsx` template (3075 lines, 400KB) to match the real Gelbe Seiten UI exactly.

## File Sizes
- **branchen.jsx**: 3075 lines, 400KB
- **gsbiz.jsx**: 797 lines, 68KB

## The Right Approach

### Phase 1: Create Template Component (NOW)
Create a full-featured search results page based on the original template structure:

1. **Header** - Keep complete header from template
2. **Search Form** - Keep search form with radius slider
3. **Map** - Use OpenStreetMap Leaflet (replace static map image)
4. **Filter Pills** - Keep "Beste Treffer", "Bewertung", "Entfernung", "Geöffnet"
5. **Business Cards** - Make dynamic from backend API
6. **Sidebar** - Keep feedback, ads placeholders, verlag teaser
7. **SEO Links** - Keep "Beliebte Suchen", breadcrumbs
8. **Footer** - Keep complete footer

### Phase 2: Make Critical Parts Dynamic

**Dynamic Sections**:
```jsx
// These pull from backend API:
- Business articles (map over results array)
- Total count
- Page numbers
- Search terms in heading
- Breadcrumb current page
```

**Static Sections** (from template):
```jsx
// These stay as-is from branchen.jsx:
- Header navigation
- Search form
- Filter pills structure
- Sidebar widgets
- Footer
- SEO links
```

## Implementation Steps

### Step 1: Extract Template Sections

From `branchen.jsx`, extract these reusable sections:

1. **Lines 1-67**: Head section with CSS/fonts
2. **Lines 68-198**: Header navigation
3. **Lines 199-237**: Search form
4. **Lines 239-251**: Map section
5. **Lines 252-278**: Heading + Filters
6. **Lines 295-2764**: Business articles (MAKE DYNAMIC)
7. **Lines 2765-2838**: Load more + FAQ
8. **Lines 2876-2916**: Sidebar
9. **Lines 2919-3066**: Footer

### Step 2: Path Updates

Find and replace in template:
```bash
# CSS paths
css/global_above.css → /assets/branchen/css/global_above.css
css/trefferliste_above.css → /assets/branchen/css/trefferliste_above.css

# Image paths  
images/ → /assets/branchen/images/
href="images/ → href="/assets/branchen/images/
src="images/ → src="/assets/branchen/images/

# Font paths (already fixed in CSS)
# No changes needed

# Remove nonces (Next.js doesn't need CSP nonces)
nonce="..." → (remove attribute)
```

### Step 3: Dynamic Business Card Template

Original static article:
```jsx
<article className="mod mod-Treffer" id="treffer_1095483835">
  <a href="https://www.gelbeseiten.de/gsbiz/c7b73d33-cfb9-465d-9911-68324c6b8ebd">
    <h2>Hausarztpraxis Christiane und Peter Bürger</h2>
    <p>Ärzte: Allgemeinmedizin (Fachärzte)</p>
  </a>
  <address>Habelschwerdter Allee 15, 14195 Berlin (Dahlem)</address>
  <div>030 8 31 36 38</div>
</article>
```

Convert to dynamic:
```jsx
{results.map((business, index) => (
  <article key={business.id} className="mod mod-Treffer" id={`treffer_${business.id}`} tabIndex={0}>
    <a href={`/gsbiz/${business.id}`}>
      <h2 className="mod-Treffer__name">{business.name}</h2>
      <p className="d-inline-block mod-Treffer--besteBranche">
        {business.branches[0] || ''}
      </p>
    </a>
    <div className="mod-Treffer__line" />
    <address className="mod-AdresseKompakt">
      <div className="mod-AdresseKompakt__container">
        <div className="mod-AdresseKompakt__adress-text">
          {business.address}
        </div>
      </div>
    </address>
    {business.phone && (
      <div className="mod-TelefonnummerKompakt">
        <a className="mod-TelefonnummerKompakt__phoneNumber" href={`tel:${business.phone}`}>
          {business.phone}
        </a>
      </div>
    )}
  </article>
))}
```

## Quick Win: Minimal Changes Needed

Since full conversion takes time, here's the MINIMAL fix:

1. Copy `branchen_arzt_berlin/branchen.jsx` to `frontend/pages/branchen/[keyword]/[location].jsx`
2. Add Next.js wrapper (Head section)
3. Update paths (images/, css/)
4. Make JUST the business articles section dynamic
5. Keep everything else static for now

This gives you 95% of the original UI immediately!

## File Size Considerations

- **Original**: 400KB static HTML
- **With dynamic data**: ~50KB template + API data
- **Benefit**: Faster loads, one template for all searches

## Next Steps

Switch to agent mode and I'll:
1. Copy the full template
2. Wrap in Next.js structure  
3. Update all paths
4. Make business listings dynamic
5. Test with backend

This will give you the EXACT UI from real Gelbe Seiten! 🎯
