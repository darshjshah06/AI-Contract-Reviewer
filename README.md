# AI Contract Reviewer
### For Content Creators

An AI-powered web app that reviews contracts and agreements for content creators — flagging suspicious clauses, summarizing key terms, and delivering a clear verdict on whether a contract is safe to sign.

---

## Features

- **8-Ball Verdict System** — An animated magic 8-ball spins at the bottom of the screen and lands on a verdict: ✅ Green Light, ⚠️ Caution, or 🚨 Do Not Sign
- **Smart Contract Analysis** — Powered by GPT-4o, the AI reads your contract and identifies red flags specific to content creators (IP ownership, exclusivity, payment terms, termination clauses, and more)
- **Highlighted Contract View** — The original contract text is displayed with fishy clauses highlighted in red. Hover over any highlight to see why it's flagged
- **PDF & Text Support** — Upload a PDF directly or paste contract text manually
- **Creator-Focused** — Built specifically to protect content creators from predatory brand deals and unfair agreements

---

## Tech Stack

- **React** + **Vite** — Frontend framework and build tool
- **OpenAI API (GPT-4o)** — AI contract analysis engine
- **PDF.js** — In-browser PDF parsing and text extraction
- **CSS** — Custom styling with animations (no UI framework)

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR-USERNAME/AI-Contract-Reviewer.git
cd AI-Contract-Reviewer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your OpenAI API key
Create a `.env` file in the root of the project:
```
VITE_OPENAI_API_KEY=your_api_key_here
```
Get your API key at [platform.openai.com](https://platform.openai.com)

### 4. Run the app
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## How to Use

1. Open the app — you'll see a magic 8-ball with a prompt to start
2. Click anywhere to begin
3. Upload a PDF contract or paste the contract text
4. Click **Review Contract**
5. The AI will analyze the contract and return:
   - A verdict (Green Light / Caution / Do Not Sign)
   - Highlighted suspicious clauses in the contract text
   - A breakdown of fishy clauses and why they're problematic
   - Safe clauses that look standard and fair
   - A clear recommendation on what to do next

---

## Project Structure

```
AI-Contract-Reviewer/
├── public/
│   └── title.png              # Logo image
├── src/
│   ├── App.jsx                # Main app + 8-ball component
│   ├── index.css              # All styles
│   ├── main.jsx               # React entry point
│   ├── pdfParser.js           # PDF text extraction
│   ├── reviewContract.js      # OpenAI API call + prompt
│   └── HighlightedContract.jsx # Contract text with red highlights
├── .env                       # API key (not committed)
├── .gitignore
└── README.md
```

---

## Important Notes

- Your OpenAI API key is never exposed — it stays in your `.env` file which is excluded from Git
- This app is for informational purposes only and does not constitute legal advice
- Always consult a qualified attorney before signing any legal agreement

---

## Built By

Darsh Shah — Resume project demonstrating AI integration, React development, and prompt engineering.