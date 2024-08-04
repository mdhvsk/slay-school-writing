import React, { useEffect, useState } from 'react';
import { MessageSquare, Copy, RotateCcw, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import router from 'next/router';
import QueryBox from '@/components/query_box';
import Header from '@/components/header';

const OutputBlock = () => {
    const { prompt, paraphrase, output, summary } = router.query;

    const [displayedText, setDisplayedText] = useState('');
    const [isCopied, setIsCopied] = useState(false)

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isString(output) && currentIndex < output.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + output[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, 10);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, output, 10]);


    const isString = (value: unknown): value is string => {
        return typeof value === 'string'
    }
    const handleOnCopy = async () => {
        try {
            if (isString(output)) {
                await navigator.clipboard.writeText(output);
                console.log("Copied")
                setIsCopied(true)
                setTimeout(()=>{
                    setIsCopied(false)
                }, 2000)

            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <Header />
            <div className="max-w-3xl mx-auto space-y-4">
                <strong className='text-2xl'>{summary}</strong>
                {/* User message */}
                <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold">MA</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 flex-grow">
                    <h2><strong>Your prompt:</strong></h2>
                        <p>{prompt}</p>
                    </div>
                </div>

                {/* Assistant message */}
                <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 flex-grow">
                        {paraphrase == "true" ? (<h2><strong>Paraphrase Results:</strong></h2>) : (<h2><strong>Academic Results:</strong></h2>)} 
                        <div className="mb-4">
                            {displayedText}
                            <span className="animate-pulse">|</span>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center text-gray-400 text-sm ">
                    <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-700 rounded" onClick={handleOnCopy}><Copy className="w-4 h-4" /></button>

                        <button className="p-1 hover:bg-gray-700 rounded"><RotateCcw className="w-4 h-4" /></button>
                    </div>

                    <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-700 rounded"><ThumbsUp className="w-4 h-4" /></button>
                        <button className="p-1 hover:bg-gray-700 rounded"><ThumbsDown className="w-4 h-4" /></button>
                    </div>
                </div>

                <div className="pb-8 flex justify-between items-center text-gray-400 text-sm ">
                    <div className="flex space-x-2">
                    {isCopied && (<p className='text-gray-500 animate-fade-in-out'>Copied!</p>)}
                    </div>

                    <div className="flex space-x-2">
                    {/* {isCopied && (<p className='text-gray-500 animate-fade-in-out'>Copied!</p>)} */}
                    {/* {isCopied && (<p className='text-gray-500 animate-fade-in-out'>Copied!</p>)} */}
                    </div>
                </div>

            </div>
            <QueryBox isHome={false}/>


        </div>
    );
};

export default OutputBlock;