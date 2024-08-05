import React, { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import ResponseInstance from '@/components/ResponseInstance';
import { QueryResponse } from '@/utils/queryResponseModel';
import SearchBar from '@/components/SearchBar';
import { getEssay, getResponses, insertResponse } from '@/services/supabaseService';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const WritingOutput = () => {
    const router = useRouter();
    const { id } = router.query;
    const [responses, setResponses] = useState<QueryResponse[]>([]);
    const [summary, setSummary] = useState("")


    const populateResponses = (query: unknown, isPara: unknown, paragraph: unknown) => {
        if (isString(query) && isString(isPara) && isString(paragraph)) {
            try {
                const query_response = new QueryResponse(query, isPara, paragraph);
                setResponses((prev) => [...prev, query_response]);

            } catch (error) {
                console.error("Error creating QueryResponse:", error);
            }
        }

    }

    const postResponse = (query: unknown, isPara: unknown, paragraph: unknown) => {
        if (isString(query) && isString(isPara) && isString(paragraph)) {
            populateResponses(query, isPara, paragraph)
            insertResponse(Number(id), Boolean(isPara), paragraph, query)
        }
    }



    const retriveResponses = async (essay_id: number) => {
        let responses = await getResponses(essay_id)
        if (responses == null) return
        for (let i = 0; i < responses.length; i++) {
            populateResponses(responses[i].prompt, String(responses[i].isParaphrased), responses[i].output)
        }
    }

    const retriveEssay = async (essay_id: number, user_id: number) => {
        const essay = await getEssay(user_id, essay_id)
        if (essay == null) return null
        setSummary(essay[0].title)
    }

    useEffect(() => {
        let essay_id = Number(id);
        retriveResponses(essay_id);
        const user_id = Number(localStorage.getItem('id'));
        retriveEssay(essay_id, user_id);

    }, [])


    const isString = (value: unknown): value is string => {
        return typeof value === 'string';
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen px-8 py-4">
            <Header />
            <Sidebar/>                

            <div className="max-w-3xl mx-auto space-y-4">
                <strong className='text-2xl'>{summary}</strong>
                {responses.map((response, index) => (
                    <ResponseInstance key={index} response={response} />
                ))}
            </div>
            <SearchBar isHome={false} onResponse={postResponse} />


        </div>
    );
};

export default WritingOutput;