"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Inicia como falso
  const router = useRouter();

  useEffect(() => {
    // Marca el checkbox si hay un valor en el campo de correo electrónico
    if (email) {
      setRememberMe(true); // Marca el checkbox
    } else {
      setRememberMe(false); // Desmarca el checkbox si está vacío
    }
  }, [email]); // El efecto se ejecuta cada vez que el campo de correo electrónico cambia

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      rememberMe,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      toast.error("Hubo un error al iniciar sesión");
      return;
    }
    toast.success("Inicio de sesión exitoso");
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-[rgba(0,0,0,0.75)] rounded-2xl px-[24px] py-[40px] m-0 flex flex-col w-[90%] sm:w-[65%] md:w-[450px] space-y-3">
        <section>
          <p className="text-xl text-white xl:text-2xl">Inicia sesión</p>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Correo"
                id="email"
                name="email"
                autoComplete="email"
                className="p-2 rounded-md text-sm hover:ring text-gray-700 placeholder:text-gray-400"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                id="password"
                name="password"
                autoComplete="current-password"
                className="p-2 rounded-md text-sm hover:ring text-gray-700 placeholder:text-gray-400"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <label className="text-white text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe} // El estado del checkbox está controlado por `rememberMe`
                  onChange={() => setRememberMe(!rememberMe)} // Alterna el estado del checkbox
                />
                Recordar mi cuenta
              </label>
              <Link href="/auth/recover">
                <div className="text-white text-sm hover:!text-blue-400 transition-colors">
                  Olvidaste tu contraseña
                </div>
              </Link>
            </div>
          </div>

          <section className="">
            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-white p-2 rounded-md text-sm md:hover:!bg-[#333] hover:!text-white transition-colors"
                type="submit"
              >
                Iniciar sesión
              </button>
            </div>
          </section>
        </form>
        <footer>
          <div className="mx-auto flex justify-center items-center">
            <Link href="/auth/register">
              <span className="text-white text-sm hover:!text-blue-500 transition-colors">
                Crea tu cuenta nueva
              </span>
            </Link>
          </div>
        </footer>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default LoginPage;
