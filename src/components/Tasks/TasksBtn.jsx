import { Popconfirm, message } from 'antd';
import React, { useEffect, useState } from 'react';

const TasksBtn = ({ title, date, completed, onDelete, onEdit, onToggleComplete, onShowInfo }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const confirm = (e) => {
        console.log(e);
        message.success('Tarea eliminada');
        onDelete();
    };
    const cancel = (e) => {
        console.log(e);
    };

    useEffect(() => {
        const closeMenu = (event) => {
            if (!event.target.closest('.menu-container') && !event.target.closest('.ant-popover') && showMobileMenu) {
                setShowMobileMenu(false);
            }
        };

        if (showMobileMenu) {
            document.addEventListener('mousedown', closeMenu);
        }
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, [showMobileMenu]);

    return (
        <div className='flex justify-between items-center lg:gap-2 w-full py-2 lg:py-[8px] pr-1 pl-3 lg:pl-7 lg:pr-6 rounded-lg border-2 border-black shadow-xl mt-3'>
            <div className='flex-grow cursor-pointer text-xs lg:text-base font-semibold text-textPrimary' onClick={onShowInfo}>
                {title}
            </div>

            <div className='flex gap-4 lg:gap-[25px] items-center text-textSecondary '>
                <span className='text-[11px] lg:text-base'>{date}</span>

                <button onClick={onToggleComplete} className={`rounded-lg px-1 text-white text-[10px] lg:text-base ${completed ? 'bg-primary' : 'bg-danger'}`}>
                    {completed ? 'Completada' : 'No completada'}
                </button>

                <div className='flex justify-between items-center gap-3'>
                    <Popconfirm title='Eliminar Tarea' description='Estas seguro de que quieres eliminar esta tarea?' onConfirm={confirm} onCancel={cancel} okText='Yes' cancelText='No'>
                        <button className='hidden lg:flex justify-center items-center rounded-full p-1 text-white bg-danger' onClick={(e) => {
                            e.stopPropagation(); // Prevenir que el evento del clic se propague al div principal

                        }}>
                            <span className="icon-[mono-icons--delete] w-6 h-6"></span>
                        </button>
                    </Popconfirm>

                    <button className='hidden lg:flex justify-center mr-[10px] ml-[-8px] lg:mx-0 menu-container' onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}>
                        <span className="icon-[simple-line-icons--options-vertical] bg-textPrimary w-6 h-6"></span>
                    </button>

                    <button className='lg:hidden flex justify-center mr-[10px] ml-[-8px] lg:mx-0 menu-container' onClick={(e) => {
                        e.stopPropagation();
                        setShowMobileMenu(!showMobileMenu);
                    }}>
                        <span className="icon-[simple-line-icons--options-vertical] bg-textPrimary w-6 h-6"></span>
                    </button>
                </div>

                {showMobileMenu && (
                    <div className='absolute right-0 mt-12 p-2 bg-white shadow-lg rounded-lg z-10 menu-container animate-jump-in animate-duration-300'>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                                setShowMobileMenu(false);
                            }}
                            className="block text-gray-700 text-sm py-1 px-4 w-full text-left hover:bg-gray-100">
                            Editar
                        </button>

                        <Popconfirm title='Eliminar Tarea' description='Estas seguro de que quieres eliminar esta tarea?' onConfirm={confirm} onCancel={cancel} okText='Yes' cancelText='No'>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className="block text-gray-700 text-sm py-1 px-4 w-full text-left hover:bg-gray-100">
                                Eliminar
                            </button>
                        </Popconfirm>
                    </div>
                )}

            </div>
        </div>
    )
}

export default TasksBtn;
