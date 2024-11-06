import { Outlet } from "react-router-dom";

import fundo from "../assets/imagens.png";
import Logo from "../components/logo";

export default function ModeloPage() {
    return (
        <main className="flex items-center justify-around py-5 px-14 bg-white gap-2">
            <img src={fundo} className="xl:flex hidden" />
            <div className="flex flex-col">
                <Logo />
                <Outlet />
            </div>
        </main>
    );
}
