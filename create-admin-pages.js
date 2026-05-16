const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'app', 'admin');

const pages = [
  { route: 'dashboard', title: 'Dashboard', type: 'dashboard' },
  { route: 'reservations', title: 'Reservations', type: 'reservations' },
  { route: 'menu', title: 'Menu Management', type: 'menu' },
  { route: 'orders', title: 'Food Orders', type: 'orders' },
  { route: 'pos/dashboard', title: 'POS Dashboard', type: 'placeholder' },
  { route: 'pos/menu-categories', title: 'Menu Categories', type: 'placeholder' },
  { route: 'pos/menu-locations', title: 'Menu Locations', type: 'placeholder' },
  { route: 'pos/customers', title: 'Customers', type: 'placeholder' },
  { route: 'pos/waiters', title: 'Waiters', type: 'placeholder' },
  { route: 'pos/bulk-payments', title: 'Bulk Payments', type: 'placeholder' },
  { route: 'pos/sessions', title: 'Sessions', type: 'placeholder' },
  { route: 'pos/cashier', title: 'Cashier', type: 'placeholder' },
  { route: 'pos/kitchen-orders', title: 'Kitchen Orders', type: 'placeholder' },
  { route: 'pos/tables', title: 'Tables', type: 'placeholder' },
  { route: 'ecommerce/delivery', title: 'Delivery Status', type: 'placeholder' },
  { route: 'ecommerce/menu', title: 'E-commerce Menu', type: 'placeholder' },
  { route: 'ecommerce/users', title: 'Users', type: 'placeholder' },
  { route: 'ecommerce/feedbacks', title: 'Feedbacks', type: 'placeholder' },
  { route: 'ecommerce/reports', title: 'E-commerce Reports', type: 'placeholder' },
  { route: 'inventory', title: 'Inventory Overview', type: 'placeholder' },
  { route: 'accounting', title: 'Accounting Overview', type: 'placeholder' },
  { route: 'assets', title: 'Fixed Assets Overview', type: 'placeholder' },
  { route: 'expenses', title: 'Expenses Overview', type: 'placeholder' },
  { route: 'financial', title: 'Financial Reports', type: 'placeholder' }
];

const esc = (str) => {
  if (!str) return "";
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
};

// Templates
const tplPlaceholder = (title) => `"use client";
import React from 'react';
export default function Page() {
  return (
    <div className="page active">
      <div className="page-header"><h1 className="page-heading">${title}</h1></div>
      <div className="loading-row">Coming Soon</div>
    </div>
  );
}`;

const tplDashboard = `"use client";
import React from 'react';
import { useAdmin } from '../AdminContext';

export default function Dashboard() {
  const { state } = useAdmin();
  const today = new Date().toISOString().slice(0, 10);
  const todayRes = state.reservations.filter(r => r.date === today);
  const activeOrders = state.orders.filter(o => o.status === 'pending' || o.status === 'preparing');
  const todayRevenue = state.orders.filter(o => o.status === 'served').reduce((s, o) => s + (+o.total || 0), 0);

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-heading">Overview <em>Today</em></h1>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Reservations Today</div>
          <div className="stat-value">{todayRes.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Orders</div>
          <div className="stat-value">{activeOrders.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Revenue Today</div>
          <div className="stat-value">\${todayRevenue.toFixed(0)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Menu Items</div>
          <div className="stat-value">{state.menu.length}</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <h3 className="dash-card-title">Recent Reservations</h3>
          <div className="mini-list">
            {state.reservations.slice(0, 5).length ? state.reservations.slice(0, 5).map(r => (
              <div key={r.id} className="mini-row">
                <span className="name">{r.name}</span>
                <span className="meta">{r.date} · Table {r.table} · <span className={\`badge badge-\${r.status}\`}>{r.status}</span></span>
              </div>
            )) : <p style={{color:'var(--text-dim)', fontSize:'.82rem'}}>No reservations</p>}
          </div>
        </div>
        <div className="dash-card">
          <h3 className="dash-card-title">Recent Orders</h3>
          <div className="mini-list">
            {state.orders.slice(0, 5).length ? state.orders.slice(0, 5).map(o => (
              <div key={o.id} className="mini-row">
                <span className="name">Table {o.table}</span>
                <span className="meta">\${(+o.total).toFixed(2)} · <span className={\`badge badge-\${o.status}\`}>{o.status}</span></span>
              </div>
            )) : <p style={{color:'var(--text-dim)', fontSize:'.82rem'}}>No orders</p>}
          </div>
        </div>
      </div>
    </div>
  );
}`;

const tplReservations = `"use client";
import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';

export default function Reservations() {
  const { state, updateState } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', time: '', guests: 2, table: 1, notes: '' });

  const updateStatus = (id, status) => {
    const updated = state.reservations.map(r => r.id === id ? { ...r, status } : r);
    updateState('reservations', updated);
  };

  const deleteRes = (id) => {
    if(!confirm('Delete this reservation?')) return;
    updateState('reservations', state.reservations.filter(r => r.id !== id));
  };

  const addRes = () => {
    if(!form.name || !form.date || !form.time) return alert('Fill required fields');
    const newRes = {
      id: Date.now().toString(), ...form, status: 'pending', createdAt: new Date().toISOString()
    };
    updateState('reservations', [newRes, ...state.reservations]);
    setModalOpen(false);
    setForm({ name: '', date: '', time: '', guests: 2, table: 1, notes: '' });
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-heading">Reservations</h1>
        <button className="btn-primary small" onClick={() => setModalOpen(true)}>+ New Reservation</button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr><th>Guest</th><th>Date</th><th>Time</th><th>Guests</th><th>Table</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {!state.reservations.length && <tr><td colSpan="7" className="loading-row">No reservations yet</td></tr>}
            {state.reservations.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td><td>{r.date}</td><td>{r.time}</td><td>{r.guests}</td><td>#{r.table}</td>
                <td><span className={\`badge badge-\${r.status}\`}>{r.status}</span></td>
                <td>
                  {r.status === 'pending' && <button className="btn-action" onClick={() => updateStatus(r.id, 'confirmed')}>Confirm</button>}
                  {r.status !== 'cancelled' && <button className="btn-action danger" onClick={() => updateStatus(r.id, 'cancelled')}>Cancel</button>}
                  <button className="btn-action danger" onClick={() => deleteRes(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={(e) => { if(e.target.className==='modal-overlay') setModalOpen(false); }}>
          <div className="modal">
            <div className="modal-header"><h3>New Reservation</h3><button onClick={() => setModalOpen(false)}>✕</button></div>
            <div className="form-group"><label>Guest Name</label><input type="text" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
            <div className="form-row">
              <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} /></div>
              <div className="form-group"><label>Time</label><input type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Guests</label><input type="number" value={form.guests} onChange={e=>setForm({...form, guests:e.target.value})} /></div>
              <div className="form-group"><label>Table #</label><input type="number" value={form.table} onChange={e=>setForm({...form, table:e.target.value})} /></div>
            </div>
            <div className="form-group"><label>Notes</label><textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})}></textarea></div>
            <button className="btn-primary" onClick={addRes}>Book Reservation</button>
          </div>
        </div>
      )}
    </div>
  );
}`;

const tplOrders = `"use client";
import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';

export default function Orders() {
  const { state, updateState } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [table, setTable] = useState(1);
  const [orderItems, setOrderItems] = useState({});

  const formatItems = (items) => items ? items.map(i => \`\${i.qty}× \${i.name}\`).join(', ') : '—';
  
  const updateStatus = (id, status) => {
    const updated = state.orders.map(o => o.id === id ? { ...o, status } : o);
    updateState('orders', updated);
  };

  const deleteOrder = (id) => {
    if(!confirm('Delete this order?')) return;
    updateState('orders', state.orders.filter(o => o.id !== id));
  };

  const changeQty = (id, delta) => {
    setOrderItems(prev => {
      const v = (prev[id] || 0) + delta;
      return { ...prev, [id]: Math.max(0, v) };
    });
  };

  const addOrder = () => {
    const selected = state.menu.filter(m => orderItems[m.id] > 0).map(m => ({ name: m.name, price: m.price, qty: orderItems[m.id] }));
    if(!selected.length) return alert('Select items');
    const total = selected.reduce((s, i) => s + i.price * i.qty, 0);
    const order = { id: Date.now().toString(), table: +table, items: selected, total: +total, status: 'pending', createdAt: new Date().toISOString() };
    updateState('orders', [order, ...state.orders]);
    setModalOpen(false);
    setOrderItems({});
  };

  const calculateTotal = () => {
    let t = 0;
    state.menu.forEach(m => { t += (+m.price) * (orderItems[m.id] || 0); });
    return t.toFixed(2);
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-heading">Food Orders</h1>
        <button className="btn-primary small" onClick={() => setModalOpen(true)}>+ New Order</button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr><th>Order #</th><th>Table</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {!state.orders.length && <tr><td colSpan="6" className="loading-row">No orders yet</td></tr>}
            {state.orders.map((o, i) => (
              <tr key={o.id}>
                <td>#{String(state.orders.length - i).padStart(3, '0')}</td>
                <td>Table {o.table}</td>
                <td>{formatItems(o.items)}</td>
                <td className="gold">\${(+o.total).toFixed(2)}</td>
                <td><span className={\`badge badge-\${o.status}\`}>{o.status}</span></td>
                <td>
                  {o.status === 'pending' && <button className="btn-action" onClick={() => updateStatus(o.id, 'preparing')}>Prepare</button>}
                  {o.status === 'preparing' && <button className="btn-action" onClick={() => updateStatus(o.id, 'served')}>Serve</button>}
                  <button className="btn-action danger" onClick={() => deleteOrder(o.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={(e) => { if(e.target.className==='modal-overlay') setModalOpen(false); }}>
          <div className="modal">
            <div className="modal-header"><h3>New Order</h3><button onClick={() => setModalOpen(false)}>✕</button></div>
            <div className="form-group"><label>Table #</label><input type="number" value={table} onChange={e=>setTable(e.target.value)} /></div>
            <div className="form-group">
              <label>Select Items</label>
              <div className="order-items-list">
                {!state.menu.length && <p>No menu items.</p>}
                {state.menu.map(item => (
                  <div key={item.id} className="order-item-row">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">\${(+item.price).toFixed(2)}</span>
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                      <span className="qty-display">{orderItems[item.id] || 0}</span>
                      <button className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-total-bar">Total: <strong>\${calculateTotal()}</strong></div>
            <button className="btn-primary" onClick={addOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
}`;

const tplMenu = `"use client";
import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';

export default function Menu() {
  const { state, updateState } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', desc: '', price: '', category: 'Starters' });

  const deleteItem = (id) => {
    if(!confirm('Remove item?')) return;
    updateState('menu', state.menu.filter(m => m.id !== id));
  };

  const addItem = () => {
    if(!form.name || !form.price) return alert('Name and price required');
    const item = { id: Date.now().toString(), ...form, createdAt: new Date().toISOString() };
    updateState('menu', [item, ...state.menu]);
    setModalOpen(false);
    setForm({ name: '', desc: '', price: '', category: 'Starters' });
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-heading">Menu</h1>
        <button className="btn-primary small" onClick={() => setModalOpen(true)}>+ Add Item</button>
      </div>
      <div className="menu-grid">
        {!state.menu.length && <div className="loading-row">No menu items yet</div>}
        {state.menu.map(m => (
          <div key={m.id} className="menu-card">
            <div className="menu-card-cat">{m.category}</div>
            <div className="menu-card-name">{m.name}</div>
            <div className="menu-card-desc">{m.desc}</div>
            <div className="menu-card-footer">
              <div className="menu-card-price">\${(+m.price).toFixed(2)}</div>
              <button className="btn-action danger" onClick={() => deleteItem(m.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={(e) => { if(e.target.className==='modal-overlay') setModalOpen(false); }}>
          <div className="modal">
            <div className="modal-header"><h3>Add Menu Item</h3><button onClick={() => setModalOpen(false)}>✕</button></div>
            <div className="form-group"><label>Item Name</label><input type="text" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} /></div>
            <div className="form-group"><label>Description</label><textarea value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})}></textarea></div>
            <div className="form-row">
              <div className="form-group"><label>Price</label><input type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} /></div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
                  <option>Starters</option><option>Mains</option><option>Desserts</option><option>Drinks</option><option>Specials</option>
                </select>
              </div>
            </div>
            <button className="btn-primary" onClick={addItem}>Add to Menu</button>
          </div>
        </div>
      )}
    </div>
  );
}`;

pages.forEach(p => {
  const dirPath = path.join(baseDir, p.route);
  fs.mkdirSync(dirPath, { recursive: true });
  
  let content = '';
  if (p.type === 'dashboard') content = tplDashboard;
  else if (p.type === 'reservations') content = tplReservations;
  else if (p.type === 'orders') content = tplOrders;
  else if (p.type === 'menu') content = tplMenu;
  else content = tplPlaceholder(p.title);

  fs.writeFileSync(path.join(dirPath, 'page.js'), content);
});

console.log('Admin pages generated.');
