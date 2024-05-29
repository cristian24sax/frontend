export default function CardCourseComponent({ course }: any) {
  return (
    <div className="p-4 shadow-xl rounded bg-stone-100 min-w-[330px] ">
      <img src={course.previousImage} alt="Descripción de la imagen" />
      <h2 className="text-xl font-bold mb-2">{course.name}</h2>
    </div>
  );
}
