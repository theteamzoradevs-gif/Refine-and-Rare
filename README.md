# Refine & Rare

Premium luxury interior design website + admin CMS for **Refine & Rare** (Bengaluru).

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- PostgreSQL + Prisma
- JWT admin auth (httpOnly cookie)
- Cloudinary (optional) for media uploads
- Resend (optional) for enquiry emails

## Quick start

The public site runs **without a database** using static content (Prisma stays in the repo for later).

1. Copy env (database URL optional for now):

```bash
cp .env.example .env
```

2. Install and run:

```bash
npm install
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)

### Enable the database later

1. Set `DATABASE_URL` in `.env` (leave `DATABASE_ENABLED` unset or `true`)
2. Run `npm run db:setup`
3. Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default admin (from `.env`):

- Email: `admin@refineandrare.com`
- Password: `admin123`

## Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string — omit to run without DB |
| `DATABASE_ENABLED` | Set `false` to force-disable even if `DATABASE_URL` is set |
| `JWT_SECRET` | Admin session signing secret |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin credentials |
| `RESEND_API_KEY` | Optional — enquiry email delivery |
| `ENQUIRY_TO_EMAIL` | Inbox for enquiries |
| `CLOUDINARY_*` | Optional — otherwise uploads go to `/public/uploads` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO |

## Brand assets

Seeded from the live Nextap vCard ([Refine & Rare](https://profile.nextapsolutions.com/Refine-&-Rare)): logo, cover, service images, gallery photos, and project video under `public/brand/`.

## Deploy (Vercel)

1. Push to GitHub and import into Vercel
2. Add env vars (Neon/Vercel Postgres recommended)
3. Build command: `prisma generate && next build`
4. Run `npm run db:setup` once against production DB (or `prisma db push` + `db:seed`)
