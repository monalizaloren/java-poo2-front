export interface ISubmitButtonProps {
    title: string;
}

export default function SubmitButton({ title }: ISubmitButtonProps) {
    return (
        <input
            type="submit"
            value={title}
            className="bg-primary p-2 rounded-custom text-white"
        />
    );
}
