import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home";
import AlbumPage from "@/pages/Album";
import PlaylistPage from "@/pages/Playlist";
import LoginPage from "@/pages/Login";
import SignUpPage from "@/pages/Signup";

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
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);
