import React, { useEffect, useState } from 'react';
import { MessageSquare, Copy, RotateCcw, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import router, { useRouter } from 'next/router';
import QueryBox from '@/components/query_box';
import Header from '@/components/header';
import ResponseInstance from '@/components/response_instance';
import { QueryResponse } from '@/util/model';
import QueryBox2 from '@/components/query_box2';
import { getEssay, getResponses, insertResponse } from '@/service/supabaseService';
import Sidebar from '@/components/sidebar';

const OutputBlock2 = () => {
    const router = useRouter();
    const { id } = router.query;

    const [responses, setResponses] = useState<QueryResponse[]>([]);
    const [summary, setSummary] = useState("")

    const addResponse = (query: unknown, isPara: unknown, paragraph: unknown) => {
        if (isString(query) && isString(isPara) && isString(paragraph)) {
            try {
                const query_response = new QueryResponse(query, isPara, paragraph);
                console.log("Created QueryResponse:", query_response);
                setResponses((prev) => [...prev, query_response]);

                insertResponse(Number(id), Boolean(isPara), paragraph, query)
            } catch (error) {
                console.error("Error creating QueryResponse:", error);
            }
        }

    }

    const populateResponses = (query: unknown, isPara: unknown, paragraph: unknown) => {
        if (isString(query) && isString(isPara) && isString(paragraph)) {
            try {
                const query_response = new QueryResponse(query, isPara, paragraph);
                console.log("Created QueryResponse:", query_response);
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
            <QueryBox2 isHome={false} onResponse={postResponse} />


        </div>
    );
};

export default OutputBlock2;