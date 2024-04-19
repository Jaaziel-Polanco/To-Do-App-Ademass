import React from 'react'
import { Outlet } from 'react-router-dom'
import { TaskProvider } from '../context/TaskContext'

const GeneralLayout = () => {
    return (
        <TaskProvider>
            <Outlet />
        </TaskProvider>
    )
}

export default GeneralLayout