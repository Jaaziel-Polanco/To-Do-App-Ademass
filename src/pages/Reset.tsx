import { Button, Form, Input } from "antd"
import { Link } from "react-router-dom"
import { useUserContext } from "../context/UserContext";

export const Reset = () => {
    const { userRecovery, loading, form } = useUserContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bgTertiary">
            <div className="bg-slate-400 px-10 w-80 pt-10 pb-20 rounded-lg shadow-lg animate-flip-down animate-once animate-ease-in-out">
                <div className="flex justify-center mb-6"> <span className="icon-[fluent--key-reset-24-regular] h-16 w-16" role="img" aria-hidden="true" /></div>
                <Form
                    form={form}
                    name="recover_form"
                    onFinish={userRecovery}
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
                    <Link to={'/login'} className='text-center hover:text-primary'>
                        <p>← Volver</p>
                    </Link>
                </Form>
            </div>
        </div>
    )
}
