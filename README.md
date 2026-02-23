# DataPreneur — MERN Stack

Full MERN stack rebuild of the DataPreneur website.
- **Frontend**: React 18 + Vite + React Router v6
- **Backend**: Node.js + Express + Mongoose
- **Database**: MongoDB

## 🚀 Quick Start

### 1. Install all dependencies
```bash
npm install          # root (concurrently)
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment
```bash
cp server/.env.example server/.env
# Edit server/.env if you have a custom MongoDB URI
```

### 3. Run dev servers (both at once)
```bash
# From root:
npm run dev

# OR separately:
npm run server    # Express on :5000
npm run client    # Vite on :5173
```

Open **http://localhost:5173**

---

## 📁 Project Structure

```
datapreneur-mern/
├── package.json              ← Root (runs both via concurrently)
├── server/
│   ├── server.js             ← Express app
│   ├── routes/leads.js       ← POST /api/leads
│   ├── models/Lead.js        ← Mongoose model
│   └── .env.example
└── client/
    ├── index.html
    ├── vite.config.js        ← Proxy /api → :5000
    └── src/
        ├── main.jsx
        ├── App.jsx            ← Routes setup
        ├── index.css          ← Global styles + keyframes
        ├── components/
        │   ├── Navbar.jsx         ← Full mega-menu (extracted)
        │   ├── HiringPartners.jsx ← 4-row marquee (extracted)
        │   ├── AnimatedBackground.jsx
        │   ├── Footer.jsx
        │   └── FloatingCTA.jsx
        ├── data/
        │   ├── courses.js
        │   └── companies.js
        ├── hooks/
        │   └── useInView.js
        └── pages/
            ├── HomePage.jsx
            ├── ProgramPage.jsx    ← /programs/:slug
            ├── NotFound.jsx
            └── sections/
                ├── HeroSection.jsx
                ├── TickerSection.jsx
                ├── CoursesSection.jsx
                ├── WhySection.jsx
                ├── ProcessSection.jsx
                ├── TestimonialsSection.jsx
                └── CTASection.jsx
```

## 🌐 API Endpoints

| Method | Endpoint        | Description       |
|--------|-----------------|-------------------|
| GET    | /api/health     | Server health     |
| POST   | /api/leads      | Submit lead form  |
| GET    | /api/leads      | List all leads    |

## ✅ Features

- Full mega-menu Navbar with category dropdowns
- 4-row marquee Hiring Partners carousel (exact match to design)
- Pricing section removed
- Light theme + glassmorphism cards
- Animated gradient blob background (random movement, no canvas)
- Dynamic program pages at `/programs/:slug`
- React Router v6 — no SSR, no Server/Client component issues
- Mobile responsive
- MongoDB lead capture via Express API
