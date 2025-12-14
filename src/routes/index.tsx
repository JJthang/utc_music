import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import {
  AlbumPage,
  FavoritePage,
  HomePage,
  PlaylistPage,
  SearchPage,
  SongPage,
  TopSongPage
} from "@/pages";
import {
  PaymentResultPage,
  PaymentSubscriptionPage,
  UpgradeSubscriptionPage,
} from "@/pages/subscription";
import { BlockAdminGuard, ProtectedRoute } from "./ProtectRoute";
import { ForbiddenPage, NotFoundPage } from "@/pages/errors";
import { LoginPage, SignUpPage } from "@/pages/auth";

export const router = createBrowserRouter([
  {
    element: <BlockAdminGuard />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "album/:albumId", element: <AlbumPage /> },
          { path: "song/:songId", element: <SongPage /> },
          { path: "search", element: <SearchPage /> },
          { path: "playlist/:playlistId", element: <PlaylistPage /> },
          { path: "chart-top-song", element: <TopSongPage /> },
          {
            path: "upgrade/subscription",
            element: <UpgradeSubscriptionPage />,
          },
          {
            path: "payment/result",
            element: <PaymentResultPage />,
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "upgrade/payment",
                element: <PaymentSubscriptionPage />,
              },
              {
                path: "favorite",
                element: <FavoritePage />,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/403", element: <ForbiddenPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
