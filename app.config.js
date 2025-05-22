// app.config.js
import 'dotenv/config'

export default {
  expo: {
    name: 'SAID_ILYSB',
    slug: 'saidilysb',
    scheme: 'saidilysb',
    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
    },
  },
}