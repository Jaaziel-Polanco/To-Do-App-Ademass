import React from 'react';
import { Input, Button, Form } from 'antd';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';


const Reset = () => {
    const { onFinishP, loading, form } = useUserContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bgTertiary">
            <div className="bg-slate-400 px-10 w-80 py-20 rounded-lg shadow-lg animate-flip-down animate-once animate-ease-in-out">
                <Form
                    form={form}
                    name="recover_form"
                    onFinish={onFinishP}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico', type: 'email' }]}
                    >
                        <Input placeholder="Correo electrónico" className='h-10' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                            Recuperar contraseña
                        </Button>
                    </Form.Item>
                    <Link to={'/login'} className='text-center'>
                        <p>← Volver</p>
                    </Link>
                </Form>
            </div>
        </div>
    );
}

export default Reset