import { ReactNode } from "react";

export interface ILogoInputProps {
    logo: string;
    children: ReactNode;
}

export default function LogoInput({ logo, children }: ILogoInputProps) {
    return (
        <div className="flex items-center justify-center border-2 border-primary border-opacity-60 rounded-custom p-2 gap-2">
            <img src={logo} className="size-7" />
            {children}
        </div>
    );
}
