import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const monthlyData = [
  { name: 'Jan', income: 5000, expenses: 4000 },
  { name: 'Feb', income: 5500, expenses: 4200 },
  { name: 'Mar', income: 5200, expenses: 4100 },
  { name: 'Apr', income: 5800, expenses: 4300 },
  { name: 'May', income: 6000, expenses: 4500 },
  { name: 'Jun', income: 5900, expenses: 4400 },
];

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');

  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0);
  const netSavings = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Reports</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Income vs Expenses</h2>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" />
            <Bar dataKey="expenses" fill="#FFA000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total Income</h3>
            <DollarSign className="text-green-500" size={24} />
          </div>
          <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <DollarSign className="text-red-500" size={24} />
          </div>
          <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Net Savings</h3>
            {netSavings >= 0 ? (
              <TrendingUp className="text-green-500" size={24} />
            ) : (
              <TrendingDown className="text-red-500" size={24} />
            )}
          </div>
          <p className={`text-2xl font-bold ${netSavings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${Math.abs(netSavings).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};