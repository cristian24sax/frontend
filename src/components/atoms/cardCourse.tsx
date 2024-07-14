export default function CardCourseComponent({ course }: any) {
  return (
    <div className="p-4 shadow-xl rounded bg-stone-100 max-w-[500px] ">
      <img src={course.previousImage} alt="Descripción de la imagen" className="w-full h-[150px] flex justify-center items-center" />
      <h2 className="text-xl font-bold text-center mt-5 mb-0">{course.name}</h2>
    </div>
  );
}
