# Refine & Rare

Premium luxury interior design website + admin CMS for **Refine & Rare** (Bengaluru).

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- PostgreSQL + Prisma
- JWT admin auth (httpOnly cookie)
- Cloudinary (optional) for media uploads
- Resend (optional) for enquiry emails

## Quick start

1. Copy env and set your database URL:

```bash
cp .env.example .env
```

2. Install and set up the database:

```bash
npm install
npm run db:setup
```

3. Run the site:

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default admin (from `.env`):

- Email: `admin@refineandrare.com`
- Password: `admin123`

## Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
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
