/**
 * PulseTransit — Ultra-Clean & Minimal App Engine
 * Web Analytics Assignment (HW1)
 */

// Application State
const appState = {
  currentTab: 'home',
  selectedStation: 'Victoria (Line 1)',
  timePreset: 30, // 15 (Now), 30 (In 30m), 60 (In 1h)
  currentScenario: 'morning_rush', // 'morning_rush', 'rainy_surge', 'off_peak'
  userPreferences: {
    wantSeat: true,
    inHurry: false,
    fewerTransfers: true,
  },
  destination: 'AUEB Main Campus',
  selectedRouteId: 'route-a',
  isDeviceFramed: true,
  carriageSectionOpen: false,
};

// Friendly Station Forecast Data
const stationForecasts = {
  'Victoria (Line 1)': {
    name: 'Victoria Station',
    takeaway: 'Best time to leave: 08:12 (Seats guaranteed)',
    tip: 'Board at the front carriages for an empty, calm car.',
    slots: [
      { time: '08:05', status: 'Calm', level: 'low', fill: '1/3', desc: '🟢 Seats Open' },
      { time: '08:15', status: 'Busy', level: 'mid', fill: '3/5', desc: '🟡 Moderate' },
      { time: '08:25', status: 'Packed', level: 'high', fill: 'full', desc: '🔴 Packed' },
      { time: '08:40', status: 'Busy', level: 'mid', fill: '3/5', desc: '🟡 Moderate' },
      { time: '08:55', status: 'Calm', level: 'low', fill: '1/3', desc: '🟢 Seats Open' }
    ]
  },
  'Syntagma (Line 2/3)': {
    name: 'Syntagma Station',
    takeaway: 'Best time to leave: 08:10 or after 08:50',
    tip: 'Use stairs instead of central escalators to skip the queue.',
    slots: [
      { time: '08:05', status: 'Busy', level: 'mid', fill: '3/5', desc: '🟡 Moderate' },
      { time: '08:20', status: 'Packed', level: 'high', fill: 'full', desc: '🔴 Packed' },
      { time: '08:35', status: 'Packed', level: 'high', fill: 'full', desc: '🔴 Critical' },
      { time: '08:50', status: 'Busy', level: 'mid', fill: '3/5', desc: '🟡 Moderate' },
      { time: '09:05', status: 'Calm', level: 'low', fill: '1/3', desc: '🟢 Seats Open' }
    ]
  },
  'Panepistimio (Line 2)': {
    name: 'Panepistimio Station',
    takeaway: 'Best time to leave: 08:15 (Very calm platforms)',
    tip: 'Exit via Akadimias street to save walking time.',
    slots: [
      { time: '08:05', status: 'Calm', level: 'low', fill: '1/3', desc: '🟢 Seats Open' },
      { time: '08:20', status: 'Calm', level: 'low', fill: '1/3', desc: '🟢 Seats Open' },
      { time: '08:35', status: 'Busy', level: 'mid', fill: '3/5', desc: '🟡 University Surge' },
      { time: '08:50', status: 'Calm', level: 'low', fill: '1/3', desc: '🟢 Seats Open' },
      { time: '09:05', status: 'Calm', level: 'low', fill: '1/3', desc: '🟢 Normal' }
    ]
  }
};

// Clean Route Itineraries
const routesData = {
  'route-a': {
    id: 'route-a',
    title: 'Metro Line 1 (Front Cars)',
    badge: '★ Best & Calmest Route',
    time: 18,
    summary: '18 mins • 🪑 Likely Seat',
    steps: [
      { icon: 'footprints', title: 'Walk 3 mins', desc: 'Head south from Kypseli to Victoria Station.' },
      { icon: 'train', title: 'Ride Metro Line 1 (4 stops)', desc: 'Board Car 1 or 2 at the front of the platform for guaranteed seating.' },
      { icon: 'map-pin', title: 'Walk 2 mins to Campus', desc: 'Arrive at AUEB Patission main entrance.' }
    ],
    carriages: [
      { car: 1, label: 'Seats', color: 'emerald' },
      { car: 2, label: 'Seats', color: 'emerald' },
      { car: 3, label: 'Packed', color: 'rose' },
      { car: 4, label: 'Packed', color: 'rose' },
      { car: 5, label: 'Busy', color: 'amber' },
      { car: 6, label: 'Seats', color: 'emerald' }
    ]
  },
  'route-b': {
    id: 'route-b',
    title: 'Direct Express Metro',
    badge: '⚡ Fastest Route',
    time: 14,
    summary: '14 mins • 🚶 Crowded (Standing)',
    steps: [
      { icon: 'footprints', title: 'Brisk Walk 1 min', desc: 'Quick walk directly to center turnstiles.' },
      { icon: 'train', title: 'Direct Metro 1 (Center Cars)', desc: 'Board immediate train. High passenger volume, standing space only.' },
      { icon: 'map-pin', title: 'Walk 1 min to Campus', desc: 'Arrive 4 minutes faster.' }
    ],
    carriages: [
      { car: 1, label: 'Busy', color: 'amber' },
      { car: 2, label: 'Packed', color: 'rose' },
      { car: 3, label: 'Packed', color: 'rose' },
      { car: 4, label: 'Packed', color: 'rose' },
      { car: 5, label: 'Packed', color: 'rose' },
      { car: 6, label: 'Busy', color: 'amber' }
    ]
  },
  'route-c': {
    id: 'route-c',
    title: 'Bus 608 via Pedion tou Areos',
    badge: '🍃 Relaxed Walk & Bus',
    time: 25,
    summary: '25 mins • 🪑 Guaranteed Seat',
    steps: [
      { icon: 'footprints', title: 'Stroll 8 mins in Park', desc: 'Peaceful walk through Pedion tou Areos gardens.' },
      { icon: 'bus', title: 'Ride Bus 608 (Alexandras)', desc: 'Plenty of window seats available.' },
      { icon: 'map-pin', title: 'Arrive at AUEB', desc: 'Direct drop-off at Antoniadou wing.' }
    ],
    carriages: [
      { car: 1, label: 'Seats', color: 'emerald' },
      { car: 2, label: 'Seats', color: 'emerald' }
    ]
  }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderLucideIcons();
  startClock();
  setupEventListeners();
  updateRouteCardOrder();
});

// Helper: Refresh Lucide Icons safely
function renderLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Clock in Phone Status Bar
function startClock() {
  const clockEl = document.getElementById('live-phone-clock');
  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (clockEl) {
      clockEl.textContent = `${hours}:${minutes}`;
    }
  }
  update();
  setInterval(update, 15000);
}

// Setup input listeners
function setupEventListeners() {
  const homeSearch = document.getElementById('home-search-input');
  if (homeSearch) {
    homeSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') searchFromHome();
    });
  }

  // Close evaluator menu on click outside
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('evaluator-dropdown');
    const btn = document.getElementById('evaluator-pill-btn');
    if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
}

// Tab Switching
function switchTab(tabId) {
  if (appState.currentTab === tabId) return;

  // Deactivate all screens
  document.querySelectorAll('.screen-view').forEach(screen => {
    screen.classList.remove('active');
  });

  // Deactivate all tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Activate target screen
  const targetScreen = document.getElementById(`screen-${tabId}`);
  if (targetScreen) targetScreen.classList.add('active');

  // Activate target button
  const targetBtn = document.getElementById(`tab-btn-${tabId}`);
  if (targetBtn) targetBtn.classList.add('active');

  appState.currentTab = tabId;

  // Scroll to top
  const container = document.getElementById('app-screen-container');
  if (container) container.scrollTo({ top: 0, behavior: 'smooth' });

  renderLucideIcons();
}

// ================= SCREEN 1: HOME =================
function handleRerouteClick() {
  showToast('Rerouting: Switched to calmest route ✨');
  appState.userPreferences.inHurry = false;
  const hurryToggle = document.getElementById('pref-toggle-hurry');
  if (hurryToggle) hurryToggle.checked = false;
  
  updateRouteCardOrder();
  switchTab('routes');
}

function startCommuteSimulation() {
  showToast('Trip started: M1 train arriving in 3 mins 🚇');
  openRouteDetails('route-a');
}

function searchFromHome() {
  const input = document.getElementById('home-search-input');
  const val = input ? input.value.trim() : 'AUEB Main Campus';
  appState.destination = val || 'AUEB Main Campus';
  switchTab('routes');
}

function selectRecentTrip(tripName) {
  appState.destination = tripName;
  const input = document.getElementById('home-search-input');
  if (input) input.value = tripName;
  switchTab('routes');
}

// ================= SCREEN 2: PREDICTIVE CROWDCAST =================
function selectStation(stationKey) {
  appState.selectedStation = stationKey;

  // Update chip UI
  document.querySelectorAll('.station-pill').forEach(btn => {
    if (btn.getAttribute('data-station') === stationKey) {
      btn.classList.add('active');
      btn.classList.remove('text-slate-700');
    } else {
      btn.classList.remove('active');
      btn.classList.add('text-slate-700');
    }
  });

  updatePredictorView();
}

function setTimePreset(minutes) {
  appState.timePreset = minutes;

  // Update buttons
  const btnNow = document.getElementById('time-btn-now');
  const btn30 = document.getElementById('time-btn-30');
  const btn60 = document.getElementById('time-btn-60');

  [btnNow, btn30, btn60].forEach(b => {
    if (b) {
      b.classList.remove('active', 'bg-brand-500', 'text-white', 'border-brand-500');
      b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
    }
  });

  if (minutes === 15 && btnNow) {
    btnNow.classList.add('active', 'bg-brand-500', 'text-white', 'border-brand-500');
    btnNow.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
  } else if (minutes === 30 && btn30) {
    btn30.classList.add('active', 'bg-brand-500', 'text-white', 'border-brand-500');
    btn30.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
  } else if (minutes === 60 && btn60) {
    btn60.classList.add('active', 'bg-brand-500', 'text-white', 'border-brand-500');
    btn60.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
  }

  updatePredictorView();
}

function updatePredictorView() {
  const data = stationForecasts[appState.selectedStation] || stationForecasts['Victoria (Line 1)'];
  
  const title = document.getElementById('predictor-station-name');
  const takeaway = document.getElementById('takeaway-bold-text');
  const sub = document.getElementById('takeaway-sub-text');

  if (title) title.textContent = data.name;
  if (takeaway) takeaway.textContent = data.takeaway;
  if (sub) sub.textContent = data.tip;

  // Render 5 meter bars
  const meter = document.getElementById('crowd-bar-meter');
  if (meter) {
    meter.innerHTML = '';
    data.slots.forEach(slot => {
      const slotEl = document.createElement('div');
      slotEl.className = 'flex flex-col items-center gap-1.5 cursor-pointer transition hover:opacity-80';
      slotEl.onclick = () => selectSlotTime(slot.time, slot.desc);

      const isHigh = slot.level === 'high';
      const isMid = slot.level === 'mid';
      const bgBox = isHigh ? 'bg-rose-100 border-2 border-rose-300' : (isMid ? 'bg-amber-100' : 'bg-emerald-100');
      const innerBar = isHigh ? 'h-full bg-rose-500' : (isMid ? 'h-3/5 bg-amber-500' : 'h-1/3 bg-emerald-500');
      const textColor = isHigh ? 'text-rose-600 font-bold' : (isMid ? 'text-amber-600 font-bold' : 'text-emerald-600 font-bold');

      slotEl.innerHTML = `
        <span class="text-[10px] font-semibold text-slate-500">${slot.time}${isHigh ? ' 🔥' : ''}</span>
        <div class="w-full h-16 rounded-xl ${bgBox} flex items-end p-1">
          <div class="w-full ${innerBar} rounded-lg"></div>
        </div>
        <span class="text-[10px] ${textColor}">${slot.status}</span>
      `;
      meter.appendChild(slotEl);
    });
  }

  showToast(`Updated forecast for ${data.name}`);
}

function selectSlotTime(time, label) {
  const takeaway = document.getElementById('takeaway-bold-text');
  if (takeaway) {
    takeaway.textContent = `At ${time}: ${label}`;
  }
}

// ================= SCREEN 3: ROUTE RECOMMENDER =================
function openRouteDetails(routeId) {
  const route = routesData[routeId];
  if (!route) return;

  appState.selectedRouteId = routeId;
  appState.carriageSectionOpen = false;

  const title = document.getElementById('modal-route-title');
  const time = document.getElementById('modal-route-time');
  const carriageSection = document.getElementById('carriage-crowding-section');
  const chevron = document.getElementById('carriage-chevron');

  if (title) title.textContent = route.title;
  if (time) time.textContent = route.summary;
  if (carriageSection) carriageSection.classList.add('hidden');
  if (chevron) chevron.style.transform = 'rotate(0deg)';

  // Populate steps
  const stepsContainer = document.getElementById('modal-steps-container');
  if (stepsContainer) {
    stepsContainer.innerHTML = '';
    route.steps.forEach(step => {
      const el = document.createElement('div');
      el.className = 'flex items-start gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100';
      el.innerHTML = `
        <div class="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
          <i data-lucide="${step.icon}" class="w-3.5 h-3.5 text-brand-500"></i>
        </div>
        <div>
          <div class="text-xs font-bold text-slate-900">${step.title}</div>
          <p class="text-[11px] text-slate-500 mt-0.5 leading-snug">${step.desc}</p>
        </div>
      `;
      stepsContainer.appendChild(el);
    });
  }

  // Populate carriages
  const grid = document.getElementById('modal-carriages-grid');
  if (grid) {
    grid.innerHTML = '';
    route.carriages.forEach(c => {
      const isRed = c.color === 'rose';
      const isYellow = c.color === 'amber';
      const bg = isRed ? 'bg-rose-100 text-rose-700 border-rose-200' : (isYellow ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200');

      const carEl = document.createElement('div');
      carEl.className = `p-2 rounded-xl border ${bg} flex flex-col items-center justify-center`;
      carEl.innerHTML = `
        <span class="text-[9px] font-bold">Car ${c.car}</span>
        <span class="text-[10px] font-black">${c.label}</span>
      `;
      grid.appendChild(carEl);
    });
  }

  const modal = document.getElementById('route-details-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    renderLucideIcons();
  }
}

function closeRouteDetailsModal() {
  const modal = document.getElementById('route-details-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function toggleCarriageSection() {
  const section = document.getElementById('carriage-crowding-section');
  const chevron = document.getElementById('carriage-chevron');
  if (section) {
    appState.carriageSectionOpen = !appState.carriageSectionOpen;
    if (appState.carriageSectionOpen) {
      section.classList.remove('hidden');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
      section.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  }
}

function simulateTurnByTurnNavigation() {
  closeRouteDetailsModal();
  showToast('Live directions active: Walk 3 mins to Victoria 🚶');
}

// ================= SCREEN 4: PROFILE & PREFERENCES =================
function handleFriendlyToggle(prefKey) {
  if (prefKey === 'hurry') {
    const toggle = document.getElementById('pref-toggle-hurry');
    appState.userPreferences.inHurry = toggle ? toggle.checked : false;

    if (appState.userPreferences.inHurry) {
      showToast("Updated! Fastest route is now your #1 pick ⚡");
    } else {
      showToast("Updated! Calm route is now your #1 pick ★");
    }

    updateRouteCardOrder();
  } else if (prefKey === 'seat') {
    const toggle = document.getElementById('pref-toggle-seat');
    appState.userPreferences.wantSeat = toggle ? toggle.checked : true;
    showToast("Preferences saved: Seat priority updated");
  } else if (prefKey === 'transfers') {
    const toggle = document.getElementById('pref-toggle-transfers');
    appState.userPreferences.fewerTransfers = toggle ? toggle.checked : true;
    showToast("Preferences saved: Fewer transfers updated");
  }
}

function updateRouteCardOrder() {
  const container = document.getElementById('route-cards-container');
  const cardA = document.getElementById('route-card-a');
  const cardB = document.getElementById('route-card-b');
  const cardC = document.getElementById('route-card-c');

  const badgeA = document.getElementById('route-a-badge');
  const badgeB = document.getElementById('route-b-badge');

  if (!container || !cardA || !cardB || !cardC) return;

  if (appState.userPreferences.inHurry) {
    // Move Card B (Fastest) to the top!
    container.insertBefore(cardB, cardA);

    // Style Card B as top pick
    cardB.classList.add('route-card-top');
    cardB.classList.remove('border-slate-200');
    if (badgeB) {
      badgeB.className = 'inline-flex items-center gap-1 text-[11px] font-extrabold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200';
      badgeB.innerHTML = '★ Fastest Route (Recommended)';
    }

    // Demote Card A
    cardA.classList.remove('route-card-top');
    cardA.classList.add('border', 'border-slate-200');
    if (badgeA) {
      badgeA.className = 'inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full';
      badgeA.innerHTML = 'Calmest Route (18 min)';
    }
  } else {
    // Normal: Card A is top pick
    container.insertBefore(cardA, cardB);

    cardA.classList.add('route-card-top');
    cardA.classList.remove('border-slate-200');
    if (badgeA) {
      badgeA.className = 'inline-flex items-center gap-1 text-[11px] font-extrabold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200';
      badgeA.innerHTML = '★ Best & Calmest Route';
    }

    cardB.classList.remove('route-card-top');
    cardB.classList.add('border', 'border-slate-200');
    if (badgeB) {
      badgeB.className = 'inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200';
      badgeB.innerHTML = '⚡ Fastest Route';
    }
  }

  renderLucideIcons();
}

// ================= EVALUATOR SHORTCUTS & POPUPS =================
function toggleEvaluatorMenu() {
  const menu = document.getElementById('evaluator-dropdown');
  if (menu) {
    menu.classList.toggle('hidden');
    renderLucideIcons();
  }
}

function setScenario(scenarioKey) {
  appState.currentScenario = scenarioKey;

  // Toggle checks in menu
  const checkMorning = document.getElementById('scenario-check-morning');
  const checkRainy = document.getElementById('scenario-check-rainy');
  const checkOffpeak = document.getElementById('scenario-check-offpeak');

  if (checkMorning) checkMorning.classList.toggle('hidden', scenarioKey !== 'morning_rush');
  if (checkRainy) checkRainy.classList.toggle('hidden', scenarioKey !== 'rainy_surge');
  if (checkOffpeak) checkOffpeak.classList.toggle('hidden', scenarioKey !== 'off_peak');

  const banner = document.getElementById('crowding-alert-banner');
  const statusLabel = document.getElementById('evaluator-status-label');

  if (scenarioKey === 'morning_rush') {
    if (statusLabel) statusLabel.textContent = 'Demo: Morning Rush';
    if (banner) {
      banner.className = 'rounded-2xl bg-brand-50/80 border border-brand-200/90 p-3.5 transition group';
      banner.innerHTML = `
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-base">⚠️</span>
            <p class="text-xs font-medium text-slate-800">
              Metro 1 is packed right now.
            </p>
          </div>
          <button onclick="handleRerouteClick()" class="shrink-0 text-xs font-bold text-brand-600 hover:text-brand-700 bg-white px-3 py-1.5 rounded-xl border border-brand-200 shadow-2xs flex items-center gap-1 transition">
            <span>Show Easy Route</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    }
    showToast('Loaded Scenario: Morning Rush (08:30)');
  } else if (scenarioKey === 'rainy_surge') {
    if (statusLabel) statusLabel.textContent = 'Demo: Rainy Weather';
    if (banner) {
      banner.className = 'rounded-2xl bg-blue-50 border border-blue-200 p-3.5 transition group';
      banner.innerHTML = `
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-base">🌧️</span>
            <p class="text-xs font-medium text-blue-900">
              Rain delay: Buses are crowded today.
            </p>
          </div>
          <button onclick="handleRerouteClick()" class="shrink-0 text-xs font-bold text-blue-700 hover:text-blue-800 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs flex items-center gap-1 transition">
            <span>Dry Route</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
    }
    showToast('Loaded Scenario: Rainy Weather Surge');
  } else if (scenarioKey === 'off_peak') {
    if (statusLabel) statusLabel.textContent = 'Demo: Off-Peak Calm';
    if (banner) {
      banner.className = 'rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 transition group';
      banner.innerHTML = `
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <span class="text-base">✨</span>
            <p class="text-xs font-medium text-emerald-900">
              All transit lines are calm and on time.
            </p>
          </div>
          <span class="text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-xl border border-emerald-200">
            High Seating
          </span>
        </div>
      `;
    }
    showToast('Loaded Scenario: Off-Peak Calm Commute');
  }

  // Close menu after choice
  const menu = document.getElementById('evaluator-dropdown');
  if (menu) menu.classList.add('hidden');

  renderLucideIcons();
}

function toggleDeviceFrame() {
  const wrapper = document.getElementById('phone-wrapper');
  const toggleText = document.getElementById('frame-toggle-text');
  if (wrapper) {
    appState.isDeviceFramed = !appState.isDeviceFramed;
    if (appState.isDeviceFramed) {
      wrapper.classList.remove('no-bezel');
      if (toggleText) toggleText.textContent = 'Toggle Phone Frame';
      showToast('Phone frame restored');
    } else {
      wrapper.classList.add('no-bezel');
      if (toggleText) toggleText.textContent = 'Restore Frame';
      showToast('Full preview mode');
    }
  }

  const menu = document.getElementById('evaluator-dropdown');
  if (menu) menu.classList.add('hidden');
}

function openAboutModal() {
  const modal = document.getElementById('about-model-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    renderLucideIcons();
  }
  const menu = document.getElementById('evaluator-dropdown');
  if (menu) menu.classList.add('hidden');
}

function closeAboutModal() {
  const modal = document.getElementById('about-model-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Clean Toast Notification
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const body = document.getElementById('toast-body');

  if (toast && body) {
    body.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2600);
  }
}
