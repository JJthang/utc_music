import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { AlbumPage, HomePage, LoginPage, PlaylistPage, SignUpPage } from "@/pages";
import TopSong from "@/pages/TopSong";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "album/:albumId", element: <AlbumPage /> },
      { path: "playlist/:playlistId", element: <PlaylistPage /> },
      { path: "chart-top-song", element: <TopSong /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);
