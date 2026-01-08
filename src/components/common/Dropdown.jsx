import { useEffect, useRef, useState } from "react"

export const Dropdown = ({ value, onChange, items, className }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const dropdownRef = useRef(null)
    const buttonRef = useRef(null)
    const itemsRefs = useRef([])

    useEffect(() => {
        window.addEventListener("click", handleClick)
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("click", handleClick)
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    useEffect(() => {
        itemsRefs.current?.[focusedIndex]?.focus()
    }, [focusedIndex])

    function handleKeyDown(e) {
        const { key } = e
        switch (key) {
            case "ArrowDown":
                setFocusedIndex(prev => prev + 1)
                break
            case "ArrowUp":
                setFocusedIndex(prev => prev - 1)
                break
            default: return
        }
    }

    function handleClick(e) {
        if (e.target === dropdownRef.current) return
        if (e.target === buttonRef.current) return
        setIsDropdownVisible(false)
    }

    function handleChange(item) {
        onChange(item.value)
    }

    return (
        <div className="my-2 relative">
            <button
                ref={buttonRef}
                aria-haspopup="listbox"
                className={"capitalize py-2 px-4 rounded-lg border border-gray-300 cursor-pointer text-green-primary font-medium hover:border-green-primary transition-all duration-300" + " " + className}
                onClick={() => setIsDropdownVisible(prev => !prev)}
            >
                {value}
            </button>
            <ul
                ref={dropdownRef}
                role="listbox"
                className={`absolute z-[10] mt-1 max-w-[300px] border border-gray-200 rounded bg-white flex flex-col items-start ${!isDropdownVisible ? "hidden" : ""}`}
            >
                {
                    items.map((item, idx) => (
                        <li
                            key={item.value}
                            ref={(el) => (itemsRefs.current[idx] = el)}
                            role="option"
                            tabIndex={-1}
                            className="w-full bg-white border-b border-b-gray-200 px-4 py-2 text-[14px] cursor-pointer focus:bg-gray-50 hover:bg-gray-50"
                            onClick={() => handleChange(item)}
                        >
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}