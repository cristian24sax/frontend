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
    signIn();
  };
  return (
    <main className="relative">
      <section onClick={() => setShow(!show)} className="flex gap-2 justify-content items-center cursor-pointer">
        <span>
          {session?.user?.data?.firstName} {session?.user?.data?.lastName}
        </span>
        <Image src={avatarUrl} alt={`Avatar de ${name}`} width={40} height={40} unoptimized={true} className="rounded-md" />
      </section>
      {show && (
        <div className="absolute  bg-stone-100 w-[80%] p-2 text-[13px]">
          <button onClick={() => handleLogOut()}>Cerrar sesión</button>
        </div>
      )}
    </main>
  );
}
