import type { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '@/util/openai';
import { academic_content_system, academic_content_user, paraphrase_content_system, paraphrase_content_user } from '@/util/prompts';
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

    const { prompt, paraphrase } = req.body

    try {
        if (paraphrase === "true") {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",

                messages: [
                    {
                        role: "system", content: paraphrase_content_system
                    },
                    {
                        role: "user", content: paraphrase_content_user + prompt
                    }

                ],
            });
            res.status(200).json({ message: completion.choices[0] })

        } else {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",

                messages: [
                    {
                        role: "system", content: academic_content_system
                    },
                    {
                        role: "user", content: academic_content_user + prompt
                    }
                ]
            });

            res.status(200).json({ message: completion.choices[0] })

        }
    } catch (e) {
        console.error('Error:', e);

        return res.status(500).json({ message: "Error occured: " + e })
    }



}