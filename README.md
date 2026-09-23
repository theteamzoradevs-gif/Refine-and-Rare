# Refine & Rare

Premium luxury interior design website + admin CMS for **Refine & Rare** (Bengaluru).

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- PostgreSQL + Prisma (Supabase recommended)
- JWT admin auth (httpOnly cookie)
- Cloudinary (optional) for media uploads
- Resend (optional) for enquiry emails

## Quick start

The public site runs **without a database** using static content.

1. Copy env:

```bash
cp .env.example .env
```

2. Install and run:

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)

### Enable CMS with Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. **Project Settings → Database → Connection string → URI**
3. Put the URI in `.env` as `DATABASE_URL`
   - Prefer the **direct** connection (port `5432`) for `db:push` / `db:seed`
   - Prefer the **Transaction pooler** (port `6543`, `?pgbouncer=true`) on Vercel
4. Set `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`
5. Push schema and seed:

```bash
npm run db:setup
```

6. Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default admin (from `.env` / seed):

- Email: `admin@refineandrare.com`
- Password: `admin123` (change via `ADMIN_PASSWORD` before seeding)

CMS covers: **Projects**, **Services**, **Blogs**, **Testimonials**, **Enquiries**, **Settings**.

## Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Supabase/Postgres connection string — omit to run without DB |
| `DATABASE_ENABLED` | Set `false` to force-disable even if `DATABASE_URL` is set |
| `JWT_SECRET` | Admin session signing secret |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin credentials |
| `RESEND_API_KEY` | Optional — enquiry email delivery |
| `ENQUIRY_TO_EMAIL` | Inbox for enquiries |
| `CLOUDINARY_*` | Optional — otherwise uploads go to `/public/uploads` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO |

## Brand assets

Logo, cover, service images, gallery photos, and project video under `public/brand/`.

## Deploy (Vercel)

1. Push to GitHub and import into Vercel
2. Add env vars — use Supabase **pooler** `DATABASE_URL` for serverless
3. Build command: `prisma generate && next build`
4. Run `npm run db:setup` once against the DB (use direct URI locally if pooler blocks migrations)
