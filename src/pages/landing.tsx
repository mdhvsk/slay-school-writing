import React, { ChangeEvent, FormEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Search, ChevronDown, Plus, ExternalLink, Paperclip, ArrowRight } from 'lucide-react';
import ParaphraseToggle from '@/components/paraphrase_toggle';
import Toggle from '@/components/toggle';
import { paraphraseApi, summarizeText } from '@/service/apiCalls';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/loading_spinner';
import Header from '@/components/header';

const HomePage = () => {
    const [formData, setFormData] = useState({
        prompt: '',
        paraphrase: false,
    });
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const messageRef = useRef(null);
    const router = useRouter();
    const [output, setOutput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [summary, setSummary] = useState("")

    const recentChats = [
        { title: 'Extracellular Electrophysiology...', time: '1 hour ago' },
        { title: 'how to install the neccessary ...', time: '4 hours ago' },
        { title: 'Next.js TypeScript Form with Tailwind', time: '5 hours ago' },
        { title: 'Authentication Options for Heroku Apps', time: '16 hours ago' },
        { title: 'Convert File to JavaScript', time: '2 days ago' },
        { title: 'Next.js and Tailwind for Webpage Creation', time: '3 days ago' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'prompt') {
            updateCounts(value);
        }
    };

    const handleToggle = () =>{
        console.log(formData.paraphrase)
        setFormData(prevState => ({
            ...prevState,
            paraphrase: !prevState.paraphrase
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const output_paragraph = await paraphraseApi(formData.prompt, formData.paraphrase)
            const output_summary = await summarizeText(formData.prompt)
            router.push({pathname: '/output', query: {prompt: formData.prompt, paraphrase: formData.paraphrase, output: output_paragraph, summary: output_summary} })
            console.log(output_paragraph)
            setIsLoading(false)

        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
        
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
            <Header/>

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
                    maxLength={600}
                    placeholder="How can we help you Slay school?"
                    className="w-full max-w-[75%] p-6 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                </textarea>
            </div>

            <div className="flex justify-between items-center w-full mx-auto max-w-[75%] mb-2">
                <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-xs">
                    <Paperclip size={16} className="mr-2" />
                    Add content
                </button>
                <div className={`flex items-center text-xs rounded-md text-right ${
          charCount < 600 ? 'text-gray-500' : 'text-red-500'
        }`}>
                    {wordCount} words | {charCount} / 600 chars
                </div>

            </div>

            <div className="flex justify-between items-center mb-4 w-full mx-auto max-w-[75%]">
                <ParaphraseToggle onToggle={handleToggle}/>
                {/* <Toggle isOn={formData.paraphrase} onToggle={handleToggle}/> */}

                <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-md" onClick={handleSubmit}>
                    Slay it!
                    <ArrowRight size={16} className="mr-2" />

                </button>

            </div>
            <div className='flex justify-center items-center mb-8'>
            {isLoading ? (<LoadingSpinner/>) : (<></>)}

            </div>

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