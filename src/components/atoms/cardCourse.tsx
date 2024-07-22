export function CardCourseComponent({ course }: { course: any }) {
  return (
    <div className="p-4 shadow-xl rounded bg-stone-100 max-w-[500px] mx-auto h-auto">
      <div className="text-center font-bold">{course.classNumber}</div>
      <img src={course.previousImage} alt="Descripción de la imagen" className="w-full h-[250px] flex justify-center items-center" />
      <h2 className="text-xl font-bold text-center mt-5 mb-0">{course.name}</h2>
    </div>
  );
}
