import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Image src="/fondo.webp" alt="fondo" fill className="absolute inset-0 object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
      <main className="container absolute">{children}</main>
    </div>
  );
}
