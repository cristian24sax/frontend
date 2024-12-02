export function CardCourseComponent({ course }: { course: any }) {
  return (
    <div className="rounded-lg bg-gray-100 overflow-hidden w-full max-w-xs mx-auto flex flex-col"> {/* Fondo gris claro y sin sombra */}
      <div className="relative w-full h-[160px] flex justify-center items-center overflow-hidden"> {/* Contenedor para la imagen */}
        <img
          src={course.previousImage}
          alt="Descripción de la imagen"
          className="w-full h-full transition-transform duration-300 hover:scale-105" // Ajuste de la imagen para que se vea completa
        />
      </div>
      <div> {/* Contenedor para los textos */}
        {course.classNumber && ( /* Mostrar solo si existe course.classNumber */
          <div className="text-center font-semibold text-gray-600 mb-2 text-xs uppercase tracking-wider">
            Clase {course.classNumber}
          </div>
        )}
        <h2 className="text-sm font-bold text-center text-gray-800 truncate mb-2">
          {course.name}
        </h2>
      </div>
    </div>
  );
}
