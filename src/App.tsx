
import { RouterProvider } from 'react-router-dom'
import { AppThemeProvider } from './providers/ThemeProvider'
import { TanstackProvider } from './providers'
import { router } from './routes'
import { type RootState } from './stores'
import './styles/main.css'
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from './services/Apis/auth.service.api'
import { logout, setUser } from './stores/slice/auth.slice'


function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (!token) return;

    getCurrentUser(token)
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch, token]);

  return (
    <>
        <TanstackProvider>
          <AppThemeProvider>
            <Toaster />
            <RouterProvider router={router} />,
          </AppThemeProvider>
        </TanstackProvider>
    </>
  )
}

export default App
