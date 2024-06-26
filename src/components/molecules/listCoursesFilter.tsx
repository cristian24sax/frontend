import { DataCourses } from "@/interfaces/dataCourses";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CardCourseComponent from "../atoms/cardCourse";
import Link from "next/link";
interface props {
  courses: DataCourses[];
  error: any;
}
export default function ListCoursesFilterComponent({ courses, error }: props) {
  return (
    <div className="flex flex-wrap gap-4 my-4 min-w-full pb-3">
      {error && <p>Error: {error}</p>}
      {!error && (
        <div className="flex flex-wrap gap-4 ">
          {courses.map((item: DataCourses) => (
            <Link href={`/dashboard/${item.id}`}>
              <CardCourseComponent course={item} key={item.id} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
