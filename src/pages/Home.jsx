import { useTransactions } from '../context/TransactionContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { transactions } = useTransactions();
  const navigate = useNavigate();

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpenses;

  const handleAddTransaction = (type) => {
    navigate('/add-transaction', { state: { transactionType: type } });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Income</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">
              ${totalIncome.toFixed(2)}
            </dd>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</dt>
            <dd className="mt-1 text-3xl font-semibold text-red-600 dark:text-red-400">
              ${totalExpenses.toFixed(2)}
            </dd>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Balance</dt>
            <dd className={`mt-1 text-3xl font-semibold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
              ${balance.toFixed(2)}
            </dd>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button 
              onClick={() => handleAddTransaction('income')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Add New Income
            </button>
            <button 
              onClick={() => handleAddTransaction('expense')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Add New Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 