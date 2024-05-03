import { Outlet } from 'react-router-dom'
import { TaskProvider } from '../context/TaskContext'


export const LayoutGeneral = () => {
    return (
        <TaskProvider>
            <Outlet />
        </TaskProvider>
    )
}
