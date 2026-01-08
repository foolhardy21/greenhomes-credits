import { NumberInput } from "./common/NumberInput"
import Tooltip from "./common/Tooltip"

export const CreditsTable = ({
    category,
    creditsDist,
    setCreditsDist,
    errors,
    setErrors,
}) => {

    function handlePointsChange({ category, creditName, bucketName, points }) {
        const updatedCreditsDist = { ...creditsDist }
        updatedCreditsDist[category] = updatedCreditsDist[category].map(credit => {
            if (credit.name === creditName) {
                credit.points[bucketName] = points
            }
            return credit
        })
        setCreditsDist(updatedCreditsDist)
        validatePoints({ updatedCreditsDist, category, creditName })
    }

    function validatePoints({ updatedCreditsDist, category, creditName }) {
        const { points: { max, yes, no, maybe } } = updatedCreditsDist[category].find(credit => credit.name === creditName)
        if (max != (yes + maybe + no)) {
            setErrors(prevErr => ({
                ...prevErr,
                [creditName]: "Total points must be equal to the maximum."
            }))
        } else {
            setErrors(prevErr => {
                delete prevErr[creditName]
                return prevErr
            })
        }
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
                    <th className="p-4 text-[16px] text-center text-gray-primary">No</th>
                    <th className="p-4 text-[16px] text-gray-primary">Notes / Strategy</th>
                </tr>
            </thead>
            <tbody className="w-full">
                {
                    creditsDist[category].map(credit => {
                        const { points, required, name: creditName } = credit
                        const err = errors?.[creditName]

                        return (
                            <tr
                                key={credit.name}
                                className={`transition-all duraiton-300 border-b ${err ? "border-b-red-accent" : "border-b-gray-accent"}  mb-2 pb-2`}
                            >
                                <td className="p-4 text-[14px] text-gray-primary font-light w-[40%]">
                                    {credit.name}
                                    <span className="ml-2 font-semibold text-[12px] text-gray-primary capitalize">{required ? "(required)" : ""}</span>
                                    {
                                        err
                                            ? <Tooltip content={err}>
                                                <span
                                                    className="bg-red-primary rounded-full px-[8px] py-[3px] text-white text-[10px] font-bold cursor-pointer"
                                                >
                                                    !
                                                </span>
                                            </Tooltip>
                                            : <></>
                                    }
                                </td>
                                <td className="p-4 text-[14px] text-center text-gray-primary font-semibold">{required ? "-" : points.max}</td>
                                <td className="p-4 text-center text-gray-primary font-light">
                                    {
                                        !required
                                            ? <NumberInput
                                                min={0}
                                                max={points.max}
                                                value={points.yes}
                                                onChange={(e) => handlePointsChange({ category, creditName: credit.name, bucketName: "yes", points: Number(e.target.value) })}
                                            /> : <>-</>
                                    }
                                </td>
                                <td className="p-4 text-center text-gray-primary font-light">
                                    {
                                        !required
                                            ? <NumberInput
                                                min={0}
                                                max={points.max}
                                                value={points.maybe}
                                                onChange={(e) => handlePointsChange({ category, creditName: credit.name, bucketName: "maybe", points: Number(e.target.value) })}
                                            /> : <>-</>
                                    }
                                </td>
                                <td className="p-4 text-center text-gray-primary font-light">
                                    {
                                        !required
                                            ? <NumberInput
                                                min={0}
                                                max={points.max}
                                                value={points.no}
                                                onChange={(e) => handlePointsChange({ category, creditName: credit.name, bucketName: "no", points: Number(e.target.value) })}
                                            /> : <>-</>
                                    }
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