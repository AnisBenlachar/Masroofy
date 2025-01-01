import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddTransaction from './pages/AddTransaction'
import Navbar from './components/Navbar'
import logo from './assets/logo2.png'
import './App.css'
import { TransactionProvider } from './context/TransactionContext';
import TransactionList from './pages/TransactionList';
import VisualReports from './pages/VisualReports';
import { useDarkMode } from './context/DarkModeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <TransactionProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <header className="bg-white shadow dark:bg-gray-800 relative">
            <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
              <button
                onClick={toggleDarkMode}
                className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              <img 
                src={logo} 
                alt="Masroofy Logo" 
                className="h-32 w-auto mb-4"
              />
              <Navbar />
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/reports" element={<VisualReports />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TransactionProvider>
  );
}

export default App;
