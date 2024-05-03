import { useEffect } from 'react'
import { Task } from '../../../types/contextTypes'
import { Button, DatePicker, Form, Input, Modal, notification } from 'antd'

interface Props {
    isOpen: boolean
    onClose: () => void
    addTask: (taskData: Task) => void
}

const AddTaskModal = ({ addTask, isOpen, onClose }: Props) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (isOpen) {
            form.resetFields()
        }
    }, [isOpen, form])

    const handleSubmit = async (values: Task) => {
        const formattedValues = {
            ...values,
            date: values.date.format('DD-MM-YYYY'),
            description: values.description || '',
        }

        try {
            await addTask(formattedValues)
            form.resetFields()
            onClose()
        } catch (error) {
            notification.error({
                message: 'Error al agregar la tarea',
            })
        }
    }

    const handleCancel = () => {
        form.resetFields()
        onClose()
    }


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
    )
}

export default AddTaskModal