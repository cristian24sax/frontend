import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] relative">
      <Image src="/fondo.webp" alt="fondo" fill className="absolute inset-0 object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />

      {/* Header */}
      <header className="w-full bg-black text-white flex justify-between items-center p-4  h-[85px] opacity-[0.8] absolute top-0 left-0">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/login" className="text-white">
            Login
          </Link>
          <Link href="/novedades" className="text-white">
            Novedades
          </Link>
        </nav>
      </header>

      <main className="container absolute top-40">{children}</main>

      {/* Bottom-left text */}
      <p className="text-white text-sm absolute bottom-0 left-0 ml-3 xs:hidden md:block md:text-md xl:text-xl pb-1">Tú aprendizaje es nuestro mayor objetivo</p>

      {/* Bottom-right text */}
      <p className="text-white text-sm absolute bottom-0 right-0 mr-3 xs:hidden md:block md:text-md xl:text-xl pb-1">Transformar vidas mediante el aprendizaje integral</p>
    </div>
  );
}
