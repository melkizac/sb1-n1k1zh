import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart, CreditCard } from 'lucide-react';

// Mock data (in a real application, this would come from your state management or API)
const financialData = {
  netWorth: 150000,
  assets: 250000,
  liabilities: 100000,
  monthlyIncome: 5000,
  monthlyExpenses: 3500
};

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Net Worth</h2>
            <DollarSign className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold">${financialData.netWorth.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Total Assets</h2>
            <PieChart className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold">${financialData.assets.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Total Liabilities</h2>
            <CreditCard className="text-red-500" size={24} />
          </div>
          <p className="text-3xl font-bold">${financialData.liabilities.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Monthly Income</h2>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <p className="text-3xl font-bold">${financialData.monthlyIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Monthly Expenses</h2>
            <TrendingDown className="text-red-500" size={24} />
          </div>
          <p className="text-3xl font-bold">${financialData.monthlyExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Monthly Savings</h2>
            <DollarSign className="text-blue-500" size={24} />
          </div>
          <p className="text-3xl font-bold">${(financialData.monthlyIncome - financialData.monthlyExpenses).toLocaleString()}</p>
        </div>
      </div>
      {/* You can add more detailed components or charts here */}
    </div>
  );
};