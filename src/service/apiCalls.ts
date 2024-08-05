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


const setLoginUser = (firstName: string, lastName: string, id: number, email: string) => {
  localStorage.setItem('firstName', firstName)
  localStorage.setItem('lastName', lastName)
  localStorage.setItem('id', id.toString())
  localStorage.setItem('email', email)
}

const setLogoutUser = (firstName: string, lastName: string, id: number, email: string) => {
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')
  localStorage.removeItem('id')
  localStorage.removeItem('email')

}
export {paraphraseText as paraphraseApi, summarizeText, setLoginUser, setLogoutUser}
