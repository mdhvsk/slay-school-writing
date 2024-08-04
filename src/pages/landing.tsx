import React, { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Search, ChevronDown, Plus, ExternalLink, Paperclip, ArrowRight } from 'lucide-react';
import Header from '@/components/header';
import QueryBox from '@/components/query_box';
import Sidebar from '@/components/sidebar';

const HomePage = () => {

    const recentChats = [
        { title: 'Extracellular Electrophysiology...', time: '1 hour ago' },
        { title: 'how to install the neccessary ...', time: '4 hours ago' },
        { title: 'Next.js TypeScript Form with Tailwind', time: '5 hours ago' },
        { title: 'Authentication Options for Heroku Apps', time: '16 hours ago' },
        { title: 'Convert File to JavaScript', time: '2 days ago' },
        { title: 'Next.js and Tailwind for Webpage Creation', time: '3 days ago' },
    ];

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen p-8">
            <Header />

            <Sidebar>
                {/* Sidebar content goes here */}
                
            </Sidebar>
            <h2 className="text-4xl font-light mb-8 flex justify-center">
                Good afternoon, Madhav
            </h2>

            <QueryBox isHome={true} />

            <div className="mb-4 w-full mx-auto max-w-[75%]">
                <h3 className="flex items-center text-lg mb-4">
                    Your recent chats
                    <ChevronDown size={16} className="ml-2" />
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    {recentChats.map((chat, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">{chat.title}</h4>
                            <p className="text-sm text-gray-400">{chat.time}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-right w-full mx-auto max-w-[75%]">
                <a href="#" className="text-blue-400 hover:underline flex items-center justify-end">
                    View all
                    <ExternalLink size={16} className="ml-1" />
                </a>
            </div>
        </div>
    );
};

export default HomePage;