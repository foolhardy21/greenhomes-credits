import { NumberInput } from "./common/NumberInput"

export const CreditsTable = ({ category, creditsDist, setCreditsDist }) => {

    function handlePointsChange({ category, creditName, bucketName, points }) {
        const updatedCreditsDist = { ...creditsDist }
        updatedCreditsDist[category] = updatedCreditsDist[category].map(credit => {
            if (credit.name === creditName) {
                credit.points[bucketName] = points
            }
            return credit
        })
        setCreditsDist(updatedCreditsDist)
    }

    function handleNotesChange({ category, creditName, notes }) {
        const updatedCreditsDist = { ...creditsDist }
        updatedCreditsDist[category] = updatedCreditsDist[category].map(credit => {
            if (credit.name === creditName) {
                credit.notes = notes
            }
            return credit
        })
        setCreditsDist(updatedCreditsDist)
    }

    return (
        <table className="w-full text-left">
            <thead className="border-b border-b-gray-accent">
                <tr className="">
                    <th className="p-4 text-[16px] text-gray-primary">Credit Name</th>
                    <th className="p-4 text-[16px] text-center text-gray-primary">Max</th>
                    <th className="p-4 text-[16px] text-center text-green-primary">
                        Yes
                    </th>
                    <th className="p-4 text-[16px] text-center text-yellow-primary">
                        Maybe
                    </th>
                    <th className="p-4 text-[16px] text-center text-red-primary">No</th>
                    <th className="p-4 text-[16px] text-gray-primary">Notes / Strategy</th>
                </tr>
            </thead>
            <tbody className="w-full">
                {
                    creditsDist[category].map(credit => {
                        const { points } = credit
                        return (
                            <tr
                                key={credit.name}
                                className="border-b border-b-gray-accent mb-2 pb-2"
                            >
                                <td className="p-4 text-[14px] text-gray-primary font-light w-[40%]">
                                    {credit.name}
                                    <span className="ml-2 font-semibold text-[12px] text-gray-primary capitalize">{credit.required ? "(required)" : ""}</span>
                                </td>
                                <td className="p-4 text-[14px] text-center text-gray-primary font-semibold">{points.max}</td>
                                <td className="p-4 text-center text-gray-primary font-light">
                                    <NumberInput
                                        min={0}
                                        max={points.max}
                                        value={points.yes}
                                        onChange={(e) => handlePointsChange({ category, creditName: credit.name, bucketName: "yes", points: e.target.value })}
                                    />
                                </td>
                                <td className="p-4 text-center text-gray-primary font-light">
                                    <NumberInput
                                        min={0}
                                        max={points.max}
                                        value={points.maybe}
                                        onChange={(e) => handlePointsChange({ category, creditName: credit.name, bucketName: "maybe", points: e.target.value })}
                                    />
                                </td>
                                <td className="p-4 text-center text-gray-primary font-light">
                                    <NumberInput
                                        min={0}
                                        max={points.max}
                                        value={points.no}
                                        onChange={(e) => handlePointsChange({ category, creditName: credit.name, bucketName: "no", points: e.target.value })}
                                    />
                                </td>
                                <td className="p-4 text-gray-primary font-light">
                                    <textarea
                                        className="w-full border rounded p-1 text-[14px]" rows="2"
                                        onChange={(e) => handleNotesChange({ category, creditName: credit.name, notes: e.target.value })}
                                    >
                                        {credit.notes}
                                    </textarea>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}