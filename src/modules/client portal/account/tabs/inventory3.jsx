
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialInventory = [
  { 
    id: 1,
    itemCode: 'MED-001',
    name: 'Amoxicillin 500mg',
    category: 'Medicine',
    stock: 120,
    minStock: 50,
    expiry: '2026-12-31',
    supplier: 'PharmaPlus Ltd',
    unitCost: 5,
    status: 'In Stock'
  },
  {
    id: 2,
    itemCode: 'SUP-002',
    name: 'Surgical Gloves',
    category: 'Supply',
    stock: 30,
    minStock: 40,
    expiry: '2027-06-30',
    supplier: 'MedEquip Co',
    unitCost: 1,
    status: 'Low Stock'
  },
  {
    id: 3,
    itemCode: 'MED-003',
    name: 'Paracetamol 500mg',
    category: 'Medicine',
    stock: 0,
    minStock: 50,
    expiry: '2025-08-15',
    supplier: 'PharmaPlus Ltd',
    unitCost: 2,
    status: 'Out of Stock'
  }
];

const statusColor = {
  "In Stock": "green",
  "Low Stock": "yellow",
  "Out of Stock": "red"
};

export default function Inventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredItems = inventory.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;
    const matchesStatus = !filterStatus || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const restockItem = (id) => {
    const qty = prompt("Enter restock quantity:");
    if (!qty) return;

    setInventory(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              stock: item.stock + parseInt(qty),
              status: item.stock + parseInt(qty) > item.minStock
                ? "In Stock"
                : "Low Stock"
            }
          : item
      )
    );
  };

  const adjustStock = (id) => {
    const qty = prompt("Enter adjustment quantity (negative to reduce):");
    if (!qty) return;

    setInventory(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newStock = item.stock + parseInt(qty);
          let newStatus = "In Stock";
          if (newStock <= 0) newStatus = "Out of Stock";
          else if (newStock <= item.minStock) newStatus = "Low Stock";

          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      })
    );
  };

  const totalInventoryValue = inventory.reduce(
    (sum, item) => sum + (item.stock * item.unitCost),
    0
  );

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="boxes icon"></i> Inventory Management
        </h3>

        {/* SUMMARY DASHBOARD */}
        <div className="ui four stackable cards mb-3">
          <div className="ui card">
            <div className="content">
              <div className="header">Total Items</div>
              <div className="description">{inventory.length}</div>
            </div>
          </div>
          <div className="ui card">
            <div className="content">
              <div className="header">Low Stock</div>
              <div className="description">
                {inventory.filter(i => i.status === 'Low Stock').length}
              </div>
            </div>
          </div>
          <div className="ui card">
            <div className="content">
              <div className="header">Out of Stock</div>
              <div className="description">
                {inventory.filter(i => i.status === 'Out of Stock').length}
              </div>
            </div>
          </div>
          <div className="ui card">
            <div className="content">
              <div className="header">Inventory Value</div>
              <div className="description">
                ${totalInventoryValue}
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="ui stackable grid mb-3">
          <div className="four wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search by name or code..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Medicine">Medicine</option>
              <option value="Supply">Supply</option>
            </select>
          </div>

          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div className="four wide column">
            <button
              className="ui grey fluid button"
              onClick={() => {
                setSearch('');
                setFilterCategory('');
                setFilterStatus('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Item Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Min Stock</th>
                <th>Expiry</th>
                <th>Supplier</th>
                <th>Unit Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id}>
                  <td>{item.itemCode}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td>{item.minStock}</td>
                  <td>{item.expiry}</td>
                  <td>{item.supplier}</td>
                  <td>${item.unitCost}</td>
                  <td>
                    <div className={`ui ${statusColor[item.status]} label`}>
                      {item.status}
                    </div>
                  </td>
                  <td>
                    <button
                      className="ui tiny green button mr-1"
                      onClick={() => restockItem(item.id)}
                    >
                      <i className="plus icon"></i> Restock
                    </button>

                    <button
                      className="ui tiny orange button"
                      onClick={() => adjustStock(item.id)}
                    >
                      <i className="edit icon"></i> Adjust
                    </button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center">
                    No inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ADD ITEM BUTTON */}
        <div className="mt-3">
          <button
            className="ui blue button"
            onClick={() => alert("Open Add Inventory Modal")}
          >
            <i className="add icon"></i> Add New Item
          </button>
        </div>
      </div>
    </div>
  );
}