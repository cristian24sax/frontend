"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";

export default function SesionComponent() {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    session?.user?.data?.firstName || "user"
  )}&background=random&color=fff`;

  const handleLogOut = () => {
    Cookies.remove("token");
    Cookies.remove("idUser");
    localStorage.clear();
    signIn();
  };

  return (
    <main className="relative">
      <section
        onClick={() => setShow(!show)}
        className="flex gap-2 items-center cursor-pointer"
      >
        <span className="hidden sm:block">
          {session?.user?.data?.firstName} {session?.user?.data?.lastName}
        </span>
        <Image
          src={avatarUrl}
          alt={`Avatar de ${session?.user?.data?.firstName}`}
          width={40}
          height={40}
          unoptimized={true}
          className="rounded-md"
        />
      </section>

      {/* Menú de opciones */}
      {show && (
        <div className="absolute right-0 mt-2 min-w-[70px] w-[90%] sm:w-[80%] bg-stone-100 p-2 text-[13px] shadow-lg rounded-md">
          <button
            onClick={() => {
              setShow(false);
              setShowAccountModal(true);
            }}
            className="w-full text-left hover:bg-stone-200 rounded p-2"
          >
            Mi Cuenta
          </button>
          <button
            onClick={handleLogOut}
            className="w-full text-left hover:bg-stone-200 rounded p-2"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {/* Modal "Mi Cuenta" */}
      {showAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <h2 className="text-xl font-bold mb-4">Mi Cuenta</h2>
            <div className="divide-y divide-gray-200">

              <button
                className="w-full flex justify-between items-center text-left hover:bg-gray-100 rounded p-2"
              >
                Cambiar de plan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => {
                  setShowAccountModal(false);
                  setShowMembershipModal(true);
                }}
                className="w-full flex justify-between items-center text-left hover:bg-gray-100 rounded p-2"
              >
                Administrar Membresía
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

            </div>


            <button
              onClick={() => setShowAccountModal(false)}
              className="text-left mt-4 bg-red-500 text-white rounded p-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal "Administrar Membresía" */}
      {showMembershipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <h2 className="text-xl font-bold mb-4">Administrar Membresía</h2>
            <p>Tu suscripción se cancelará y perderás todos tus beneficios.</p>
            <br />
            <button
              className="w-full text-left text-red-500 rounded p-2 hover:bg-gray-100"
            >
              Cancelar Suscripción
            </button>
            <button
              onClick={() => {
                setShowMembershipModal(false);
                setShowAccountModal(true); // Vuelve a mostrar el modal "Mi Cuenta"
              }}
              className="text-left mt-4 bg-gray-200 rounded p-2"
            >
              Volver
            </button>
          </div>
        </div>

      )}
    </main>
  );
}

export const dynamic = "force-dynamic";
