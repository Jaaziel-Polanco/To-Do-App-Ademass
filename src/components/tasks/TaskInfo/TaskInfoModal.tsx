import { Button, Modal } from "antd"
import { Task } from "../../../types/contextTypes"

interface Props {
    isOpen: boolean
    onClose: () => void
    task: Task
}


const TaskInfoModal = ({ isOpen, onClose, task }: Props) => {
    return (
        <Modal
            title="Información de la Tarea"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cerrar
                </Button>
            ]}
        >
            <p><strong>Título:</strong> {task?.title}</p>
            <p><strong>Fecha Asignada:</strong> {task?.date}</p>
            <p><strong>Estado:</strong> {task?.completed ? 'Completada' : 'No completada'}</p>
            <p><strong>Descripción:</strong> {task?.description || 'No disponible'}</p>
        </Modal>
    )
}

export default TaskInfoModal