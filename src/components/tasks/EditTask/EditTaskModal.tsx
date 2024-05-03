import { Button, DatePicker, Form, Input, Modal, notification } from 'antd'
import { Task } from '../../../types/contextTypes'
import { useEffect } from 'react'

interface Props {
  taskToEdit: Task
  isOpen: boolean
  onClose: () => void
  updateTask: (taskId: string, taskData: Task) => void
}

const EditTaskModal = ({ isOpen, onClose, taskToEdit, updateTask }: Props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (isOpen) {
      form.resetFields()
      form.setFieldsValue({
        title: taskToEdit.title,
        description: taskToEdit.description
      })
    }
  }, [isOpen, taskToEdit, form])

  const handleSubmit = async (values: Task) => {
    try {
      updateTask(taskToEdit.id, {
        ...values,
        date: values.date.format('DD/MM/YYYY')
      })
      onClose()
    } catch (error) {
      notification.error({
        message: 'Error al actualizar la tarea',
      })
    }
  }

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
  )
}

export default EditTaskModal