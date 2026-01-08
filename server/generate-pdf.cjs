const { chromium } = require('playwright')

async function generatePDF(htmlContent, outputPath = 'igbc-assessment-report.pdf') {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.setContent(htmlContent, { waitUntil: 'networkidle' })

    await page.pdf({
        path: outputPath,
        format: 'A3',
        printBackground: true,
        margin: {
            top: '0.5in',
            right: '0.15in',
            bottom: '0.5in',
            left: '0.15in'
        }
    })

    await browser.close()
    return outputPath
}

module.exports = { generatePDF }
