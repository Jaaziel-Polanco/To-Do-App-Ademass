import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import UserProfile from "../components/UserProfile/UserProfile";
import logo from "../assets/Logo-APP-Tareas-min.png";
import TaskBoard from "../components/tasks/TaskBoard/TaskBoard";



export const Dashboard = () => {
    const { user } = useUserContext();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="animate-fade-right">
            <div className='bg-[#8e8a8a]'>
                <button onClick={showDrawer} className='absolute right-0 mt-5 mr-5 lg:mr-14 flex justify-center items-center z-50 text-[10px] lg:text-lg uppercase '>
                    <span className="icon-[ph--user-circle-thin] w-8 h-8 lg:w-16 lg:h-16"></span>
                    {user?.displayName}
                </button>
                {open && (
                    <UserProfile onClose={onClose} open={open} />
                )}

                <div className='flex justify-center items-center text-5xl text-shadow-md font-roboto font-extrabold text-primary pt-14 pb-7 lg:py-11'>
                    <img src={logo} alt="logo" className='w-36 h-36 lg:w-28 lg:h-28' />
                    <h1 className='ml-[-30px]  lg:ml-[-18px]'>To<span className='text-secondary'>Do</span></h1>
                </div>
            </div>

            <TaskBoard />

        </div>
    )
}

