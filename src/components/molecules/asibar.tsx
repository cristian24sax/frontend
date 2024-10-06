"use client";
import { Course, Menu } from "@/interfaces/menu.interface";
import { useBearStore } from "@/store/ui";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics, TbVideo } from "react-icons/tb";
import "./navbar.css";
import { useRouter } from "next/navigation";

const AsideBar = () => {
  const [open, setOpen] = useState(true);
  const [submenu, setSubMenu] = useState<Course[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null); // Añadido para manejar el rol del usuario
  const router = useRouter();
  const { setInputValueMenu } = useBearStore();

  const menus: Menu[] = [
    {
      name: "Cursos",
      link: "/dashboard",
      icon: MdOutlineDashboard,
      submenus: [],
      roles: ["admin", "user"],
    },
    {
      name: "Modulo de videos",
      link: "/dashboard/uploadVideo",
      icon: TbVideo,
      margin: true,
      roles: ["admin"],
    },
    {
      name: "Feedback experto",
      link: "/dashboard/question",
      icon: TbReportAnalytics,
      margin: true,
      roles: ["admin", "user"],
    },
    {
      name: "Encuestas",
      link: "/dashboard/surveys",
      icon: TbReportAnalytics,
      margin: true,
      roles: ["admin"],
    },
    {
      name: "Programar dinamica",
      link: "/dashboard/dinamic",
      icon: AiOutlineHeart,
      margin: true,
      roles: ["admin", "user"],
    },
  ];

  const fetchData = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        router.push("/auth/login", { scroll: false });
        throw new Error("Failed to fetch data");
      }
      const { data }: { data: Course[] } = await response.json();
      setSubMenu(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    const dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      const parsedData = JSON.parse(dataUser as string);
      setUserRole(parsedData.is_Admin ? "admin" : "user");
      setToken(parsedData.token);
    } else {
      router.push("/auth/login", { scroll: false });
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [token]);

  menus[0].submenus = submenu;

  const handleClick = (id: number) => {
    setInputValueMenu(id);
  };

  return (
    <section className="flex">
      <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-center items-center relative">
          <span className={`text-2xl font-bold transition-all duration-500 ${!open ? 'opacity-0 translate-x-[-100%]' : 'opacity-100 translate-x-0'}`}>MEJORA</span>
          <HiMenuAlt3 size={26} className="cursor-pointer absolute right-0" onClick={() => setOpen(!open)} />
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {menus
            .filter((menu) => (menu.roles || []).includes(userRole || ""))
            .map((menu, i) => (
              <div key={i} className={`group flex flex-col gap-1 ${menu.margin && "mt-5"}`}>
                <div className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md">
                  <Link href={menu.link as any} className="flex items-center">
                    {React.createElement(menu.icon)}
                    <span
                      style={{ transitionDelay: `${i + 3}00ms` }}
                      className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : "opacity-100 translate-x-0"}`}
                    >
                      {menu.name}
                    </span>
                  </Link>
                  <h2
                    className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10`}
                  >
                    {menu.name}
                  </h2>
                </div>
                {menu.submenus && (
                  <div className="ml-12">
                    {menu?.submenus?.map((sub) => (
                      <Link href={"/dashboard"} key={sub.id}>
                        <div key={sub.id} onClick={() => handleClick(sub.id)} className="block text-sm p-2 hover:bg-gray-700 rounded-md">
                          <span
                            style={{ transitionDelay: `${i + 3}00ms` }}
                            className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : "opacity-100 translate-x-0"}`}
                          >
                            {sub.name}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>

  );
};

export default AsideBar;
