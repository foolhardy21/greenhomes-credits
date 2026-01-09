export const NumberInput = ({ min, max, value, onChange, disabled = false }) => {
    return (
        <input
            disabled={disabled}
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            step={1}
            className="w-10 border border-gray-accent rounded text-center p-1 focus:outline-none"
        />
    )
}