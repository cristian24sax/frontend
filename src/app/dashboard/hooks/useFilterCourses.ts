// hooks/useFilterCourses.ts
import { useState, useEffect } from "react";
import { DataCourses } from "@/interfaces/dataCourses";
import { useBearStore } from "@/store/ui";

interface UseFilterCoursesResult {
  showCoursesFilter: boolean;
  coursesFilter: DataCourses[];
  error: string | null;
  search: string;
}

export const useFilterCourses = (): UseFilterCoursesResult => {
  const [showCoursesFilter, setShowCoursesFilter] = useState<boolean>(false);
  const [coursesFilter, setCoursesFilter] = useState<DataCourses[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { search } = useBearStore();
  const dataUser = localStorage.getItem("dataUser");
  const { token } = JSON.parse(dataUser as string);

  const fetchFilterCourses = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/list?Name=${search}`, {
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

  useEffect(() => {
    if (search !== null) fetchFilterCourses();
  }, [search]);

  return { showCoursesFilter, coursesFilter, error, search };
};
