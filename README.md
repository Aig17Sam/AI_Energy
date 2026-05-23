# AI Energy

Professional Next.js website for an Australian solar battery business. It includes product pages, SEO metadata, customer inquiries, email notifications, and a protected admin dashboard for managing products and inquiry status.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Custom signed-cookie admin auth
- Nodemailer SMTP inquiry notifications

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment variables:

```bash
cp .env.example .env
```

Set `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. SMTP settings are optional for local development but required for production email notifications.

3. Create database tables and seed products/admin:

```bash
npm run prisma:migrate
npm run prisma:seed
```

4. Start development:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin

Admin login is available at `/admin/login`.

The seeded admin uses:

- Email: value from `ADMIN_EMAIL`, default `owner@aienergy.com.au`
- Password: value from `ADMIN_PASSWORD`, default `ChangeMe123!`

Change both before production.

## Email

Inquiry submissions are saved to PostgreSQL. If SMTP variables are configured, the site also emails the business owner.

You can use Hostinger email SMTP, SendGrid SMTP, Mailgun SMTP, or another production SMTP provider.

Required variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `MAIL_TO`

## SEO

Included:

- Page-level metadata
- Product detail metadata
- Open Graph metadata
- Semantic page structure
- `/sitemap.xml`
- `/robots.txt`

Future SEO work can add location pages and landing pages for keywords like `solar battery Australia`, `home solar battery`, `solar battery prices Australia`, and `solar battery installation Australia`.

## Deployment Notes

This app needs a Node.js runtime because it uses Next.js server actions, Prisma, PostgreSQL, authentication cookies, and SMTP email.

For Hostinger:

- If your plan supports Node.js apps, deploy the Next.js app, set environment variables, run `prisma migrate deploy`, then start with `npm run start`.
- If your plan only supports static hosting, this app will not run fully as-is. Use Hostinger VPS, Hostinger Node.js hosting, Vercel, Render, Railway, Fly.io, or another platform that supports Node.js and PostgreSQL access.

Production commands:

```bash
npm install
npm run build
npx prisma migrate deploy
npm run start
```

Use a managed PostgreSQL database or a server-hosted PostgreSQL instance and make sure `DATABASE_URL` is available in the production environment.
