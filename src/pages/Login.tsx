import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { FormValuesAccess } from '../types/contextTypes';

export const Login = () => {
    const { userAccess, loading } = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = async (values: FormValuesAccess) => {
        await userAccess(values, navigate);
    }

    return (
        <section className="flex items-center bg-gradient h-screen p-0 md:p-8">
            <div className="bg-transparent rounded-3xl m-auto p-8 w-96 shadow-custom animate-fade-down">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-2">
                        <span className="icon-[lucide--user-round] w-16 h-16" role="img" aria-hidden="true" />
                    </div>
                    <h1 className="font-semibold text-3xl mb-5 uppercase">Iniciar Sesión</h1>
                    <p className="text-white font-semibold">
                        Bienvenido!! Favor de ingresar tus datos para poder
                        iniciar sesión.
                    </p>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={handleSubmit}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Por favor introduce tu email!",
                            },
                        ]}
                    >
                        <Input
                            id='email'
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Por favor introduce tu contraseña!",
                            },
                        ]}
                    >
                        <Input.Password
                            id='password'
                            type="password"
                            placeholder="Contraseña"
                            className='password'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Link to={'/Reset'} className="float-right hover:text-primary">
                            Olvidaste tu contraseña?
                        </Link>
                    </Form.Item>

                    <Form.Item className="mb-0">
                        <Button type='text' htmlType='submit' loading={loading} className="btn text-primary-100 font-extrabold w-full rounded-xl py-1">
                            Acceder
                        </Button>
                        <div className="text-white text-center w-full mt-5">
                            Aún no tienes tu cuenta?{" "}
                            <p className="animate-bounce">
                                <Link to={"/register"} className="text-accent-100 font-extrabold hover:text-primary">
                                    Registrate
                                </Link>
                            </p>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </section>
    )
}

