import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex justify-center items-center h-[100vh] relative">
      <Image
        src="/fondo.webp"
        alt="fondo"
        fill
        className="absolute inset-0 object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
      <main className="container absolute">{children}</main>

      {/* Top-left text */}
      <p className="text-white text-sm absolute top-0 left-0 ml-3 xs:hidden md:block md:text-md xl:text-xl pt-1">
        Transformar la industria peruana en referente mundial
      </p>

      {/* Top-right text */}
      <p className="text-white text-sm absolute top-0 right-0 mr-3 xs:hidden md:block md:text-md xl:text-xl pt-1">
        Aprende con profesionales que han implementado exitosamente
      </p>

      {/* Bottom-left text */}
      <p className="text-white text-sm absolute bottom-0 left-0 ml-3 xs:hidden md:block md:text-md xl:text-xl pb-1">
        Tú aprendizaje es nuestro mayor objetivo
      </p>

      {/* Bottom-right text */}
      <p className="text-white text-sm absolute bottom-0 right-0 mr-3 xs:hidden md:block md:text-md xl:text-xl pb-1">
        Transformar vidas mediante el aprendizaje integral
      </p>
    </div>
  );
}
