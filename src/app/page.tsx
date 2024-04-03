import ButtonAuth from "@/components/ButtonAuth";
const HomePage = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="my-[40px] text-2xl font-bold">Home Page</h1>
      <div className="w-[700px] h-[500px]  flex justify-center items-center ">
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/SITIO-EN-CONSTRUCCION.jpg" alt="img" />
      </div>
      <div className="mt-[40px] text-xl flex flex-col justify-center items-center">
        <ButtonAuth />
      </div>
    </div>
  );
};
export default HomePage;
