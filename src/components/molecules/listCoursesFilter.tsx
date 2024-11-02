import { DataCourses } from "@/interfaces/dataCourses";
import "swiper/css";
import Link from "next/link";
import { CardCourseComponent } from "../atoms/cardCourse";

interface Props {
  courses: DataCourses[];
  error: any;
}

export default function ListCoursesFilterComponent({ courses, error }: Props) {
  return (
    <div className="flex flex-wrap gap-4 my-4 min-w-full pb-3"> {/* Flex para el layout y sin centrado */}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!error && (
        <>
          {courses.map((item: DataCourses) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={item.id}> {/* Ancho responsivo */}
              <Link href={`/dashboard/${item.id}`}>
                <CardCourseComponent course={item} />
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
