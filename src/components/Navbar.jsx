import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="mt-4 flex justify-center w-full">
      <ul className="flex space-x-4">
        <li>
          <Link 
            to="/" 
            className={`${
              location.pathname === '/' 
                ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/add-transaction" 
            className={`${
              location.pathname === '/add-transaction' 
                ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Add Transaction
          </Link>
        </li>
        <li>
          <Link 
            to="/transactions" 
            className={`${
              location.pathname === '/transactions' 
                ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Transaction List
          </Link>
        </li>
        <li>
          <Link 
            to="/reports" 
            className={`${
              location.pathname === '/reports' 
                ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Visual Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 