const { createClient } = require("@supabase/supabase-js");

const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
// Create a single supabase client for interacting with your database
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdminClient = createClient(supabaseUrl, supabaseServiceRoleKey);

module.exports = { supabaseClient, supabaseAdminClient };
