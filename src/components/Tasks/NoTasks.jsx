import React from 'react'

const NoTasks = () => {
    return (
        <div className='flex flex-col items-center text-center text-textSecondary py-24'>
            <span className="icon-[streamline--interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard] w-16 h-16"></span>
            <p>
                Aún no tienes tareas registradas <br />
                Crea tareas y organiza tus tareas pendientes
            </p>
        </div>
    )
}

export default NoTasks