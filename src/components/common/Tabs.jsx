export const Tabs = ({ value, onChange, tabs }) => {

    return (
        <div className="my-2">
            <nav
                role="tablist"
                aria-label="Tabs"
                className="flex items-center mb-4"
            >
                {
                    tabs.map(tab => {
                        const isTabSelected = value === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onChange(tab.id)}
                                role="tab"
                                aria-selected={isTabSelected}
                                className={`cursor-pointer text-[16px] py-2 px-4 border-b text-gray-primary ${isTabSelected ? "border-b-gray-primary font-medium" : "font-normal border-b-gray-secondary opacity-70"} transition-all duraiton-300`}
                            >
                                {tab.label}
                            </button>
                        )
                    })
                }
            </nav>
        </div>
    )
}