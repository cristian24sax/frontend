"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";

export default function SesionComponent() {
  const { data: session } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.data?.firstName || "user")}&background=random&color=fff`;

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("idUser");
    localStorage.clear();
    signIn();
  };

  return (
    <main className="relative">
      <section onClick={() => setShow(!show)} className="flex gap-2 items-center cursor-pointer">
        <span className="hidden sm:block">
          {session?.user?.data?.firstName} {session?.user?.data?.lastName}
        </span>
        <Image src={avatarUrl} alt={`Avatar de ${session?.user?.data?.firstName}`} width={40} height={40} unoptimized={true} className="rounded-md" />
      </section>

      {/* Menú de cierre de sesión */}
      {show && (
        <div className="absolute right-0 mt-2 min-w-[70px] w-[90%] sm:w-[80%] bg-stone-100 p-2 text-[13px] shadow-lg rounded-md">
          <button
            onClick={handleLogOut}
            className="w-full text-left hover:bg-stone-200 rounded p-2" // Ajusta el padding aquí
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </main>
  );
}

export const dynamic = "force-dynamic";
