# 🎃 Halloween Expense Calendar

A spooky-themed expense tracking calendar built with React, Vite, and Tailwind CSS.

## Features

- Track expenses with dates and amounts
- Visual calendar display with Halloween theme
- Ghost indicator for the most expensive month
- Local storage persistence
- Fully client-side (no backend required)

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling with custom Halloween theme
- **date-fns** - Date manipulation
- **Local Storage API** - Data persistence

## Project Structure

```
halloween-expense-calendar/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Tailwind config and custom styles
├── public/             # Static assets
└── package.json
```

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build

```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Halloween Theme

The app uses a custom Halloween color palette:

- **Orange**: #FF6B35 (primary accent)
- **Purple**: #6B2D5C (secondary accent)
- **Charcoal**: #1A1A1D (background)
- **Ghost White**: #E8E8E8 (ghost indicator)

Custom fonts:
- **Creepster** - Headers and titles
- **Inter** - Body text

## Requirements

- Node.js 18+ 
- npm or yarn

## License

MIT
