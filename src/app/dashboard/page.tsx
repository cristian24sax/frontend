"use client";
import SesionComponent from "@/components/atoms/cardSesion";
import SearchComponent from "@/components/atoms/search";
import ListCoursesComponent from "@/components/molecules/listCourses";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log({ session });
  return (
    <main className="w-full p-5">
      <header className="shadow-sm sticky top-0 flex justify-between items-center  h-16 rounded-sm bg-stone-100 p-4">
        <SearchComponent />
        <SesionComponent />
      </header>
      <div className="my-5">
        <h1>Los más vistos</h1>
        <ListCoursesComponent />
        <h1>Recien subidos</h1>
        <ListCoursesComponent />
        <h1>Vieos vistos</h1>
        <ListCoursesComponent />
      </div>
    </main>
  );
};
export default Dashboard;
