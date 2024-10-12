import React, { useState } from 'react';
import { CreditCard, Plus, Minus, Edit2 } from 'lucide-react';
import { EditModal } from './EditModal';

export const Liabilities: React.FC = () => {
  const [liabilities, setLiabilities] = useState([
    { id: 1, name: 'Mortgage', amount: 200000, interestRate: 3.5, monthlyPayment: 1200 },
    { id: 2, name: 'Car Loan', amount: 15000, interestRate: 4.5, monthlyPayment: 300 },
    { id: 3, name: 'Credit Card', amount: 3000, interestRate: 18, monthlyPayment: 150 },
  ]);

  const [newLiability, setNewLiability] = useState({ name: '', amount: '', interestRate: '', monthlyPayment: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLiability, setEditingLiability] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLiability({ ...newLiability, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLiability.name && newLiability.amount && newLiability.interestRate && newLiability.monthlyPayment) {
      setLiabilities([...liabilities, {
        id: Date.now(),
        name: newLiability.name,
        amount: parseFloat(newLiability.amount),
        interestRate: parseFloat(newLiability.interestRate),
        monthlyPayment: parseFloat(newLiability.monthlyPayment),
      }]);
      setNewLiability({ name: '', amount: '', interestRate: '', monthlyPayment: '' });
    }
  };

  const handleEdit = (liability) => {
    setEditingLiability(liability);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedLiability) => {
    setLiabilities(liabilities.map(liability => liability.id === editedLiability.id ? editedLiability : liability));
  };

  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const totalMonthlyPayments = liabilities.reduce((sum, liability) => sum + liability.monthlyPayment, 0);

  const editModalFields = [
    { name: 'name', label: 'Liability Name', type: 'text' },
    { name: 'amount', label: 'Total Amount', type: 'number' },
    { name: 'interestRate', label: 'Interest Rate (%)', type: 'number' },
    { name: 'monthlyPayment', label: 'Monthly Payment', type: 'number' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Liabilities</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newLiability.name}
            onChange={handleInputChange}
            placeholder="Liability Name"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="amount"
            value={newLiability.amount}
            onChange={handleInputChange}
            placeholder="Total Amount"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="interestRate"
            value={newLiability.interestRate}
            onChange={handleInputChange}
            placeholder="Interest Rate (%)"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="monthlyPayment"
            value={newLiability.monthlyPayment}
            onChange={handleInputChange}
            placeholder="Monthly Payment"
            className="p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
          <Plus size={18} className="mr-2" />
          Add Liability
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Liabilities</h2>
        <ul className="space-y-4">
          {liabilities.map((liability) => (
            <li key={liability.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold">{liability.name}</h3>
                <p className="text-sm text-gray-600">Total: ${liability.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Interest Rate: {liability.interestRate}%</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Monthly Payment: ${liability.monthlyPayment}</p>
                <button onClick={() => handleEdit(liability)} className="text-blue-500 hover:text-blue-700 mt-2">
                  <Edit2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total Liabilities</h3>
            <CreditCard className="text-red-500" size={24} />
          </div>
          <p className="text-2xl font-bold">${totalLiabilities.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total Monthly Payments</h3>
            <Minus className="text-red-500" size={24} />
          </div>
          <p className="text-2xl font-bold">${totalMonthlyPayments.toLocaleString()}</p>
        </div>
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        item={editingLiability}
        fields={editModalFields}
      />
    </div>
  );
};