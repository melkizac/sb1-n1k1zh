import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { ExpenseTracker } from './components/ExpenseTracker';
import { InvestmentTracker } from './components/InvestmentTracker';
import { Liabilities } from './components/Liabilities';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Navigation } from './components/Navigation';
import { BudgetPlanner } from './components/BudgetPlanner';
import { FinancialGoals } from './components/FinancialGoals';
import { Reports } from './components/Reports';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        <Navigation />
        <div className="flex-grow p-8 ml-0 sm:ml-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpenseTracker />} />
            <Route path="/investments" element={<InvestmentTracker />} />
            <Route path="/liabilities" element={<Liabilities />} />
            <Route path="/budget" element={<BudgetPlanner />} />
            <Route path="/goals" element={<FinancialGoals />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;