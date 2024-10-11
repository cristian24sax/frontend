"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { decryptData, encryptData } from "../../../modules/auth/utils/encrydata";
import Cookies from "js-cookie";
import { authLogin } from "@/modules/auth/services/auth.service";
import Loading from "@/components/loading/loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      const decrypted = decryptData(storedData);
      setEmail(decrypted.email);
      setPassword(decrypted.password);
      setRememberMe(decrypted.recover);
    }
  }, []);

  useEffect(() => {
    if (rememberMe) {
      const myData = { email, password, recover: true };
      const encrypted = encryptData(myData);
      localStorage.setItem("myData", encrypted);
    } else {
      localStorage.removeItem("myData");
    }
  }, [rememberMe, email, password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await authLogin({ email, password });

      if (result?.message) {
        toast.error("Hubo un error al iniciar sesión");
        setLoading(false);
        return;
      }

      if (result?.succeeded) {
        const { token, id, is_Admin } = result.data;
        Cookies.set("token", token, { expires: 7 });
        Cookies.set("idUser", String(id), { expires: 7 });
        localStorage.setItem("admin", is_Admin);
        localStorage.setItem("dataUser", JSON.stringify(result.data));
        router.push("/dashboard");
        toast.success("Inicio de sesión exitoso");
      }
    } catch (error) {
      toast.error("Hubo un error en el proceso de autenticación");
    } finally {
      setLoading(false);
    }
  };

  // Pantalla de carga
  if (!showLogin) {
    <Loading />;
  }

  // Pantalla de login
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[rgba(0,0,0,0.75)] rounded-2xl px-[24px] py-[40px] m-0 flex flex-col w-[90%] sm:w-[65%] md:w-[450px] space-y-3">
        <section>
          <p className="text-xl text-white xl:text-2xl">Inicia sesión</p>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Correo" id="email" name="email" autoComplete="email" className="p-2 rounded-md text-sm hover:ring text-gray-700 placeholder:text-gray-400" value={email} onChange={(event) => setEmail(event.target.value)} />
              <input type="password" placeholder="Contraseña" id="password" name="password" autoComplete="current-password" className="p-2 rounded-md text-sm hover:ring text-gray-700 placeholder:text-gray-400" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="flex justify-between items-center mt-3">
              <label className="text-white text-sm flex items-center gap-2">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                Recordar mi cuenta
              </label>
              <Link href="/auth/recover">
                <div className="text-white text-sm hover:!text-blue-400 transition-colors">Olvidaste tu contraseña</div>
              </Link>
            </div>
          </div>

          <section className="">
            <div className="flex justify-center items-center mt-4">
              <button className={`bg-white p-2 rounded-md text-sm md:hover:!bg-[#333] hover:!text-white transition-colors ${loading ? "cursor-not-allowed" : ""}`} type="submit" disabled={loading}>
                {loading ? "Cargando..." : "Iniciar sesión"}
              </button>
            </div>
          </section>
        </form>
        <footer>
          <div className="mx-auto flex justify-center items-center">
            <Link href="/auth/register">
              <span className="text-white text-sm hover:!text-blue-500 transition-colors">Crea tu cuenta nueva</span>
            </Link>
          </div>
        </footer>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default LoginPage;

export const dynamic = "force-dynamic";
