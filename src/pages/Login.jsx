import React, { useEffect } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
import { Checkbox, Form, Grid, Input, theme } from "antd";
import userImg from '../assets/user.png'
import { useUserContext } from '../context/UserContext';


const { useToken } = theme;
const { useBreakpoint } = Grid;

const Login = () => {
    const { onFinish, user } = useUserContext();
    const navigate = useNavigate();
    const { token } = useToken();
    const screens = useBreakpoint();

    const handleSubmit = (values) => {
        onFinish(values, navigate);
    };

    useEffect(() => {
        if (user) {
            console.log("Redireccionando al dashboard porque user está autenticado");
            navigate('/dashboard', { replace: true });  // Utiliza 'replace' para evitar que el usuario vuelva a login con el botón atrás
        }
    }, [user, navigate]);

    const styles = {
        container: {
            backgroundColor: "transparent",
            borderRadius: "7%",
            margin: "0 auto",
            padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
            width: "380px",
            boxShadow: "0px 20px 30px 20px rgba(0,0,0,0.1)"
        },
        header: {
            marginBottom: token.marginXL,
            textAlign: "center"
        },
        section: {
            alignItems: "center",
            background: "linear-gradient(to right,  #4CAF50, #FF5722)",
            display: "flex",
            height: screens.sm ? "100vh" : "auto",
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
        },
        title: {
            fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
        }
    };

    return (
        <section style={styles.section}>
            <div style={styles.container} className='animate-fade-down animate-once animate-ease-in'>
                <div style={styles.header}>
                    <div className='flex justify-center mb-2'>
                        <img src={userImg} alt="user Logo" />
                    </div>
                    <h1 className="text-primary-100 font-semibold text-3xl mb-5 uppercase">Iniciar Sesión </h1>
                    <p className="text-white font-semibold ">
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
                    requiredMark="optional">

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
                            className="focus:border-none hover:border-none"
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
                            className="focus:border-none hover:border-none"
                            type="password"
                            placeholder="Contraseña"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Link to={'/Reset'} className="float-right">
                            Olvidaste tu contraseña?
                        </Link>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: "0px" }}>
                        <button block="true" type='submit' className="bg-primary text-primary-100 hover:bg-[#bb8f2f] transition-all font-extrabold w-full rounded-xl py-1">
                            Acceder
                        </button>
                        <div>
                            <div className="text-white text-center w-full mt-5">
                                Aún no tienes tu cuenta?{" "}
                                <p className="animate-bounce animate-infinite animate-ease-in-out">
                                    <Link to={"/register"} className="text-accent-100 font-extrabold hover:text-primary">
                                        Registrate
                                    </Link></p>
                            </div>

                        </div>
                    </Form.Item>
                </Form>

            </div>
        </section>
    )
}

export default Login