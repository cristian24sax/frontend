import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
interface props {
  user: string | undefined;
  lastName: string | undefined;
}
export default function SesionComponent({ user, lastName }: props) {
  const { data: session, status } = useSession();
  const [show, setShow] = useState<boolean>(false);
  const name = "usuario";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user || "user")}&background=random&color=fff`;
  console.log(session,'data')
  return (
    <main className="relative">
      <section onClick={() => setShow(!show)} className="flex gap-2 justify-content items-center cursor-pointer">
        <span>
          {user} {lastName}
        </span>
        <Image
          src={avatarUrl}
          alt={`Avatar de ${name}`}
          width={40} // especifica el ancho
          height={40} // especifica el alto
          unoptimized={true} // porque es una URL externa y no se beneficiará de la optimización de Next.js
          className="rounded-md"
        />
      </section>
      {show && (
        <div className="absolute  bg-stone-100 w-[80%] p-2 text-[13px]">
          <button onClick={() => signIn()}>Cerrar sesión</button>
        </div>
      )}
    </main>
  );
}
