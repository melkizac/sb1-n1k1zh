import React, { useState } from 'react';
import { Plus, Minus, Edit2 } from 'lucide-react';
import { EditModal } from './EditModal';

export const BudgetPlanner: React.FC = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Housing', limit: 1500, spent: 1200 },
    { id: 2, category: 'Food', limit: 500, spent: 450 },
    { id: 3, category: 'Transportation', limit: 300, spent: 280 },
  ]);

  const [newBudget, setNewBudget] = useState({ category: '', limit: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBudget({ ...newBudget, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBudget.category && newBudget.limit) {
      setBudgets([...budgets, { id: Date.now(), category: newBudget.category, limit: parseFloat(newBudget.limit), spent: 0 }]);
      setNewBudget({ category: '', limit: '' });
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedBudget) => {
    setBudgets(budgets.map(budget => budget.id === editedBudget.id ? editedBudget : budget));
  };

  const editModalFields = [
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'limit', label: 'Monthly Limit', type: 'number' },
    { name: 'spent', label: 'Amount Spent', type: 'number' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Budget Planner</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            name="category"
            value={newBudget.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="flex-grow p-2 border rounded"
          />
          <input
            type="number"
            name="limit"
            value={newBudget.limit}
            onChange={handleInputChange}
            placeholder="Monthly Limit"
            className="w-40 p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
          <Plus size={18} className="mr-2" />
          Add Budget Category
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Budgets</h2>
        <ul className="space-y-4">
          {budgets.map((budget) => (
            <li key={budget.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold">{budget.category}</h3>
                <p className="text-sm text-gray-600">Limit: ${budget.limit}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Spent: ${budget.spent}</p>
                <p className={`text-sm ${budget.spent <= budget.limit ? 'text-green-500' : 'text-red-500'}`}>
                  {budget.spent <= budget.limit ? (
                    <span className="flex items-center"><Minus size={16} className="mr-1" />${budget.limit - budget.spent} left</span>
                  ) : (
                    <span className="flex items-center"><Plus size={16} className="mr-1" />${budget.spent - budget.limit} over</span>
                  )}
                </p>
                <button onClick={() => handleEdit(budget)} className="text-blue-500 hover:text-blue-700 mt-2">
                  <Edit2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        item={editingBudget}
        fields={editModalFields}
      />
    </div>
  );
};