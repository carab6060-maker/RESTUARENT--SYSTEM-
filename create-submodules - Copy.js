const fs = require('fs');
const path = require('path');

// Template for interactive CRUD pages
function makePage(title, subtitle, storageKey, columns, defaultData) {
  const colHeaders = columns.map(c => c.label);
  const colKeys = columns.map(c => c.key);
  
  return `"use client";
import React, { useState, useEffect } from 'react';

const DEFAULT_DATA = ${JSON.stringify(defaultData, null, 2)};

export default function Page() {
  const [rows, setRows] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('${storageKey}');
    setRows(saved ? JSON.parse(saved) : DEFAULT_DATA);
  }, []);

  const save = (data) => { setRows(data); localStorage.setItem('${storageKey}', JSON.stringify(data)); };

  const handleAdd = () => {
    if (!newRow[${JSON.stringify(colKeys[0])}]) return;
    save([...rows, { id: Date.now(), ...newRow }]);
    setNewRow({}); setShowAdd(false);
  };

  const handleDelete = (id) => { if (confirm('Delete this item?')) save(rows.filter(r => r.id !== id)); };

  const startEdit = (row) => { setEditId(row.id); setEditRow({ ...row }); };
  const saveEditRow = () => { save(rows.map(r => r.id === editId ? editRow : r)); setEditId(null); };

  const cols = ${JSON.stringify(columns)};

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-heading">${title} <em>${subtitle}</em></h1>
        <button className="btn-primary small" onClick={() => setShowAdd(!showAdd)}>+ Add New</button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr>{cols.map(c => <th key={c.key}>{c.label}</th>)}<th>Actions</th></tr></thead>
          <tbody>
            {!rows.length && !showAdd && <tr><td colSpan={cols.length + 1} className="loading-row">No data yet. Click + Add New.</td></tr>}
            {rows.map(row => (
              <tr key={row.id}>
                {cols.map(c => (
                  <td key={c.key} style={c.bold ? { fontWeight: '600' } : c.gold ? { color: 'var(--gold)' } : {}}>
                    {editId === row.id ? (
                      <input value={editRow[c.key] || ''} onChange={e => setEditRow({ ...editRow, [c.key]: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text)' }} />
                    ) : (
                      c.badge ? <span className={\`badge badge-\${(row[c.key]||'').toLowerCase().replace(/\\s+/g,'-')}\`}>{row[c.key]}</span> : (c.gold ? '$' + row[c.key] : row[c.key])
                    )}
                  </td>
                ))}
                <td>
                  {editId === row.id ? (
                    <><button className="btn-action" onClick={saveEditRow} style={{ color: '#10b981' }}>Save</button><button className="btn-action" onClick={() => setEditId(null)}>Cancel</button></>
                  ) : (
                    <><button className="btn-action" onClick={() => startEdit(row)}>Edit</button><button className="btn-action danger" onClick={() => handleDelete(row.id)}>Delete</button></>
                  )}
                </td>
              </tr>
            ))}
            {showAdd && (
              <tr style={{ background: 'var(--gold-dim, rgba(217,119,6,0.05))' }}>
                {cols.map(c => (
                  <td key={c.key}>
                    <input placeholder={c.label} value={newRow[c.key] || ''} onChange={e => setNewRow({ ...newRow, [c.key]: e.target.value })}
                      style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--gold, #d97706)', background: 'var(--bg2, #fff)', color: 'var(--text)' }} />
                  </td>
                ))}
                <td>
                  <button className="btn-action" onClick={handleAdd} style={{ color: '#10b981' }}>Add</button>
                  <button className="btn-action" onClick={() => { setShowAdd(false); setNewRow({}); }}>Cancel</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;
}

const pages = {
  // Inventory
  'app/admin/inventory/stock-items/page.js': makePage('Inventory', 'Stock Items', 'saveur_stock_items',
    [{ key: 'name', label: 'Item Name', bold: true }, { key: 'category', label: 'Category' }, { key: 'qty', label: 'Qty On Hand' }, { key: 'cost', label: 'Unit Cost', gold: true }, { key: 'status', label: 'Status', badge: true }],
    [{ id: 1, name: 'Ground Beef (kg)', category: 'Meat', qty: '45', cost: '8.50', status: 'In Stock' }, { id: 2, name: 'Brioche Buns', category: 'Bakery', qty: '3', cost: '1.20', status: 'Low Stock' }, { id: 3, name: 'Cheddar Cheese (kg)', category: 'Dairy', qty: '12', cost: '6.00', status: 'In Stock' }]
  ),
  'app/admin/inventory/purchase-orders/page.js': makePage('Inventory', 'Purchase Orders', 'saveur_purchase_orders',
    [{ key: 'po', label: 'PO #', bold: true }, { key: 'supplier', label: 'Supplier' }, { key: 'date', label: 'Date' }, { key: 'total', label: 'Total', gold: true }, { key: 'status', label: 'Status', badge: true }],
    [{ id: 1, po: 'PO-001', supplier: 'Fresh Farms Co.', date: '2025-06-10', total: '1250.00', status: 'Pending' }, { id: 2, po: 'PO-002', supplier: 'Bakery Direct', date: '2025-06-08', total: '340.00', status: 'Received' }]
  ),
  'app/admin/inventory/suppliers/page.js': makePage('Inventory', 'Suppliers', 'saveur_suppliers',
    [{ key: 'name', label: 'Supplier Name', bold: true }, { key: 'contact', label: 'Contact' }, { key: 'phone', label: 'Phone' }, { key: 'items', label: 'Items Supplied' }, { key: 'status', label: 'Status', badge: true }],
    [{ id: 1, name: 'Fresh Farms Co.', contact: 'John Farmer', phone: '+1 555-111-2222', items: 'Produce, Meat', status: 'Active' }, { id: 2, name: 'Bakery Direct', contact: 'Sara Baker', phone: '+1 555-333-4444', items: 'Buns, Pastries', status: 'Active' }]
  ),
  'app/admin/inventory/adjustments/page.js': makePage('Inventory', 'Stock Adjustments', 'saveur_stock_adj',
    [{ key: 'date', label: 'Date' }, { key: 'item', label: 'Item', bold: true }, { key: 'adjustment', label: 'Adjustment' }, { key: 'reason', label: 'Reason' }, { key: 'by', label: 'By' }],
    [{ id: 1, date: '2025-06-08', item: 'Lettuce (kg)', adjustment: '-5', reason: 'Spoilage', by: 'Manager' }]
  ),

  // Accounting (except chart-of-accounts which is already done)
  'app/admin/accounting/journal-entries/page.js': makePage('Accounting', 'Journal Entries', 'saveur_journal',
    [{ key: 'entry', label: 'Entry #', bold: true }, { key: 'date', label: 'Date' }, { key: 'desc', label: 'Description' }, { key: 'debit', label: 'Debit', gold: true }, { key: 'credit', label: 'Credit', gold: true }],
    [{ id: 1, entry: 'JE-001', date: '2025-06-10', desc: 'Daily sales deposit', debit: '2340.00', credit: '2340.00' }, { id: 2, entry: 'JE-002', date: '2025-06-10', desc: 'Supplier payment', debit: '500.00', credit: '500.00' }]
  ),
  'app/admin/accounting/ap-aging/page.js': makePage('Accounting', 'Accounts Payable Aging', 'saveur_ap_aging',
    [{ key: 'vendor', label: 'Vendor', bold: true }, { key: 'current', label: 'Current' }, { key: 'd30', label: '1-30 Days' }, { key: 'd60', label: '31-60 Days' }, { key: 'd90', label: '60+ Days' }, { key: 'total', label: 'Total', gold: true }],
    [{ id: 1, vendor: 'Fresh Farms Co.', current: '500', d30: '300', d60: '0', d90: '0', total: '800.00' }]
  ),
  'app/admin/accounting/ar-aging/page.js': makePage('Accounting', 'Accounts Receivable Aging', 'saveur_ar_aging',
    [{ key: 'customer', label: 'Customer', bold: true }, { key: 'current', label: 'Current' }, { key: 'd30', label: '1-30 Days' }, { key: 'd60', label: '31-60 Days' }, { key: 'd90', label: '60+ Days' }, { key: 'total', label: 'Total', gold: true }],
    [{ id: 1, customer: 'Catering Client A', current: '1200', d30: '0', d60: '0', d90: '0', total: '1200.00' }]
  ),
  'app/admin/accounting/bank-reconciliation/page.js': makePage('Accounting', 'Bank Reconciliation', 'saveur_bank_recon',
    [{ key: 'date', label: 'Date' }, { key: 'desc', label: 'Description', bold: true }, { key: 'bank', label: 'Bank Amount', gold: true }, { key: 'book', label: 'Book Amount', gold: true }, { key: 'diff', label: 'Difference' }],
    [{ id: 1, date: '2025-06-10', desc: 'POS Daily Settlement', bank: '2340.00', book: '2340.00', diff: '0.00' }]
  ),

  // Expenses
  'app/admin/expenses/claims/page.js': makePage('Expenses', 'Expense Claims', 'saveur_exp_claims',
    [{ key: 'claim', label: 'Claim #', bold: true }, { key: 'employee', label: 'Employee' }, { key: 'category', label: 'Category' }, { key: 'amount', label: 'Amount', gold: true }, { key: 'status', label: 'Status', badge: true }],
    [{ id: 1, claim: 'EC-001', employee: 'Chef Ahmad', category: 'Kitchen Supplies', amount: '185.00', status: 'Pending' }]
  ),
  'app/admin/expenses/recurring/page.js': makePage('Expenses', 'Recurring Expenses', 'saveur_exp_recurring',
    [{ key: 'name', label: 'Name', bold: true }, { key: 'category', label: 'Category' }, { key: 'amount', label: 'Amount', gold: true }, { key: 'frequency', label: 'Frequency' }, { key: 'nextDue', label: 'Next Due' }],
    [{ id: 1, name: 'Rent', category: 'Premises', amount: '5000.00', frequency: 'Monthly', nextDue: '2025-07-01' }, { id: 2, name: 'Internet', category: 'Utilities', amount: '120.00', frequency: 'Monthly', nextDue: '2025-07-01' }]
  ),
  'app/admin/expenses/categories/page.js': makePage('Expenses', 'Categories', 'saveur_exp_categories',
    [{ key: 'name', label: 'Category', bold: true }, { key: 'desc', label: 'Description' }, { key: 'budget', label: 'Budget Limit', gold: true }, { key: 'spent', label: 'Spent This Month', gold: true }],
    [{ id: 1, name: 'Kitchen Supplies', desc: 'Utensils, small equipment', budget: '2000', spent: '850.00' }, { id: 2, name: 'Utilities', desc: 'Electric, water, gas, internet', budget: '1500', spent: '1120.00' }]
  ),
  'app/admin/expenses/approvals/page.js': makePage('Expenses', 'Approvals', 'saveur_exp_approvals',
    [{ key: 'claim', label: 'Claim #', bold: true }, { key: 'employee', label: 'Employee' }, { key: 'amount', label: 'Amount', gold: true }, { key: 'submitted', label: 'Submitted' }, { key: 'status', label: 'Status', badge: true }],
    [{ id: 1, claim: 'EC-001', employee: 'Chef Ahmad', amount: '185.00', submitted: '2025-06-09', status: 'Pending' }]
  ),

  // Financial Reports
  'app/admin/financial/income-statement/page.js': makePage('Financial', 'Income Statement', 'saveur_income_stmt',
    [{ key: 'category', label: 'Category', bold: true }, { key: 'current', label: 'Current Month', gold: true }, { key: 'last', label: 'Last Month' }, { key: 'ytd', label: 'YTD', gold: true }],
    [{ id: 1, category: 'Total Revenue', current: '45800', last: '42100', ytd: '268000' }, { id: 2, category: 'Cost of Goods Sold', current: '-18200', last: '-16900', ytd: '-107000' }, { id: 3, category: 'Net Income', current: '12400', last: '11200', ytd: '74500' }]
  ),
  'app/admin/financial/balance-sheet/page.js': makePage('Financial', 'Balance Sheet', 'saveur_balance_sheet',
    [{ key: 'account', label: 'Account', bold: true }, { key: 'type', label: 'Type' }, { key: 'amount', label: 'Amount', gold: true }],
    [{ id: 1, account: 'Cash', type: 'Asset', amount: '12500' }, { id: 2, account: 'Inventory', type: 'Asset', amount: '8200' }, { id: 3, account: 'Accounts Payable', type: 'Liability', amount: '3200' }, { id: 4, account: 'Owner Capital', type: 'Equity', amount: '50000' }]
  ),
  'app/admin/financial/cash-flow/page.js': makePage('Financial', 'Cash Flow Statement', 'saveur_cash_flow',
    [{ key: 'category', label: 'Category', bold: true }, { key: 'inflows', label: 'Inflows', gold: true }, { key: 'outflows', label: 'Outflows' }, { key: 'net', label: 'Net', gold: true }],
    [{ id: 1, category: 'Operating Activities', inflows: '45800', outflows: '-33400', net: '12400' }, { id: 2, category: 'Investing Activities', inflows: '0', outflows: '-2500', net: '-2500' }]
  ),
  'app/admin/financial/tax-reports/page.js': makePage('Financial', 'Tax Reports', 'saveur_tax_reports',
    [{ key: 'type', label: 'Tax Type', bold: true }, { key: 'period', label: 'Period' }, { key: 'taxable', label: 'Taxable Amount' }, { key: 'due', label: 'Tax Due', gold: true }, { key: 'status', label: 'Status', badge: true }],
    [{ id: 1, type: 'Sales Tax (VAT)', period: 'June 2025', taxable: '45800', due: '6870.00', status: 'Pending' }]
  ),
};

Object.entries(pages).forEach(([filePath, content]) => {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content);
  console.log('Updated:', filePath);
});
console.log('All pages rebuilt with full CRUD!');
