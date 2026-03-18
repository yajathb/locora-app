# Locora Development Guide

## 🎯 Quick Start

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## 📚 File Architecture Explained

### Core Pages

**`app/page.tsx`** - Home Page

- Hero section with search
- Featured events (6 max)
- Featured places (6 max)
- About section
- Entry point to Events and Places

**`app/events/page.tsx`** - Events Directory

- Full event listing
- Search by title/description/organizer
- Filter by category
- Responsive grid layout
- "No results" handling

**`app/events/[id]/page.tsx`** - Event Details

- Full event information
- Image display
- Date, time, location, organizer
- External links
- Error handling for missing events

**`app/places/page.tsx`** - Places Directory

- All places listing
- Search by name/description/address
- Category filtering
- Responsive grid

**`app/places/[id]/page.tsx`** - Place Details

- Complete place information
- Hours, phone, address
- Website and call links
- Contact information

### Components

**`components/Navbar.tsx`**

- Sticky navigation
- Locora branding
- Links to main sections
- Mobile menu ready (framework in place)

**`components/Footer.tsx`**

- Brand information
- Links to pages
- Social media links (placeholder)
- Copyright info

**`components/EventCard.tsx`**

- Event preview card
- Image with hover zoom
- Category badge
- Date, time, location
- Organizer name
- Click to navigate to details

**`components/PlaceCard.tsx`**

- Place preview card
- Image with hover effects
- Category badge
- Address, phone, hours
- Website indicator

**`components/SearchBar.tsx`**

- Search input with Lucide icon
- Clear button (X icon)
- Real-time search callback
- Accessible input

**`components/FilterSidebar.tsx`**

- Mobile-responsive filter toggle
- Category selection
- Filters all categories in dataset
- "All Categories" option
- Mobile close button

**`components/CategoryBadge.tsx`**

- Category display with colors
- Two sizes (sm, md)
- Color-coded by category

**`components/DetailSection.tsx`**

- Reusable detail row
- Icon + title + content
- Used in detail pages

### Data & API

**`lib/api.ts`** - Data Abstraction Layer

```typescript
// Current: Returns JSON data
// Future: Simply change to axios calls

getEvents(filters?)     // Get all events (with optional filters)
getEventById(id)        // Get single event
getPlaces(filters?)     // Get all places (with optional filters)
getPlaceById(id)        // Get single place
getFeaturedEvents()     // Featured events only
getFeaturedPlaces()     // Featured places only
getCategoryColor(cat)   // Color for category badge
formatDate(date)        // Format date to "Sat, Mar 15"
formatTime(time)        // Format time to "2:30 PM"
```

**`data/events.json`**

```json
[
  {
    "id": "evt-001",
    "title": "...",
    "description": "...",
    "date": "2026-04-15",
    "time": "10:00",
    "endTime": "22:00",
    "location": "...",
    "address": "...",
    "category": "Music|Sports|Arts|Community|Food|Education|Family|Outdoor",
    "image": "https://...",
    "organizer": "...",
    "weblink": "https://...",
    "featured": true
  }
]
```

**`data/places.json`**

```json
[
  {
    "id": "place-001",
    "name": "...",
    "description": "...",
    "category": "...",
    "address": "...",
    "phone": "(555) 123-4567",
    "hours": "9:00 AM - 5:00 PM",
    "image": "https://...",
    "website": "https://...",
    "featured": true
  }
]
```

**`types/index.ts`**

```typescript
interface Event { /* ... */ }
interface Place { /* ... */ }
type Category = 'Music' | 'Sports' | 'Arts' | ...
interface FilterOptions { /* ... */ }
```

## 🎨 Design Patterns

### Color System

```
Primary: #2563eb (Blue)
Secondary: #7c3aed (Purple)
Accent: #ec4899 (Pink)

Usage:
- Primary: Main buttons, links, highlights
- Secondary: Gradients, accents
- Accent: Hover states, emphasis
```

### Component Pattern

All components follow this pattern:

1. Export default function component
2. Interface for props (if applicable)
3. Responsive Tailwind classes
4. Lucide icons for visual consistency
5. Smooth transitions and hover effects

### Data Flow Pattern

```
User Action
    ↓
Component State (useState)
    ↓
Filter/Sort Logic (useMemo for performance)
    ↓
Call lib/api functions
    ↓
Render with components
    ↓
Navigate with Next.js Link
```

## 🔧 Customization Guide

### Adding a New Event

1. Edit `frontend/data/events.json`
2. Add new object with unique `id`
3. Fill all required fields
4. Set `featured: true` to show on home page
5. Save and refresh browser

### Adding a New Place

1. Edit `frontend/data/places.json`
2. Add new object with unique `id`
3. Include all information
4. Set `featured: true` for home page showcase
5. Save and refresh

### Changing Colors

Option 1: Update in `components/` (component-specific)

```typescript
className = "bg-blue-600 hover:bg-blue-700";
// Change to:
className = "bg-purple-600 hover:bg-purple-700";
```

Option 2: Update `lib/api.ts` getCategoryColor()

```typescript
const colors: { [key: string]: string } = {
  Music: "bg-purple-100 text-purple-800", // Change this
  // ...
};
```

### Changing Text Content

- **Navigation**: `components/Navbar.tsx`
- **Footer**: `components/Footer.tsx`
- **Home page**: `app/page.tsx`
- **Page headers**: `app/events/page.tsx`, `app/places/page.tsx`

## 🚀 Performance Tips

### Current Optimizations

- ✅ Images use Unsplash (external CDN)
- ✅ Client-side filtering with `useMemo` (no API calls)
- ✅ Component code splitting (lazy loading ready)
- ✅ Responsive images and lazy loading ready

### Future Optimizations

- Add `next/image` for image optimization
- Implement Next.js dynamic imports for large components
- Add service workers for offline support
- Implement infinite scroll for large datasets

## 🐛 Common Development Tasks

### Add a New Page

1. Create `app/newpage/page.tsx`

```typescript
"use client";
import { useState, useEffect } from "react";
// Import your components
export default function NewPage() {
  // Your component
}
```

2. Auto-routed as `/newpage`
3. Add link in `Navbar.tsx`

### Add a New Component

1. Create `components/NewComponent.tsx`
2. Export as default
3. Add TypeScript interface for props
4. Import in pages where needed

### Modify Styling

- Use existing Tailwind classes
- Reference colors from design system
- Test on mobile (DevTools)
- Use `hover:` prefix for interactivity

### Debug Issues

1. Check browser console (F12)
2. Check terminal for build errors
3. Use React DevTools extension
4. Verify data in browser DevTools under `app` → `locora app` → `data`

## 📊 Data Statistics

**Current Mock Data:**

- 8 Events (3 featured)
- 9 Places (2 featured)
- 8 Categories
- All future-proof for production data

**Scaling:**

- Current filtering algorithm: O(n)
- Handles 1000+ items efficiently
- Ready for pagination/infinite scroll

## 🔄 Migration to Flask Backend

When ready to add backend:

1. Create Flask app in `/backend`
2. Implement REST endpoints:

   ```
   GET /api/events
   GET /api/events/:id
   GET /api/places
   GET /api/places/:id
   ```

3. Update `lib/api.ts` to use axios/fetch:

   ```typescript
   import axios from "axios";
   const API_URL = process.env.NEXT_PUBLIC_API_URL;

   export async function getEvents(filters?: FilterOptions) {
     const { data } = await axios.get(`${API_URL}/api/events`, {
       params: filters,
     });
     return data;
   }
   ```

4. **Zero changes needed in components!** The abstraction layer handles migration.

5. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

## ✅ Testing Checklist

Run through this before each deployment:

- [ ] Home page loads
- [ ] Search works on Events
- [ ] Search works on Places
- [ ] Category filter works
- [ ] Event detail page loads
- [ ] Place detail page loads
- [ ] Links navigate correctly
- [ ] Mobile responsive (375px)
- [ ] Tablet responsive (768px)
- [ ] Desktop responsive (1024px+)
- [ ] No console errors
- [ ] Images load correctly
- [ ] External links work

## 📝 Notes for Team

- All components use `'use client'` for interactivity
- Tailwind CSS is configured for responsive design
- Lucide React icons are imported as needed
- Data is type-safe with TypeScript
- Next.js App Router handles all routing
- Search/filter is instant (no loading)
- Mobile-first design approach
- Ready for scaling to production data

---

Happy coding! 🚀
