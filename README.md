# Locora - Brentwood Community Discovery Platform

## 🌟 Overview

Locora is a modern, responsive web application that serves as Brentwood's central hub for discovering events, places, and community opportunities. Built with Next.js, React, and Tailwind CSS, Locora brings together scattered community information into one clean, easy-to-use platform.

## 🎯 Project Vision

People in Brentwood need a reliable, centralized way to stay informed about what's happening around them. Information is currently scattered across outdated websites, disconnected social media pages, and word of mouth. Locora solves this by creating:

- **Single source of truth** for Brentwood events and places
- **Clean, modern interface** for easy discovery
- **Curated, quality content** you can trust
- **Community engagement** through one platform

## 📊 MVP Features

### Phase 1 ✅ - Completed

- [x] Project initialization with Next.js 16, React 19, TypeScript, and Tailwind CSS
- [x] TypeScript types for Event and Place data models
- [x] Mock data with 8 events and 9 places in Brentwood
- [x] Data abstraction layer (`lib/api.ts`) for easy backend migration

### Phase 2 ✅ - Completed

- [x] **Events Directory** - Browse all events with filtering and search
- [x] **Places Directory** - Explore restaurants, venues, attractions
- [x] **Event Details Page** - Full event information with date, time, location
- [x] **Place Details Page** - Complete place info with hours, contact, website

### Phase 3 ✅ - Completed

- [x] **Reusable Components** - EventCard, PlaceCard, SearchBar, FilterSidebar
- [x] **Home Page** - Hero section, featured events, featured places
- [x] **Navigation** - Sticky navbar with branding and quick links
- [x] **Footer** - Footer with links and social media
- [x] **Modern UI** - Gradient backgrounds, smooth transitions, responsive design
- [x] **Mobile Responsive** - Fully responsive on all screen sizes
- [x] **Search & Filter** - Client-side search and category filtering

## 🛠️ Technical Stack

```
Frontend:
├── Next.js 16.1.7 (React 19 with App Router)
├── TypeScript 5
├── Tailwind CSS 4
├── Lucide React (Icons)
└── Axios (for future API calls)

Data Layer:
├── Static JSON (events.json, places.json)
└── Abstraction layer for future Flask API migration

Backend (Deferred):
├── Flask (Python)
├── SQLite → PostgreSQL
└── RESTful API endpoints
```

## 📁 Project Structure

```
locora app/
├── frontend/                 # Next.js application
│   ├── app/
│   │   ├── page.tsx         # Home page
│   │   ├── layout.tsx       # Root layout (Navbar + Footer)
│   │   ├── globals.css      # Global styles
│   │   ├── events/
│   │   │   ├── page.tsx     # Events directory
│   │   │   └── [id]/
│   │   │       └── page.tsx # Event detail page
│   │   └── places/
│   │       ├── page.tsx     # Places directory
│   │       └── [id]/
│   │           └── page.tsx # Place detail page
│   ├── components/          # Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── EventCard.tsx
│   │   ├── PlaceCard.tsx
│   │   ├── CategoryBadge.tsx
│   │   └── DetailSection.tsx
│   ├── lib/
│   │   └── api.ts          # Data abstraction layer
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   ├── data/
│   │   ├── events.json     # Mock events data
│   │   └── places.json     # Mock places data
│   ├── package.json
│   └── tsconfig.json
├── backend/                 # Flask app (future)
└── docs/                    # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd "locora app"
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

## 📱 Pages & Features

### Home Page (`/`)

- Hero section with call-to-action buttons
- Featured events carousel
- Popular places showcase
- Smooth animations and gradients
- Mobile-optimized layout

### Events Page (`/events`)

- Browse all events
- Search by title, description, organizer
- Filter by category (Music, Sports, Arts, Community, Food, Education, Family, Outdoor)
- Event cards with image, date, time, location
- Responsive grid layout
- "No results" fallback UI

### Event Detail Page (`/events/[id]`)

- Full event information and description
- Date, time, location details
- Organizer information
- External link to event website
- Beautiful image display
- Breadcrumb navigation

### Places Page (`/places`)

- Browse all places and attractions
- Search by name, description, address
- Filter by category
- Place cards with hours, phone, website
- Responsive grid layout

### Place Detail Page (`/places/[id]`)

- Complete place information
- Address, phone, hours
- Website and navigation links
- Call button for direct phone access
- Image gallery
- Easy share-ability

## 🎨 Design System

### Colors

- **Primary**: Blue (#2563eb) - Main actions, highlights
- **Secondary**: Purple (#7c3aed) - Accents, gradients
- **Accent**: Pink (#ec4899) - Emphasis, hover states
- **Neutral**: Gray scale (#171717 to #f3f4f6) - Text, background

### Typography

- **Headings**: Bold, 18px-48px
- **Body**: Regular, 14px-16px
- **Accents**: Semibold for emphasis

### Components

- **Cards**: Rounded-lg shadow-sm with hover effects
- **Buttons**: Primary (blue), Secondary (gray)
- **Badges**: Category-specific colors with contrast
- **Inputs**: Clean borders, focus rings

## 🔄 Data Flow

```
User → Search Query
        ↓
   [SearchBar Component]
        ↓
   Filtered via useMemo
        ↓
   [EventCard/PlaceCard]
        ↓
   [Detail Page]
        ↓
   [API Layer - lib/api.ts]
        ↓
   [JSON Data] → [Future: Flask API]
```

## 📈 Future Enhancements

### Phase 4 - Backend Integration

- [ ] Flask REST API setup
- [ ] PostgreSQL database
- [ ] Admin content management interface
- [ ] Automatic deploy to production

### Phase 5 - Advanced Features

- [ ] User accounts and authentication
- [ ] Saved events and places
- [ ] Event calendar integration
- [ ] Map integration (Google Maps)
- [ ] Email notifications
- [ ] Community submissions with moderation
- [ ] Rating and reviews system

### Phase 6 - Community Features

- [ ] User profiles
- [ ] Social sharing
- [ ] Comments on events/places
- [ ] Event RSVP system
- [ ] Community calendar
- [ ] Trending section

## 🔐 API Migration Path

Currently, Locora uses static JSON data. When ready to migrate to Flask backend:

1. **Update `lib/api.ts`**: Replace JSON imports with axios HTTP calls
2. **Example migration**:

   ```typescript
   // Before
   import eventsData from "@/data/events.json";
   export async function getEvents() {
     return eventsData;
   }

   // After
   export async function getEvents() {
     const { data } = await axios.get("http://localhost:5000/api/events");
     return data;
   }
   ```

3. **No component changes needed** - Components already use the abstraction layer!

## 🧪 Testing Checklist

- [ ] All pages load without errors
- [ ] Search functionality works
- [ ] Filtering by category works
- [ ] Event/place detail pages load correctly
- [ ] Links navigate properly
- [ ] Mobile responsive (test on 375px, 768px, 1024px widths)
- [ ] Images load and display correctly
- [ ] No console errors
- [ ] Page load time < 2s

## 📝 Content Management

### Adding Events

Edit `frontend/data/events.json`:

```json
{
  "id": "evt-XXX",
  "title": "Event Name",
  "description": "Event description",
  "date": "2026-MM-DD",
  "time": "HH:MM",
  "location": "Venue Name",
  "address": "Street Address",
  "category": "Music|Sports|Arts|Community|Food|Education|Family|Outdoor",
  "image": "https://image-url.com",
  "organizer": "Organization Name",
  "weblink": "https://event-website.com"
}
```

### Adding Places

Edit `frontend/data/places.json`:

```json
{
  "id": "place-XXX",
  "name": "Place Name",
  "description": "Description",
  "category": "Category",
  "address": "Street Address",
  "phone": "(555) 123-4567",
  "hours": "9:00 AM - 5:00 PM",
  "image": "https://image-url.com",
  "website": "https://website.com"
}
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Alternative

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Support & Contact

For feature requests or bug reports, please [contact us](mailto:locora@brentwood.local)

## 📄 License

This project is created for the Brentwood community. All rights reserved.

---

**Built with ❤️ for Brentwood Community**
