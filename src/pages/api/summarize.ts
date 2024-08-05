import type { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '@/utils/openai';
import { summarize_content_system, summarize_content_user} from '@/utils/prompts';
type ResponseData = {
    message: Object
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { prompt } = req.body

    try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system", content: summarize_content_system
                    },
                    {
                        role: "user", content: summarize_content_user + prompt
                    }
                ],
            });
            res.status(200).json({ message: completion.choices[0] })


    } catch (e) {
        console.error('Error:', e);

        return res.status(500).json({ message: "Error occured: " + e })
    }



}