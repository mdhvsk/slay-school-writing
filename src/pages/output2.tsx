import React, { useEffect, useState } from 'react';
import { MessageSquare, Copy, RotateCcw, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import router from 'next/router';
import QueryBox from '@/components/query_box';
import Header from '@/components/header';
import ResponseInstance from '@/components/response_instance';
import { QueryResponse } from '@/util/model';

const OutputBlock = () => {
    const { prompt, paraphrase, output, summary } = router.query;

    const [responses, setResponses] = useState<QueryResponse[]>([]);
    const [displayedText, setDisplayedText] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        if(isString(prompt) && isString(paraphrase) && isString(output)){

        try {
            const query_response = new QueryResponse(prompt, paraphrase, output);
            console.log("Created QueryResponse:", query_response);
            setResponses((prev) => [...prev, query_response]);
          } catch (error) {
            console.error("Error creating QueryResponse:", error);
          }
          
        }
          
    }, [])



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
        return typeof value === 'string';
    }

    const handleOnCopy = async () => {
        try {
            if (isString(output)) {
                await navigator.clipboard.writeText(output);
                console.log("Copied");
                setIsCopied(true);
                setTimeout(()=>{
                    setIsCopied(false);
                }, 2000);

            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <Header />
            <div className="max-w-3xl mx-auto space-y-4">
                <strong className='text-2xl'>{summary} HI HI</strong>

                {responses.map((response) => (

                    <ResponseInstance response={response}/>

                ))}

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