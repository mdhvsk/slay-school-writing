import React, { useState } from 'react';

interface StyleToggleProps {
  onToggle: () => void;
}

const ParaphraseToggle: React.FC<StyleToggleProps> = ({ onToggle }) => {
  const [mode, setMode] = useState<boolean>(false);

  const handleToggle = () => {
    setMode(!mode);
    onToggle();
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <span className={`text-sm font-medium ${mode === true ? 'text-blue-600' : 'text-gray-500'}`}>
        Paraphrase
      </span>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          mode === false ? 'bg-indigo-600' : 'bg-blue-200'
        }`}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            mode === false ? 'translate-x-6' : 'translate-x-1'
          } `}
        />
      </button>
      <span className={`text-sm font-medium ${mode === false ? 'text-blue-600' : 'text-gray-500'}`}>
        Sound More Academic
      </span>
    </div>
  );
};

export default ParaphraseToggle;