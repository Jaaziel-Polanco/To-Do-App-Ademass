import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import UserContextProvider from './context/UserContext.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>,
)
