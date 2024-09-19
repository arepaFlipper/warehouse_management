"use client"

import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from "lucide-react"
import { useAppDispatch, useAppSelector, RootState } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type SidebarLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = ((pathname === href) || (pathname === "/" && href === "/dashboard"));

  return (
    <Link href={href}>
      <div className={`cursor-pointer flex items-center ${(isCollapsed) ? "justify-center py-4" : "justify-start px-8 py-4"} hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${(isActive) && "bg-blue-200 text-white"}`}>
        <Icon className="w-6 h-6 !text-gray-700" />
        <span className={`${(isCollapsed) ? "hidden" : "block"}`}>{label}</span>
      </div>
    </Link >
  )

};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state: RootState) => state.global.isSidebarCollapsed);
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  }


  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  const SidebarOptions = [
    { label: "dashboard", icon: Layout },
    { label: "inventory", icon: Archive },
    { label: "products", icon: Clipboard },
    { label: "users", icon: User },
    { label: "settings", icon: SlidersHorizontal },
    { label: "expenses", icon: CircleDollarSign },
  ]
  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO*/}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${(isSidebarCollapsed) ? "px-5" : "px-8"}`}>

        <Image
          src="https://s3-warehouse-storage.s3.us-east-2.amazonaws.com/profile.jpg"
          alt="warehouse-logo"
          width={27}
          height={27}
          className="rounded w-8"
        />

        <h1 className={`font-extrabold text-2xl ${(isSidebarCollapsed) ? "hidden" : "block"}`}>Warehouse Stock</h1>
        <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" onClick={toggleSidebar}>
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* NOTE: LINKS */}
      <div className="flex-grow mt-8">
        {/* links here*/}
        {SidebarOptions.map(({ label, icon }, idx) => {
          return (
            <SidebarLink key={`${label}-${idx}`} label={`${label.charAt(0).toUpperCase()}${label.slice(1)}`} icon={icon} href={`/${label}`} isCollapsed={isSidebarCollapsed} />
          )
        })}
      </div>

      {/* FOOTER */}
      <div>
        <p className="text-center text-xs text-gray-500">&copy; 2024 WarehouseStock</p>
      </div>
    </div>
  )
}

export default Sidebar
