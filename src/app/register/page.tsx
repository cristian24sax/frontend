"use client";
import Link from "next/link";
import "./register.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [firstName, setFisrtName] = useState<string>("cristian");
  const [lastName, setLastName] = useState<string>("quispe");
  const [username, setUsername] = useState<string>("quispe");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [country, setCountry] = useState<number>(1);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/person`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
        country,
      }),
    });

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      router.push("/dashboard");

      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setErrors([]);

  //   const responseNextAuth = await signIn("credentials", {
  //     email,
  //     password,
  //     redirect: false,
  //   });

  //   if (responseNextAuth?.error) {
  //     setErrors(responseNextAuth.error.split(","));
  //     return;
  //   }

  //   router.push("/dashboard");
  // };
  const handleRedirect = () => {
    router.push("/dashboard");
  };
  return (
    <div className="container__login">
      <div className="content">
        <section>
          <p className="text-white text-2xl flex justify-center items-center ">Registro</p>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="input">
              <div className="flex flex-row gap-4">
                <input type="text" placeholder="test" name="name" className="input-register" value={firstName} onChange={(event) => setFisrtName(event.target.value)} />
                <input type="text" placeholder="123123" name="firstName" className="input-register" value={lastName} onChange={(event) => setLastName(event.target.value)} />
              </div>
              <div className="flex flex-row gap-4">
                <input type="text" placeholder="123123" name="lastName" className="input-register" value={username} onChange={(event) => setUsername(event.target.value)} />
                <input type="email" placeholder="test@test.com" name="email" className="input-register" value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
              <div className="flex flex-row gap-4">
                <input type="password" placeholder="123123" name="password" className="input-register" value={password} onChange={(event) => setPassword(event.target.value)} />
                <input type="text" placeholder="123123" name="country" className="input-register" value={country} onChange={(event) => setCountry(Number(event.target.value))} />
              </div>
            </div>
            <div className="forget">
              {/* <a [routerLink]="'/auth/login/registro'" className="text-primary"> Suscríbete ahora. </a> */}
              <Link href="/register">Iniciar Sesión</Link>
            </div>
          </div>
          <section className="button">
            <div className="container__login__actions mt-2">
              <button type="submit">Crear cuenta</button>
            </div>
          </section>
        </form>
        {errors.length > 0 && (
          <div className="alert alert-danger mt-2">
            <ul className="mb-0">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* <p className="message">Tú aprendizaje es nuestro mayor objetivo</p> */}
      <p className="message">Transformar vidas mediante el aprendizaje integral</p>
      <p className="message2">Transformar la industria peruana en referente mundial</p>
    </div>
  );
};
export default RegisterPage;
