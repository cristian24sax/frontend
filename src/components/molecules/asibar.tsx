"use client";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import "./navbar.css";

interface Props {
  readonly children: React.ReactNode;
}

const AsideBar = ({ children }: Props) => {
  const [open, setOpen] = useState(true);
  const menus = [
    {
      name: "Cursos",
      link: "/",
      icon: MdOutlineDashboard,
      submenus: [
        { name: "TMS", link: "/" },
        { name: "TPS", link: "/" },
        { name: "TQM", link: "/" },
        { name: "RCM", link: "/" },
        { name: "SCM", link: "/" },
        { name: "SIX SIGMA", link: "/" },
      ],
    },
    { name: "Feedback experto", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Programar dinamica", link: "/", icon: AiOutlineHeart, margin: true },
  ];

  return (
    <section className="flex">
      <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4 `}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <div key={i} className={`group flex flex-col gap-1 ${menu.margin && "mt-5"}`}>
              <div className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md">
                <Link href={menu.link} className="flex items-center">
                  {React.createElement(menu.icon, { size: 20 })}
                  <span style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                    {menu.name}
                  </span>
                </Link>
                <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>{menu.name}</h2>
              </div>
              {menu.submenus && (
                <div className="ml-12">
                  {menu.submenus.map((sub, subIndex) => (
                    <Link key={subIndex} href={sub.link} className="block text-sm p-2 hover:bg-gray-700 rounded-md">
                      <span style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                        {sub.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="text-xl text-gray-900 font-semibold overflow-y-auto flex-1">{children}</div> */}
    </section>
  );
};

export default AsideBar;
