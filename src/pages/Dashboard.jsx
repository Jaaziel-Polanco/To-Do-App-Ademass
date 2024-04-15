import React, { useState } from 'react'
import appFirebase from '../config/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import logo from "../assets/Logo-APP-Tareas.png";
import { useUserContext } from '../context/UserContext';
import TaskBoard from '../components/Tasks/TaskBoard';

const auth = getAuth(appFirebase);

const Dashboard = () => {
    const { user } = useUserContext();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const navigate = useNavigate();
    const handleSignOut = () => {
        setIsSigningOut(true);
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Error al cerrar la sesión', error);
                setIsSigningOut(false);
            });
    };

    return (
        <div>
            <div className='bg-[#8e8a8a]'>
                <button className='absolute right-0 mt-5 mr-14 flex justify-center items-center z-50 text-lg uppercase '>
                    <span class="icon-[ph--user-circle-thin] w-16 h-16"></span>
                    {user.displayName}
                </button>

                <div className='flex justify-center items-center text-5xl text-shadow-md font-roboto font-extrabold text-primary py-11'>
                    <img src={logo} alt="logo" className='w-28 h-28' />
                    <h1 className='ml-[-18px]'>To<span className='text-secondary'>Do</span></h1>
                </div>
            </div>

            <TaskBoard />

            {/*este boton de cerrar sesion es temporal hay que moverlo*/}
            <Button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
                {isSigningOut ? <Spin /> : "Cerrar sesión"}
            </Button>
        </div>
    )
}

export default Dashboard

{/**/ }