import Image from "next/image";

export default function SesionComponent() {
  const name = "usuario programa";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
  return (
    <section className="flex gap-2 justify-content items-center">
      <span>Usuario15</span>
      <Image
        src={avatarUrl}
        alt={`Avatar de ${name}`}
        width={40} // especifica el ancho
        height={40} // especifica el alto
        unoptimized={true} // porque es una URL externa y no se beneficiará de la optimización de Next.js
        className="rounded-md"
      />
    </section>
  );
}
