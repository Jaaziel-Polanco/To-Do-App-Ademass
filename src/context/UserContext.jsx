import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import appFirebase from "../config/firebase";
import { notification, Form } from "antd";

const auth = getAuth(appFirebase)

const UserContext = createContext()

export default function UserContextProvider({ children }) {

    const [registrando, setRegistrando] = useState(false)

    // maneja el registro de usuarios
    const onFinish = async (values) => {
        console.log("Received values of form: ", values);

        if (!registrando) {
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password)
            }
            catch (error) {
                notification.error({
                    message: 'Usuario o Contraseña incorrectos',
                    description: "Por favor verifica tus datos",
                });
            }
            await signInWithEmailAndPassword(auth, values.email, values.password)
        }
    };

    // maneja la recuperación de contraseña
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinishP = (values) => {
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
        <UserContext.Provider value={{ onFinish, onFinishP, loading, form }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)