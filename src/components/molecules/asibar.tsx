
import { Course, Menu } from "@/interfaces/menu.interface";
import { useBearStore } from "@/store/ui";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics, TbVideo } from "react-icons/tb";
import "./navbar.css";

const AsideBar = () => {
  const [open, setOpen] = useState(true);
  const [submenu, setSubMenu] = useState<Course[]>([]);

  const dataUser = localStorage.getItem("dataUser");
  if (!dataUser) {
    throw new Error("No user data found");
  }

  const { token } = JSON.parse(dataUser as string);
  const { setInputValueMenu } = useBearStore();

  const menus: Menu[] = [
    {
      name: "Cursos",
      link: "",
      icon: MdOutlineDashboard,
      submenus: [],
    },
    {
      name: "Modulo de videos",
      link: "",
      icon: TbVideo,
      margin: true,
    },
    {
      name: "Feedback experto",
      link: "",
      icon: TbReportAnalytics,
      margin: true,
    },
    {
      name: "Programar dinamica",
      link: "",
      icon: AiOutlineHeart,
      margin: true,
    },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const { data }: { data: Course[] } = await response.json();
      setSubMenu(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  menus[0].submenus = submenu;

  const handleClick = (id: number) => {
    setInputValueMenu(id);
  };

  return (
    <section className="flex">
      <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i: any) => (
            <div key={i} className={`group flex flex-col gap-1 ${menu.margin && "mt-5"}`}>
              <div className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md">
                <Link href={menu.link} className="flex items-center">
                  {React.createElement(menu.icon, { size: 20 })}
                  <span style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                    {menu.name}
                  </span>
                </Link>
                <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit z-10`}>{menu.name}</h2>
              </div>
              {menu.submenus && (
                <div className="ml-12">
                  {menu.submenus.map((sub, subIndex) => (
                    <Link href={"/dashboard"}>
                      <div key={subIndex} onClick={() => handleClick(sub.id)} className="block text-sm p-2 hover:bg-gray-700 rounded-md">
                        <span style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
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
