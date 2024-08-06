import React, { useState } from 'react';

interface SegmentedButtonProps {
    onToggle: () => void;
}

const SegmentedButton: React.FC<SegmentedButtonProps> = ({ onToggle }) => {
  const [mode, setMode] = useState(false);

  const handleClick = () => {
    setMode(!mode);
    onToggle();
  };

  return (
    <div className="inline-flex rounded-full shadow-sm" role="group">
      <button
        type="button"
        className={`px-2 py-1 text-xs font-medium rounded-l-full ${
          mode
            ? 'bg-blue-700 text-white'
            : 'bg-white text-gray-900 hover:bg-gray-100'
        } border border-gray-200`}
        onClick={handleClick}
      >
        Paraphrase
      </button>
      <button
        type="button"
        className={`px-2 py-1 text-xs font-medium rounded-r-full ${
          !mode
            ? 'bg-blue-700 text-white'
            : 'bg-white text-gray-900 hover:bg-gray-100'
        } border border-gray-200 border-l-0`}
        onClick={handleClick}
      >
        Academic
      </button>
    </div>
  );
};

export default SegmentedButton;