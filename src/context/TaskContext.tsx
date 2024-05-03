import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ContextType, Task, UpdateTask } from "../types/contextTypes";
import { useUserContext } from "./UserContext";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { notification } from "antd";
import { db } from "../config/firebase";

export const TaskContext = createContext<ContextType | undefined>(undefined);

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask debe estar dentro del proveedor TaskContext');
    }
    return context;
}

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useUserContext();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!user) {
            setLoading(true);
            return;
        }

        const q = query(collection(db, 'tasks'), where('uid', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const updatedTasks = snapshot.docs.map((doc) => ({
                ...doc.data() as Task,
                id: doc.id,
            }));
            setTasks(updatedTasks);
            setLoading(false);
        }, (err) => {
            notification.error({
                message: 'Error al obtener las tareas',
            });
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const addTask = async (taskData: Task) => {
        if (!user) return;
        const completeTaskData = { ...taskData, uid: user.uid };
        try {
            await addDoc(collection(db, 'tasks'), completeTaskData);
        } catch (err: any) {
            notification.error({
                message: 'Error al agregar la tarea',
            });
            setError(err);
        }
    }

    const updateTask = async (taskId: string, updatedData: UpdateTask) => {
        if (!user) return;
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, updatedData);
        } catch (err: any) {
            notification.error({
                message: 'Error al actualizar la tarea',
            });
            setError(err);
        }
    }


    const deleteTask = async (taskId: string) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, 'tasks', taskId));
        } catch (err: any) {
            notification.error({
                message: 'Error al eliminar la tarea',
            });
            setError(err);
        }
    }

    return <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask }}>{children}</TaskContext.Provider>
}

