"use client";
import SesionComponent from "@/components/atoms/cardSesion";
import SearchComponent from "@/components/atoms/search";
import ListCoursesComponent from "@/components/molecules/listCourses";
import ListCoursesFilterComponent from "@/components/molecules/listCoursesFilter";
import { DataCourses } from "@/interfaces/dataCourses";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [coursesMostViewed, setCoursesMostViewed] = useState<DataCourses[]>([]);
  const [coursesNewlig, setCoursesNewlig] = useState<DataCourses[]>([]);
  const [courses, setCourses] = useState<DataCourses[]>([]);
  const [coursesFilter, setCoursesFilter] = useState<DataCourses[]>([]);
  const [showCoursesFilter, setShowCoursesFilter] = useState<boolean>(false);
  const [dataFromChild, setDataFromChild] = useState<string | null>(null);
  const [error, setError] = useState(null);
  const handleDataFromChild = (data: string) => {
    setDataFromChild(data);
  };
  // Almacenamiento del token en localStorage cuando la sesión cambia
  useEffect(() => {
    if (session?.user?.data?.token) {
      localStorage.setItem("token", session.user.data.token);
      localStorage.setItem("id", session.user.data.id.toString());
    }
  }, [session?.user?.data?.token]);
  // Función para obtener los cursos más vistos
  const fetchMostViewedCourses = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/most-viewed`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { data } = await response.json();
        setCoursesMostViewed(data);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  // Función para obtener los cursos recién subidos
  const fetchNewlyUploadedCourses = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/newly-uploaded`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { data } = await response.json();
        setCoursesNewlig(data);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  // Función para obtener los cursos que está viendo el usuario
  const fetchUserWatchingCourses = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/user-watching?UserPersonId=${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { data } = await response.json();
        setCourses(data);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };
  const fetchFilterCourses = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/list?Name=${dataFromChild}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setShowCoursesFilter(true);
        const { data } = await response.json();
        // setCoursesNewlig(data);
        setCoursesFilter(data);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };
  // Efectos para realizar las peticiones de datos una vez que el token esté disponible
  useEffect(() => {
    fetchMostViewedCourses();
    fetchNewlyUploadedCourses();
    fetchUserWatchingCourses();
  }, [localStorage.getItem("token")]);
  useEffect(() => {
    if (dataFromChild !== null) fetchFilterCourses();
  }, [dataFromChild]);
  if (status === "loading" || !localStorage.getItem("token")) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <header className="shadow-sm sticky top-0 flex justify-between items-center  h-16 rounded-sm bg-stone-100 p-4 z-10">
        <SearchComponent sendDataToParent={handleDataFromChild} />
        <SesionComponent user={session?.user?.data?.firstName} lastName={session?.user?.data?.lastName} />
      </header>
      {showCoursesFilter && dataFromChild !== "" ? (
        <>
          <h3 className="text-xl font-bold">Cursos filtrados</h3>
          {coursesFilter.length > 0 ? <ListCoursesFilterComponent courses={coursesFilter} error={error} /> : <div className="text-black text-[20px]">No hay cursos para esto filtro.</div>}
        </>
      ) : (
        <div className="flex flex-col mt-4">
          <h3 className="text-xl font-bold">Los más vistos</h3>
          <ListCoursesComponent courses={coursesMostViewed} error={error} slidesPerView={3} />
          <h3 className="text-xl font-bold">Recién subidos</h3>
          <ListCoursesComponent courses={coursesNewlig} error={error} slidesPerView={3} />
          <h3 className="text-xl font-bold">Videos vistos</h3>
          <ListCoursesComponent courses={courses} error={error} slidesPerView={3} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
