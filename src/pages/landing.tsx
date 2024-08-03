import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Search, ChevronDown, Plus, ExternalLink, Paperclip, ArrowRight } from 'lucide-react';
import ParaphraseToggle from '@/components/paraphrase_toggle';

interface formData {
    prompt: String,
    paraphrase: boolean,
}
const ClaudeDashboard = () => {
    const [formData, setFormData] = useState({
        prompt: '',
        paraphrase: true,
    });
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const messageRef = useRef(null);



    const recentChats = [
        { title: 'Extracellular Electrophysiology...', time: '1 hour ago' },
        { title: 'how to install the neccessary ...', time: '4 hours ago' },
        { title: 'Next.js TypeScript Form with Tailwind', time: '5 hours ago' },
        { title: 'Authentication Options for Heroku Apps', time: '16 hours ago' },
        { title: 'Convert File to JavaScript', time: '2 days ago' },
        { title: 'Next.js and Tailwind for Webpage Creation', time: '3 days ago' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'prompt') {
            updateCounts(value);
        }
    };

    const handleSubmit = () => {
        console.log("Form data: " + formData.prompt)
    }

    const updateCounts = (text: String) => {
        setCharCount(text.length);
        setWordCount(text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [formData.prompt]);

    const adjustTextareaHeight = () => {
        const textarea = messageRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };


    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">Slay</h1>
                <div className="bg-gray-700 px-3 py-1 rounded-full text-sm">Writing Tool</div>
            </header>

            <h2 className="text-4xl font-light mb-8 flex justify-center">
                Good afternoon, Madhav
            </h2>


            <div className="flex flex-col items-center justify-center w-full mb-4">
                <textarea
                    id="prompt"
                    name="prompt"
                    onChange={handleChange}
                    value={formData.prompt}
                    ref={messageRef}
                    placeholder="How can we help you Slay school?"
                    className="w-full max-w-[75%] p-6 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                </textarea>
            </div>

            <div className="flex justify-between items-center mb-4 ">
                <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-xs">
                    <Paperclip size={16} className="mr-2" />
                    Add content
                </button>
                <div className="flex items-center text-gray-500 text-xs px-4 py-2 rounded-md">
                    {wordCount} words | {charCount} chars
                </div>

            </div>

            <div className="flex justify-between items-center mb-4 ">
                <ParaphraseToggle onToggle={()=>{console.log("Toggle Changed")}}/>
                <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-md" onClick={handleSubmit}>
                    Slay it!
                    <ArrowRight size={16} className="mr-2" />

                </button>

            </div>

            <div className="mb-4">
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

            <div className="text-right">
                <a href="#" className="text-blue-400 hover:underline flex items-center justify-end">
                    View all
                    <ExternalLink size={16} className="ml-1" />
                </a>
            </div>
        </div>
    );
};

export default ClaudeDashboard;