import { Outlet } from "react-router";

import MusicPlayer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import SidebarMenu from "@/components/layout/Sidebar/SidebarMenu";

const MainLayout = () => {
  return (
    <main className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <SidebarMenu />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-y-auto overflow-x-visible px-6 py-2 bg-outlet">
            <Outlet />
          </div>
        </div>
      </div>
      <MusicPlayer />
      <Sidebar />
    </main>
  );
};

export default MainLayout;
