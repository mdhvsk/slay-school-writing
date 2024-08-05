import React, { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import ResponseInstance from '@/components/ResponseInstance';
import { QueryResponse } from '@/utils/queryResponseModel';
import SearchBar from '@/components/SearchBar';
import { getEssay, getResponses, insertResponse } from '@/services/supabaseService';
import SidebarComponent from '@/components/SidebarComponent';
import HeaderComponent from '@/components/HeaderComponent';

const WritingOutput = () => {
    const router = useRouter();
    const { id } = router.query;
    const [responses, setResponses] = useState<QueryResponse[]>([]);
    const [summary, setSummary] = useState("")

    const populateResponses = (query: string, isPara: string, paragraph: string) => {
            try {
                const query_response = new QueryResponse(query, isPara, paragraph);
                setResponses((prev) => [...prev, query_response]);
            } catch (error) {
                console.error("Error creating QueryResponse:", error);
            }
    
    }

    const postResponse = (query: string, isPara: string, paragraph: string) => {
            populateResponses(query, isPara, paragraph)
            insertResponse(Number(id), Boolean(isPara), paragraph, query)
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
        setResponses([])
        retriveResponses(essay_id);
        const user_id = Number(localStorage.getItem('id'));
        retriveEssay(essay_id, user_id);

    }, [id])

    return (
        <div className="bg-gray-900 text-white min-h-screen px-8 py-4">
            <HeaderComponent />
            <SidebarComponent/>                

            <div className="max-w-3xl mx-auto space-y-4">
                <strong className='text-2xl'>{summary}</strong>
                {responses.map((response, index) => (
                    <ResponseInstance key={index} response={response} isNew={index === responses.length - 1}/>
                ))}
            </div>
            <SearchBar isHome={false} onResponse={postResponse} />


        </div>
    );
};

export default WritingOutput;