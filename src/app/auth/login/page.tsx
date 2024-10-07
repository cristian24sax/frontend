"use client";

import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { decryptData, encryptData } from "./utils/encrydata";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Controla la visualización del login
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 3000); // Muestra el login después de 3 segundos

    return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
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

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      rememberMe,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      toast.error("Hubo un error al iniciar sesión");
      setLoading(false);
      return;
    }

    if (responseNextAuth?.ok) {
      const session = await getSession();
      const dataUser = session?.user?.data;
      if (dataUser) {
        localStorage.setItem("dataUser", JSON.stringify(dataUser));
      }
      const token = dataUser?.token as string;
      const id = dataUser?.id as number;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("idUser", String(id), { expires: 7 });
      router.push("/dashboard");
      toast.success("Inicio de sesión exitoso");
    }

    setLoading(false);
  };

  // Pantalla de carga
  if (!showLogin) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: 'rgb(14, 14, 14)' }}>
        <svg width="577" height="121" viewBox="0 0 577 121" fill="none" xmlns="http://www.w3.org/2000/svg" id="logopr">

        <path
            d="M491.607 109.5H493.362L493.958 107.85L501.426 87.18H541.692L549.16 107.849L549.756 109.5H551.511H565.335H568.9L567.686 106.149L531.542 6.35665L530.945 4.70801H529.191H514.071H512.32L511.722 6.35365L475.434 106.146L474.214 109.5H477.783H491.607ZM506.965 71.524L521.559 30.7541L536.153 71.524H506.965Z"
            stroke="white" stroke-width="5" shape-rendering="crispEdges" />

        <path
            d="M447.198 108.258L447.921 109.5H449.358H465.054H469.467L467.198 105.715L443.72 66.5401C450.535 64.5063 455.926 61.0103 459.706 55.9458C464.079 50.2141 466.258 43.5836 466.258 36.152C466.258 30.0916 464.866 24.606 462.026 19.7665C459.152 14.8701 454.82 11.0544 449.172 8.27981C443.552 5.47197 436.763 4.13199 428.91 4.13199H396.51H394.01V6.63199V107V109.5H396.51H409.614H412.114V107V68.46H424.017L447.198 108.258ZM443.177 24.1455L443.19 24.1573L443.202 24.1688C446.122 26.8522 447.722 30.7237 447.722 36.152C447.722 41.4565 446.136 45.4799 443.138 48.484C440.222 51.3137 435.636 52.948 428.91 52.948H412.114V19.932H428.91C435.792 19.932 440.375 21.4992 443.177 24.1455Z"
            stroke="white" stroke-width="5" shape-rendering="crispEdges" />

        <path
            d="M302.077 103.695L302.087 103.701L302.097 103.707C310.173 108.249 319.095 110.508 328.811 110.508C338.618 110.508 347.589 108.252 355.668 103.707L355.679 103.701L355.689 103.695C363.76 99.0546 370.126 92.6349 374.761 84.4746C379.412 76.2834 381.711 67.0179 381.711 56.744C381.711 46.47 379.412 37.2045 374.761 29.0134C370.126 20.8519 363.756 14.4766 355.679 9.93079C347.599 5.28716 338.624 2.97998 328.811 2.97998C319.089 2.97998 310.163 5.28946 302.087 9.93084C294.007 14.4784 287.593 20.9012 282.866 29.1488L282.866 29.1488L282.861 29.1574C278.211 37.3449 275.911 46.5614 275.911 56.744C275.911 66.927 278.211 76.1862 282.854 84.4631L282.863 84.479L282.872 84.4947C287.601 92.6441 294.011 99.0573 302.077 103.695ZM346.427 89.5699L346.418 89.5745L346.41 89.5792C341.258 92.5994 335.414 94.132 328.811 94.132C322.212 94.132 316.314 92.6009 311.059 89.5745C305.919 86.5597 301.821 82.2571 298.762 76.5943C295.815 70.9627 294.303 64.3694 294.303 56.744C294.303 49.0127 295.819 42.4255 298.758 36.901C301.819 31.2316 305.922 26.9251 311.067 23.9087C316.214 20.8917 322.105 19.356 328.811 19.356C335.516 19.356 341.408 20.8917 346.554 23.9087C351.695 26.9221 355.744 31.2216 358.708 36.88L358.719 36.9011L358.731 36.9221C361.758 42.4421 363.319 49.0212 363.319 56.744C363.319 64.3639 361.761 70.9518 358.723 76.5807L358.715 76.5943L358.708 76.608C355.75 82.2553 351.661 86.5536 346.427 89.5699Z"
            stroke="white" stroke-width="5" shape-rendering="crispEdges" />

        <path
            d="M259.991 6.63199V4.13199H257.491H244.243H241.743V6.63199V80.792C241.743 84.8315 240.681 87.9864 238.71 90.4387C236.921 92.5758 234.087 93.844 229.699 93.844C225.372 93.844 222.477 92.5175 220.566 90.1777C218.586 87.6328 217.455 84.2192 217.367 79.735L217.319 77.284H214.867H201.763H199.263V79.784C199.263 89.0317 201.974 96.6338 207.628 102.288L207.636 102.296L207.645 102.305C213.285 107.839 220.726 110.508 229.699 110.508C238.571 110.508 245.955 107.89 251.593 102.465L251.602 102.457L251.61 102.449C257.254 96.9113 259.991 89.604 259.991 80.792V6.63199Z"
            stroke="white" stroke-width="5" shape-rendering="crispEdges" />

        <path
            d="M185.299 50.84V48.34H182.799H148.723V19.788H187.119H189.619V17.288V6.48801V3.98801H187.119H133.119H130.619V6.48801V107V109.5H133.119H187.119H189.619V107V96.2V93.7H187.119H148.723V64.14H182.799H185.299V61.64V50.84Z"
            stroke="white" stroke-width="5" shape-rendering="crispEdges" />

        <path
            d="M113.396 7.35199V4.85199H110.896H96.928H95.3079L94.6461 6.33072L60.064 83.6001L25.4819 6.33072L24.8201 4.85199H23.2H9.08801H6.58801V7.35199V107V109.5H9.08801H22.192H24.692V107V44.2756L53.1735 108.02L53.8348 109.5H55.456H64.672H66.2948L66.9554 108.018L95.292 44.4453V107V109.5H97.792H110.896H113.396V107V7.35199Z"
            stroke="white" stroke-width="5" shape-rendering="crispEdges" />


        </svg>
      </div>
    );
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
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
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
                className={`bg-white p-2 rounded-md text-sm md:hover:!bg-[#333] hover:!text-white transition-colors ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Iniciar sesión"}
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

export const dynamic = "force-dynamic";

export default LoginPage;
