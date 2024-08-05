import React, { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Search, ChevronDown, Plus, ExternalLink, Paperclip, ArrowRight } from 'lucide-react';
import Header from '@/components/header';
import QueryBox from '@/components/query_box';
import Sidebar from '@/components/sidebar';
import QueryBox2 from '@/components/query_box2';
import { getUserByEmail } from '@/service/supabaseService';

const HomePage = () => {
    const [name, setName] = useState('')

    const recentChats = [
        { title: 'Extracellular Electrophysiology...', time: '1 hour ago' },
        { title: 'how to install the neccessary ...', time: '4 hours ago' },
        { title: 'Next.js TypeScript Form with Tailwind', time: '5 hours ago' },
        { title: 'Authentication Options for Heroku Apps', time: '16 hours ago' },
        { title: 'Convert File to JavaScript', time: '2 days ago' },
        { title: 'Next.js and Tailwind for Webpage Creation', time: '3 days ago' },
    ];


    useEffect(() => {
        let name = localStorage.getItem('firstName')
        if (name != null){
            setName(name)
        }
    }, [])
    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen p-8">
            <Header />

            <Sidebar/>                
            <h2 className="text-4xl font-light mb-8 flex justify-center">
                Hi {name}!
            </h2>
            <QueryBox2 isHome={true} onResponse={()=>{}} />

            <div className="max-w-3xl mx-auto space-y-2 my-4">
                <h3 className="flex items-center text-lg mb-4">
                    Your recent essays
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

            <div className="max-w-3xl mx-auto space-y-2 ">
                <a href="#" className="text-blue-400 hover:underline flex items-center justify-end">
                    View all
                    <ExternalLink size={16} className="ml-1" />
                </a>
            </div>
        </div>
    );
};

export default HomePage;