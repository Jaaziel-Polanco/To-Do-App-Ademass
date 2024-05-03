import { Select } from 'antd'
import React, { useMemo, useState } from 'react'
import NoTasks from './NoTasks'
import TasksBtn from './TasksBtn'
import AddTaskModal from './AddTaskModal'
import { useTask } from '../../context/TaskContext'
import { LoadingTask } from '../Loading'
import TaskInfoModal from './TaskInfoModal'
import EditTaskModal from './EditTaskModal'

const TaskBoard = () => {
    const { tasks, loading, deleteTask, addTask, updateTask } = useTask();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('all');

    const closeModal = () => setIsModalOpen(false);

    const handleDelete = (taskId) => {
        deleteTask(taskId);
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setIsEditModalOpen(true);
    };

    const handleShowInfo = (task) => {
        setSelectedTask(task); // Establece la tarea actual para mostrar la información
        setIsTaskInfoModalOpen(true); // Abre el modal de información de la tarea
    };

    const handleToggleComplete = (taskId, currentStatus) => {
        updateTask(taskId, { completed: !currentStatus });
    };

    const filteredTasks = useMemo(() => {
        let sortedTasks = [...tasks].sort((a, b) => {
            const dateA = a.date.split('-').reverse().join('-');
            const dateB = b.date.split('-').reverse().join('-');
            return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
        switch (filter) {
            case 'completed':
                return sortedTasks.filter(task => task.completed);
            case 'pending':
                return sortedTasks.filter(task => !task.completed);
            case 'all':
            default:
                return sortedTasks;
        }

    }, [tasks, filter])

    // Función para manejar el cambio en el Select
    const handleFilterChange = (value) => {
        setFilter(value);
    };


    return (
        <div className='lg:mx-72'>
            <div className='flex justify-between px-5 lg:px-24 text-2xl lg:text-4xl font-medium text-textPrimary pt-6 lg:pt-8'>
                <h1 className='text-shadow-lg font-bold'>Task Board</h1>
                <Select
                    placeholder="Filtrar"
                    className='select w-32 lg:w-52 h-9'
                    onChange={handleFilterChange}
                >
                    <Select.Option value="all">Mostrar todo</Select.Option>
                    <Select.Option value="completed">Completadas</Select.Option>
                    <Select.Option value="pending">Pendientes</Select.Option>
                </Select>
            </div>

            <div className='flex justify-between px-7 lg:px-10 py-8 font-semibold text-textPrimary'>
                <div className='text-sm lg:text-base'>Tareas <span className='bg-slate-700 text-white rounded-xl px-2'>{tasks.length}</span></div>
                <div className='flex gap-9 lg:gap-[85px] mr-9  lg:mr-32 text-xs lg:text-base'>
                    <p>Fecha</p>
                    <p className='text-secondary'>Status</p>
                </div>
            </div>

            <div className='px-1 lg:px-7 pb-20'>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 w-full py-3 px-3 font-semibold rounded-lg border-2 border-dashed ">
                    <span className="icon-[bi--plus-lg]"></span>
                    Añadir Tarea
                </button>

                {loading ? (<LoadingTask />
                ) : filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TasksBtn
                            key={task.id}
                            title={task.title}
                            date={task.date}
                            completed={task.completed}
                            onDelete={() => handleDelete(task.id)}
                            onEdit={() => handleEdit(task)}
                            onToggleComplete={() => handleToggleComplete(task.id, task.completed)}
                            onShowInfo={() => handleShowInfo(task)}
                        />)
                    )) : <NoTasks />}

                <AddTaskModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    addTask={addTask}
                />

                <EditTaskModal
                    taskToEdit={selectedTask}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedTask(null);
                    }}
                    updateTask={updateTask}
                />

                <TaskInfoModal
                    isOpen={isTaskInfoModalOpen}
                    onClose={() => setIsTaskInfoModalOpen(false)}
                    task={selectedTask}
                />
            </div>
        </div>
    )
}

export default TaskBoard;
