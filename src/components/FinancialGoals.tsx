import React, { useState } from 'react';
import { Target, Check, X, Edit2 } from 'lucide-react';
import { EditModal } from './EditModal';

export const FinancialGoals: React.FC = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 10000, current: 5000, deadline: '2023-12-31' },
    { id: 2, name: 'New Car', target: 25000, current: 15000, deadline: '2024-06-30' },
    { id: 3, name: 'Vacation', target: 5000, current: 2000, deadline: '2023-08-31' },
  ]);

  const [newGoal, setNewGoal] = useState({ name: '', target: '', current: '', deadline: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.name && newGoal.target && newGoal.current && newGoal.deadline) {
      setGoals([...goals, { 
        id: Date.now(), 
        name: newGoal.name, 
        target: parseFloat(newGoal.target), 
        current: parseFloat(newGoal.current),
        deadline: newGoal.deadline
      }]);
      setNewGoal({ name: '', target: '', current: '', deadline: '' });
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedGoal) => {
    setGoals(goals.map(goal => goal.id === editedGoal.id ? editedGoal : goal));
  };

  const editModalFields = [
    { name: 'name', label: 'Goal Name', type: 'text' },
    { name: 'target', label: 'Target Amount', type: 'number' },
    { name: 'current', label: 'Current Amount', type: 'number' },
    { name: 'deadline', label: 'Deadline', type: 'date' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Goals</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newGoal.name}
            onChange={handleInputChange}
            placeholder="Goal Name"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="target"
            value={newGoal.target}
            onChange={handleInputChange}
            placeholder="Target Amount"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="current"
            value={newGoal.current}
            onChange={handleInputChange}
            placeholder="Current Amount"
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="deadline"
            value={newGoal.deadline}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center">
          <Target size={18} className="mr-2" />
          Add Financial Goal
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Financial Goals</h2>
        <ul className="space-y-4">
          {goals.map((goal) => (
            <li key={goal.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-semibold">{goal.name}</h3>
                <p className="text-sm text-gray-600">Target: ${goal.target}</p>
                <p className="text-sm text-gray-600">Deadline: {goal.deadline}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Progress: ${goal.current} / ${goal.target}</p>
                <p className={`text-sm ${goal.current >= goal.target ? 'text-green-500' : 'text-blue-500'}`}>
                  {goal.current >= goal.target ? (
                    <span className="flex items-center"><Check size={16} className="mr-1" />Achieved</span>
                  ) : (
                    <span className="flex items-center"><X size={16} className="mr-1" />${goal.target - goal.current} to go</span>
                  )}
                </p>
                <button onClick={() => handleEdit(goal)} className="text-blue-500 hover:text-blue-700 mt-2">
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
        item={editingGoal}
        fields={editModalFields}
      />
    </div>
  );
};