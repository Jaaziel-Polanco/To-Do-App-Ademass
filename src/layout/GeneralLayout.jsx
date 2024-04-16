import React from 'react'
import { Outlet } from 'react-router-dom'
import { TaskProvider } from '../context/TaskContext'

const GeneralLayout = () => {
    return (
        <TaskProvider>
            <Outlet />
            {
                // aca puede ir un footer general
            }
        </TaskProvider>
    )
}

export default GeneralLayout