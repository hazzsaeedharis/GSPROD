# Assets Integration Guide

## ✅ Assets Already Moved

### Branchen Assets (Search Results Page)
Location: `/frontend/public/assets/branchen/`

- **CSS Files**:
  - `css/global_above.css`
  - `css/global_below.css`
  - `css/schaufenster_global.css`
  - `css/trefferliste_above.css`
  - `css/trefferliste_below.css`

- **Fonts**:
  - `fonts/TheSansB4-3_Light.woff`
  - `fonts/TheSansB4-3_Light.woff2`
  - `fonts/TheSansB4-5_Plain.woff`
  - `fonts/TheSansB4-5_Plain.woff2`
  - `fonts/TheSansB4-7_Bold.woff`
  - `fonts/TheSansB4-7_Bold.woff2`

- **Images**: 175 files (116 SVG, 33 JPG, 24 PNG, etc.)
- **JavaScript**: 16 JS files

### Gsbiz Assets (Business Detail Page)
Location: `/frontend/public/assets/gsbiz/`

- **CSS Files**:
  - `css/detailseite_above.css`
  - `css/detailseite_below.css`
  - `css/global_above.css`
  - `css/global_below.css`

- **Fonts**: Same as branchen (6 font files)
- **Images**: 142 files (117 SVG, 23 PNG, 1 GIF, etc.)
- **JavaScript**: 14 JS files

---

## 🔧 Path Updates Required

### Original Paths → New Paths

#### CSS Files
```diff
- css/global_above.css
+ /assets/branchen/css/global_above.css

- css/trefferliste_above.css
+ /assets/branchen/css/trefferliste_above.css

- css/detailseite_above.css
+ /assets/gsbiz/css/detailseite_above.css
```

#### Image Files
```diff
- images/gelbe-seiten-logo.svg
+ /assets/branchen/images/gelbe-seiten-logo.svg

- images/favicon@32w.png
+ /assets/images/fav/favicon@32w.png  (or /assets/branchen/images/)
```

#### Font Files
```diff
- /webgs/fonts/TheSansB4-3_Light.woff2
+ /assets/branchen/fonts/TheSansB4-3_Light.woff2
```

---

## 📝 Integration Steps for branchen.jsx

The original `branchen.jsx` contains the complete HTML structure for search results. Here's how to integrate it:

### Step 1: Update Head Section
The original file starts with `<div>` and includes links. In Next.js:

```jsx
import Head from 'next/head'

export default function SearchResults() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/branchen/css/global_above.css" />
        <link rel="stylesheet" href="/assets/branchen/css/trefferliste_above.css" />
        <link rel="stylesheet" href="/assets/branchen/css/schaufenster_global.css" />
        <link rel="preload" href="/assets/branchen/fonts/TheSansB4-3_Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/branchen/fonts/TheSansB4-5_Plain.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/branchen/fonts/TheSansB4-7_Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>

      {/* Rest of JSX from branchen.jsx */}
    </>
  )
}
```

### Step 2: Update Image Paths

**Find and Replace**:
- `images/` → `/assets/branchen/images/`
- `href="images/` → `href="/assets/branchen/images/`
- `src="images/` → `src="/assets/branchen/images/`

### Step 3: Update CSS Paths

**Already done** - CSS files are referenced in the Head section

### Step 4: Remove Nonce Attributes

The original has CSP nonce attributes that aren't needed:
```diff
- nonce="1FPL2NhOuUyP7V6biP2iUrAGxNTTY8uZU7GtJCchtCxb1JzWaRRLFBXaILyXqAProEVzpR9CL0hhh9savme0eDT6PqdaZpHPtQHG1BAxRtZcwDJFBlm9e3ZNu8CpNGxm"
+ (remove this attribute)
```

---

## 📝 Integration Steps for gsbiz.jsx

Similar process for the business detail page:

### Step 1: Update Head Section
```jsx
import Head from 'next/head'

export default function BusinessDetail() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/gsbiz/css/global_above.css" />
        <link rel="stylesheet" href="/assets/gsbiz/css/detailseite_above.css" />
        <link rel="preload" href="/assets/gsbiz/fonts/TheSansB4-3_Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>

      {/* Rest of JSX from gsbiz.jsx */}
    </>
  )
}
```

### Step 2: Update Paths
- `images/` → `/assets/gsbiz/images/`
- `css/` → `/assets/gsbiz/css/`

---

## 🎨 CSS Font Path Updates

The CSS files reference fonts with relative paths. Update them:

### In branchen CSS files:
```bash
cd /home/hazzsaeedharis/Desktop/PDM/2026/Jan/GS\ Rebuild/frontend/public/assets/branchen/css

# Update font paths
sed -i 's|url("../fonts/|url("/assets/branchen/fonts/|g' *.css
sed -i 's|url('\''../fonts/|url('\''/assets/branchen/fonts/|g' *.css
```

### In gsbiz CSS files:
```bash
cd /home/hazzsaeedharis/Desktop/PDM/2026/Jan/GS\ Rebuild/frontend/public/assets/gsbiz/css

# Update font paths
sed -i 's|url("../fonts/|url("/assets/gsbiz/fonts/|g' *.css
sed -i 's|url('\''../fonts/|url('\''/assets/gsbiz/fonts/|g' *.css
```

---

## 🔄 Current Implementation Status

### ✅ What's Already Working

1. **SearchBox Component** - Modern React component with:
   - Location autocomplete (OSM)
   - Geolocation button
   - Smart URL navigation

2. **MapView Component** - Leaflet integration with:
   - Business markers
   - Popups with details
   - Auto-fit bounds

3. **Search Results Page** (`/branchen/[keyword]/[location].tsx`):
   - Uses backend API
   - Displays businesses in cards
   - Integrated map view
   - Pagination

4. **Business Detail Page** (`/gsbiz/[id].tsx`):
   - Fetches from backend
   - Displays full contact info
   - Shows location map

### 🔄 Using Original JSX Templates

To use the original `branchen.jsx` and `gsbiz.jsx` more directly:

#### Option 1: Keep Current Implementation (Recommended)
The current implementation is cleaner and integrates with the backend. Just update the styling to match:

```jsx
// In pages/branchen/[keyword]/[location].tsx
<Head>
  <link rel="stylesheet" href="/assets/branchen/css/global_above.css" />
  <link rel="stylesheet" href="/assets/branchen/css/global_below.css" />
  <link rel="stylesheet" href="/assets/branchen/css/trefferliste_above.css" />
  <link rel="stylesheet" href="/assets/branchen/css/trefferliste_below.css" />
</Head>
```

#### Option 2: Migrate Original Template
1. Copy the body content from `branchen.jsx`
2. Wrap in Next.js page structure
3. Replace static content with dynamic data from API
4. Update all paths to use `/assets/branchen/`

---

## 📋 Quick Commands

### Fix CSS Font Paths
```bash
# Branchen CSS
find /home/hazzsaeedharis/Desktop/PDM/2026/Jan/GS\ Rebuild/frontend/public/assets/branchen/css -name "*.css" -exec sed -i 's|url("../fonts/|url("/assets/branchen/fonts/|g' {} \;

# Gsbiz CSS
find /home/hazzsaeedharis/Desktop/PDM/2026/Jan/GS\ Rebuild/frontend/public/assets/gsbiz/css -name "*.css" -exec sed -i 's|url("../fonts/|url("/assets/gsbiz/fonts/|g' {} \;
```

### Verify Assets
```bash
# Check branchen assets
ls -R /home/hazzsaeedharis/Desktop/PDM/2026/Jan/GS\ Rebuild/frontend/public/assets/branchen/

# Check gsbiz assets
ls -R /home/hazzsaeedharis/Desktop/PDM/2026/Jan/GS\ Rebuild/frontend/public/assets/gsbiz/
```

---

## 🎯 Recommendation

**Use the current implementation** with the original CSS for styling:

1. ✅ Backend integration is already working
2. ✅ Map functionality is modern and reactive
3. ✅ Search and routing work perfectly
4. ✅ Just need to apply the original CSS styles

The original `branchen.jsx` and `gsbiz.jsx` are mostly static templates. Our dynamic implementation is superior because:
- It connects to the backend API
- It handles real search results
- It includes modern map integration
- It's responsive and maintainable

**Action Items**:
1. Update CSS paths in existing pages ✅
2. Fix font paths in CSS files
3. Ensure all images are accessible
4. Test the pages with full styling

