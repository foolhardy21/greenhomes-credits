import { useMemo, useState } from "react"
import { Tabs } from "./components/common/Tabs"
import { Header } from "./components/Header"
import { CATEGORIES, CREDIT_DISTRIBUTION } from "./constants"
import { CreditsTable } from "./components/CreditsTable"

function App() {
  const [category, setCategory] = useState("SD")
  const [creditsDist, setCreditsDist] = useState(CREDIT_DISTRIBUTION)

  const [yesTotal, maybeTotal] = useMemo(() => {
    return Object.values(creditsDist)
      .flat()
      .reduce((total, credit) => {
        return [total[0] + Number(credit.points["yes"] || 0), total[1] + Number(credit.points["maybe"] || 0)]
      }, [0, 0])
  }, [creditsDist])

  return (
    <>
      <div id="report-content" className="py-4 px-6 bg-white">

        <div className="flex justify-end mb-4">
          <button
            className="py-2 px-4 text-[16px] cursor-pointer bg-green-primary hover:opacity-90 text-white font-semibold rounded-lg transition-all duration-300">
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
        <div className="mt-8 h-[calc(100vh-420px)] overflow-y-auto">
          <CreditsTable
            creditsDist={creditsDist}
            setCreditsDist={setCreditsDist}
            category={category}
          />
        </div>
      </div>
    </>
  )
}

export default App
