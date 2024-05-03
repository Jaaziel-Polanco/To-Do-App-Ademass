import { Auth, User, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createContext, useContext, useState, ReactNode } from "react";
import appFirebase from "../config/firebase";
import { notification, Form } from "antd";
import { FormValuesAccess, FormValuesRegister, UserContextType } from "../types/contextTypes";

const auth: Auth = getAuth(appFirebase);

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const userAccess = async (values: FormValuesAccess, navigate: (path: string) => void): Promise<void> => {
        console.log("Received values of form: ", values);
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            navigate('/dashboard');
        } catch (error: any) {
            notification.error({
                message: 'Usuario o Contraseña incorrectos',
                description: "Por favor verifica tus datos.",
            });
        } finally {
            setLoading(false);
        }
    };

    const userRegister = async (values: FormValuesRegister, navigate: (path: string) => void): Promise<void> => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            await updateProfile(userCredential.user, { displayName: `${values.name} ${values.lastName}` });

            notification.success({
                message: 'Registro exitoso',
                description: 'Bienvenido!! ya puedes iniciar sesión.',
            });
            navigate('/');
        } catch (error: any) {
            notification.error({
                message: 'Error al registrarse',
                description: 'Puede ser que el correo ya esté registrado. Por favor intenta con otro correo.',
            });
        } finally {
            setLoading(false);
        }
    }

    const userRecovery = (values: Pick<FormValuesAccess, 'email'>): void => {
        setLoading(true);
        sendPasswordResetEmail(auth, values.email)
            .then(() => {
                notification.success({
                    message: 'Correo de recuperación enviado',
                    description: 'Revisa tu correo electrónico para las instrucciones de recuperación.',
                });
                form.resetFields();
            })
            .catch((error: any) => {
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
        <UserContext.Provider value={{ userAccess, userRecovery, userRegister, loading, form, user, setUser, }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext debe usarse dentro de un UserContextProvider');
    }
    return context;
}

