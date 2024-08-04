import { Database } from '@/util/database.types';
import { createClient, SupabaseClient } from '@supabase/supabase-js'

class SupabaseClientSingleton {
  private static instance: SupabaseClientSingleton | null = null;
  private client: SupabaseClient<Database> | null = null;

  private constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    console.log(supabaseUrl, supabaseAnonKey)
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    this.client = createClient(supabaseUrl, supabaseAnonKey);
  }

  public static getInstance(): SupabaseClientSingleton {
    if (!SupabaseClientSingleton.instance) {
      SupabaseClientSingleton.instance = new SupabaseClientSingleton();
    }

    return SupabaseClientSingleton.instance;
  }

  public getClient(): SupabaseClient<Database> {
    if (!this.client) {
      throw new Error('Supabase client is not initialized');
    }
    return this.client;
  }
}

export const getSupabase = () => SupabaseClientSingleton.getInstance().getClient();