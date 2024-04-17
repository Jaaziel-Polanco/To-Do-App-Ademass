import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useUserContext } from '../context/UserContext';


export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    console.error("TaskContext no se encuentra dentro del ámbito de un Provider");
    return {}; // Retorna un objeto vacío para prevenir errores en caso de no encontrar el contexto
  }
  return context;
};

export function TaskProvider({ children }) {
  const { user } = useUserContext(); // Usar el contexto de usuario para obtener el usuario actual
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const tasksQuery = query(collection(db, "tasks"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(tasksQuery);
      const tasksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    } catch (err) {
      console.error("Error al obtener las tareas: ", err);
      setError(err);
    }
    setLoading(false);
  }, [user, db]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const addTask = useCallback(async (taskData) => {
    if (!user) return; // Solo proceder si hay un usuario autenticado
    setLoading(true);
    try {
      const completeTaskData = { ...taskData, uid: user.uid, completed: false };
      const docRef = await addDoc(collection(db, "tasks"), completeTaskData);
      setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...completeTaskData }]);
    } catch (err) {
      console.error("Error al agregar la tarea: ", err);
      setError(err);
    }
    setLoading(false);
  }, [user, db]);

  const updateTask = useCallback(async (taskId, updatedData) => {
    if (!user) return; // Solo proceder si hay un usuario autenticado
    setLoading(true);
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, updatedData);
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedData } : task)));
    } catch (err) {
      console.error("Error al actualizar la tarea: ", err);
      setError(err);
    }
    setLoading(false);
  }, [user, db]);

  const deleteTask = useCallback(async (taskId) => {
    if (!user) return; // Solo proceder si hay un usuario autenticado
    setLoading(true);
    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error al eliminar la tarea: ", err);
      setError(err);
    }
    setLoading(false);
  },
    []);

  const value = {
    tasks,
    loading,
    error,
    addTask,
    fetchTasks,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

