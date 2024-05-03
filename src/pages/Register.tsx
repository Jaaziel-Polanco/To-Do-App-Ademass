import { Button, Form, Input } from "antd"
import { useUserContext } from "../context/UserContext"
import { Link, useNavigate } from "react-router-dom"
import { FormValuesRegister } from "../types/contextTypes"


export const Register = () => {
    const { userRegister, loading } = useUserContext()
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const handleSubmit = async (values: FormValuesRegister) => {
        await userRegister(values, navigate)
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gradient2'>
            <Form
                form={form}
                name="registro"
                onFinish={handleSubmit}
                className="w-96 rounded-2xl bg-transparent shadow-2xl p-8 flex flex-col gap-3 animate-fade-right animate-once animate-ease-in"
                layout="vertical"
            >
                <div className='flex justify-center'>
                    <span className="icon-[lucide--user-round-plus] w-16 h-16" role="img" aria-hidden="true" />
                </div>

                <p className="text-center text-3xl text-black font-semibold mb-4 uppercase">Registro</p>
                <Form.Item
                    name="nombre"
                    rules={[{ required: true, message: "Por favor introduce tu nombre!" }]}
                >
                    <Input placeholder="Nombre" />
                </Form.Item>

                <Form.Item
                    name="apellido"
                    rules={[{ required: true, message: "Por favor introduce tu apellido!" }]}
                >
                    <Input placeholder="Apellido" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: "email",
                            required: true,
                            message: "Por favor introduce un correo electrónico válido!",
                        },
                    ]}
                >
                    <Input placeholder="Correo Electrónico" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Por favor introduce tu contraseña!",
                        },
                        {
                            min: 8,
                            message: "La contraseña debe tener al menos 8 caracteres",
                        },
                    ]}
                >
                    <Input.Password placeholder="Contraseña" />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: "Por favor confirma tu contraseña!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Las contraseñas no coinciden'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirmar Contraseña" />
                </Form.Item>

                <Form.Item>
                    <Button type='text' htmlType='submit' loading={loading} className="btn font-extrabold w-full rounded-xl py-1">
                        Registrarse
                    </Button>
                </Form.Item>
                <Form.Item>
                    <div className="text-white text-center w-full mb-5">
                        Ya tienes una cuenta?{" "}
                        <p className="animate-bounce animate-infinite animate-ease-in-out">
                            <Link to={"/login"} className="text-accent-100 font-extrabold hover:text-primary">
                                Iniciar sesión
                            </Link> </p>
                    </div>
                </Form.Item>
            </Form>
        </div >
    )
}

