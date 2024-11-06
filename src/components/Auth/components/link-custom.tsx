import { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface ILinkCustomProps {
    link: string;
    children: ReactNode;
}

export default function LinkCustom({ link, children }: ILinkCustomProps) {
    return (
        <Link to={link} className="text-primary">
            {children}
        </Link>
    );
}
