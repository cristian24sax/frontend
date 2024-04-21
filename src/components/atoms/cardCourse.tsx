import React from "react";

export default function CardCourseComponent({ course }: any) {
  return (
    <div className="p-4 shadow-xl rounded bg-stone-100 min-w-[330px] ">
      <h2 className="text-xl font-bold mb-2">{course.name}</h2>
      <p className="text-gray-700 mb-1">{course.description}</p>
      <p className="text-gray-600 mb-1">Duración: {course.durationHours} horas</p>
      <p className="text-gray-600">Nivel: {course.nameLevel}</p>
    </div>
  );
}
