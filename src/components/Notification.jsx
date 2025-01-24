import React from 'react';

const Notification = ({ message, type, isVisible }) => {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-500 z-50 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      <p className="text-white font-medium">{message}</p>
    </div>
  );
};

export default Notification;