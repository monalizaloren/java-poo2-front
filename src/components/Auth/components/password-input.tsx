import LogoInput from "./logo-input";
import InputCustom from "./input-custom";

import passwordLogo from "../assets/icons/password-icon.svg";
import closedEyeLogo from "../assets/icons/closed-eye.svg";
import openEyeLogo from "../assets/icons/open-eye.svg";
import { useState } from "react";

export default function PasswordInput() {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <LogoInput logo={passwordLogo}>
            <InputCustom
                type={isHidden ? "password" : "text"}
                placeholder="Senha"
                name="password"
            />
            <button type="button" onClick={() => setIsHidden(!isHidden)}>
                {isHidden ? (
                    <img src={openEyeLogo} className="size-7" />
                ) : (
                    <img src={closedEyeLogo} className="size-7" />
                )}
            </button>
        </LogoInput>
    );
}
