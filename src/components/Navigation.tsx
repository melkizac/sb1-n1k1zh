import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, PieChart, TrendingUp, LogIn, UserPlus, BarChart2, Target, FileText, Menu, X, CreditCard } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: "/", icon: PieChart, text: "Dashboard" },
    { to: "/expenses", icon: TrendingUp, text: "Expenses" },
    { to: "/investments", icon: TrendingUp, text: "Investments" },
    { to: "/liabilities", icon: CreditCard, text: "Liabilities" },
    { to: "/budget", icon: BarChart2, text: "Budget" },
    { to: "/goals", icon: Target, text: "Goals" },
    { to: "/reports", icon: FileText, text: "Reports" },
    { to: "/login", icon: LogIn, text: "Login" },
    { to: "/register", icon: UserPlus, text: "Register" },
  ];

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-20 bg-blue-600 text-white p-2 rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav className={`fixed top-0 left-0 bottom-0 z-10 w-64 bg-blue-600 text-white p-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center mb-8">
          <DollarSign className="mr-2" size={24} />
          <span className="text-xl font-bold">FinanceTracker</span>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="flex items-center p-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-2" size={18} />
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};