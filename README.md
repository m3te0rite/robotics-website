# Robotics Team Website

## Local development

Install dependencies and start the SvelteKit server:

```sh
npm install
npm run dev
```

## Admin and content storage

The `/admin` page is protected by a server-verified password. Content is stored in Supabase and is shared with every visitor. Create a Supabase project and run [`supabase/schema.sql`](supabase/schema.sql) in its SQL editor. If you already ran the earlier version, run this updated script again; it is safe to rerun and also creates the public image bucket needed by the editor. Images can be PNG, JPG, or WebP up to 3 MB. Add these variables to `.env` locally and to the Vercel project's environment settings:

- `SUPABASE_URL`: project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: service-role key; server-only, never use it in client code.
- `ADMIN_PASSWORD`: a private password that you do not reuse on another site.

Copy `.env.example` as a starting point. Admin sessions are signed using a derived key from the Supabase service-role key, so no extra session-secret variable is needed. Do not commit `.env` or expose the Supabase service-role key. The Vercel adapter deploys SvelteKit endpoints as serverless functions; deploy this project to Vercel after configuring the environment variables.
