const fs = require('fs');
let html = fs.readFileSync('c:/Users/carab/OneDrive/New Folder/resturent-system/index.html', 'utf8');

let jsx = html.substring(html.indexOf('<body>') + 6, html.indexOf('<script>'));

jsx = jsx.replace(/class=/g, 'className=');
jsx = jsx.replace(/for=/g, 'htmlFor=');
jsx = jsx.replace(/<!--.*?-->/g, '');
jsx = jsx.replace(/<img(.*?)>/g, (match) => {
  if (match.endsWith('/>')) return match;
  return match.replace(/>$/, ' />');
});
jsx = jsx.replace(/<input(.*?)>/g, (match) => {
  if (match.endsWith('/>')) return match;
  return match.replace(/>$/, ' />');
});
jsx = jsx.replace(/<br>/g, '<br />');

jsx = jsx.replace(/style="(.*?)"/g, (match, p1) => {
  let styleObj = {};
  p1.split(';').forEach(s => {
    let parts = s.split(':');
    if(parts.length === 2) {
      let key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      styleObj[key] = parts[1].trim();
    }
  });
  return 'style={' + JSON.stringify(styleObj) + '}';
});

jsx = jsx.replace(/onclick="placeOrder\('(.*?)', (.*?)\)"/g, 'onClick={() => placeOrder(\'$1\', $2)}');
jsx = jsx.replace(/<textarea(.*?)><\/textarea>/g, '<textarea$1 />');
jsx = jsx.replace('id="submit-res-btn"', 'id="submit-res-btn" onClick={submitReservation}');

// Also replace the admin.html link
jsx = jsx.replace(/href="admin\.html"/g, 'href="/admin"');

// Extract everything after the header
let afterHeader = jsx.split('<header className="header" id="header">')[1];
let bodyContent = afterHeader ? '<section className="hero" id="hero">' + afterHeader.split('<section className="hero" id="hero">')[1] : '';

const componentCode = `"use client";
import React, { useEffect, useState, useRef } from 'react';
import './public.css';
import Link from 'next/link';

export default function Home() {
  const [resMsg, setResMsg] = useState(null);
  const [resMsgStyle, setResMsgStyle] = useState({ display: 'none' });
  const headerRef = useRef(null);

  useEffect(() => {
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
    document.querySelector('.nav-links').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('active');
  };

  const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const submitReservation = (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value.trim();
    const email = document.getElementById('res-email').value.trim();
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const notes = document.getElementById('res-notes').value.trim();

    if (!name || !email || !date || !time) {
      setResMsg('Please fill in all required fields (Name, Email, Date, Time).');
      setResMsgStyle({ color: '#fff', backgroundColor: '#d32f2f', display: 'block', padding: '10px', borderRadius: '4px', marginTop: '15px' });
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
      setResMsgStyle({ color: '#155724', backgroundColor: '#d4edda', display: 'block', padding: '10px', borderRadius: '4px', marginTop: '15px' });

      document.getElementById('res-name').value = '';
      document.getElementById('res-email').value = '';
      document.getElementById('res-date').value = '';
      document.getElementById('res-time').value = '';
      document.getElementById('res-notes').value = '';

      setTimeout(() => { setResMsgStyle({ display: 'none' }); }, 5000);
    } catch (e) {
      console.error(e);
    }
  };

  const placeOrder = (itemName, price) => {
    try {
      let orders = JSON.parse(localStorage.getItem('saveur_orders') || '[]');
      orders.unshift({
        id: genId(), table: 0, items: [{ name: itemName, price, qty: 1 }],
        total: price, status: 'pending', createdAt: new Date().toISOString()
      });
      localStorage.setItem('saveur_orders', JSON.stringify(orders));

      setResMsg('Successfully ordered ' + itemName + '! Your food will be ready soon.');
      setResMsgStyle({ color: '#155724', backgroundColor: '#d4edda', display: 'block', padding: '10px', borderRadius: '4px', marginTop: '15px' });
      setTimeout(() => { setResMsgStyle({ display: 'none' }); }, 5000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <header className="header" id="header" ref={headerRef}>
        <div className="header-top">
          <div className="contact-strip">
            <span><i className="fas fa-phone"></i> +1 (555) 823-4400</span>
            <span><i className="fas fa-clock"></i> Mon–Sun: 11AM – 11PM</span>
            <span><i className="fas fa-map-marker-alt"></i> 24 Flame Street, Grill City</span>
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
            <li><a href="#events">Events</a></li>
            <li><a href="#reservation">Reserve</a></li>
          </ul>
          <a href="#reservation" className="nav-cta">Book a Table</a>
          <button className="hamburger" id="hamburger" aria-label="Menu" onClick={toggleMobileNav}>
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      ${bodyContent}
    </>
  );
}
`;

fs.writeFileSync('c:/Users/carab/OneDrive/New Folder/restaurant-nextjs/app/page.js', componentCode);
console.log('Fixed page.js!');
