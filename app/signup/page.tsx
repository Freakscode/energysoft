import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import './signup.css'

export const runtime = "edge";
export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Usuario no encontrado, por favor cree una cuenta");
        }

        return redirect("/main");
    };

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const username = formData.get("username") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    'username': username,
                    'type': "onHold",
                },
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/login?message=Usuario encontrado, por favor inicie sesión");
        }

        return redirect("/login?message= Confirme su correo electrónico para continuar");
    };

    return (
        <main className="container">
            <div className="link">
                <Link
                    href="/"
                    className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>{" "}
                    Regresar
                </Link>
            </div>
            <div className="formContainer">
                <div className="flex-1 flex flex-col w-full px-2 sm:max-w-md justify-center gap-2">
                    <div className="bg-glass p-6">
                        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                            <h1 className="text-3xl mb-5">Crear Cuenta</h1>
                            <label className="text-md" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                                name="email"
                                placeholder=""
                                required
                            />
                            <label className="text-md" htmlFor="username">
                                Nombre de Usuario
                            </label>
                            <input
                                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                                name="username"
                                placeholder=""
                                required
                            />
                            <label className="text-md" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                                type="password"
                                name="password"
                                placeholder=""
                                required
                            />
                            <SubmitButton
                                formAction={signUp}
                                className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 bg-green-700"
                                pendingText="Signing Up..."
                            >
                                Crear Cuenta
                            </SubmitButton>
                            <p className="text-center mt-4">
                                Ya tengo una cuenta <Link href="/login" className="italic underline text-blue-600">Iniciar Sesión</Link>
                            </p>
                            {searchParams?.message && (
                                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                                    {searchParams.message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}