function Notification({ show, message, type = 'success' }) {
  if (!show) return null;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`}>
      {message}
    </div>
  );
}

export default Notification; 