import React from 'react';



interface StyleToggleProps {
    onToggle: () => void;
    isOn: boolean
  }
const Toggle: React.FC<StyleToggleProps> = ({ isOn, onToggle }) => {
  return (
    <div className="flex items-center">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={isOn}
            onChange={onToggle}
          />
          <div className={`block w-14 h-8 rounded-full ${
            isOn ? 'bg-blue-600' : 'bg-gray-600'
          }`}></div>
          <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
            isOn ? 'transform translate-x-full' : ''
          }`}></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">
          {isOn ? 'On' : 'Off'}
        </div>
      </label>
    </div>
  );
};

export default Toggle;