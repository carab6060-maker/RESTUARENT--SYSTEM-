const fs = require('fs');

const pageContent = `
"use client";
import React, { useEffect, useState, useRef } from 'react';
import './public.css';
import Link from 'next/link';

export default function Home() {
  const [resMsg, setResMsg] = useState(null);
  const [resMsgStyle, setResMsgStyle] = useState({ display: 'none' });
  const headerRef = useRef(null);

  // Cart & Auth State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load state
    const savedUser = localStorage.getItem('saveur_public_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 60) headerRef.current.classList.add('scrolled');
        else headerRef.current.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.burger-card, .choose-card, .event-item, .stat').forEach(el => {
      el.classList.add('fade-up');
      observer.observe(el);
    });
  }, []);

  const toggleMobileNav = () => {
    document.querySelector('.nav-links')?.classList.toggle('open');
    document.getElementById('hamburger')?.classList.toggle('active');
  };

  const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  // --- Reservation Logic ---
  const submitReservation = (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value.trim();
    const email = document.getElementById('res-email').value.trim();
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const notes = document.getElementById('res-notes').value.trim();

    if (!name || !email || !date || !time) {
      setResMsg('Please fill in all required fields.');
      setResMsgStyle({ color: '#fff', backgroundColor: '#ef4444', display: 'block', padding: '10px', borderRadius: '8px', marginTop: '15px' });
      return;
    }

    try {
      let reservations = JSON.parse(localStorage.getItem('saveur_reservations') || '[]');
      reservations.unshift({
        id: genId(), name, date, time, guests: parseInt(guests),
        table: Math.floor(Math.random() * 20) + 1, notes, status: 'pending', createdAt: new Date().toISOString()
      });
      localStorage.setItem('saveur_reservations', JSON.stringify(reservations));
      
      setResMsg('Reservation confirmed! See you soon.');
      setResMsgStyle({ color: '#fff', backgroundColor: '#10b981', display: 'block', padding: '10px', borderRadius: '8px', marginTop: '15px' });

      if (!currentUser) {
        document.getElementById('res-name').value = '';
        document.getElementById('res-email').value = '';
      }
      document.getElementById('res-date').value = '';
      document.getElementById('res-time').value = '';
      document.getElementById('res-notes').value = '';

      setTimeout(() => { setResMsgStyle({ display: 'none' }); }, 5000);
    } catch (e) {
      console.error(e);
    }
  };

  // --- Cart & Checkout Logic ---
  const addToCart = (itemName, price) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === itemName);
      if (existing) {
        return prev.map(item => item.name === itemName ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: genId(), name: itemName, price, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    try {
      let orders = JSON.parse(localStorage.getItem('saveur_orders') || '[]');
      const newOrder = {
        id: genId(),
        table: 0, // 0 indicates web order
        customerName: currentUser ? currentUser.name : 'Web Guest',
        items: cart.map(i => ({ name: i.name, price: i.price, qty: i.qty })),
        total: cartTotal,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      orders.unshift(newOrder);
      localStorage.setItem('saveur_orders', JSON.stringify(orders));

      setCart([]);
      setIsCartOpen(false);
      alert('Order placed successfully! The kitchen has received your order.');
    } catch (e) {
      console.error(e);
      alert('Failed to place order.');
    }
  };

  // --- Auth Logic ---
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('auth-name')?.value;
    const email = document.getElementById('auth-email').value;
    
    const user = { name: name || email.split('@')[0], email };
    setCurrentUser(user);
    localStorage.setItem('saveur_public_user', JSON.stringify(user));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('saveur_public_user');
  };

  return (
    <>
      <header className="header" id="header" ref={headerRef}>
        <div className="header-top">
          <div className="contact-strip">
            <span><i className="fas fa-phone"></i> +1 (555) 823-4400</span>
            <span><i className="fas fa-clock"></i> Mon–Sun: 11AM – 11PM</span>
          </div>
        </div>
        <nav className="navbar">
          <div className="logo">
            <span className="logo-icon">🔥</span>
            <span className="logo-text">Burger<span>Craft</span></span>
          </div>
          <ul className="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#featured">Menu</a></li>
            <li><a href="#choose">Specials</a></li>
            <li><a href="#reservation">Reserve</a></li>
          </ul>
          <div className="nav-actions">
            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
              🛒 <span className="cart-count">{cart.reduce((s, i) => s + i.qty, 0)}</span>
            </button>
            {currentUser ? (
              <button className="auth-btn" onClick={handleLogout}>👋 {currentUser.name}</button>
            ) : (
              <button className="auth-btn" onClick={() => setIsAuthOpen(true)}>Sign In</button>
            )}
            <button className="hamburger" id="hamburger" aria-label="Menu" onClick={toggleMobileNav}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">🏆 Award-Winning Since 2012</p>
          <h1 className="hero-title">Burger<br/><span>Week</span><br/>Is Here.</h1>
          <p className="hero-sub">Hand-pressed smash patties, premium toppings, and sauces crafted from scratch. Come hungry, leave legendary.</p>
          <div className="hero-actions">
            <a href="#featured" className="btn btn-primary">Explore Menu</a>
            <a href="#reservation" className="btn btn-outline">Reserve a Seat</a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=85&auto=format"
            alt="Signature Smash Burger"
            className="hero-burger-img"
          />
        </div>
      </section>

      {/* Featured Menu */}
      <section className="featured" id="featured">
        <div className="section-header fade-up">
          <p className="section-eyebrow">Our Bestsellers</p>
          <h2 className="section-title">Popular <span>Burgers</span></h2>
        </div>
        <div className="cards-grid">
          {[
            { name: 'Classic Smash', price: 10.99, img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80&auto=format', badge: '🔥 Hot Pick', badgeClass: 'hot' },
            { name: 'Inferno Burger', price: 12.99, img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80&auto=format', badge: '✨ New', badgeClass: 'new' },
            { name: 'Truffle Melt', price: 15.99, img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80&auto=format', badge: '⭐ Fan Fave', badgeClass: '' },
            { name: 'Bacon King', price: 13.99, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80&auto=format', badge: '', badgeClass: '' }
          ].map(item => (
            <div key={item.name} className="burger-card fade-up">
              <div className="card-img-wrap">
                {item.badge && <span className={\`card-badge \${item.badgeClass}\`}>{item.badge}</span>}
                <img src={item.img} alt={item.name} />
              </div>
              <div className="card-body">
                <h3>{item.name}</h3>
                <p>House ground beef, toasted brioche bun, signature sauce.</p>
                <div className="card-footer">
                  <span className="price">\${item.price}</span>
                  <button className="btn-add" onClick={() => addToCart(item.name, item.price)}>＋</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Combos */}
      <section className="featured" id="choose">
        <div className="section-header fade-up">
          <p className="section-eyebrow">Pick Your Flavor</p>
          <h2 className="section-title">Choose <span>&amp; Enjoy</span></h2>
        </div>
        <div className="cards-grid">
          {[
            { name: 'Solo Combo', price: 14.99, img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80&auto=format' },
            { name: 'Duo Feast', price: 26.99, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80&auto=format' },
            { name: 'Party Pack', price: 64.99, img: 'https://images.unsplash.com/photo-1585325701165-30a2dc63bb73?w=400&q=80&auto=format' }
          ].map(item => (
            <div key={item.name} className="burger-card fade-up">
              <div className="card-img-wrap"><img src={item.img} alt={item.name} /></div>
              <div className="card-body" style={{ textAlign: 'center' }}>
                <h3>{item.name}</h3>
                <p className="price" style={{ margin: '1rem 0' }}>\${item.price}</p>
                <button className="btn btn-outline full-w" onClick={() => addToCart(item.name, item.price)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation */}
      <section className="featured" id="reservation">
        <div className="section-header fade-up">
          <p className="section-eyebrow">Reserve Your Spot</p>
          <h2 className="section-title">Book <span>Your Table</span></h2>
        </div>
        <div className="modal-box" style={{ margin: '0 auto', transform: 'none', position: 'relative' }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" id="res-name" defaultValue={currentUser?.name || ''} placeholder="John Smith" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" id="res-email" defaultValue={currentUser?.email || ''} placeholder="john@example.com" />
          </div>
          <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}><label>Date</label><input type="date" id="res-date" /></div>
            <div style={{ flex: 1 }}><label>Time</label><input type="time" id="res-time" /></div>
          </div>
          <div className="form-group">
            <label>Guests</label>
            <input type="number" id="res-guests" defaultValue="2" min="1" max="20" />
          </div>
          <div className="form-group">
            <label>Special Requests</label>
            <input type="text" id="res-notes" placeholder="Allergies, preferences..." />
          </div>
          <button onClick={submitReservation} className="btn btn-primary full-w">Confirm Reservation</button>
          <div style={resMsgStyle}>{resMsg}</div>
        </div>
      </section>

      {/* Cart Drawer Overlay */}
      <div className={\`cart-overlay \${isCartOpen ? 'open' : ''}\`} onClick={(e) => { if (e.target.className.includes('cart-overlay')) setIsCartOpen(false); }}>
        <div className="cart-drawer">
          <div className="cart-header">
            <h2>Your Order</h2>
            <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>Your cart is empty.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">\${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>\${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary full-w" onClick={handleCheckout} disabled={cart.length === 0}>
              Checkout &amp; Send to Kitchen
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <div className={\`modal-overlay \${isAuthOpen ? 'open' : ''}\`} onClick={(e) => { if (e.target.className.includes('modal-overlay')) setIsAuthOpen(false); }}>
        <div className="modal-box">
          <div className="modal-header">
            <h2>{authTab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <button className="close-cart" onClick={() => setIsAuthOpen(false)}>✕</button>
          </div>
          <div className="modal-tabs">
            <div className={\`modal-tab \${authTab === 'login' ? 'active' : ''}\`} onClick={() => setAuthTab('login')}>Sign In</div>
            <div className={\`modal-tab \${authTab === 'register' ? 'active' : ''}\`} onClick={() => setAuthTab('register')}>Sign Up</div>
          </div>
          <form onSubmit={handleAuthSubmit}>
            {authTab === 'register' && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" id="auth-name" placeholder="John Doe" required />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" id="auth-email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary full-w" style={{ marginTop: '1rem' }}>
              {authTab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
\`;

fs.writeFileSync('app/page.js', pageContent);
console.log('Page logic updated successfully');
