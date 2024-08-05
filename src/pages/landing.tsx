import React, {useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import { getEssays } from '@/services/supabaseService';
import { Tables } from '@/utils/database.types';
import LoadingSpinner from '@/components/LoadingSpinner';

const HomePage = () => {
    const [name, setName] = useState('')
    const [essays, setEssays] = useState<Tables<'essays'>[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const getRelativeTimeString = (timestamp: string): string  =>{
        const now = new Date();
        const past = new Date(timestamp);
        const diffInMilliseconds = now.getTime() - past.getTime();
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        } else {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        }
    }

    useEffect(() => {
        setIsLoading(true)
        let fName = localStorage.getItem('firstName')
        
        if (fName != null) {
            setName(fName)
        }
        const fetchEssays = async () => {
            const user_id = Number(localStorage.getItem('id'))
            const data = await getEssays(user_id)
            setEssays(data?.reverse() || [])
            setIsLoading(false)
        };
        fetchEssays();

    }, [])
    
    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen p-8">
            <Header />
            <Sidebar />
            <h2 className="text-4xl font-light mb-8 flex justify-center">
                Hi {name}!
            </h2>
            <SearchBar isHome={true} onResponse={() => { }} />

            <div className="max-w-3xl mx-auto space-y-2 my-4">
                <h3 className="flex items-center text-lg mb-4">
                    Your recent essays
                    <ChevronDown size={16} className="ml-2 mr-8" />
                    {isLoading && <LoadingSpinner/> }

                </h3>

                <div className="grid grid-cols-3 gap-4">

                    {essays.slice(0, 6).map((essay, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">{essay.title}</h4>
                            <p className="text-sm text-gray-400">{getRelativeTimeString(essay.last_modified_at)}</p>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default HomePage;