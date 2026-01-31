# HML Restaurant Web Application

A modern restaurant web application built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your application.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
hmlrestaurant/
├── app/                 # Next.js App Router directory
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles with Tailwind
├── components/         # Reusable React components
├── public/            # Static assets
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── next.config.ts     # Next.js configuration
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint

## Next Steps

1. Start building your restaurant components in the `components/` directory
2. Add new pages in the `app/` directory
3. Customize the Tailwind theme in `tailwind.config.ts`
4. Add your restaurant assets (images, logos) to the `public/` directory
