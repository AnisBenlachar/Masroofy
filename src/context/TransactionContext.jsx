import { createContext, useContext, useState, useEffect } from 'react';

const TransactionContext = createContext();

const STORAGE_KEY = 'masroofy_transactions';

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [notification, setNotification] = useState({ show: false, message: '' });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    setNotification({ 
      show: true, 
      message: 'Transaction added successfully!',
      type: 'success'
    });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    setNotification({ 
      show: true, 
      message: 'Transaction deleted successfully!',
      type: 'success'
    });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, ...updatedTransaction } : t
    ));
    setNotification({ 
      show: true, 
      message: 'Transaction updated successfully!',
      type: 'success'
    });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      addTransaction, 
      deleteTransaction, 
      editTransaction,
      notification 
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
} 