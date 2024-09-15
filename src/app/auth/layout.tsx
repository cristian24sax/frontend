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
          {/* <Image src="/logo.png" alt="Logo" width={40} height={40} /> */}
          <span className="text-3xl font-bold tracking-wider text-white drop-shadow-lg uppercase">
            MEJORA
          </span>
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

      <main className="container absolute">{children}</main>
    </div>
  );
}
