# WordPress Headless Client

A Next.js application that displays WordPress posts using the HeadlessWP SDK.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update the following variables:
     - `NEXT_PUBLIC_WORDPRESS_URL`: Your WordPress site URL
     - `NEXT_PUBLIC_WORDPRESS_API_KEY`: Your WordPress API key

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- List all WordPress posts
- View individual post details
- Responsive design with Tailwind CSS
- TypeScript support
- Environment variable configuration

## Project Structure

- `src/pages/index.tsx`: Home page with post list
- `src/pages/post/[id].tsx`: Individual post page
- `src/pages/_app.tsx`: App wrapper with global styles
- `src/styles/globals.css`: Global styles with Tailwind imports

## Dependencies

- Next.js
- React
- HeadlessWP SDK
- Tailwind CSS
- TypeScript 