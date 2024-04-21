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
  return (
    <main >
      <header className="shadow-sm sticky top-0 flex justify-between items-center  h-16 rounded-sm bg-stone-100 p-4 z-10">
        <SearchComponent />
        <SesionComponent user={session?.user?.data?.firstName} lastName={session?.user?.data?.lastName} />
      </header>
      <div className="flex flex-col mt-4">
        <h3 className="text-xl font-bold">Los más vistos</h3>
        <ListCoursesComponent />
        <h3 className="text-xl font-bold">Recien subidos</h3>
        <ListCoursesComponent />
        <h3 className="text-xl font-bold">Videos vistos</h3>
        <ListCoursesComponent />
      </div>
    </main>
  );
};
export default Dashboard;
