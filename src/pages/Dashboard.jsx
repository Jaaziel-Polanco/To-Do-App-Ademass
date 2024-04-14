import React from 'react'
import appFirebase from '../config/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(appFirebase);

const Dashboard = () => {

    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Error al cerrar la sesión', error);
            });
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <Button
                onClick={handleSignOut}
                className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
                Cerrar sesión
            </Button>
        </div>
    )
}

export default Dashboard