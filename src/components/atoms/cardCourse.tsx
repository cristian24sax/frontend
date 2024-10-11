export function CardCourseComponent({ course }: { course: any }) {
  return (
    <div className="p-4 shadow-xl rounded bg-stone-100 mx-auto h-[350px] w-full max-w-md flex flex-col"> {/* Altura fija */}
      <div className="text-center font-bold">{course.classNumber}</div>
      <img
        src={course.previousImage}
        alt="Descripción de la imagen"
        className="w-full h-[250px] object-cover rounded-md" // Altura de imagen
      />
      <h2 className="text-xl font-bold text-center mt-5 mb-0 flex-grow">{course.name}</h2> {/* Permite que el título crezca */}
    </div>
  );
}
