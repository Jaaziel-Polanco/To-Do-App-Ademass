import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';

const AddTaskModal = ({ isOpen, onClose, addTask }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            // Establece los valores iniciales para un formulario limpio
            form.resetFields();
        }
    }, [isOpen, form]);

    const handleSubmit = async (values) => {
        // Se asume que toda nueva tarea no está completada inicialmente.
        const formattedValues = {
            ...values,
            date: values.date.format('DD/MM/YYYY'),
            description: values.description || '',
            completed: false,
        };

        try {
            await addTask(formattedValues);
            form.resetFields(); // Restablecer el formulario después agregar la tarea.
            onClose(); // Cerrar el modal después de la operación.
        } catch (error) {
            console.error('Error al añadir la tarea:', error);
        }
    };

    // Restablece el formulario al cerrar el modal
    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Añadir Nueva Tarea"
            open={isOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    Añadir Tarea
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="title"
                    label="Título de la Tarea"
                    rules={[{ required: true, message: 'Por favor ingresa el título de la tarea!' }]}
                >
                    <Input placeholder="Escribe el título de la tarea" />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Fecha de la Tarea"
                    rules={[{ required: true, message: 'Por favor selecciona la fecha de la tarea!' }]}
                >
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Descripción de la Tarea"
                >
                    <Input.TextArea rows={4} placeholder="Agrega una descripción para la tarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTaskModal;
