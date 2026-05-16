const fs = require('fs');

const css = `
/* ═══════════════════════════════════════════════
   BURGERCRAFT — Dynamic Public Website
   Aesthetic: Dark Premium, Glassmorphism, 3D
═══════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  --bg-color: #050505;
  --bg-gradient: linear-gradient(135deg, #0f0f13 0%, #050505 100%);
  --surface: rgba(25, 25, 30, 0.6);
  --surface-hover: rgba(35, 35, 45, 0.8);
  --glass: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --primary: #f59e0b;
  --primary-glow: rgba(245, 158, 11, 0.4);
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --danger: #ef4444;
  --success: #10b981;
  --radius: 16px;
  --transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --shadow-3d: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-family: 'Outfit', sans-serif; background: var(--bg-color); color: var(--text); overflow-x: hidden; }
body { min-height: 100vh; background: var(--bg-gradient); overflow-x: hidden; }

h1, h2, h3, .logo-text { font-family: 'Cormorant Garamond', serif; }

/* ── Typography & Globals ── */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.8rem 2rem; border-radius: 30px; font-weight: 600; font-size: 1rem;
  cursor: pointer; transition: all var(--transition); text-decoration: none; border: none;
}
.btn-primary { background: var(--primary); color: #000; box-shadow: 0 4px 15px var(--primary-glow); }
.btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 25px var(--primary-glow); }
.btn-outline { background: transparent; border: 1px solid var(--text); color: var(--text); }
.btn-outline:hover { background: var(--text); color: #000; transform: translateY(-3px); }

/* ── Header & Nav ── */
.header { position: fixed; top: 0; width: 100%; z-index: 1000; transition: all var(--transition); }
.header.scrolled { background: rgba(5, 5, 5, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid var(--glass-border); padding: 0.5rem 0; }
.header-top { background: var(--primary); color: #000; font-size: 0.8rem; font-weight: 600; padding: 0.4rem 0; text-align: center; }
.contact-strip { display: flex; justify-content: center; gap: 2rem; }
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 5%; max-width: 1400px; margin: 0 auto; }
.header.scrolled .header-top { display: none; }
.header.scrolled .navbar { padding: 0.8rem 5%; }

.logo { display: flex; align-items: center; gap: 0.5rem; font-size: 1.8rem; font-weight: 700; color: var(--text); }
.logo span { color: var(--primary); }
.nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
.nav-links a { color: var(--text); text-decoration: none; font-size: 0.95rem; font-weight: 500; transition: color var(--transition); position: relative; }
.nav-links a::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0%; height: 2px; background: var(--primary); transition: width var(--transition); }
.nav-links a:hover::after { width: 100%; }

.nav-actions { display: flex; gap: 1rem; align-items: center; }
.cart-btn, .auth-btn { background: var(--surface); border: 1px solid var(--glass-border); color: var(--text); padding: 0.6rem 1.2rem; border-radius: 20px; cursor: pointer; transition: all var(--transition); font-family: 'Outfit', sans-serif; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; }
.cart-btn:hover, .auth-btn:hover { background: var(--surface-hover); transform: translateY(-2px); border-color: var(--primary); }
.cart-count { background: var(--primary); color: #000; font-size: 0.75rem; font-weight: 700; padding: 2px 6px; border-radius: 10px; }

/* ── Hero Section ── */
.hero { position: relative; min-height: 100vh; display: flex; align-items: center; padding: 0 5%; max-width: 1400px; margin: 0 auto; overflow: hidden; }
.hero-bg-shapes { position: absolute; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
.shape { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.4; }
.shape-1 { width: 400px; height: 400px; background: var(--primary); top: 10%; right: 10%; animation: float 10s infinite ease-in-out; }
.shape-2 { width: 500px; height: 500px; background: #6366f1; bottom: 10%; left: -10%; animation: float 12s infinite ease-in-out reverse; }
@keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-40px) scale(1.1); } }

.hero-content { flex: 1; z-index: 1; padding-top: 4rem; }
.hero-eyebrow { color: var(--primary); font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1rem; display: inline-block; padding: 0.4rem 1rem; border: 1px solid var(--primary); border-radius: 20px; background: rgba(245,158,11,0.1); }
.hero-title { font-size: clamp(3.5rem, 8vw, 6rem); line-height: 1; margin-bottom: 1.5rem; font-weight: 700; }
.hero-title span { color: var(--primary); text-shadow: 0 0 20px var(--primary-glow); }
.hero-sub { font-size: 1.2rem; color: var(--text-muted); max-width: 500px; margin-bottom: 2.5rem; line-height: 1.6; }
.hero-actions { display: flex; gap: 1rem; }

.hero-image-wrap { flex: 1; position: relative; z-index: 1; display: flex; justify-content: center; align-items: center; }
.hero-burger-img { width: 100%; max-width: 600px; border-radius: 30px; object-fit: cover; box-shadow: var(--shadow-3d); transform: perspective(1000px) rotateY(-15deg); transition: transform 0.6s ease-out; border: 1px solid var(--glass-border); }
.hero-burger-img:hover { transform: perspective(1000px) rotateY(-5deg) translateY(-10px); }

/* ── Menu Section (Glass Cards) ── */
.featured { padding: 8rem 5%; max-width: 1400px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 4rem; }
.section-eyebrow { color: var(--primary); font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
.section-title { font-size: 3.5rem; margin-top: 0.5rem; }
.section-title span { color: var(--primary); font-style: italic; }

.cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem; }
.burger-card { background: var(--surface); border: 1px solid var(--glass-border); border-radius: var(--radius); overflow: hidden; backdrop-filter: blur(10px); transition: all var(--transition); box-shadow: 0 10px 30px rgba(0,0,0,0.2); display: flex; flex-direction: column; }
.burger-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-3d); border-color: var(--primary); }
.card-img-wrap { position: relative; height: 220px; overflow: hidden; }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.burger-card:hover .card-img-wrap img { transform: scale(1.1); }
.card-badge { position: absolute; top: 1rem; left: 1rem; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: #fff; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; z-index: 2; border: 1px solid var(--glass-border); }
.card-badge.hot { color: var(--primary); }

.card-body { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; }
.card-body h3 { font-size: 1.5rem; margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif; font-weight: 600; }
.card-body p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5rem; flex: 1; }
.card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--glass-border); padding-top: 1.5rem; }
.price { font-size: 1.4rem; font-weight: 700; color: var(--primary); }
.btn-add { background: var(--surface-hover); border: 1px solid var(--glass-border); color: var(--text); width: 45px; height: 45px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; }
.btn-add:hover { background: var(--primary); color: #000; transform: rotate(90deg); box-shadow: 0 0 15px var(--primary-glow); }

/* ── Cart Drawer Overlay ── */
.cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 2000; opacity: 0; pointer-events: none; transition: opacity var(--transition); }
.cart-overlay.open { opacity: 1; pointer-events: all; }
.cart-drawer { position: absolute; top: 0; right: -450px; width: 400px; max-width: 100%; height: 100vh; background: #0f0f13; border-left: 1px solid var(--glass-border); box-shadow: -10px 0 30px rgba(0,0,0,0.5); display: flex; flex-direction: column; transition: right var(--transition); }
.cart-overlay.open .cart-drawer { right: 0; }
.cart-header { padding: 1.5rem; border-bottom: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center; }
.cart-header h2 { font-size: 1.5rem; font-family: 'Outfit', sans-serif; }
.close-cart { background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; transition: color 0.2s; }
.close-cart:hover { color: var(--danger); }
.cart-items { flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.cart-item { display: flex; justify-content: space-between; align-items: center; background: var(--surface); padding: 1rem; border-radius: var(--radius); border: 1px solid var(--glass-border); }
.cart-item-info h4 { font-size: 1rem; margin-bottom: 0.3rem; }
.cart-item-price { color: var(--primary); font-weight: 600; }
.cart-item-qty { display: flex; align-items: center; gap: 0.5rem; }
.qty-btn { background: var(--surface-hover); border: none; color: #fff; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; }
.qty-btn:hover { background: var(--primary); color: #000; }
.cart-footer { padding: 1.5rem; border-top: 1px solid var(--glass-border); background: rgba(15, 15, 19, 0.95); }
.cart-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-size: 1.2rem; font-weight: 600; }
.cart-total span:last-child { color: var(--primary); font-size: 1.5rem; }

/* ── Auth / Common Modal ── */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 2000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity var(--transition); }
.modal-overlay.open { opacity: 1; pointer-events: all; }
.modal-box { background: #0f0f13; border: 1px solid var(--glass-border); border-radius: 24px; padding: 2.5rem; width: 400px; max-width: 90%; transform: translateY(20px); transition: transform var(--transition); box-shadow: var(--shadow-3d); }
.modal-overlay.open .modal-box { transform: translateY(0); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.modal-header h2 { font-size: 1.8rem; font-family: 'Outfit', sans-serif; }
.form-group { margin-bottom: 1.2rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-muted); }
.form-group input { width: 100%; padding: 0.8rem 1rem; background: var(--surface); border: 1px solid var(--glass-border); border-radius: 12px; color: #fff; font-family: 'Outfit', sans-serif; transition: all 0.3s; }
.form-group input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-glow); }
.modal-tabs { display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid var(--glass-border); }
.modal-tab { flex: 1; text-align: center; padding: 0.5rem; cursor: pointer; color: var(--text-muted); font-weight: 600; border-bottom: 2px solid transparent; transition: all 0.3s; }
.modal-tab.active { color: var(--primary); border-bottom-color: var(--primary); }

/* Utilities */
.fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
.fade-up.visible { opacity: 1; transform: translateY(0); }
.full-w { width: 100%; }

@media (max-width: 900px) {
  .hero { flex-direction: column; text-align: center; padding-top: 8rem; }
  .hero-actions { justify-content: center; }
  .nav-links { display: none; }
}
`;

fs.writeFileSync('app/public.css', css);
console.log('Public CSS updated successfully');
