import { getSupabase } from "./supabaseClient"

const getUserByEmail = async (email: String) => {
    
    const supabase = getSupabase();
    try {
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email);
        if (error) throw error

        return data;
    } catch (err) {
        console.log(err);
    }
}

const insertEssay = async (user_id: number, title: string) => {
    const requestBody = {
        user_id: user_id,
        title: title
    }
    const supabase = getSupabase();
    try{
        const {data, error} = await supabase 
        .from('essays')
        .insert([requestBody])
        .select()
        .single()

        if (error) throw error
        return data

    } catch (err) {
        console.log(err)
    }

}

const getEssays = async(user_id: number) => {
    const supabase = getSupabase();
    try {
        const { data, error } = await supabase
        .from('essays')
        .select('*')
        .eq('user_id', user_id);
        if (error) throw error
        return data;
    } catch (err) {
        console.log(err);
    }

}

const getEssay = async(user_id: number, essay_id: number) => {
    const supabase = getSupabase();
    try {
        const { data, error } = await supabase
        .from('essays')
        .select('*')
        .eq('user_id', user_id)
        .eq('id', essay_id);

        if (error) throw error
        return data;
    } catch (err) {
        console.log(err);
    }

}

const insertResponse = async (essay_id: number, isParaphrased: boolean, output: string, prompt: string) => {
    enum LikeStatus {
        Like = "like",
        Dislike = "dislike",
        Null = "null"
      }
    const requestBody = {
        essay_id: essay_id,
        isParaphrased: isParaphrased,
        output: output,
        prompt: prompt,
        like: LikeStatus.Null
    }
    const supabase = getSupabase();

    try{
        const {data, error} = await supabase 
        .from('responses')
        .insert([requestBody])
        .select()
        .single()

        if (error) throw error
        return data

    } catch (err) {
        console.log(err)
    }
}

const getResponses = async(essay_id: number) => {
    const supabase = getSupabase();
    try{
        const {data, error} = await supabase 
        .from('responses')
        .select('*')
        .eq('essay_id', essay_id)

        if (error) throw error
        return data

    } catch (err) {
        console.log(err)
    }

}

export {getUserByEmail, insertEssay, insertResponse, getEssay, getEssays, getResponses}