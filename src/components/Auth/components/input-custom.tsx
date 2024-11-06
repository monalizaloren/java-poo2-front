export interface IInputCustomProps {
    type: string;
    placeholder: string;
    name: string;
}

export default function InputCustom({
    type,
    placeholder,
    name,
}: IInputCustomProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            className="w-full outline-none"
            required
        />
    );
}
