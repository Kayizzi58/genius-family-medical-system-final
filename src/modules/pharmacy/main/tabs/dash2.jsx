import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const initialInventory = [
  { id: 1, drug: 'Paracetamol 500mg', quantity: 100, expiry: '2026-12-31' },
  { id: 2, drug: 'Amoxicillin 250mg', quantity: 50, expiry: '2025-08-15' },
  { id: 3, drug: 'Ibuprofen 200mg', quantity: 0, expiry: '2026-01-20' },
];

const initialSupplies = [
  { id: 1, name: 'Syringes', quantity: 200 },
  { id: 2, name: 'Gloves', quantity: 500 },
];

const initialSales = [
  { id: 1, total: 500 },
  { id: 2, total: 300 },
  { id: 3, total: 700 },
];

export default function Dashboard() {
  const [inventory] = useState(initialInventory);
  const [supplies] = useState(initialSupplies);
  const [sales] = useState(initialSales);
  const [expirySoon, setExpirySoon] = useState(0);

  useEffect(() => {
    const today = new Date();
    const soonCount = inventory.filter(item => {
      const expiryDate = new Date(item.expiry);
      const diffDays = (expiryDate - today) / (1000 * 60 * 60 * 24);
      return diffDays <= 90 && diffDays >= 0; // expiring in next 90 days
    }).length;
    setExpirySoon(soonCount);
  }, [inventory]);

  const totalMedicineStock = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalSupplies = supplies.reduce((sum, item) => sum + item.quantity, 0);
  const totalSales = sales.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="ui container my-4">
      <h2 className="ui header blue"><i className="dashboard icon"></i> Pharmacy Dashboard</h2>

      <div className="ui stackable four column grid mt-3">
        <div className="column">
          <div className="ui raised segment text-center p-4 shadow-sm">
            <h3>Total Medicine Stock</h3>
            <div className="ui huge blue label">{totalMedicineStock}</div>
          </div>
        </div>

        <div className="column">
          <div className="ui raised segment text-center p-4 shadow-sm">
            <h3>Total Supplies</h3>
            <div className="ui huge green label">{totalSupplies}</div>
          </div>
        </div>

        <div className="column">
          <div className="ui raised segment text-center p-4 shadow-sm">
            <h3>Expiring Soon</h3>
            <div className="ui huge yellow label">{expirySoon}</div>
          </div>
        </div>

        <div className="column">
          <div className="ui raised segment text-center p-4 shadow-sm">
            <h3>Total Sales</h3>
            <div className="ui huge teal label">${totalSales}</div>
          </div>
        </div>
      </div>
    </div>
  );
}