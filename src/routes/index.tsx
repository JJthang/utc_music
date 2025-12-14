import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  AlbumPage,
  HomePage,
  LoginPage,
  PlaylistPage,
  SearchPage,
  SignUpPage,
  SongPage,
} from "@/pages";
import {
  PaymentResultPage,
  PaymentSubscriptionPage,
  UpgradeSubscriptionPage,
} from "@/pages/subscription";
import TopSong from "@/pages/TopSong";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "album/:albumId", element: <AlbumPage /> },
      { path: "song/:songId", element: <SongPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "playlist/:playlistId", element: <PlaylistPage /> },
      { path: "chart-top-song", element: <TopSong /> },
      {
        path: "upgrade/subscription",
        element: <UpgradeSubscriptionPage />,
      },
      {
        path: "upgrade/payment",
        element: <PaymentSubscriptionPage />,
      },
      {
        path: "payment/result",
        element: <PaymentResultPage />,
      },
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
