# PulseTransit — Effortless Urban Transit Companion

> **Web Analytics Assignment (HW1) Prototype**  
> *Author:* Alex K. (Senior, Department of Informatics / Web Analytics)  
> *Target Institution / Context:* Athens University of Economics and Business (AUEB) Transit Corridors  
> *Application URL:* Self-contained client-side web application (`index.html`)

---

## 1. Project Concept & Design Philosophy

Urban public transit apps often bombard everyday commuters with overwhelming, dense technical telemetry, raw timetables, and multi-line graphs. **PulseTransit** takes the opposite approach: it translates sophisticated predictive analytics and multi-objective routing into an **ultra-clean, calm, and effortless mobile experience**.

### Visual & Brand Identity
- **Primary Accent:** Vibrant Pink (`#FF58AE`) for primary interactive buttons, top recommendation badges, and active tab states.
- **Atmosphere & Surfaces:** Soft, airy, and inviting with clean whites (`#FFFFFF`), light neutral grays (`#F8F9FA`), and subtle card elevations (`box-shadow: 0 4px 20px rgba(255, 88, 174, 0.08)`).
- **Human-Centric Language:** Replaced dense statistics with friendly plain English (e.g. *"Best time to leave: 08:12 (Seats guaranteed)"*, *"18 mins • 🪑 Likely Seat"*).
- **Desktop Framing:** Styled inside an iPhone 16 Pro mobile frame centered on desktop screens, with responsive edge-to-edge full-screen behavior on actual mobile devices. Evaluator controls are tucked into a discreet floating pill in the top-right corner.

---

## 2. The Two Intelligent Components

While the user interface is minimal and human-friendly, it is driven by two core analytics models:

### 2.1 Component 1: Predictive Crowding Model ("CrowdCast")
- **User Question Answered:** *"When should I leave?"*
- **Mechanism:** Simulates time-series forecasting of platform and vehicle crowding across 15-minute intervals using automated fare collection (turnstile ingress/egress velocities), university lecture schedules (AUEB class start times), and weather conditions.
- **User Presentation:**
  - Station selector chips (*Victoria*, *Syntagma*, *Panepistimio*).
  - Clean travel window buttons (*Now*, *In 30 mins*, *In 1 hour*).
  - Scannable 5-slot visual crowd meter with clear color-coded states:
    - 🟢 Low Crowding (Seats open)
    - 🟡 Moderate
    - 🔴 Packed (Standing only)
  - Key takeaway in bold: **"Best time to leave: 08:12 (Seats guaranteed)"**.
  - Non-technical confidence badge: **"High Confidence ✓"**.

---

### 2.2 Component 2: Route Recommender ("Smart Commuter")
- **User Question Answered:** *"Which route will give me the calmest, easiest trip?"*
- **Mechanism:** Uses a Multi-Attribute Utility function balancing travel duration, crowding stress, seat availability probability, and transfer convenience.
- **User Presentation:** 3 distinct, uncluttered route comparison cards:
  - **Card 1 (Top Pick):** Highlighted with a `#FF58AE` border and badge: **"★ Best & Calmest Route"** (*Metro 1 • 18 min • 🪑 Likely Seat*).
  - **Card 2:** **"⚡ Fastest Route"** (*Direct Metro • 14 min • 🚶 Crowded*).
  - **Card 3:** **"🍃 Relaxed Walk & Bus"** (*Bus 608 • 25 min • 🪑 Guaranteed Seat*).
- **Interactive Details:**
  - Tapping any card opens a simple vertical step-by-step sheet (*Walk 3m → Ride 4 stops → Walk 2m*).
  - A secondary tap on **"See Carriage Crowding"** reveals train car density (Cars 1–6) only when the user requests it.

---

## 3. Screen-by-Screen User Flow

| Screen | Purpose | Key User Interactions |
| :--- | :--- | :--- |
| **1. Home Dashboard** | Calm daily commute status | • **Single Hero Card:** *"Home → AUEB"* with two clear chips: `18 mins` and `🟢 Not Crowded`.<br>• **Friendly Alert:** *"Metro 1 is packed right now. [Show Easy Route]"* with one tap action to switch to the calmest route.<br>• **Search:** *"Where are you heading today?"* with 3 quick pills (*Campus, Syntagma, Monastiraki*). |
| **2. Predictor ("When to Go")** | Optimal departure planning | • Switch stations (*Victoria, Syntagma, Panepistimio*).<br>• Switch time window (*Now, In 30 mins, In 1 hour*).<br>• Tap any time slot to see predicted crowding.<br>• Plain English advice: *"Best time to leave: 08:12 (Seats guaranteed)"*. |
| **3. Routes** | Smart route selection | • 3 uncluttered cards with clear travel times and comfort badges.<br>• Tap any card to open the clean step-by-step guidance modal.<br>• Secondary tap reveals carriage crowding view. |
| **4. Profile** | Effortless preference tuning | • **3 Friendly Toggles:**<br>  1. *"I want a seat (Prefer empty trains)"*<br>  2. *"I'm in a hurry (Fastest route)"*<br>  3. *"Fewer transfers"*<br>• **Dynamic Re-Ranking:** Turning on *"I'm in a hurry"* immediately promotes the **Fastest Route** card to #1 on Screen 3!<br>• Minimal impact summary: *"You saved 45 mins of crowded standing this week 🎉"*. |

---

## 4. How to Run Locally

PulseTransit is built with modern HTML5, Tailwind CSS (via CDN), and Vanilla JavaScript with **zero external build steps or node dependencies**.

### Method 1: Instant Browser Opening
Simply double-click `index.html` or run from your terminal:
- On macOS:
  ```bash
  open index.html
  ```
- On Linux:
  ```bash
  xdg-open index.html
  ```
- On Windows:
  ```powershell
  start index.html
  ```

### Method 2: Python HTTP Server (Recommended)
From this project directory:
```bash
python3 -m http.server 8000
```
Then visit **`http://localhost:8000`** in your browser.

---

## 5. Evaluator Shortcuts (Discreet Floating Pill)

In the top-right corner of the desktop view, click **"Demo Controls"** to test:
- **🌅 Morning Rush (08:30):** Triggers the Line 1 crowding alert and recommends front carriage boarding for AUEB students.
- **🌧️ Rainy Weather:** Simulates weather modal shift with rainy bus delay alerts.
- **🌙 Off-Peak Calm:** Shows calm transit status and high seat availability across all lines.
- **Toggle Phone Frame:** Toggles between mobile frame and expanded full-viewport preview.
- **About AI Models:** A gentle explanation of how the predictive and recommender models function.
