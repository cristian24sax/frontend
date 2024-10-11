import { DataCourses } from "@/interfaces/dataCourses";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { CardCourseComponent } from "../atoms/cardCourse";
import { useRef, useState, useEffect } from "react"; // Importa useEffect para manejar el tamaño de la ventana
import { Swiper as SwiperType } from "swiper"; // Importa el tipo Swiper

interface Props {
  courses: DataCourses[];
  error: any;
  slidesPerView: number;
}

export default function ListCoursesComponent({ courses, error, slidesPerView }: Props) {
  const swiperRef = useRef<SwiperType | null>(null); // Usamos SwiperType como referencia
  const [showArrows, setShowArrows] = useState(false); // Estado para manejar la visibilidad de las flechas
  const [isMobile, setIsMobile] = useState(false); // Estado para saber si es móvil

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Accede a la instancia del Swiper
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(); // Accede a la instancia del Swiper
    }
  };

  // useEffect para detectar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define el umbral para móvil
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llama a la función para establecer el estado inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="my-4 pb-3">
      {error && <p className="text-red-500">Error: {error}</p>}
      {!error && (
        <div
          className="relative"
          onMouseEnter={() => setShowArrows(true)} // Muestra las flechas al pasar el mouse
          onMouseLeave={() => setShowArrows(false)} // Oculta las flechas al salir el mouse
        >
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Establece la referencia correctamente
            spaceBetween={20}
            slidesPerView={slidesPerView}
            breakpoints={{
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
            }}
          >
            {courses?.map((course: DataCourses) => (
              <SwiperSlide key={course.id}>
                <Link href={`/dashboard/${course.id}`} passHref>
                  <CardCourseComponent course={course} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones de navegación */}
          {showArrows || isMobile ? ( // Siempre mostrar flechas en móvil
            <>
              <div className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10">
                <button
                  onClick={handlePrev}
                  className="bg-black text-white p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                  style={{ width: '50px', height: '50px' }} // Tamaño del botón
                >
                  &lt; {/* Icono de flecha izquierda */}
                </button>
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10">
                <button
                  onClick={handleNext}
                  className="bg-black text-white p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                  style={{ width: '50px', height: '50px' }} // Tamaño del botón
                >
                  &gt; {/* Icono de flecha derecha */}
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
