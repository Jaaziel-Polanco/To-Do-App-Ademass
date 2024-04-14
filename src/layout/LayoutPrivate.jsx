import { Outlet, Navigate } from "react-router-dom";

const LayoutPrivate = () => {
    // aca debo agregar la variable que controla el usuario logueado para asi poder mostrar las rutas privadas que se renderizan aqui.
    return <>
        return user ? <Outlet /> : <Navigate to="/" />;
    </>
}
export default LayoutPrivate;