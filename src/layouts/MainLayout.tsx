import MusicPlayer from "@/components/common/Footer";
import Sidebar from "@/components/common/Sidebar";
import SidebarMenu from "@/components/common/Sidebar/SidebarMenu";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex">
                <SidebarMenu />
                <div className="flex-1 h-[calc(100vh-91px)] overflow-y-scroll px-10 py-2 bg-[#170f23]">
                    <Outlet />
                </div>
            </div>
            <MusicPlayer />
            <Sidebar />
        </main>
    )
}

export default MainLayout