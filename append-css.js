const fs = require('fs');
const css = fs.readFileSync('app/admin.css', 'utf8');
const newCSS = `

/* POS CASHIER */
.pos-layout { display: grid; grid-template-columns: 1fr 340px; gap: 1.5rem; min-height: calc(100vh - var(--topbar-h) - 8rem); }
.pos-menu-pane { display: flex; flex-direction: column; gap: 1rem; }
.pos-category-bar { display: flex; gap: .4rem; flex-wrap: wrap; }
.pos-cat-btn { background: var(--bg2); border: 1px solid var(--border); color: var(--text-muted); padding: .4rem 1rem; border-radius: var(--radius); font-size: .75rem; letter-spacing: .06em; cursor: pointer; transition: all var(--transition); font-family: 'DM Sans', sans-serif; }
.pos-cat-btn:hover { border-color: var(--gold); color: var(--text); }
.pos-cat-btn.active { background: var(--gold-dim); border-color: var(--gold); color: var(--gold); }
.pos-items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: .6rem; overflow-y: auto; max-height: calc(100vh - var(--topbar-h) - 14rem); }
.pos-item-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem; cursor: pointer; transition: all var(--transition); text-align: center; font-family: 'DM Sans', sans-serif; }
.pos-item-card:hover { border-color: var(--gold); transform: translateY(-2px); }
.pos-item-name { font-size: .82rem; color: var(--text); margin-bottom: .3rem; }
.pos-item-price { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--gold); }
.pos-ticket-pane { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); display: flex; flex-direction: column; height: fit-content; position: sticky; top: calc(var(--topbar-h) + 2rem); }
.pos-ticket-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.2rem; border-bottom: 1px solid var(--border); }
.pos-ticket-header h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 300; }
.pos-ticket-items { flex: 1; padding: .8rem; display: flex; flex-direction: column; gap: .4rem; max-height: 350px; overflow-y: auto; }
.pos-ticket-row { display: flex; align-items: center; justify-content: space-between; padding: .5rem .6rem; border-radius: var(--radius); background: var(--bg3); gap: .5rem; font-size: .82rem; }
.pos-ticket-name { flex: 1; }
.pos-ticket-line-total { color: var(--gold); white-space: nowrap; font-size: .8rem; }
.pos-ticket-footer { padding: 1rem 1.2rem; border-top: 1px solid var(--border); }
.pos-ticket-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: .8rem; font-size: .85rem; color: var(--text-muted); }
.pos-ticket-total strong { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: var(--gold); font-weight: 300; }
.pos-empty { color: var(--text-dim); font-size: .82rem; text-align: center; padding: 2rem 1rem; }

/* KITCHEN BOARD */
.kitchen-board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.kitchen-column { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem; min-height: 300px; }
.kitchen-col-title { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 400; margin-bottom: 1rem; padding-bottom: .6rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: .5rem; }
.kitchen-count { background: var(--bg3); color: var(--text-muted); padding: .1rem .5rem; border-radius: var(--radius); font-size: .7rem; font-family: 'DM Sans', sans-serif; }
.kitchen-card { background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius); padding: .8rem; margin-bottom: .6rem; transition: border-color var(--transition); }
.kitchen-card.kitchen-pending { border-left: 3px solid var(--danger); }
.kitchen-card.kitchen-preparing { border-left: 3px solid var(--gold); }
.kitchen-card.kitchen-served { border-left: 3px solid var(--success); }
.kitchen-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: .5rem; }
.kitchen-table { font-weight: 500; font-size: .85rem; }
.kitchen-items { list-style: none; padding: 0; margin: 0 0 .6rem 0; }
.kitchen-items li { font-size: .78rem; color: var(--text-muted); padding: .15rem 0; }
.kitchen-card-footer { display: flex; justify-content: space-between; align-items: center; }
.kitchen-time { font-size: .7rem; color: var(--text-dim); }
.kitchen-actions { display: flex; gap: .3rem; }

/* TABLES GRID */
.table-status-legend { display: flex; gap: 1.2rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: .4rem; font-size: .75rem; color: var(--text-muted); text-transform: capitalize; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.tables-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; }
.table-tile { background: var(--bg2); border: 2px solid var(--border); border-radius: var(--radius); padding: 1.2rem; text-align: center; transition: all var(--transition); display: flex; flex-direction: column; align-items: center; gap: .3rem; }
.table-tile:hover { transform: translateY(-2px); }
.table-tile-number { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: var(--text); font-weight: 300; }
.table-tile-seats { font-size: .75rem; color: var(--text-muted); }
.table-tile-section { font-size: .68rem; color: var(--text-dim); letter-spacing: .06em; text-transform: uppercase; }

/* Additional badge states */
.badge-available { background: rgba(106,159,123,.15); color: var(--success); }
.badge-occupied { background: rgba(200,169,110,.15); color: var(--gold); }
.badge-reserved { background: rgba(100,130,200,.15); color: #8899cc; }
.badge-maintenance { background: rgba(192,82,90,.15); color: var(--danger); }
.badge-active { background: rgba(106,159,123,.15); color: var(--success); }
.badge-off-duty { background: rgba(192,82,90,.15); color: var(--danger); }
.badge-ok { background: rgba(106,159,123,.15); color: var(--success); }
.badge-low { background: rgba(192,82,90,.15); color: var(--danger); }

/* Gold text utility */
.gold { color: var(--gold); }

/* MODULE RESPONSIVE */
@media (max-width: 900px) {
  .pos-layout { grid-template-columns: 1fr; }
  .pos-ticket-pane { position: static; }
  .kitchen-board { grid-template-columns: 1fr; }
}
`;

fs.writeFileSync('app/admin.css', css + newCSS);
console.log('CSS appended successfully');
