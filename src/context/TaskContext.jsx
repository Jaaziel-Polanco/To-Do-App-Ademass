import { db } from '../config/firebase';
import { collection, doc, onSnapshot, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { notification } from 'antd';

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    console.error('TaskContext no se encuentra dentro del ámbito de un Provider');
    return {};
  }
  return context;
};

export function TaskProvider({ children }) {
  const { user } = useUserContext();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Inicializado como true para el loading inicial
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(true);
      return;
    }

    // Se suscribe a cambios en la colección de tareas del usuario actual
    const unsubscribe = onSnapshot(
      query(collection(db, 'tasks'), where('uid', '==', user.uid)),
      (snapshot) => {
        const updatedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(updatedTasks);
        setLoading(false);
      },
      (err) => {
        notification.error({
          message: 'Error al obtener las tareas',
        });
        setError(err);
        setLoading(false);
      }
    );

    // Limpiar la suscripción cuando el componente se desmonte o el usuario cambie
    return () => unsubscribe();
  }, [user]);

  // Función para añadir una nueva tarea
  const addTask = async (taskData) => {
    if (!user) return;

    const completeTaskData = { ...taskData, uid: user.uid, completed: false };
    try {
      await addDoc(collection(db, 'tasks'), completeTaskData);
    } catch (err) {
      notification.error({
        message: 'Error al añadir la tarea',
        description: "Por favor verifica tus datos",
      });
      setError(err);
    }
  };

  // Función para actualizar una tarea existente
  const updateTask = async (taskId, updatedData) => {
    if (!user) return;

    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, updatedData);
    } catch (err) {
      notification.error({
        message: 'Error al actualizar la tarea',
        description: "Por favor verifica tus datos",
      });
      setError(err);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (err) {
      notification.error({
        message: 'Error al eliminar la tarea',
        description: "Por favor verifica tus datos",
      });
      setError(err);
    }
  };

  const value = {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
