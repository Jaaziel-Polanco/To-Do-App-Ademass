import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Home, Login, Register, Reset } from "./pages";
import { LayoutGeneral, LayoutPrivate } from "./layout";
import Error404 from "./components/Error/Error404";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutGeneral />,
        errorElement: <Error404 />,
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




])