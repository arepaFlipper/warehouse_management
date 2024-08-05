"use client";

import { useEffect } from "react";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import StoreProvider, { useAppSelector, RootState } from "./redux";

type Props = {
  children: React.ReactNode;
};


const DashboardLayout = ({ children }: Props) => {
  const isSidebarCollapsed = useAppSelector((state: RootState) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state: RootState) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });
  return (
    <StoreProvider>
      <div className={`${isDarkMode ? "dark" : "light"} light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
        <Sidebar />
        <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50  ${isSidebarCollapsed ? "md:pl-24" : "md:pl-72"} `}>
          <Navbar />
          {children}
        </main>
      </div>
    </StoreProvider>
  );
}

const DashboardWrapper = ({ children }: Props) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  )
}

export default DashboardWrapper
