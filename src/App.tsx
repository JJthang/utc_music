
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppThemeProvider } from './providers/ThemeProvider'
import { TanstackProvider } from './providers'
import { router } from './routes'
import { store } from './stores'
import './styles/main.css'
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <>
      <Provider store={store}>
        <TanstackProvider>
          <AppThemeProvider>
            <Toaster />
            <RouterProvider router={router} />,
          </AppThemeProvider>
        </TanstackProvider>
      </Provider>
    </>
  )
}

export default App
