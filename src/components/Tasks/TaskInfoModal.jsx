import React from 'react';
import { Modal, Button } from 'antd';

const TaskInfoModal = ({ isOpen, onClose, task }) => {
    // Resto de tu lógica y formateo...

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
    );
};

export default TaskInfoModal;
