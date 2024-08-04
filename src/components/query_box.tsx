import React, { useRef, useState } from 'react'
import ParaphraseToggle from './paraphrase_toggle';
import { ArrowRight, Paperclip } from 'lucide-react';

interface Props {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    handleToggle: () => void
    handleSubmit: () => void
}

const QueryBox: React.FC<Props> =({handleChange, handleToggle, handleSubmit}) => {
    const [formData, setFormData] = useState({
        prompt: '',
        paraphrase: false,
    });
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const messageRef = useRef(null);

  return (
    <div className='max-w-3xl mx-auto space-y-4 '>
        
        <div className="flex flex-col items-center justify-center space-x-2 ">
                <textarea
                    id="prompt"
                    name="prompt"
                    onChange={handleChange}
                    value={formData.prompt}
                    ref={messageRef}
                    placeholder="How can we help you Slay school?"
                    className="w-full p-6 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                </textarea>
            </div>

            <div className="flex justify-between items-center space-x-2">
                <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-xs">
                    <Paperclip size={16} className="mr-2" />
                    Add content
                </button>
                <div className="flex items-center text-gray-500 text-xs rounded-md text-right">
                    {wordCount} words | {charCount} chars
                </div>

            </div>

            <div className="flex justify-between items-center space-x-2">
                <ParaphraseToggle onToggle={handleToggle}/>

                <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-md" onClick={handleSubmit}>
                    Slay it!
                    <ArrowRight size={16} className="mr-2" />

                </button>

            </div>
    </div>
  )
}

export default QueryBox