# Gelbe Seiten Frontend

A modern Next.js + TypeScript rebuild of the Gelbe Seiten (Yellow Pages) website.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:3000
```

## 📁 Project Structure

```
frontend/
├── pages/                    # Next.js pages
│   ├── _app.tsx             # App wrapper (global styles/scripts)
│   ├── _document.tsx        # HTML document structure
│   └── index.tsx            # Home page
│
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Site header
│   │   ├── Footer.tsx       # Site footer
│   │   ├── SearchBox.tsx    # Search functionality
│   │   └── AwardBadges.tsx  # Award display
│   │
│   ├── styles/              # CSS styles
│   │   └── globals.css      # Global styles
│   │
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
│
├── public/
│   └── assets/              # Symlink to webgs folder
│       ├── css/             # Original stylesheets
│       ├── js/              # Original JavaScript
│       ├── images/          # Images and graphics
│       ├── fonts/           # Custom fonts
│       ├── icons/           # SVG icons
│       └── libraries/       # Third-party libraries
│
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
├── .eslintrc.json           # ESLint rules
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🛠️ Technology Stack

- **Next.js 14** - React framework with SSR/SSG
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **CSS** - Original stylesheets preserved

## 📦 Available Scripts

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run type-check # Check TypeScript types
```

## 🎨 Component Architecture

### Pages
- **`index.tsx`** - Homepage with search, hero, and content sections
- **`_app.tsx`** - Global app wrapper for shared layout/styles
- **`_document.tsx`** - Custom HTML document structure

### Components
All components are in `src/components/` and use TypeScript:

- **Header** - Navigation and branding
- **SearchBox** - Main search functionality (What/Where)
- **AwardBadges** - Award/certification display
- **Footer** - Site footer with links

## 🔗 Asset Management

The `public/assets/` folder contains all the original assets from the `webgs` folder:

✅ **Self-contained** - Everything in one place  
✅ **Portable** - Can move/deploy independently  
✅ **All CSS, JS, images preserved**  

All assets are accessible via `/assets/*` paths:
- CSS: `/assets/css/`
- JavaScript: `/assets/js/`
- Images: `/assets/images/`
- Fonts: `/assets/fonts/`
- Icons: `/assets/icons/`

## 🎯 Key Features

### Next.js Benefits
- ⚡ Fast page loads with automatic code splitting
- 🔍 SEO optimized with server-side rendering
- 🔄 Hot module replacement (instant updates)
- 📱 Responsive and mobile-first
- 🎨 CSS and JS optimization
- 🖼️ Automatic image optimization

### TypeScript Benefits
- 🛡️ Type safety and autocompletion
- 🐛 Catch errors before runtime
- 📚 Better documentation
- 🔧 Improved refactoring

## ⚠️ Important Notes

### Original JavaScript Files
The original JavaScript files from `/assets/js/` are **disabled** because:
- They were written for jQuery/vanilla JS DOM manipulation
- They conflict with React's virtual DOM
- Interactive features need to be reimplemented as React components

### What Works
✅ **All CSS styling** - Visual design is preserved  
✅ **All images and fonts** - Assets load correctly  
✅ **Page structure** - Layout and content display  
✅ **SEO meta tags** - Search engine optimization  

### What Needs React Implementation
🔨 **Search functionality** - Needs React state management  
🔨 **Menu interactions** - Needs React event handlers  
🔨 **Form submissions** - Needs React form handling  
🔨 **Animations** - Needs React transitions or Framer Motion

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
```bash
# Build production bundle
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### TypeScript (`tsconfig.json`)
- Strict type checking enabled
- Path aliases configured (`@/*` → `src/*`)
- ES2020 target for modern features

### Next.js (`next.config.js`)
- Image optimization configured
- Remote image patterns allowed
- Asset rewrites for `/webgs/*` → `/assets/*`

## 📝 Development Guide

### Adding a New Page
Create a file in `pages/`:
```typescript
// pages/about.tsx
export default function About() {
  return <div>About Page</div>
}
```
Automatically available at `/about`

### Creating a Component
```typescript
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  return <h1>{title}</h1>
}
```

### Adding Styles
- **Global styles**: Edit `src/styles/globals.css`
- **Component styles**: Use CSS Modules (`.module.css`)
- **Inline styles**: Use `style` prop or styled-jsx

### Using Assets
```typescript
// Images
<img src="/assets/images/logo.svg" alt="Logo" />

// CSS
<link rel="stylesheet" href="/assets/css/custom.css" />

// Scripts
<Script src="/assets/js/custom.js" strategy="lazyOnload" />
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Assets Missing
If assets are missing, they should be in `public/assets/`:
```bash
ls -la public/assets/
# Should show: css, js, images, fonts, icons, libraries
```

### TypeScript Errors
```bash
# Check all type errors
npm run type-check

# Auto-fix ESLint issues
npm run lint -- --fix
```

### CSS Not Loading
Ensure paths use `/assets/` prefix in your code

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)

## 🤝 Best Practices

### File Organization
- Keep components small and focused
- Use TypeScript interfaces for props
- Separate business logic from UI
- Use meaningful component names

### Performance
- Lazy load heavy components
- Optimize images with Next.js Image component
- Use `strategy` prop for Script components
- Minimize CSS-in-JS usage

### Code Quality
- Run `npm run lint` before committing
- Use `npm run type-check` to catch type errors
- Write descriptive commit messages
- Keep components under 200 lines

## 📄 License

Please ensure you have the rights to use all assets and content from the original Gelbe Seiten website.

---

**Built with ❤️ using Next.js and TypeScript**
