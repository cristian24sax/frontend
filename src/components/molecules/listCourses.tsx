"use client";
import { DataCourses } from "@/interfaces/dataCourses";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CardCourseComponent from "../atoms/cardCourse";
import Link from "next/link";
interface props {
  courses: DataCourses[];
  error: any;
  slidesPerView: number;
}
export default function ListCoursesComponent({ courses, error, slidesPerView }: props) {
  return (
    <div className="flex flex-wrap gap-4 my-4 min-w-full pb-3">
      {error && <p>Error: {error}</p>}
      {!error && (
        <Swiper spaceBetween={20} slidesPerView={slidesPerView} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
          {courses?.map((course: any) => (
            <SwiperSlide key={course.id}>
              <Link href={`/dashboard/${course.id}`}>
                <CardCourseComponent course={course} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
