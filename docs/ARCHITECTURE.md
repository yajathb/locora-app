# Locora Architecture & Backend Migration Plan

## System Architecture

### Current MVP Architecture (Static Data)

```
┌────────────────────────────────────────────────┐
│           Browser / Next.js Frontend           │
├────────────────────────────────────────────────┤
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │          React Components                │  │
│  │  (EventCard, PlaceCard, SearchBar, etc)  │  │
│  └──────────────────────────────────────────┘  │
│                      ↓                         │
│  ┌──────────────────────────────────────────┐  │
│  │      Data Abstraction Layer              │  │
│  │      (lib/api.ts)                        │  │
│  │  • getEvents()                           │  │
│  │  • getPlaces()                           │  │
│  │  • Filtering & Formatting                │  │
│  └──────────────────────────────────────────┘  │
│                      ↓                         │
│  ┌──────────────────────────────────────────┐  │
│  │      Static Data (JSON)                  │  │
│  │  • data/events.json (8 items)            │  │
│  │  • data/places.json (9 items)            │  │
│  └──────────────────────────────────────────┘  │
│                                                │
└────────────────────────────────────────────────┘
```

### Future MVP+1 Architecture (With Flask Backend)

```
┌──────────────────────────────────────────────────────────────┐
│              Frontend Layer (Next.js / React)                │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  UI Components → Data Abstraction Layer (lib/api.ts)         │
│                            ↓ (axios calls)                   │
│                    HTTP Requests (port 3000)                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                              ↕
                        Network Boundary
                              ↕
┌─────────────────────────────────────────────────────────────┐
│              Backend Layer (Flask / Python)                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Flask Application                            │   │
│  │  /api/events          [GET]  - List all events       │   │
│  │  /api/events/:id      [GET]  - Get single event      │   │
│  │  /api/events          [POST] - Create event (admin)  │   │
│  │  /api/events/:id      [PUT]  - Update event (admin)  │   │
│  │  /api/places          [GET]  - List all places       │   │
│  │  /api/places/:id      [GET]  - Get single place      │   │
│  │  /api/places          [POST] - Create place (admin)  │   │
│  │  /api/places/:id      [PUT]  - Update place (admin)  │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ↓                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Database Layer                               │   │
│  │  SQLite (MVP) → PostgreSQL (Production)              │   │
│  │  Tables:                                             │   │
│  │  • events (id, title, description, date, ...)        │   │
│  │  • places (id, name, description, category, ...)     │   │
│  │  • categories (id, name, color)                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### Event Model

```typescript
interface Event {
  id: string; // Unique identifier
  title: string; // Event name
  description: string; // Full description
  date: string; // ISO 8601 format: "2026-04-15"
  time: string; // 24-hour format: "10:00" or "14:30"
  endTime?: string; // Optional end time
  location: string; // Venue/location name
  address: string; // Full address
  category: string; // Events: Music, Sports, Arts, etc.
  image: string; // Image URL (Unsplash or CDN)
  organizer: string; // Organization running event
  weblink?: string; // Event website/ticketing link
  featured?: boolean; // Show on home page
  createdAt?: Date; // (Backend) When created
  updatedAt?: Date; // (Backend) Last update
}
```

### Place Model

```typescript
interface Place {
  id: string; // Unique identifier
  name: string; // Business/place name
  description: string; // Description
  category: string; // Food, Arts, Community, etc.
  address: string; // Full address
  phone?: string; // Contact phone
  hours?: string; // Operating hours
  image: string; // Image URL
  website?: string; // Official website
  featured?: boolean; // Show on home page
  createdAt?: Date; // (Backend) When created
  updatedAt?: Date; // (Backend) Last update
}
```

## Backend Implementation Roadmap

### Phase 1: API Layer Setup (Week 1)

```python
# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/events', methods=['GET'])
def get_events():
    # Return events from database
    return jsonify(events)

@app.route('/api/events/<id>', methods=['GET'])
def get_event(id):
    # Return single event
    return jsonify(event)

# Similar for places...
```

### Phase 2: Database Setup (Week 2)

```python
# backend/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Event(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(10), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(500))
    organizer = db.Column(db.String(255))
    weblink = db.Column(db.String(500))
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Place(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20))
    hours = db.Column(db.String(255))
    image = db.Column(db.String(500))
    website = db.Column(db.String(500))
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

### Phase 3: Admin Interface (Week 3-4)

```
/admin/login          - Admin authentication
/admin/events         - Event management
/admin/events/new     - Create event
/admin/events/:id     - Edit event
/admin/places         - Place management
/admin/places/new     - Create place
/admin/places/:id     - Edit place
```

### Phase 4: Authentication & Security (Week 4+)

```python
# JWT tokens for admin API access
# Password hashing (bcrypt)
# Rate limiting
# Input validation
# Error handling
```

## Migration Process (Zero Downtime)

### Step 1: Prepare Backend (Development)

- Create Flask app with database
- Implement API endpoints
- Test with dummy data
- No changes to frontend needed yet

### Step 2: Gradual Rollout

```typescript
// backend/lib/api.ts - Add feature flag

const USE_BACKEND = process.env.NEXT_PUBLIC_USE_BACKEND === "true";

export async function getEvents(filters?: FilterOptions) {
  if (USE_BACKEND) {
    const { data } = await axios.get(`${API_URL}/api/events`);
    return data;
  } else {
    // Current JSON fallback
    return getEventsFromJSON(filters);
  }
}
```

### Step 3: Enable Gradually

- First: Enable for read-only (events/places)
- Then: Add admin editing
- Finally: Remove JSON fallback

### Step 4: Database Migration

```bash
# Export current JSON data to database
python backend/scripts/migrate_data.py

# Verify data integrity
# Update API to serve from DB
# Deploy and monitor
```

## API Endpoint Specifications

### Events

**GET /api/events**

```
Query Parameters:
- search: string (optional) - Search in title/description
- category: string (optional) - Filter by category
- dateFrom: date (optional) - Start date (ISO)
- dateTo: date (optional) - End date (ISO)
- featured: boolean (optional) - Featured only
- limit: number (optional, default 100)
- offset: number (optional, default 0)

Response:
{
  "success": true,
  "data": [Event],
  "total": number,
  "page": number
}
```

**GET /api/events/:id**

```
Response:
{
  "success": true,
  "data": Event
}
```

**POST /api/events** (Admin only)

```
Headers:
- Authorization: Bearer {token}

Body:
{
  "title": string,
  "description": string,
  "date": date,
  "time": time,
  ...
}

Response:
{
  "success": true,
  "data": Event
}
```

### Places (Similar structure)

**GET /api/places**
**GET /api/places/:id**
**POST /api/places**
**PUT /api/places/:id**
**DELETE /api/places/:id**

## Environment Variables

### Frontend (.env.local)

```env
# Current (static)
# No env vars needed for MVP

# Future (with backend)
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_USE_BACKEND=false
```

### Backend (.env or .env.local)

```env
FLASK_ENV=development
FLASK_DEBUG=true
DATABASE_URL=sqlite:///locora.db
SECRET_KEY=your-secret-key-here
JWT_SECRET=your-jwt-secret-here
CORS_ORIGINS=http://localhost:3000
```

## Performance Considerations

### Current (Static Data)

- ✅ Instant search/filter (client-side)
- ✅ No database queries
- ✅ No network latency
- ❌ Limited to ~1000 items practical limit

### Backend Implementation

- Search: Index on title, category for fast queries
- Pagination: Limit/offset for large datasets
- Caching: Redis for frequently accessed data
- CDN: Images served from CDN
- API: Gzip compression, HTTP/2

### Optimization Timeline

1. MVP: Static data with client-side filtering
2. MVP+1: Backend with indexed search
3. MVP+2: Redis caching layer
4. MVP+3: CDN for images and assets

## Rollback Plan

If backend migration fails:

1. **Immediate**: Switch `USE_BACKEND` env var to false
2. **Restore**: Previous JSON data files remain untouched
3. **Restart**: Restart Next.js server
4. **Verify**: Check all pages load correctly
5. **Debug**: Identify backend issue
6. **Redeploy**: Fix and try again

All without any data loss because JSON files are preserved!

## Next Steps

1. Confirm this architecture with team
2. Gather real event/place data from Brentwood
3. Update JSON files with production data
4. Deploy MVP to Vercel
5. Collect user feedback
6. Plan backend build (Phase 5)
7. Implement Flask backend when needed

---

**Key Principle**: Build incrementally. The frontend is ready for any backend. Start with static data, migrate to API when you need it. **Zero component changes required.**
