import React from 'react';

const TasksBtn = ({ title, date, completed, onDelete, onEdit, onToggleComplete, onShowInfo }) => {
    return (
        <div className='flex justify-between items-center gap-2 w-full py-[6px] pl-7 pr-6 rounded-lg border-2 border-black shadow-xl mt-3'>
            <div className='flex-grow cursor-pointer' onClick={onShowInfo}>
                {title}
            </div>
            <div className='flex gap-[25px] items-center text-textSecondary '>
                <span>{date}</span>

                <button onClick={onToggleComplete} className={`rounded-lg px-1 text-white ${completed ? 'bg-primary' : 'bg-danger'}`}>
                    {completed ? 'Completada' : 'No completada'}
                </button>

                <div className='flex justify-between items-center gap-3'>
                    <button className='flex justify-center items-center rounded-full p-1 text-white bg-danger' onClick={(e) => {
                        e.stopPropagation(); // Prevenir que el evento del clic se propague al div principal
                        onDelete();
                    }}>
                        <span className="icon-[mono-icons--delete] w-6 h-6"></span>
                    </button>

                    <button className='flex justify-center' onClick={(e) => {
                        e.stopPropagation(); // Prevenir que el evento del clic se propague al div principal
                        onEdit();
                    }}>
                        <span className="icon-[simple-line-icons--options-vertical] bg-textPrimary w-6 h-6"></span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default TasksBtn;
