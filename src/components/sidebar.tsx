import React, { useEffect, useState } from 'react';
import { CirclePlus, Menu, PanelLeft, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { Database, Tables } from '@/utils/database.types';
import { getEssays } from '@/services/supabaseService';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setLogoutUser } from '@/services/apiService';
import Image from 'next/image';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [essays, setEssays] = useState<Tables<'essays'>[]>([])
    const router = useRouter();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    useEffect(() => {
        let fName = localStorage.getItem('firstName')
        let lName = localStorage.getItem('lastName')

        if (fName != null && lName != null) {
            setFirstName(fName)
            setLastName(lName)
        }

        const fetchEssays = async () => {
            const user_id = Number(localStorage.getItem('id'))
            const data = await getEssays(user_id)
            setEssays(data?.reverse() || [])
        };
        fetchEssays();

    }, [])

    const handleClickEssay = (essay_id: number) => {
        router.push({ pathname: '/writing', query: { id: String(essay_id) } })
    }

    const handleNewEssay = () => {
        router.push({ pathname: '/landing' })
    }
    const handleLogout = () => {
        setLogoutUser()
        router.push({ pathname: '/login', })

    }
    return (
        <>
            <div className={`fixed top-0 left-0 h-full w-64 z-[10] bg-gray-800 text-white p-8 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button
                    className="absolute top-8 right-6 text-white "
                    onClick={() => setIsOpen(false)}>

                    <X size={24} />
                </button>


                <h2 className="text-2xl mb-8">
                    <Image src="/slay-white.png" alt="Slay Logo" width={64} height={32} />
                </h2>
                <button className='flex text-blue-500 font-medium hover:text-blue-400' onClick={() => { handleNewEssay() }}><CirclePlus className='mr-2' size={24} />New Essay</button>
                <ul>

                    <li className='font-medium mb-4 mt-6 text-gray-400'>Previous Essays</li>
                    {essays.map((essay) => (
                        <li key={essay.id} className='mb-4 hover:bg-gray-500' onClick={() => handleClickEssay(essay.id)}>{essay.title.substring(0, 20)}...</li>
                    ))}

                </ul>
                <button
                    className="fixed bottom-4 p-2 right-4 bg-gray-900 text-white p-2 rounded-full shadow-lg   hover:bg-gray-700"
                    onClick={handleLogout}>
                    Logout
                </button>
                <button
                    className="fixed bottom-4 left-4 bg-gray-900 text-white p-2 rounded-full shadow-lg"
                    onClick={() => setIsOpen(false)} >
                    <PanelLeftClose size={24} />
                </button>
                <div className='fixed bottom-16 right-4 bg-gray-800 text-white p-2'>
                    {firstName} {lastName}
                </div>

            </div>
            <button
                className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg"
                onClick={() => setIsOpen(false)}>
                <PanelLeftClose size={24} />
            </button>
            <button
                className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg"
                onClick={() => setIsOpen(true)}>
                <PanelLeftOpen size={24} />
            </button>
        </>
    );
};

export default Sidebar;