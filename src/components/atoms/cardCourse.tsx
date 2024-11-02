export function CardCourseComponent({ course }: { course: any }) {
  return (
    <div className="p-2 shadow-xl rounded bg-stone-100 mx-auto w-full max-w-xs flex flex-col"> {/* Contenedor principal */}
      <div className="text-center font-bold mb-1">{course.classNumber}</div> {/* Número de clase */}
      <div className="w-full h-[120px] overflow-hidden"> {/* Contenedor para la imagen con overflow hidden */}
        <img
          src={course.previousImage}
          alt="Descripción de la imagen"
          className="w-full h-full object-cover rounded-md" // Imagen que ocupa todo el contenedor
        />
      </div>
      <h2 className="text-sm font-bold text-center mt-2 mb-0 truncate">{course.name}</h2> {/* Título del curso */}
    </div>
  );
}
