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
    element: <GeneralLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset",
        element: <Reset />,
      },
      {
        path: "dashboard",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Dashboard />,
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