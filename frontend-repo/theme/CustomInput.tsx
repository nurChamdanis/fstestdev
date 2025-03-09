interface CustomInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput = ({ type, placeholder, value, onChange }: CustomInputProps) => {
    const inputStyle: React.CSSProperties = {
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none",
        width: "60%",
    };

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={inputStyle}
        />
    );
};
