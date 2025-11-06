import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home";
import AlbumPage from "@/pages/Album";
import PlaylistPage from "@/pages/Playlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "album/:albumId", element: <AlbumPage /> },
      { path: "playlist/:playlistId", element: <PlaylistPage /> },
    ],
  },
]);
