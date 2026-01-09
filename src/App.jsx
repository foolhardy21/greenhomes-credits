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
                <script src="https://cdn.tailwindcss.com"></script>
                <script>
                  tailwind.config = {
                    theme: {
                      extend: {
                        colors: {
                          'green-primary': '#16a34a',
                          'green-secondary': '#f0fdf4',
                          'green-accent': '#16a34a',
                          'yellow-primary': '#eab308',
                          'yellow-secondary': '#fefce8',
                          'yellow-accent': '#eab308',
                          'gray-primary': '#6b7280',
                          'gray-secondary': '#f9fafb',
                          'gray-accent': '#d1d5db',
                          'black-primary': '#000000',
                          'red-primary': '#ef4444',
                          'red-accent': '#ef4444'
                        }
                      }
                    }
                  }
                </script>
                <style>
                  body {
                    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background: white;
                    color: #374151;
                  }
                  
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
