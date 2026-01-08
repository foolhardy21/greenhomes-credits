const express = require('express')
const cors = require('cors')
const { generatePDF } = require('./generate-pdf.cjs')
require("dotenv").config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.post('/pdf/generate', async (req, res) => {
    try {
        const { htmlContent, filename = 'igbc-assessment-report.pdf' } = req.body

        if (!htmlContent) {
            return res.status(400).json({ error: 'HTML content is required' })
        }

        const outputPath = await generatePDF(htmlContent, filename)

        res.download(outputPath, filename, (err) => {
            if (err) {
                console.error('Error sending PDF:', err)
                res.status(500).json({ error: 'Error sending PDF' })
            }

            const fs = require('fs')
            fs.unlink(outputPath, (err) => {
                if (err) console.error('Error deleting temp PDF:', err)
            })
        })

    } catch (error) {
        console.error('PDF generation error:', error)
        res.status(500).json({ error: 'Failed to generate PDF', details: error.message })
    }
})

app.listen(PORT, () => {
    console.log(`PDF generation server running on port ${PORT}`)
})