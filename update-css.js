const fs = require('fs');

const css = `
/* ═══════════════════════════════════════════════
   SAVEUR — Restaurant Management System
   Aesthetic: Dynamic Light 3D 
═══════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;700&family=Inter:wght@400;500;600&display=swap');

/* ── Variables ─────────────────────────────── */
:root {
  /* LIGHT MODE (Default) */
  --bg:         #f0f2f5;
  --bg2:        #ffffff;
  --bg3:        #f8f9fa;
  --border:     #e2e8f0;
  --gold:       #d97706; /* Warmer gold for light mode */
  --gold-light: #fbbf24;
  --gold-dim:   rgba(217, 119, 6, 0.1);
  --text:       #1e293b;
  --text-muted: #64748b;
  --text-dim:   #94a3b8;
  --danger:     #ef4444;
  --success:    #22c55e;
  --radius:     12px;
  --sidebar-w:  260px;
  --topbar-h:   70px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 3D Shadows */
  --shadow-sm:  0 2px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
  --shadow-md:  0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  --shadow-3d:  0 8px 20px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04), inset 0 2px 0 rgba(255,255,255,0.7);
  --shadow-inner: inset 0 2px 4px rgba(0,0,0,0.06);
}

[data-theme="dark"] {
  --bg:         #0f172a;
  --bg2:        #1e293b;
  --bg3:        #334155;
  --border:     #475569;
  --gold:       #fbbf24;
  --gold-light: #fcd34d;
  --gold-dim:   rgba(251, 191, 36, 0.15);
  --text:       #f8fafc;
  --text-muted: #94a3b8;
  --text-dim:   #64748b;
  --shadow-sm:  0 2px 4px rgba(0,0,0,0.2);
  --shadow-md:  0 4px 6px rgba(0,0,0,0.3);
  --shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.4);
  --shadow-3d:  0 8px 20px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.05);
}

/* ── Reset ─────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  transition: background var(--transition), color var(--transition);
}

/* ── Utility ───────────────────────────────── */
.hidden { display: none !important; }
.gold { color: var(--gold); }

/* ── App Layout ────────────────────────────── */
.app {
  display: grid;
  grid-template-columns: var(--sidebar-w) 1fr;
  grid-template-rows: var(--topbar-h) 1fr;
  min-height: 100vh;
}

/* ── Sidebar ───────────────────────────────── */
.sidebar {
  grid-row: 1 / -1;
  background: var(--bg2);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: transform var(--transition), background var(--transition);
  z-index: 200;
  box-shadow: var(--shadow-md);
}

.sidebar-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: .15em;
  color: var(--gold);
  padding: 0 1.5rem 1.8rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.2rem;
  text-align: center;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .4rem;
  padding: 0 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: .8rem;
  padding: .75rem 1rem;
  border-radius: var(--radius);
  font-size: .88rem;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition);
  text-decoration: none;
}

.nav-item:hover {
  background: var(--bg3);
  color: var(--text);
  transform: translateX(4px);
}

.nav-item.active {
  background: var(--gold);
  color: #fff;
  box-shadow: var(--shadow-sm);
  transform: scale(1.02);
}

[data-theme="dark"] .nav-item.active { color: #000; }

.nav-item.parent-active {
  background: var(--gold-dim);
  color: var(--gold);
}

.nav-icon {
  font-size: 1rem;
}

.nav-group { display: flex; flex-direction: column; }
.has-submenu { justify-content: space-between; }
.submenu-chevron { font-size: 0.8rem; transition: transform var(--transition); }
.nav-group.expanded .submenu-chevron { transform: rotate(90deg); }
.submenu { display: none; flex-direction: column; padding-left: 1.8rem; padding-top: 0.4rem; gap: 0.2rem; }
.nav-group.expanded .submenu { display: flex; }
.sub-item { padding: 0.5rem 0.8rem; font-size: 0.82rem; font-weight: 400; }
.sub-item:hover { transform: translateX(2px); }

.sidebar-footer {
  padding: 1.2rem 1.5rem 0;
  border-top: 1px solid var(--border);
  margin-top: auto;
}

.sidebar-user {
  font-size: .85rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: .8rem;
  text-align: center;
}

.btn-logout {
  background: var(--bg3);
  border: 1px solid var(--border);
  color: var(--text);
  padding: .6rem 1rem;
  border-radius: var(--radius);
  font-size: .8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  width: 100%;
}
.btn-logout:hover {
  border-color: var(--danger);
  color: var(--danger);
  background: rgba(239, 68, 68, 0.1);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* ── Topbar ────────────────────────────────── */
.topbar {
  grid-column: 2;
  height: var(--topbar-h);
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}

.hamburger {
  display: none;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.5rem;
  cursor: pointer;
}

.topbar-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.topbar-time {
  font-size: .9rem;
  font-weight: 500;
  color: var(--text-muted);
  background: var(--bg3);
  padding: 0.4rem 1rem;
  border-radius: 20px;
}

/* Theme Toggle */
.theme-toggle-placeholder { width: 50px; height: 26px; }
.theme-toggle {
  background: none; border: none; cursor: pointer; padding: 0;
}
.toggle-track {
  width: 54px; height: 28px; border-radius: 30px;
  background: var(--border);
  position: relative;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5px;
  transition: background var(--transition);
  box-shadow: var(--shadow-inner);
}
.toggle-track.dark { background: #334155; }
.toggle-icon { font-size: 0.8rem; z-index: 1; }
.toggle-thumb {
  position: absolute; top: 2px; left: 2px;
  width: 24px; height: 24px; border-radius: 50%;
  background: #fff;
  transition: transform var(--transition);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 2;
}
.toggle-track.dark .toggle-thumb { transform: translateX(26px); background: #cbd5e1; }

/* ── Main Content ──────────────────────────── */
.main-content {
  grid-column: 2;
  padding: 2.5rem;
  overflow-y: auto;
}

.page { display: none; }
.page.active { display: block; animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

.page-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--text);
}
.page-heading em { color: var(--gold); font-style: italic; }

/* ── UI Components ─────────────────────────── */
.btn-primary {
  background: linear-gradient(135deg, var(--gold), var(--gold-light));
  color: #fff;
  border: none;
  padding: 0.8rem 1.8rem;
  border-radius: var(--radius);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all var(--transition);
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
[data-theme="dark"] .btn-primary { color: #000; text-shadow: none; }
.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--shadow-lg);
}
.btn-primary:active { transform: translateY(0); box-shadow: var(--shadow-sm); }
.btn-primary.small { padding: 0.5rem 1rem; font-size: 0.8rem; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

/* Cards & 3D Elements */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.8rem;
  box-shadow: var(--shadow-3d);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}
.stat-card::before {
  content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--gold);
}
.stat-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
}
[data-theme="dark"] .stat-card:hover { box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }

.stat-label {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.8rem;
  letter-spacing: 0.05em;
}

.stat-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}

.dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.8rem; }

.dash-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.8rem;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition), box-shadow var(--transition);
}
.dash-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }

.dash-card-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--border);
}

.mini-list { display: flex; flex-direction: column; gap: 0.8rem; }
.mini-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.8rem 1rem; border-radius: 8px; background: var(--bg3);
  font-size: 0.9rem; font-weight: 500;
  transition: transform 0.2s ease;
}
.mini-row:hover { transform: scale(1.01); background: var(--border); }
.mini-row .name { color: var(--text); }
.mini-row .meta { color: var(--text-muted); }

/* ── Tables ────────────────────────────────── */
.table-wrap {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.data-table th {
  padding: 1.2rem;
  text-align: left;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--bg3);
  border-bottom: 2px solid var(--border);
}

.data-table td {
  padding: 1rem 1.2rem;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  vertical-align: middle;
}

.data-table tbody tr { transition: background var(--transition); }
.data-table tbody tr:hover { background: var(--bg3); }
.data-table tr:last-child td { border-bottom: none; }

.loading-row { text-align: center; color: var(--text-muted); padding: 3rem !important; }

/* Badges */
.badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.badge-pending  { background: #fef3c7; color: #d97706; }
.badge-confirmed{ background: #dcfce7; color: #166534; }
.badge-cancelled{ background: #fee2e2; color: #991b1b; }
.badge-preparing{ background: #e0e7ff; color: #3730a3; }
.badge-served   { background: #dcfce7; color: #166534; }
.badge-available{ background: #dcfce7; color: #166534; }
.badge-occupied { background: #fef3c7; color: #d97706; }
.badge-reserved { background: #e0e7ff; color: #3730a3; }
.badge-maintenance{ background: #fee2e2; color: #991b1b; }

[data-theme="dark"] .badge-pending { background: rgba(217, 119, 6, 0.2); color: #fbbf24; }
[data-theme="dark"] .badge-confirmed { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
[data-theme="dark"] .badge-cancelled { background: rgba(239, 68, 68, 0.2); color: #f87171; }
[data-theme="dark"] .badge-preparing { background: rgba(99, 102, 241, 0.2); color: #818cf8; }
[data-theme="dark"] .badge-served { background: rgba(34, 197, 94, 0.2); color: #4ade80; }

.btn-action {
  background: var(--bg2); border: 1px solid var(--border);
  color: var(--text-muted); padding: 0.4rem 0.8rem;
  border-radius: 6px; font-size: 0.8rem; font-weight: 500;
  cursor: pointer; transition: all 0.2s; margin-right: 0.5rem;
  box-shadow: var(--shadow-sm);
}
.btn-action:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn-action.danger:hover { border-color: var(--danger); color: var(--danger); }

/* ── Modals ────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px); z-index: 500;
  display: flex; align-items: center; justify-content: center; padding: 1rem;
}
.modal {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 2.5rem;
  width: min(500px, 100%); max-height: 90vh; overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  animation: modalIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.modal-header h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 600; color: var(--text); }
.modal-header button { background: none; border: none; font-size: 1.2rem; color: var(--text-muted); cursor: pointer; transition: color var(--transition); }
.modal-header button:hover { color: var(--danger); transform: scale(1.1); }

/* Forms */
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text); margin-bottom: 0.5rem; }
.form-group input, .form-group textarea, .form-group select {
  width: 100%; padding: 0.8rem 1rem;
  background: var(--bg3); border: 1px solid var(--border);
  border-radius: 8px; color: var(--text); font-family: 'Inter', sans-serif;
  font-size: 0.95rem; transition: all var(--transition);
  box-shadow: var(--shadow-inner);
}
.form-group input:focus, .form-group textarea:focus, .form-group select:focus {
  outline: none; border-color: var(--gold); background: var(--bg2);
  box-shadow: 0 0 0 4px var(--gold-dim);
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

/* ── POS Cashier ───────────────────────────── */
.pos-layout { display: grid; grid-template-columns: 1fr 380px; gap: 2rem; min-height: calc(100vh - var(--topbar-h) - 8rem); }
.pos-menu-pane { display: flex; flex-direction: column; gap: 1.5rem; }
.pos-category-bar { display: flex; gap: 0.8rem; flex-wrap: wrap; }
.pos-cat-btn {
  background: var(--bg2); border: 1px solid var(--border); color: var(--text-muted);
  padding: 0.6rem 1.2rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600;
  cursor: pointer; transition: all var(--transition); box-shadow: var(--shadow-sm);
}
.pos-cat-btn:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); box-shadow: var(--shadow-md); }
.pos-cat-btn.active { background: var(--gold); border-color: var(--gold); color: #fff; }
[data-theme="dark"] .pos-cat-btn.active { color: #000; }

.pos-items-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1.2rem;
  overflow-y: auto; max-height: calc(100vh - var(--topbar-h) - 14rem); padding-bottom: 1rem;
}
.pos-item-card {
  background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 1.5rem 1rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-align: center; box-shadow: var(--shadow-md); display: flex; flex-direction: column; gap: 0.8rem;
}
.pos-item-card:hover { border-color: var(--gold); transform: translateY(-5px) scale(1.03); box-shadow: var(--shadow-3d); }
.pos-item-name { font-size: 0.95rem; font-weight: 600; color: var(--text); }
.pos-item-price { font-family: 'DM Sans', sans-serif; font-size: 1.3rem; font-weight: 700; color: var(--gold); }

.pos-ticket-pane {
  background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius);
  display: flex; flex-direction: column; height: fit-content; position: sticky; top: calc(var(--topbar-h) + 2rem);
  box-shadow: var(--shadow-lg); overflow: hidden;
}
.pos-ticket-header { padding: 1.5rem; border-bottom: 1px solid var(--border); background: var(--bg3); display: flex; justify-content: space-between; align-items: center; }
.pos-ticket-header h3 { font-family: 'Inter', sans-serif; font-size: 1.2rem; font-weight: 600; }
.pos-ticket-items { flex: 1; padding: 1rem; display: flex; flex-direction: column; gap: 0.8rem; max-height: 400px; overflow-y: auto; }
.pos-ticket-row {
  display: flex; align-items: center; justify-content: space-between; padding: 0.8rem;
  border-radius: 8px; background: var(--bg); border: 1px solid var(--border); font-size: 0.9rem; font-weight: 500;
}
.qty-control { display: flex; align-items: center; gap: 0.5rem; background: var(--bg2); border-radius: 6px; padding: 0.2rem; border: 1px solid var(--border); }
.qty-btn { background: var(--bg3); border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold; color: var(--text); transition: background 0.2s; }
.qty-btn:hover { background: var(--gold-dim); color: var(--gold); }
.qty-display { min-width: 24px; text-align: center; }
.pos-ticket-line-total { font-weight: 700; }

.pos-ticket-footer { padding: 1.5rem; border-top: 1px solid var(--border); background: var(--bg3); }
.pos-ticket-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-size: 1rem; font-weight: 600; color: var(--text-muted); }
.pos-ticket-total strong { font-size: 2rem; color: var(--text); font-weight: 700; }

/* ── Kitchen Board ─────────────────────────── */
.kitchen-board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.kitchen-column { background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.2rem; min-height: 400px; box-shadow: var(--shadow-inner); }
.kitchen-col-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 2px solid var(--border); display: flex; align-items: center; gap: 0.8rem; }
.kitchen-count { background: var(--bg2); color: var(--text); padding: 0.2rem 0.8rem; border-radius: 20px; font-size: 0.8rem; box-shadow: var(--shadow-sm); }
.kitchen-card {
  background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 1.2rem;
  margin-bottom: 1rem; transition: transform var(--transition), box-shadow var(--transition);
  box-shadow: var(--shadow-md); position: relative; overflow: hidden;
}
.kitchen-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: var(--shadow-lg); }
.kitchen-card.kitchen-pending::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--danger); }
.kitchen-card.kitchen-preparing::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--gold); }
.kitchen-card.kitchen-served::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--success); }
.kitchen-table { font-weight: 700; font-size: 1rem; }
.kitchen-items { list-style: none; padding: 1rem 0; margin: 0; border-top: 1px dashed var(--border); border-bottom: 1px dashed var(--border); margin: 0.8rem 0; }
.kitchen-items li { font-size: 0.9rem; padding: 0.3rem 0; font-weight: 500; }
.kitchen-card-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 0.5rem; }

/* ── Tables Grid ───────────────────────────── */
.table-status-legend { display: flex; gap: 1.5rem; margin-bottom: 2rem; background: var(--bg2); padding: 1rem 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow-sm); display: inline-flex; border: 1px solid var(--border); }
.legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 500; }
.legend-dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2); }
.tables-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; }
.table-tile {
  background: var(--bg2); border: 2px solid var(--border); border-radius: var(--radius);
  padding: 2rem 1.5rem; text-align: center; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex; flex-direction: column; align-items: center; gap: 0.8rem;
  box-shadow: var(--shadow-md); position: relative; overflow: hidden;
}
.table-tile::after {
  content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: currentColor; opacity: 0.8;
}
.table-tile:hover { transform: translateY(-6px); box-shadow: var(--shadow-3d); }
.table-tile-number { font-family: 'DM Sans', sans-serif; font-size: 2.5rem; font-weight: 700; color: var(--text); line-height: 1; }
.table-tile-seats { font-size: 0.85rem; font-weight: 600; color: var(--text-muted); }

/* Responsive */
@media (max-width: 1024px) {
  .dash-grid { grid-template-columns: 1fr; }
  .pos-layout { grid-template-columns: 1fr; }
  .kitchen-board { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .app { grid-template-columns: 1fr; }
  .sidebar { position: fixed; left: 0; transform: translateX(-100%); z-index: 1000; }
  .sidebar.open { transform: translateX(0); }
  .topbar { grid-column: 1; }
  .main-content { grid-column: 1; padding: 1.5rem; }
  .hamburger { display: block; }
  .form-row { grid-template-columns: 1fr; }
}
`;

fs.writeFileSync('app/admin.css', css);
