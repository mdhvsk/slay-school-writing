import React, { useState } from 'react';

type StyleMode = 'paraphrase' | 'academic';

interface StyleToggleProps {
  onToggle: (mode: StyleMode) => void;
}

const ParaphraseToggle: React.FC<StyleToggleProps> = ({ onToggle }) => {
  const [mode, setMode] = useState<StyleMode>('paraphrase');

  const handleToggle = () => {
    const newMode = mode === 'paraphrase' ? 'academic' : 'paraphrase';
    setMode(newMode);
    onToggle(newMode);
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <span className={`text-sm font-medium ${mode === 'paraphrase' ? 'text-blue-600' : 'text-gray-500'}`}>
        Paraphrase
      </span>
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          mode === 'academic' ? 'bg-indigo-600' : 'bg-blue-200'
        }`}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            mode === 'academic' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${mode === 'academic' ? 'text-blue-600' : 'text-gray-500'}`}>
        Sound More Academic
      </span>
    </div>
  );
};

export default ParaphraseToggle;