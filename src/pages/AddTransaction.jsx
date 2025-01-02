import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import Notification from '../components/Notification';
import { useLocation } from 'react-router-dom';

function AddTransaction() {
  const { addTransaction, notification } = useTransactions();
  const location = useLocation();
  const initialType = location.state?.transactionType || 'expense';
  
  const [transactionData, setTransactionData] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    notes: '',
    type: initialType
  });

  const categories = {
    income: ['Salary', 'Freelance', 'Investments', 'Gifts', 'Other'],
    expense: ['Groceries', 'Transportation', 'Entertainment', 'Bills', 'Food', 'Shopping', 'Healthcare', 'Other']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert amount to number
    const newTransaction = {
      ...transactionData,
      amount: parseFloat(transactionData.amount),
      id: Date.now() // Add unique ID
    };
    
    addTransaction(newTransaction);
    
    // Reset form
    setTransactionData({
      name: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      notes: '',
      type: initialType
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Notification {...notification} />
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Add Transaction</h2>
        
        {/* Transaction Type Selector */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setTransactionData(prev => ({ ...prev, type: 'income' }))}
              className={`flex-1 py-2 px-4 rounded-md ${
                transactionData.type === 'income'
                  ? 'bg-green-600 text-white dark:bg-green-500'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setTransactionData(prev => ({ ...prev, type: 'expense' }))}
              className={`flex-1 py-2 px-4 rounded-md ${
                transactionData.type === 'expense'
                  ? 'bg-red-600 text-white dark:bg-red-500'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Transaction Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={transactionData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg p-4"
            />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount (DZD)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                id="amount"
                name="amount"
                required
                min="0"
                step="0.01"
                value={transactionData.amount}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg p-4"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 sm:text-sm">DZD</span>
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={transactionData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg p-4"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={transactionData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg p-4"
            >
              <option value="">Select a category</option>
              {categories[transactionData.type].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={transactionData.notes}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction; 