# Name Selector - AHP Decision Tool

An interactive web application that helps you choose the best product/brand name using the **Analytic Hierarchy Process (AHP)** methodology.

## Features

- **8 Pre-loaded Name Candidates** with detailed attributes (syllables, meaning, verb usability, branding scores, etc.)
- **Step-by-step AHP Process**: Select criteria → Compare pairs → Get ranked results
- **Pairwise Comparison Interface**: Visual slider for comparing criteria importance (1-9 scale)
- **Weighted Results**: See exactly how your preferences influenced the ranking
- **Add Custom Names**: Add your own names with AI-computed comparable scores
- **Mobile Responsive**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## How It Works

1. **Welcome Screen**: Review all candidate names and their attributes
2. **Criteria Selection**: Choose which factors matter to you (verb usability, branding strength, AI integration, etc.)
3. **Pairwise Comparisons**: Compare each pair of criteria using the AHP 9-point scale
4. **Results**: View your personalized ranking with weighted scores and breakdowns

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS

## License

MIT
