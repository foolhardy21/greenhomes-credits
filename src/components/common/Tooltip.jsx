import { useState } from "react"

export default function Tooltip({ content, children }) {
    const [visible, setVisible] = useState(false)

    return (
        <span
            className="relative inline-flex"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <span
                    className={"absolute z-[10] bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded px-4 py-2 text-[12px] text-white"
                        + " " + "bg-[rgba(0,0,0,0.8)] backdrop-blur-xs"
                    }
                >
                    {content}
                </span>
            )}
        </span>
    )
}
