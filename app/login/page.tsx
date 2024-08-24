import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import './login.css'


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

  return (
    <main className="mainLogin">
      <div className="flex-1 flex flex-col w-dvw px-4 sm:max-w-md justify-center gap-2">
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

      <div className="bg-glass p-10">
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <h1 className="text-4xl font-bold mb-10">Iniciar Sesión</h1>
          <label className="text-md" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
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
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing In..."
          >
            Iniciar Sesión
          </SubmitButton>
          <p className="text-center mt-4">
            ¿No tienes una cuenta? <Link href="/signup" className="italic underline text-blue-600">Crear cuenta</Link>
          </p>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
    </main>
  );
}