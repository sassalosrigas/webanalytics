# PulseTransit — Mobile App Mockup

**Course:** Web Analytics 
**Authors:**
- Rigas Sassalos (p3220178) — Department of Informatics, AUEB
- Eleni Antoniadi Tsarampoulidi (3220006) — Department of Informatics, AUEB

---

## 1. Overview
**PulseTransit** is an urban transit companion designed for low-stress commuting across Athens transit corridors (focusing on the AUEB campus corridor). Instead of optimizing solely for travel duration, it balances travel time with carriage crowd density and seat availability.

The interactive prototype is implemented in client-side HTML5, Tailwind CSS, and vanilla JavaScript without external build dependencies.

---

## 2. Core Intelligent Components

### 2.1 Predictive Model: Crowding Forecaster ("CrowdCast")
- **Function:** Predicts platform and carriage crowd levels in 15-minute intervals.
- **Mockup Behavior:**
  - Selecting a station (*Victoria*, *Syntagma*, *Panepistimio*) and departure window (*Now*, *In 30 mins*, *In 1 hour*) renders a 5-tier crowding meter (Low, Moderate, Packed).
  - Highlights actionable advice (e.g., *"Best time to leave: 08:12 (Seats guaranteed)"*).

### 2.2 Recommender System: Route Recommender ("Smart Commuter")
- **Function:** Evaluates multi-modal routes using a utility function balancing duration, transfer friction, and crowding stress.
- **Mockup Behavior:**
  - Generates 3 comparison options:
    - **Card 1 (Top Pick):** Low Congestion route (Metro 1 • 18 min • Likely Seat).
    - **Card 2:** Fastest route (Direct Metro • 14 min • Crowded).
    - **Card 3:** Relaxed alternate (Bus 608 • 25 min • Guaranteed Seat).
  - Tapping a card displays step-by-step guidance and an optional carriage occupancy breakdown.
  - Toggling preferences in the **Profile** screen (e.g., *"I'm in a hurry"*) dynamically re-ranks the routes on the Routes tab.

---

## 3. Screen Structure

| Tab | Role | Mockup Interaction |
| :--- | :--- | :--- |
| **Home** | Commute Status | Displays active route status card, live delay alert banner, and destination search chips. |
| **Predictor** | Crowd Forecast | Station and time window selectors updating the visual crowding meter. |
| **Routes** | Recommendations | Ranked route cards with expandable step-by-step itineraries. |
| **Profile** | Preferences | Interactive toggle switches that trigger real-time route re-ranking. |

---

## 4. How to Run Locally

### Option A: Direct File Open
Open `index.html` directly in any modern desktop or mobile browser.

### Option B: Local HTTP Server
Run the built-in Python server from the repository root:
```bash
python3 -m http.server 8000