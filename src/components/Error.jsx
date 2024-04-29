import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom'; // Asumiendo que estás usando React Router para la navegación

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
            <div className="animate-bounce">
                <span className="icon-[tabler--error-404-off] w-52 h-52"></span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mt-5">Oops! Página no encontrada.</h1>
            <p className="text-base text-gray-600 mt-2">Lo sentimos, la página que estás buscando no existe.</p>
            <Link to="/">
                <Button type="primary" className="mt-5">
                    <span className="iconify inline-block text-lg mr-2" data-icon="ic:baseline-home"></span>
                    Volver al inicio
                </Button>
            </Link>
        </div>
    );
};

export default Error;
