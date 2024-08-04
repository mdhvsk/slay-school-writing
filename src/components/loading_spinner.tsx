import React from 'react';

const LoadingSpinner = ({ size = 40, color = '#007bff' }) => {
  return (
    <div
      className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: color,
        borderTopColor: 'transparent',
      }}
    />
  );
};

export default LoadingSpinner;