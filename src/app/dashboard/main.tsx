"use client";
import ListCoursesComponent from "@/components/molecules/listCourses";
import ListCoursesFilterComponent from "@/components/molecules/listCoursesFilter";
import { DataCourses } from "@/interfaces/dataCourses";
import { useBearStore } from "@/store/ui";
import React, { useEffect, useState } from "react";
import { useFilterCourses } from "./hooks/useFilterCourses";
import SearchComponent from "@/components/atoms/search";
import SesionComponent from "@/components/atoms/cardSesion";
interface props {
  dataMostViewed: DataCourses[];
  dataUpdoadCourses: DataCourses[];
  dataUserWatchingCourses: DataCourses[];
}
export default function Main({ dataMostViewed, dataUpdoadCourses, dataUserWatchingCourses }: props) {
  const { showCoursesFilter, coursesFilter, error, search } = useFilterCourses();
  return (
    <>
      <header className="shadow-sm sticky top-0 flex justify-between items-center  h-16 rounded-sm bg-stone-100 p-4 z-10">
        <SearchComponent />
        <SesionComponent />
      </header>
      {showCoursesFilter && search !== "" ? (
        <>
          <h3 className="text-xl font-bold">Cursos filtrados</h3>
          {coursesFilter.length > 0 ? <ListCoursesFilterComponent courses={coursesFilter} error={error} /> : <div className="text-black text-[20px]">No hay cursos para esto filtro.</div>}
        </>
      ) : (
        <div className="flex flex-col mt-4">
          <h3 className="text-xl font-bold">Los más vistos</h3>
          <ListCoursesComponent courses={dataMostViewed} error="" slidesPerView={3} />
          <h3 className="text-xl font-bold">Recién subidos</h3>
          <ListCoursesComponent courses={dataUpdoadCourses} error="" slidesPerView={3} />
          <h3 className="text-xl font-bold">Videos vistos</h3>
          <ListCoursesComponent courses={dataUserWatchingCourses} error="" slidesPerView={3} />
        </div>
      )}
    </>
  );
}
