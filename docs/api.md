## PDF Generation API

### Base URL
http://localhost:3001

### POST 
#### /pdf/generate

Generate PDF from HTML content using Playwright/Chromium

#### Request

**Content-Type:** `application/json`

**Body:**
```json
{
  "htmlContent": "<html>...</html>",
  "filename": "igbc-assessment-report.pdf"
}
```

**Limits**:

- JSON body: 50MB max
- URL-encoded body: 50MB max

**Response Headers**:
- Content-Type: application/pdf
- Content-Disposition: attachment; filename="igbc-assessment-report.pdf"


#### PDF Generation Settings

- Format: A3
- Print Background: true
- Margins:
  - top: 0.5in
  - right: 0.15in  
  - bottom: 0.5in
  - left: 0.15in


```
curl -X POST http://localhost:3001/pdf/generate \
  -H "Content-Type: application/json" \
  -d '{
    "htmlContent": "<h1>Test</h1><p>PDF content</p>",
    "filename": "test-report.pdf"
  }' \
  --output test-report.pdf
```

#### API Flow
1. POST HTML → Server generates PDF with Playwright
2. Receive PDF stream → Auto-download
3. Temp file auto-deleted after download


#### Error Handling
- Missing htmlContent → 400
- Playwright/Chromium failure → 500 with details
- File send failure → 500
- Large payloads (>50MB) → 413 Payload Too Large