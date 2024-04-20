"use client";
import Link from "next/link";

const validatePage = async ({ params }: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/person/validate?Identifier=${params.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  return (
    <div className="bg-black h-[100vh] w-[100vw] text-white justify-center flex  flex-col items-center text-3xl">
      <div>Correo validado</div>
      <Link href="../login">
        <div className="text-blue-500 mt-[20px] font-bold">Iniciar Sesión</div>
      </Link>
    </div>
  );
};
export default validatePage;
