import { useMemo, useState } from 'react'
import { useTask } from '../../../context/TaskContext'
import { Task } from '../../../types/contextTypes'
import { Select } from 'antd'
import { LoadingTask } from '../../Loading/Loading'
import TaskBtn from '../TaskBtn/TaskBtn'
import AddTaskModal from '../AddTask/AddTaskModal'
import EditTaskModal from '../EditTask/EditTaskModal'
import TaskInfoModal from '../TaskInfo/TaskInfoModal'
import NoTask from '../NoTasks/NoTask'

const TaskBoard = () => {
    const { tasks, loading, addTask, updateTask, deleteTask } = useTask()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task>()
    const [filter, setFilter] = useState('all')

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleDelete = (taskId: string) => {
        deleteTask(taskId)
    }

    const handleToggleComplete = (taskId: string, currentStatus: boolean) => {
        updateTask(taskId, { completed: !currentStatus })
    }

    const handleEdit = (task: Task) => {
        setSelectedTask(task)
        setIsEditModalOpen(true)
    }

    const handleShowInfo = (task: Task) => {
        setSelectedTask(task)
        setIsTaskInfoModalOpen(true)
    }


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

    const handleFilterChange = (value: string) => {
        setFilter(value)
    }

    return (
        <div className='lg:mx-72 '>
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
                    <p title='Fechas asignadas a las tareas'>Fecha</p>
                    <p title="Estados actuales de las tareas" className='text-secondary'>Status</p>
                </div>
            </div>

            <div className='px-1 lg:px-7 pb-20 '>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 w-full py-3 px-3 font-semibold rounded-lg border-2 border-dashed ">
                    <span className="icon-[bi--plus-lg]"></span>
                    Añadir Tarea
                </button>

                {loading ? (<LoadingTask />
                ) : filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskBtn
                            key={task.id}
                            title={task.title}
                            date={task.date}
                            completed={task.completed}
                            onDelete={() => handleDelete(task.id)}
                            onEdit={() => handleEdit(task)}
                            onToggleComplete={() => handleToggleComplete(task.id, task.completed)}
                            onShowInfo={() => handleShowInfo(task)}
                        />)
                    )) : <NoTask />}

                <AddTaskModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    addTask={addTask}
                />

                <EditTaskModal
                    taskToEdit={selectedTask as Task}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedTask(undefined);
                    }}
                    updateTask={updateTask}
                />

                <TaskInfoModal
                    isOpen={isTaskInfoModalOpen}
                    onClose={() => setIsTaskInfoModalOpen(false)}
                    task={selectedTask as Task}
                />
            </div>
        </div>
    )
}

export default TaskBoard
