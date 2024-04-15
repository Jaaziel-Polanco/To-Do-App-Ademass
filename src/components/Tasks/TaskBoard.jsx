import { Select } from 'antd'
import React from 'react'
import NoTasks from './NoTasks'
import TasksBtn from './TasksBtn'

const TaskBoard = () => {
    return (
        <div className='mx-72'>
            <div className='flex justify-between px-24 text-4xl font-medium text-textPrimary pt-5'>
                <h1 className='text-shadow-lg font-bold'>Task Board</h1>
                <Select placeholder="Filtrar" className='select w-52 h-9'>
                    <Select.Option value="all">Mostrar todo</Select.Option>
                    <Select.Option value="completed">Completadas</Select.Option>
                    <Select.Option value="pending">Pendientes</Select.Option>
                </Select>
            </div>

            <div className='flex justify-between px-10 py-8 font-semibold text-textPrimary'>
                <div>Tareas <span className='bg-slate-700 text-white rounded-xl px-2'>0</span></div>
                <div className='flex gap-[85px] mr-32  '>
                    <p>Fecha</p>
                    <p className='text-secondary'>Status</p>
                </div>
            </div>

            <div className='px-7'>
                <button className="flex items-center gap-2 w-full py-2 px-3 font-semibold rounded-lg border-2 border-dashed ">
                    <span class="icon-[bi--plus-lg]"></span>
                    Añadir Tarea
                </button>

                {/*
                aca hacer el mapeo de las tareas y si no hay que muestre el componente NoTasks
                */ }

            </div>


        </div>
    )
}

export default TaskBoard