import React from 'react'

const TasksBtn = () => {
    return (
        <button className="flex justify-between items-center gap-2 w-full py-[6px] pl-7 pr-9 rounded-lg border-2 border-black shadow-xl mt-3 ">
            Nombre de la Tarea
            <div className='flex gap-[25px] items-center text-textSecondary '>
                <span>10/01/2024</span>
                <button className='rounded-lg px-1 text-white bg-primary'>Completada</button>

                <div className='flex items-center gap-3'>
                    <button className='flex justify-center rounded-full p-1 text-white bg-danger'>
                        <span class="icon-[mono-icons--delete] w-6 h-6"></span>
                    </button>

                    <button className='flex justify-center' >
                        <span class="icon-[simple-line-icons--options-vertical] bg-textPrimary h-6 w-6"></span>
                    </button>
                </div>

            </div>
        </button>
    )
}

export default TasksBtn