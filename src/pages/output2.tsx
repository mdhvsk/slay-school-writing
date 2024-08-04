import React, { useEffect, useState } from 'react';
import { MessageSquare, Copy, RotateCcw, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import router from 'next/router';
import QueryBox from '@/components/query_box';
import Header from '@/components/header';
import ResponseInstance from '@/components/response_instance';
import { QueryResponse } from '@/util/model';
import QueryBox2 from '@/components/query_box2';

const OutputBlock = () => {
    const { prompt, paraphrase, output, summary } = router.query;

    const [responses, setResponses] = useState<QueryResponse[]>([]);
    const [displayedText, setDisplayedText] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);


    const addResponse = (query: unknown, isPara: unknown, paragraph: unknown) =>{
        if(isString(query) && isString(isPara) && isString(paragraph)){
            try {
                const query_response = new QueryResponse(query, isPara, paragraph);
                console.log("Created QueryResponse:", query_response);
                setResponses((prev) => [...prev, query_response]);
              } catch (error) {
                console.error("Error creating QueryResponse:", error);
              }
        }
    }
    useEffect(() => {
        addResponse(prompt, paraphrase, output)
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

    return (
        <div className="bg-gray-900 text-white min-h-screen px-8 py-4">
            <Header />
            <div className="max-w-3xl mx-auto space-y-4">
                <strong className='text-2xl'>{summary}</strong>

                {responses.map((response) => (
                    <ResponseInstance response={response}/>
                ))}

                <div className="pb-2 flex justify-between items-center text-gray-400 text-sm ">
                    <div className="flex space-x-2">
                    {isCopied && (<p className='text-gray-500 animate-fade-in-out'>Copied!</p>)}
                    </div>
                </div>

            </div>
            <QueryBox2 isHome={false} onResponse={addResponse}/>


        </div>
    );
};

export default OutputBlock;