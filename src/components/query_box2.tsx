import React, { FormEvent, useEffect, useRef, useState } from 'react'
import ParaphraseToggle from './paraphrase_toggle';
import { ArrowRight, Paperclip, Sparkle, Sparkles } from 'lucide-react';
import LoadingSpinner from './loading_spinner';
import { paraphraseApi, summarizeText } from '@/service/apiCalls';
import { useRouter } from 'next/router';

interface Props {
    isHome: boolean
    onResponse: (prompt: string, isParaphrase: string, paragraph: string) => void
}

const QueryBox2: React.FC<Props> = ({ isHome, onResponse }) => {
    const [formData, setFormData] = useState({
        prompt: '',
        paraphrase: false,
    });

    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        if (file.type === 'application/pdf') {
            // For PDF files, we need to use a PDF.js or similar library
            console.log('PDF files require additional processing');
            // Implement PDF reading logic here
        } else {
            const text = await readFileContent(file);
            setFormData(prevState => ({
                ...prevState,
                ["prompt"]: text
            }));
            updateCounts(text)
        }
    };

    const readFileContent = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target?.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };
    const updateCounts = (text: String) => {
        setCharCount(text.length);
        setWordCount(text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
    };

    const handleToggle = () => {
        console.log(formData.paraphrase)
        setFormData(prevState => ({
            ...prevState,
            paraphrase: !prevState.paraphrase
        }));
    }

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

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            setIsLoading(true)

            if(formData.prompt.length > 600 || formData.prompt.length == 0) {
                setIsLoading(false)

                return 
            }
            const output_paragraph = await paraphraseApi(formData.prompt, formData.paraphrase);

            if (isHome) {
                const output_summary = await summarizeText(formData.prompt);
                router.push({ pathname: '/output2', query: { prompt: formData.prompt, paraphrase: formData.paraphrase, output: output_paragraph, summary: output_summary } });
            } else {
                onResponse(formData.prompt, String(formData.paraphrase), output_paragraph)
                setFormData(prevState => ({
                    ...prevState,
                    ["prompt"]: ""
                }));
            }

            console.log(output_paragraph)
            setIsLoading(false);

        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }

    }

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

    const handleFileClick = () => {
        fileInputRef.current?.click();
      };

    return (
        <div className='max-w-3xl mx-auto space-y-2 '>

            <div className="flex flex-col items-center justify-center space-x-2 ">
                <textarea
                    id="prompt"
                    name="prompt"
                    onChange={handleChange}
                    value={formData.prompt}
                    ref={messageRef}
                    placeholder="Write a paragraph and press 'SLAY IT'"
                    className="w-full p-6 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                </textarea>
            </div>

            <div className="flex justify-between items-center space-x-2">
                <input
                    type="file"
                    accept=".txt,.docx,.pdf,.doc"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="sr-only"
                />
                <div className='flex items-center'>
                <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-xs mr-2" onClick={handleFileClick}>
                    <Paperclip size={16} className="mr-2" />
                    Add content
                </button>
                {fileName && <p className="py-2">Selected file: {fileName}</p>}

                </div>

                <div className={`flex items-center text-xs rounded-md text-right ${charCount < 601 ? 'text-gray-500' : 'text-red-500'
                    }`}>
                    {wordCount} words | {charCount} chars
                </div>

            </div>

            <div className="flex justify-between items-center space-x-2">
                <ParaphraseToggle onToggle={handleToggle} />

                <button className="flex items-center bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-md text-md" onClick={handleSubmit}>
                    SLAY IT
                    <Sparkles size={16} className="mx-2" />

                </button>

            </div>
            <div className='flex justify-center items-center mb-8'>
                {isLoading && (<LoadingSpinner />)}
            </div>
        </div>
    )
}

export default QueryBox2