"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { InputComponent } from "@/components/atoms";
import { Country, DataCountry } from "@/interfaces/dataCountry";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [firstName, setFisrtName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [country, setCountry] = useState<number>(1);
  const [data, setData] = useState<Country>(); // Estado para almacenar la respuesta de la API
  const [error, setError] = useState(null); // Estado para almacenar cualquier error de la API
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCode, setSelectedCode] = useState("");
  const [idCountry, SetIdCountry] = useState<number>();

  // Manejar el cambio de selección
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCode(event.target.value);
    const idcountry = data?.data?.find((item: DataCountry) => item.code_number === event.target.value);
    SetIdCountry(idcountry?.id);
    console.log(idcountry, "as");
    setPhoneNumber("");
  };
  const router = useRouter();
  // const data = await getData();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Comenzar a mostrar el indicador de carga
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/country/select`); // Cambia la URL por tu endpoint
        setData(response.data); // Guardar los datos de la respuesta en el estado
        setError(null); // Asegurarse de resetear el estado de error
      } catch (error) {
        // setError(error); // Guardar cualquier error que ocurra durante la llamada
      } finally {
        setIsLoading(false); // Asegurar que el indicador de carga se oculta al finalizar
      }
    };
    fetchData();
  }, []);

  const codeCountries = data?.data.map((item: DataCountry) => item.code_number);
  console.log({ codeCountries }, data);
  const idCountries = data?.data.map((item: DataCountry) => item.id);
  const nameCountries = data?.data.map((item: DataCountry) => item.name);

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
        userName: username,
        email,
        password,
        countryId: idCountry,
        phone_number: `${selectedCode}${phoneNumber}`,
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
      toast.error("Hubo un error al registrar cuenta.");
      return;
    }
    toast.success("Registro fue exitoso");
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center relative">
      <div className="bg-[rgba(0,0,0,0.75)] rounded-2xl px-[24px] py-[40px] m-0 flex flex-col  w-[90%] sm:w-[65%] md:w-[530px] space-y-3">
        <section className="space-y-3">
          <p className="text-white text-2xl flex justify-center items-center ">Registro</p>
          <p className="text-white text-sm  text-center md:text-md xl:text-xl"></p>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="space-y-3">
              <div className="flex flex-col space-y-3   md:flex-row md:space-y-0 md:space-x-3">
                <InputComponent type="text" placeholder="nombre" name="name" value={firstName} onChange={(e) => setFisrtName(e.target.value)} />
                <InputComponent type="text" placeholder="apellido" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="flex flex-col  space-y-3 md:flex-row  md:space-y-0 md:space-x-3 ">
                <InputComponent type="text" placeholder="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <InputComponent type="email" placeholder="correo" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col  space-y-3 md:flex-row md:space-y-0  md:space-x-3">
                <InputComponent type="password" placeholder="contraseña" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div>
                  <div className="flex justify-content items-center flex-grow-1 xl:w-[235px] ">
                    <select value={selectedCode} onChange={handleSelectChange} className="p-2  border !border-l-sm  h-[35px] w-[50%] text-sm hover:ring text-gray-700 placeholder:text-gray-400 !overflow-y-auto !max-h-[50px] ">
                      {codeCountries?.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="p-2 border h-[35px] !border-l-0 w-full  text-sm hover:ring text-gray-700 placeholder:text-gray-400 flex-grow  " />
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3">
              <Link href="./login">
                <span className="text-white text-sm  hover:!text-blue-500 transition-colors">Iniciar Sesión</span>
              </Link>
            </div>
          </div>
          <section className="flex justify-center items-center">
            <button type="submit" className="bg-white p-2 rounded-md text-sm md:hover:!bg-[#333] xl:hover:!text-white transition-colors">
              Crear cuenta
            </button>
          </section>
          <Toaster richColors position="bottom-right" />
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
