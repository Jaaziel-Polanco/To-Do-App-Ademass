import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import LayoutPrivate from './layout/LayoutPrivate.jsx'
import Error from './components/Error.jsx'
import Reset from './pages/Reset.jsx'
import UserContextProvider from './context/UserContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPrivate />,
    errorElement: <Error />
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "reset",
    element: <Reset />,
  }
],
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
)