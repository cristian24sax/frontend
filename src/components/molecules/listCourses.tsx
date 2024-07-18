"use client";
import { DataCourses } from "@/interfaces/dataCourses";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
// import CardCourseComponent from "../atoms/cardCourse";
import Link from "next/link";
import { CardCourseComponent } from "../atoms/cardCourse";
interface props {
  courses: DataCourses[];
  error: any;
  slidesPerView: number;
}
export default function ListCoursesComponent({ courses, error, slidesPerView }: props) {
  return (
    <div className="my-4 pb-3">
      {error && <p className="text-red-500">Error: {error}</p>}
      {!error && (
        <Swiper spaceBetween={20} slidesPerView={slidesPerView} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
          {courses?.map((course: DataCourses) => (
            <SwiperSlide key={course.id}>
              <Link href={`/dashboard/${course.id}`} passHref>
                <CardCourseComponent course={course} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
