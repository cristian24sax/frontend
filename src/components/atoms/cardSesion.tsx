"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SesionComponent() {
  const router = useRouter();
  const { firstName, lastName, username } = JSON.parse(localStorage.getItem("dataUser") as string);
  const [show, setShow] = useState<boolean>(false);
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName || "user")}&background=random&color=fff`;
  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("idUser");
    localStorage.clear();
    router.push("/auth/login");
  };
  return (
    <main className="relative">
      <section onClick={() => setShow(!show)} className="flex gap-2 justify-content items-center cursor-pointer">
        <span>
          {firstName} {lastName}
        </span>
        <Image src={avatarUrl} alt={`Avatar de ${username}`} width={40} height={40} unoptimized={true} className="rounded-md" />
      </section>
      {show && (
        <div className="absolute  bg-stone-100 w-[80%] p-2 text-[13px]">
          <button onClick={() => handleLogOut()}>Cerrar sesión</button>
        </div>
      )}
    </main>
  );
}

export const dynamic = "force-dynamic";
