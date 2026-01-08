import { useState } from "react"
import { Dropdown } from "./common/Dropdown"

export const Header = ({ className }) => {
    const [dropdownVal, setDropdownVal] = useState("certified")

    return (
        <header
            className={"flex flex-row justify-between items-center bg-white p-6 rounded-lg border border-gray-300" + " " + className}
        >
            <div>
                <h1 className="text-2xl font-bold text-green-primary">
                    IGBC Green Homes Feasibility Assessment
                </h1>
                <p className="text-sm text-black-primary opacity-70">
                    Project Scoping & Credit Evaluation Tool
                </p>
            </div>
            <div className="flex items-center gap-4">
                <label className="font-semibold text-black-primary">Target Level:</label>
                <Dropdown
                    value={dropdownVal}
                    onChange={setDropdownVal}
                    items={[
                        { value: "platinum", label: "Platinum" },
                        { value: "gold", label: "Gold" },
                        { value: "silver", label: "Silver" },
                        { value: "certified", label: "Certified" },
                    ]}
                    className="w-[100px]"
                />
            </div>
        </header>
    )
}