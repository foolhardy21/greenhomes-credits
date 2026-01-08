# Smarter Dharma - IGBC Green Homes Feasibility Assessment

A React application for IGBC green homes feasibility assessment with credit evaluation tools.

## Docs
1. [API Documentation](docs/api.md)
2. [UI Documentation](docs/ui.md)

## Features

- Interactive credit distribution across multiple categories
- Real-time validation and error checking
- PDF export functionality using Playwright

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. For PDF generation, start the PDF server in a separate terminal:
```bash
npm run pdf-server
```

## PDF Generation

The application uses Playwright for high-quality PDF generation that properly handles modern CSS features like `oklch` color functions.

### How it works:

1. The frontend renders React components to HTML
2. HTML is sent to a Node.js server running Playwright
3. Playwright uses Chromium to render the HTML and generate a PDF
4. PDF is downloaded to the user's browser

### Requirements:

- Node.js server running on port 3001 for PDF generation
- Playwright installed and configured

### Usage:

1. Fill in credit values in the application
2. Ensure no validation errors exist
3. Click "Export to PDF"
4. PDF will be generated and downloaded automatically

## Project Structure

- `src/components/` - React components
- `src/constants.js` - Application constants and data
- `generate-pdf.js` - Playwright PDF generation script
- `pdf-server.js` - Express server for PDF API