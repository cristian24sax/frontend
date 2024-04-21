import { DataCourses } from "@/interfaces/dataCourses";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CardCourseComponent from "../atoms/cardCourse";

export default function ListCoursesComponent() {
  const [courses, setCourses] = useState<DataCourses[]>([]); // Estado para almacenar los cursos
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(session, "data");
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/list`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user.data.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { data } = await response.json();
        setCourses(data); // Actualizar el estado con los cursos cargados
      } catch (error: any) {
        setError(error.message); // Actualizar el estado con el error capturado
      }
    };

    fetchData();
  }, []);
  console.log({ courses });
  return (
    <div className="flex flex-wrap gap-4 my-4 min-w-full pb-3">
      {error && <p>Error: {error}</p>}
      {!error && (
        <Swiper spaceBetween={20} slidesPerView={3} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
          {courses.map((course: any) => (
            <SwiperSlide key={course.id}>
              <CardCourseComponent course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
