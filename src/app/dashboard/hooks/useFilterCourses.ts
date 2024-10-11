import { useState, useEffect } from "react";
import { DataCourses } from "@/interfaces/dataCourses";
import { useBearStore } from "@/store/ui";
import { filterCourses, filterCoursesMenu } from "@/modules/dashboard/service/dashboard.service";

interface UseFilterCoursesResult {
  showCoursesFilter: boolean;
  coursesFilter: DataCourses[];
  error: string | null;
  search: string;
  valueMenu: number | null;
}

export const useFilterCourses = (): UseFilterCoursesResult => {
  const [showCoursesFilter, setShowCoursesFilter] = useState<boolean>(false);
  const [coursesFilter, setCoursesFilter] = useState<DataCourses[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { search, valueMenu } = useBearStore();
  const fetchFilterCourses = async () => {
    try {
      const response = await filterCourses(search);
      setShowCoursesFilter(true);
      const { data } = response;
      setCoursesFilter(data);
    } catch (error: any) {
      setError(error.message);
    }
  };
  const fetchFilterCoursesMenu = async () => {
    try {
      const response = await filterCoursesMenu(valueMenu);
      setShowCoursesFilter(true);
      const { data } = response;
      setCoursesFilter(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (search !== "") fetchFilterCourses();
  }, [search]);
  useEffect(() => {
    if (valueMenu !== null) fetchFilterCoursesMenu();
  }, [valueMenu]);

  return { showCoursesFilter, coursesFilter, error, search, valueMenu };
};
