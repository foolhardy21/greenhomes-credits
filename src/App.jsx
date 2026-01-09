import { useEffect, useMemo, useState } from "react"
import { createRoot } from 'react-dom/client'
import { Tabs } from "./components/common/Tabs"
import { Header } from "./components/Header"
import { CreditsTable } from "./components/CreditsTable"
import { pdfApi } from "./services/pdf"
import { CATEGORIES, CREDIT_DISTRIBUTION } from "./constants"

function App() {
  const [category, setCategory] = useState("SD")
  const [creditsDist, setCreditsDist] = useState(CREDIT_DISTRIBUTION)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const updatedCreditsDist = { ...CREDIT_DISTRIBUTION }
    for (const key in updatedCreditsDist) {
      updatedCreditsDist[key] = updatedCreditsDist[key].map(credit => ({
        ...credit,
        points: {
          ...credit.points,
          no: credit.points.max,
        }
      }))
    }
    setCreditsDist(updatedCreditsDist)
  }, [])

  const [yesTotal, maybeTotal] = useMemo(() => {
    return Object.values(creditsDist)
      .flat()
      .reduce((total, credit) => {
        return [total[0] + Number(credit.points["yes"] || 0), total[1] + Number(credit.points["maybe"] || 0)]
      }, [0, 0])
  }, [creditsDist])

  function PDFReport({ creditsDist, yesTotal, maybeTotal }) {
    return (
      <div className="py-4 px-6 bg-white">
        <Header className="mb-4" readOnly={true} />

        <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-green-secondary p-4 rounded-lg border border-green-accent">
            <p className="text-xs uppercase font-bold text-green-primary">
              Confirmed (Yes)
            </p>
            <p className="text-3xl font-black text-green-primary">{yesTotal}</p>
          </div>
          <div className="bg-yellow-secondary p-4 rounded-lg border border-yellow-accent">
            <p className="text-xs uppercase font-bold text-yellow-primary">
              Potential (Maybe)
            </p>
            <p className="text-3xl font-black text-yellow-primary">{maybeTotal}</p>
          </div>
          <div className="bg-gray-secondary p-4 rounded-lg border border-gray-accent">
            <p className="text-xs uppercase font-bold text-gray-primary">
              Total Possible
            </p>
            <p className="text-3xl font-black text-gray-primary">{yesTotal + maybeTotal}</p>
          </div>
        </div>

        {Object.keys(CATEGORIES).map(catKey => (
          <div key={catKey} className="mb-8">
            <h2 className="text-xl font-bold text-green-primary mb-4 border-b-2 border-green-primary pb-2">
              {CATEGORIES[catKey]}
            </h2>
            <CreditsTable
              creditsDist={creditsDist}
              setCreditsDist={() => { }}
              category={catKey}
              errors={{}}
              setErrors={() => { }}
              readOnly={true}
            />
          </div>
        ))}
      </div>
    )
  }

  async function generatePDF() {
    try {
      const pdfContainer = document.createElement('div')
      pdfContainer.id = 'pdf-container'
      pdfContainer.style.position = 'absolute'
      pdfContainer.style.left = '-9999px'
      pdfContainer.style.top = '-9999px'
      document.body.appendChild(pdfContainer)

      const root = createRoot(pdfContainer)
      root.render(
        <PDFReport
          creditsDist={creditsDist}
          yesTotal={yesTotal}
          maybeTotal={maybeTotal}
        />
      )

      await new Promise(resolve => setTimeout(resolve, 1000))

      const htmlContent = pdfContainer.innerHTML
      root.unmount()
      document.body.removeChild(pdfContainer)

      const response = await pdfApi.sendHTMLForPdf({
        htmlContent: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>IGBC Assessment Report</title>
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <style>
                  :root {
                    --color-green-primary: #16a34a;
                    --color-green-secondary: #f0fdf4;
                    --color-green-accent: #16a34a;
                    --color-yellow-primary: #eab308;
                    --color-yellow-secondary: #fefce8;
                    --color-yellow-accent: #eab308;
                    --color-gray-primary: #6b7280;
                    --color-gray-secondary: #f9fafb;
                    --color-gray-accent: #d1d5db;
                    --color-black-primary: #000000;
                    --color-red-primary: #ef4444;
                    --color-red-accent: #ef4444;
                  }
                  
                  body {
                    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background: white;
                    color: #374151;
                  }
                  
                  .bg-green-primary { background-color: var(--color-green-primary); }
                  .bg-green-secondary { background-color: var(--color-green-secondary); }
                  .bg-green-accent { background-color: var(--color-green-accent); }
                  .bg-yellow-primary { background-color: var(--color-yellow-primary); }
                  .bg-yellow-secondary { background-color: var(--color-yellow-secondary); }
                  .bg-yellow-accent { background-color: var(--color-yellow-accent); }
                  .bg-gray-primary { background-color: var(--color-gray-primary); }
                  .bg-gray-secondary { background-color: var(--color-gray-secondary); }
                  .bg-gray-accent { background-color: var(--color-gray-accent); }
                  .bg-red-primary { background-color: var(--color-red-primary); }
                  .bg-red-accent { background-color: var(--color-red-accent); }
                  
                  .text-green-primary { color: var(--color-green-primary); }
                  .text-green-secondary { color: var(--color-green-secondary); }
                  .text-green-accent { color: var(--color-green-accent); }
                  .text-yellow-primary { color: var(--color-yellow-primary); }
                  .text-yellow-secondary { color: var(--color-yellow-secondary); }
                  .text-yellow-accent { color: var(--color-yellow-accent); }
                  .text-gray-primary { color: var(--color-gray-primary); }
                  .text-gray-secondary { color: var(--color-gray-secondary); }
                  .text-gray-accent { color: var(--color-gray-accent); }
                  .text-red-primary { color: var(--color-red-primary); }
                  .text-red-accent { color: var(--color-red-accent); }
                  
                  .border-green-primary { border-color: var(--color-green-primary); }
                  .border-green-secondary { border-color: var(--color-green-secondary); }
                  .border-green-accent { border-color: var(--color-green-accent); }
                  .border-yellow-primary { border-color: var(--color-yellow-primary); }
                  .border-yellow-secondary { border-color: var(--color-yellow-secondary); }
                  .border-yellow-accent { border-color: var(--color-yellow-accent); }
                  .border-gray-primary { border-color: var(--color-gray-primary); }
                  .border-gray-secondary { border-color: var(--color-gray-secondary); }
                  .border-gray-accent { border-color: var(--color-gray-accent); }
                  .border-red-primary { border-color: var(--color-red-primary); }
                  .border-red-accent { border-color: var(--color-red-accent); }
                  
                  @page {
                    margin: 0.5in;
                  }
                </style>
              </head>
              <body>
                <div class="py-4 px-6 bg-white">
                  ${htmlContent}
                </div>
              </body>
            </html>
          `,
        filename: `igbc-assessment-report.pdf`
      })

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `igbc-assessment-report.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('PDF generation failed. Make sure the PDF server is running on port 3001.')
    }
  }

  return (
    <>
      <div id="report-content" className="py-4 px-6 bg-[#fff]">

        <div className="flex justify-end mb-4">
          <button
            onClick={generatePDF}
            disabled={Object.keys(errors).length}
            className="py-2 px-4 text-[16px] cursor-pointer bg-green-primary hover:opacity-90 text-[#fff] font-semibold rounded-lg transition-all duration-300 
            disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Export to PDF
          </button>
        </div>

        <Header
          className="mb-4"
        />

        <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-green-secondary p-4 rounded-lg border border-green-accent">
            <p className="text-xs uppercase font-bold text-green-primary">
              Confirmed (Yes)
            </p>
            <p className="text-3xl font-black text-green-primary">{yesTotal}</p>
          </div>
          <div className="bg-yellow-secondary p-4 rounded-lg border border-yellow-accent">
            <p className="text-xs uppercase font-bold text-yellow-primary">
              Potential (Maybe)
            </p>
            <p className="text-3xl font-black text-yellow-primary">{maybeTotal}</p>
          </div>
          <div className="bg-gray-secondary p-4 rounded-lg border border-gray-accent">
            <p className="text-xs uppercase font-bold text-gray-primary">
              Total Possible
            </p>
            <p className="text-3xl font-black text-gray-primary">{yesTotal + maybeTotal}</p>
          </div>
        </div>

        {/* Category Navigation */}
        <Tabs
          value={category}
          onChange={setCategory}
          tabs={Object.keys(CATEGORIES).map(key => ({ id: key, label: CATEGORIES[key] }))}
        />

        {/* Credit Table */}
        <div className="mt-6 ml-4 h-[calc(100vh-420px)] overflow-y-auto">
          <CreditsTable
            creditsDist={creditsDist}
            setCreditsDist={setCreditsDist}
            category={category}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
      </div>
    </>
  )
}

export default App
