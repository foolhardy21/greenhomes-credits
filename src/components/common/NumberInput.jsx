export const NumberInput = ({ min, max, value, onChange }) => {
    return (
        <input
            type="number"
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            className="w-10 border border-gray-primary rounded text-center p-1 focus:outline-none"
        />
    )
}