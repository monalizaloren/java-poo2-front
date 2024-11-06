import InputCustom from "../components/input-custom";
import LogoInput from "../components/logo-input";

import emailLogo from "../assets/icons/email-icon.svg";

import SubmitButton from "../components/submit-button";
import LinkCustom from "../components/link-custom";
import PasswordInput from "../components/password-input";

import {
    ActionFunction,
    Form,
    json,
    redirect,
    useActionData,
} from "react-router-dom";
import { z } from "zod";

interface ActionData {
    error?: string;
}

export default function LoginPage() {
    const actionData = useActionData() as ActionData;

    return (
        <div>
            {actionData?.error && (
                <label className="text-base text-primary">
                    {actionData?.error}
                </label>
            )}
            <Form method="post" className="flex flex-col gap-4 pb-4">
                <LogoInput logo={emailLogo}>
                    <InputCustom
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                </LogoInput>
                <PasswordInput />
                <SubmitButton title="Entrar" />
            </Form>
            Novo por aqui?<LinkCustom link="/cadastro"> Cadastre-se</LinkCustom>
        </div>
    );
}

export const loginAction: ActionFunction = async ({ request }) => {
    const schema = z.object({
        email: z.string().email({ message: "Email inválido" }),
        password: z.string().min(8, "Senha acima de 8 caracteres"),
    });

    const formData = await request.formData();

    const result = schema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (result.success) {
        const response = await fetch(
            
            "https://run.mocky.io/v3/1314ee5f-3f8e-4e78-9b88-245610625f8d",
            {
                method: "POST",
                body: JSON.stringify({ result }),
            }
        );
        if (response.ok) {
            return redirect("/cadastro");
        }
    }

    return json({ error: "Algo deu errado no login" });
};
