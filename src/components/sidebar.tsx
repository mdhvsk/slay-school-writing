import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface SidebarProps {
 
}

const Sidebar: React.FC<SidebarProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={`fixed top-0 left-0 h-full w-64 z-[10] bg-gray-900 text-white p-8 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button
                    className="absolute top-2 right-2 text-white"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Slay</h2>
                <ul>
                    <li className="mb-2">Home</li>
                    <li className="mb-2">Projects</li>
                    <li className="mb-2">Recents</li>
                    {/* Add more menu items as needed */}
                </ul>      </div>
            <button
                className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg"
                onClick={() => setIsOpen(true)}
            >
                <Menu size={24} />
            </button>
        </>
    );
};

export default Sidebar;