import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Edit2 } from 'lucide-react';
import { EditModal } from './EditModal';

export const InvestmentTracker: React.FC = () => {
  const [investments, setInvestments] = useState([
    { id: 1, symbol: 'AAPL', name: 'Apple Inc.', shares: 10, price: 150.25, change: 2.5 },
    { id: 2, symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 5, price: 2750.80, change: -1.2 },
    { id: 3, symbol: 'MSFT', name: 'Microsoft Corporation', shares: 15, price: 305.50, change: 0.8 },
  ]);

  const [newInvestment, setNewInvestment] = useState({ symbol: '', shares: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInvestment({ ...newInvestment, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInvestment.symbol && newInvestment.shares) {
      setInvestments([...investments, {
        id: Date.now(),
        symbol: newInvestment.symbol.toUpperCase(),
        name: `${newInvestment.symbol.toUpperCase()} Corp.`,
        shares: parseInt(newInvestment.shares),
        price: 100,
        change: 0,
      }]);
      setNewInvestment({ symbol: '', shares: '' });
    }
  };

  const handleEdit = (investment) => {
    setEditingInvestment(investment);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedInvestment) => {
    setInvestments(investments.map(investment => investment.id === editedInvestment.id ? editedInvestment : investment));
  };

  const editModalFields = [
    { name: 'symbol', label: 'Symbol', type: 'text' },
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'shares', label: 'Shares', type: 'number' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'change', label: 'Change (%)', type: 'number' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Investment Tracker</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            name="symbol"
            value={newInvestment.symbol}
            onChange={handleInputChange}
            placeholder="Stock Symbol"
            className="flex-grow p-2 border rounded"
          />
          <input
            type="number"
            name="shares"
            value={newInvestment.shares}
            onChange={handleInputChange}
            placeholder="Number of Shares"
            className="w-40 p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Add Investment
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Investments</h2>
        <ul className="space-y-4">
          {investments.map((investment) => (
            <li key={investment.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold">{investment.symbol}</h3>
                <p className="text-sm text-gray-600">{investment.name}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(investment.price * investment.shares).toFixed(2)}</p>
                <p className={`text-sm flex items-center ${investment.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {investment.change >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                  {investment.change.toFixed(2)}%
                </p>
              </div>
              <button onClick={() => handleEdit(investment)} className="text-blue-500 hover:text-blue-700 ml-4">
                <Edit2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        item={editingInvestment}
        fields={editModalFields}
      />
    </div>
  );
};