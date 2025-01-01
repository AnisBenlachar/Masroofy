import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { 
  Chart as ChartJS, 
  ArcElement, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend 
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VisualReports() {
  const { transactions } = useTransactions();
  const [timeRange, setTimeRange] = useState('month'); // 'month', 'year', 'all'

  // Helper function to filter transactions by time range
  const filterTransactionsByTime = (transactions) => {
    const now = new Date();
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      if (timeRange === 'month') {
        return transactionDate.getMonth() === now.getMonth() &&
               transactionDate.getFullYear() === now.getFullYear();
      } else if (timeRange === 'year') {
        return transactionDate.getFullYear() === now.getFullYear();
      }
      return true; // 'all' time range
    });
  };

  // Prepare data for expense categories pie chart
  const prepareExpensePieData = () => {
    const filteredTransactions = filterTransactionsByTime(transactions);
    const expensesByCategory = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    return {
      labels: Object.keys(expensesByCategory),
      datasets: [{
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
        ],
      }],
    };
  };

  return (
    <div className="space-y-6">
      {/* Time Range Filter */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Financial Reports</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-md ${
              timeRange === 'month'
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 rounded-md ${
              timeRange === 'year'
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            This Year
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className={`px-4 py-2 rounded-md ${
              timeRange === 'all'
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
          <p className="text-xl font-semibold text-green-600 dark:text-green-400">
            ${filterTransactionsByTime(transactions)
              .filter(t => t.type === 'income')
              .reduce((acc, t) => acc + t.amount, 0)
              .toFixed(2)}
          </p>
        </div>

        {/* Expenses Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
          <p className="text-xl font-semibold text-red-600 dark:text-red-400">
            ${filterTransactionsByTime(transactions)
              .filter(t => t.type === 'expense')
              .reduce((acc, t) => acc + t.amount, 0)
              .toFixed(2)}
          </p>
        </div>

        {/* Savings Rate Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Savings Rate</p>
          <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            {((transactions
              .filter(t => t.type === 'income')
              .reduce((acc, t) => acc + t.amount, 0) -
              transactions
              .filter(t => t.type === 'expense')
              .reduce((acc, t) => acc + t.amount, 0)) /
              transactions
              .filter(t => t.type === 'income')
              .reduce((acc, t) => acc + t.amount, 0) * 100
            ).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Expense Categories</h3>
        <div className="h-64">
          <Pie 
            data={prepareExpensePieData()} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    color: document.documentElement.classList.contains('dark') ? 'white' : 'black'
                  }
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
}

export default VisualReports; 