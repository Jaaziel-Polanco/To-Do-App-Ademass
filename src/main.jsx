import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createHashRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import LayoutPrivate from './layout/LayoutPrivate.jsx'
import Error from './components/Error.jsx'
import Reset from './pages/Reset.jsx'
import UserContextProvider from './context/UserContext.jsx'
import GeneralLayout from './layout/GeneralLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <GeneralLayout />, // Layout general que podría incluir la navbar, footer, etc.
    errorElement: <Error />, // Página de error general
    children: [
      {
        index: true,
        element: <Home />, // Página de inicio pública
      },
      {
        path: "login",
        element: <Login />, // Página de inicio de sesión
      },
      {
        path: "register",
        element: <Register />, // Página de registro
      },
      {
        path: "reset",
        element: <Reset />, // Página de registro
      },
      {
        path: "dashboard", // Ruta base para todas las rutas autenticadas
        element: <LayoutPrivate />, // Layout privado para usuarios autenticados
        children: [
          {
            index: true,
            element: <Dashboard />, // Página por defecto para el layout privado
          },
          // otras sub-rutas dentro del layout privado...
        ]
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
)