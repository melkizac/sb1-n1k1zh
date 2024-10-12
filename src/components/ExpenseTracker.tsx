import React, { useState } from 'react';
import { Plus, Edit2, PieChart } from 'lucide-react';
import { EditModal } from './EditModal';

const expenseCategories = [
  'Housing', 'Transportation', 'Food', 'Utilities', 'Insurance',
  'Healthcare', 'Savings', 'Personal', 'Entertainment', 'Miscellaneous'
];

export const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: 150.00, date: '2023-04-01', category: 'Food' },
    { id: 2, description: 'Rent', amount: 1200.00, date: '2023-04-01', category: 'Housing' },
    { id: 3, description: 'Electricity', amount: 80.00, date: '2023-04-05', category: 'Utilities' },
  ]);

  const [newExpense, setNewExpense] = useState({ description: '', amount: '', date: '', category: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount && newExpense.date && newExpense.category) {
      setExpenses([...expenses, { ...newExpense, id: Date.now(), amount: parseFloat(newExpense.amount) }]);
      setNewExpense({ description: '', amount: '', date: '', category: '' });
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedExpense) => {
    setExpenses(expenses.map(expense => expense.id === editedExpense.id ? editedExpense : expense));
  };

  const editModalFields = [
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'date', label: 'Date', type: 'date' },
    { name: 'category', label: 'Category', type: 'select', options: expenseCategories },
  ];

  const expenseSummary = expenses.reduce((summary, expense) => {
    if (!summary[expense.category]) {
      summary[expense.category] = 0;
    }
    summary[expense.category] += expense.amount;
    return summary;
  }, {});

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Expense Tracker</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <select
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="">Select Category</option>
            {expenseCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
          <Plus size={18} className="mr-2" />
          Add Expense
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Expense Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(expenseSummary).map(([category, total]) => (
            <div key={category} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold">{category}</h3>
              <p className="text-lg">${(total as number).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        <ul className="space-y-2">
          {expenses.map((expense) => (
            <li key={expense.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <span className="font-semibold">{expense.description}</span>
                <span className="text-sm text-gray-500 ml-2">({expense.category})</span>
                <span className="text-sm text-gray-500 ml-2">{expense.date}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-4">${expense.amount.toFixed(2)}</span>
                <button onClick={() => handleEdit(expense)} className="text-blue-500 hover:text-blue-700">
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
        item={editingExpense}
        fields={editModalFields}
      />
    </div>
  );
};