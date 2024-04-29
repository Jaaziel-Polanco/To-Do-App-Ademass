import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import appFirebase from "../config/firebase";
import { notification, Form } from "antd";

const auth = getAuth(appFirebase)

const UserContext = createContext()

export default function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    // maneja el acceso de usuarios
    const userAccess = async (values, navigate) => {
        console.log("Received values of form: ", values);
        setLoading(true);
        if (!loading) {
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password)
                navigate('/dashboard');
            }
            catch (error) {
                notification.error({
                    message: 'Usuario o Contraseña incorrectos',
                    description: "Por favor verifica tus datos",
                });
            } finally {
                setLoading(false);
            }
            await signInWithEmailAndPassword(auth, values.email, values.password)
        }
    };

    // maneja el registro de usuarios
    const userRegister = async (values, navigate) => {
        setLoading(true);
        try {
            const { email, password, nombre, apellido } = values;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: `${nombre} ${apellido}`,
            });

            notification.success({
                message: 'Registro exitoso',
                description: 'La cuenta ha sido creada con éxito. Ya puedes iniciar sesión.',
            });

            navigate('/');
        } catch (error) {
            notification.error({
                message: 'Error en el registro',
                description: "Ya existe una cuenta con este correo electrónico. Por favor, intenta con otro.",
            });
        } finally {
            setLoading(false);
        }
    };

    // maneja la recuperación de contraseña
    const [form] = Form.useForm();
    const resetPassword = (values) => {
        setLoading(true);
        sendPasswordResetEmail(auth, values.email)
            .then(() => {
                notification.success({
                    message: 'Correo de recuperación enviado',
                    description: 'Revisa tu correo electrónico para las instrucciones de recuperación.',
                });
                form.resetFields();
            })
            .catch((error) => {
                notification.error({
                    message: 'Error al enviar correo de recuperación',
                    description: error.message,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <UserContext.Provider value={{ userAccess, userRegister, resetPassword, loading, form, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)