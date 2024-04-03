"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../login/login.css";

const validatePage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/recoverypwd?Email=${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    console.log({ res }, "respuesta de recuperar");
    if (res.status !== 200) {
      alert("correo no existe!");
      return;
    }
    alert("correo creado exitosamente");
  };
  return (
    <>
      <div className="container__login">
        <div className="content">
          <section>
            <p className="h2 text-white">Recuperar contraseña</p>
          </section>

          <form onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="input">
                <input type="email" placeholder="test@test.com" name="email" className="form-control mb-2" value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
            </div>
            <section className="button">
              <div className="container__login__actions mt-5">
                <button type="submit">Recuperar contraseña</button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};
export default validatePage;
