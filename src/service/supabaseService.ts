import { getSupabase } from "./supabaseClient"

const getUserByEmail = async (email: String) => {
    
    const supabase = getSupabase()
    console.log("reached get user function")

    console.log(email)
    try {
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        return data
    } catch (err) {
        console.log(err)
    }
}

export {getUserByEmail}