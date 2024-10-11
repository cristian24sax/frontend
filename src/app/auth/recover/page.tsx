"use client";
import { authRecover } from "@/modules/auth/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";

const validatePage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await authRecover(email)
    console.log({ res }, "respuesta de recuperar");
    if (res.status !== 200) {
      toast.error("Correo no existe");
      return;
    }
    toast.success("Correo enviado exitosamente!");
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-[rgba(0,0,0,0.75)] rounded-2xl px-[24px] py-[40px] m-0 flex flex-col  w-[90%] sm:w-[65%] md:w-[450px] space-y-3">
          <section>
            <p className="text-xl text-white xl:tex-2xl">Recuperar contraseña</p>
          </section>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <div className="flex  flex-col gap-2">
                <input type="email" placeholder="test@test.com" name="email" className="p-2 rounded-md text-sm hover:ring text-gray-700 placeholder:text-gray-400" value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
            </div>
            <section className="flex justify-center items mt-4">
              <button type="submit" className="bg-white p-2 rounded-md text-sm md:hover:!bg-[#333] hover:!text-white transition-colors">
                Recuperar contraseña
              </button>
            </section>
          </form>
        </div>
        <Toaster richColors position="bottom-right" />
      </div>
    </>
  );
};
export default validatePage;
