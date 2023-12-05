import { createClient } from '@supabase/supabase-js';

export const sbURL = import.meta.env.VITE_APP_SUPABASE_URL;
export const sbKey = import.meta.env.VITE_APP_SUPABASE_KEY;

export const sbClient = createClient(sbURL, sbKey);
