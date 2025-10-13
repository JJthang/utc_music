import MusicPlayer from "@/components/common/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <main>
            <Outlet />
            <MusicPlayer />
        </main>
    )
}

export default MainLayout