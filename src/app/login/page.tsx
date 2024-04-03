"use client";
import Link from "next/link";
import "./login.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("admin@hotmail.com");
  const [password, setPassword] = useState("123456");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

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

  return (
    <div className="container__login">
      <div className="content">
        <section>
          <p className="h2 text-white">Inicia sesión</p>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="input">
              <input type="email" placeholder="test@test.com" name="email" className="form-control mb-2" value={email} onChange={(event) => setEmail(event.target.value)} />
              <input type="password" placeholder="123123" name="password" className="form-control mb-2" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="forget">Olvidaste tu contraseña</div>
          </div>
          <section className="button">
            <div className="container__login__actions mt-5">
              <button type="submit">Iniciar sesión</button>
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
        <footer>
          <div className="forget">
            {/* <a [routerLink]="'/auth/login/registro'" className="text-primary"> Suscríbete ahora. </a> */}
            <Link href="/register">
              <span className="text-white">Crea tu cuenta nueva</span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default LoginPage;
