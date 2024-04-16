import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';

const EditTaskModal = ({ isOpen, onClose, taskToEdit, updateTask }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();  // Limpia el formulario cada vez que el modal se abre
            if (taskToEdit) {
                // Establece los valores para los campos, excepto la fecha
                form.setFieldsValue({
                    title: taskToEdit.title,
                    description: taskToEdit.description || '',
                });
            }
        }
    }, [isOpen, taskToEdit, form]);

    const handleSubmit = async (values) => {
        try {
            await updateTask(taskToEdit.id, {
                ...values,
                date: values.date.format('DD/MM/YYYY'),
            });
            onClose();
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };

    return (
        <Modal
            title="Editar Tarea"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>Cancelar</Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    Actualizar Tarea
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="Fecha de la Tarea"
                    rules={[{ required: true, message: 'Por favor selecciona la fecha de la tarea!' }]}
                >
                    <DatePicker format={'DD/MM/YYYY'} />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Descripción de la Tarea"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTaskModal;
