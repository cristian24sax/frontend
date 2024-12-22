// hooks/useFilterCourses.ts
import { useState, useEffect } from "react";
import { DataCourses } from "@/interfaces/dataCourses";
import { useBearStore } from "@/store/ui";
import Cookies from "js-cookie";
//import axiosInstance from '../../auth/login/utils/axiosInterceptor';

interface UseFilterCoursesResult {
  showCoursesFilter: boolean;
  coursesFilter: DataCourses[];
  isLoading: boolean; // Nuevo estado para saber si está cargando
  error: string | null;
  search: string;
  valueMenu: number | null;
}

export const useFilterCourses = (): UseFilterCoursesResult => {
  const [showCoursesFilter, setShowCoursesFilter] = useState<boolean>(false);
  const [coursesFilter, setCoursesFilter] = useState<DataCourses[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Nuevo estado de carga


  const { search, valueMenu } = useBearStore();
  const dataUser = localStorage.getItem("dataUser");
  const { token } = JSON.parse(dataUser as string);

  // Estado para manejar el debounce
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     try {
  //       const token = Cookies.get("token");
  //       if (token) {
  //         await axiosInstance.get("/validate-token");
  //       }
  //     } catch (error) {
  //       console.error("Session validation failed", error);
  //     }
  //   }, 5 * 60 * 1000); // Validar cada 5 minutos
  
  //   return () => clearInterval(interval);
  // }, []);
  

  // Función para llamar al endpoint
  const fetchFilterCourses = async () => {
    setIsLoading(true); // Indicar que la búsqueda ha empezado

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/list?Name=${debouncedSearch}`, {
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
      setCoursesFilter(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Indicar que la búsqueda ha terminado
    }
  };

  const fetchFilterCoursesMenu = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson?CourseId=${valueMenu}`, {
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
      setCoursesFilter(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Efecto para actualizar `debouncedSearch` después de 2 segundos de inactividad
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000); // 2000 ms = 2 segundos

    // Limpiar el timeout si el usuario sigue escribiendo
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Efecto para llamar a `fetchFilterCourses` cuando `debouncedSearch` cambie
  useEffect(() => {
    // Solo hacer la búsqueda si hay al menos 3 caracteres
    if (debouncedSearch.length >= 3) {
      fetchFilterCourses();
    } else {
      // Si tiene menos de 3 caracteres, limpiar los resultados
      setShowCoursesFilter(false);
      setCoursesFilter([]);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (valueMenu !== null) fetchFilterCoursesMenu();
  }, [valueMenu]);


  return { showCoursesFilter, coursesFilter, error, isLoading, search, valueMenu };
};
