"use client";
import SesionComponent from "@/components/atoms/cardSesion";
import SearchComponent from "@/components/atoms/search";
import ListCoursesComponent from "@/components/molecules/listCourses";
import ListCoursesFilterComponent from "@/components/molecules/listCoursesFilter";
import { DataCourses } from "@/interfaces/dataCourses";
import { useFilterCourses } from "./hooks/useFilterCourses";
import { useBearStore } from "@/store/ui";
interface props {
  dataMostViewed: DataCourses[];
  dataUpdoadCourses: DataCourses[];
  dataUserWatchingCourses: DataCourses[];
}
export default function Main({ dataMostViewed, dataUpdoadCourses, dataUserWatchingCourses }: props) {
  const { showCoursesFilter, coursesFilter, error, isLoading, search, valueMenu } = useFilterCourses(); // Incluir isLoading
  const { setInputValue, setInputValueMenu, setNameMenu, nameMenu } = useBearStore();
  const handleClick = () => {
    setInputValue("");
    setInputValueMenu(null);
    setNameMenu("");
    setNameMenu(null);
  };

  return (
    <>
      <header className="shadow-sm sticky top-0 flex justify-between items-center h-16 rounded-sm bg-stone-100 p-4 z-10">
        <div className="flex-1 pr-2">
          <SearchComponent />
        </div>
        <SesionComponent />
      </header>



      {(showCoursesFilter && search !== "") || valueMenu !== null ? (
        <>
          <div className="flex gap-4 mt-5">
            <h3 className="text-xl font-bold">Cursos filtrados de {nameMenu ? `${nameMenu}` : `${search}`}</h3>
            <div className="px-2 py-1 bg-black text-white text-sm rounded-full" onClick={handleClick}>
              X
            </div>
          </div>

          {/* Mostrar el mensaje de "Buscando..." si isLoading es true */}
          {isLoading ? (
            <div className="text-black text-[20px]">Buscando...</div>
          ) : coursesFilter.length > 0 ? (
            <ListCoursesFilterComponent courses={coursesFilter} error={error} />
          ) : (
            <div className="text-black text-[20px]">No hay cursos para este filtro.</div>
          )}
        </>
      ) : (
        <div className="flex flex-col mt-4">
          <h3 className="text-xl font-bold">Los más vistos</h3>
          <ListCoursesComponent courses={dataMostViewed} error="" slidesPerView={3} />
          <h3 className="text-xl font-bold">Recién subidos</h3>
          <ListCoursesComponent courses={dataUpdoadCourses} error="" slidesPerView={3} />
          <h3 className="text-xl font-bold">Clases vistas</h3>
          <ListCoursesComponent courses={dataUserWatchingCourses} error="" slidesPerView={3} />
        </div>
      )}
    </>
  );
}
