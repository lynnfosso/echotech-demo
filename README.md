# EchoTech — AI Support Agent Demo

React + Vite frontend, multilingual (FR/EN/ES/PT/ZH/AR), backed by a serverless
function that calls Google Gemini (free tier) without ever exposing the API key
to the browser.

## Prerequisites (already done)
- Node.js installed
- VS Code
- A Gemini API key from https://aistudio.google.com ("Get API key")

## 1. Install dependencies

In VS Code's terminal, at the project root:

```bash
npm install
```

## 2. Test locally (optional but recommended)

Install the Vercel CLI once:
```bash
npm install -g vercel
```

Then run:
```bash
vercel dev
```

The first time, it will ask you to link/create a Vercel project — accept the
defaults. It will also ask for environment variables; when prompted, or by
creating a `.env.local` file at the project root, set:

```
GEMINI_API_KEY=your_actual_key_here
```

Open the local URL it gives you (usually http://localhost:3000) and test the
chat, including switching languages.

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "EchoTech multilingual AI agent demo"
```

Create a new empty repository on github.com (no README/gitignore), then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/echotech-demo.git
git branch -M main
git push -u origin main
```

## 4. Deploy on Vercel

Recommended over Netlify: the backend function in `api/chat.js` is already
written in Vercel's serverless format. Deploying on Netlify would require
rewriting it in Netlify's function format — extra work with no real benefit
if you're already comfortable with Vercel.

1. Go to vercel.com → "Add New Project" → import your GitHub repo
2. Vercel auto-detects Vite — no config changes needed
3. Before or after the first deploy: Project Settings → Environment Variables
   → add `GEMINI_API_KEY` = your key
4. Deploy (or Redeploy if it already deployed before you added the key)
5. Vercel gives you a live URL like `echotech-demo.vercel.app` — test it,
   not localhost

## 5. Custom domain (optional, later)

Project Settings → Domains → add your own domain once you have one. Not
required to start prospecting.

## Updating the demo later

- UI text and translations: `src/App.jsx`, in the `UI_TEXT` object
- Agent's knowledge/behavior: `src/App.jsx`, in the `buildSystemPrompt` function
- Backend logic: `api/chat.js` (rarely needs changes)

## Security

Never put the Gemini API key directly in `src/App.jsx` or any frontend file.
It must only exist in the Vercel environment variable, used server-side in
`api/chat.js`.
