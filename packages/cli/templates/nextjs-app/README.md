# {{projectName}}

A modern Next.js 15 application with **TypeScript**, **App Router**, and the **Orion Design System**.

## Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, pnpm, yarn, or bun

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start dev server with HMR
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Jest
- `npm run test:watch` - Run tests in watch mode

## Adding Components

Use the Orion CLI to add components:

```bash
npx @orion-ds/cli add button card modal
```

Components will be copied to `src/components/orion/` and can be imported and customized.

## Configuration

### Orion CLI Config

See `orion.json` for configuration. Edit to change:
- Component directories
- Brand (orion, red, deepblue, orange)
- Mode (display, product, app)

## Project Structure

```
app/
├── layout.tsx         # Root layout with ThemeProvider
├── page.tsx           # Home page
├── page.module.css    # Page styles
├── globals.css        # Global styles
└── [...]             # Other routes

public/               # Static files

package.json
tsconfig.json
next.config.js
```

## Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Resources

- **Next.js Documentation** - https://nextjs.org/docs
- **React Documentation** - https://react.dev
- **Orion Design System** - https://orion-ds.dev

## License

MIT
