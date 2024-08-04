import axios from "axios"


const paraphraseText = async (prompt: String, paraphrase: boolean) => {

    const url = `api/paraphrase`
    console.log(url)
    try {
        const response = await axios.post(url, {"prompt": prompt, "paraphrase": paraphrase}, {
            headers: {
              'Content-Type': 'application/json',
            }})
        return response.data.message.message.content
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
            throw new Error(error.response?.data?.message || 'An error occurred while updating the user');
          } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
          }
    }

}


const summarizeText = async (prompt: string) => {
  const url = `api/summarize`
    console.log(url)
    try {
        const response = await axios.post(url, {"prompt": prompt}, {
            headers: {
              'Content-Type': 'application/json',
            }})
        return response.data.message.message.content
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
            throw new Error(error.response?.data?.message || 'An error occurred while updating the user');
          } else {
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
          }
    }
}

export {paraphraseText as paraphraseApi, summarizeText}
