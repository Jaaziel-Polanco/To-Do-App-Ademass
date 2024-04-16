import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useState } from "react";

// Crea un nuevo contexto específico para tareas
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
  // Estado para mantener un arreglo de tareas.
  const [tasks, setTasks] = useState([]);
  // Estado para el seguimiento de la carga de datos.
  const [loading, setLoading] = useState(false);
  // Estado para manejar errores.
  const [error, setError] = useState(null);

  // Función para obtener tareas de Firestore, memorizada por useCallback para evitar recreaciones innecesarias.
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      // Realizar consulta a Firestore para obtener documentos de la colección 'tasks'.
      const querySnapshot = await getDocs(collection(db, "tasks"));
      // Mapear los documentos a un arreglo de tareas.
      const tasksData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Actualizar el estado de tareas con los datos obtenidos.
      setTasks(tasksData);
    } catch (err) {
      // Manejo de errores y actualización del estado de error.
      console.error("Error al obtener las tareas: ", err);
      setError(err);
    }
    setLoading(false);
  }, []);

  // Efecto para llamar a fetchTasks cuando el componente se monta.
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Función para agregar una nueva tarea a Firestore y actualizar el estado local.
  const addTask = useCallback(async (taskData) => {
    setLoading(true);
    try {
      // Agregar el campo complete: false a la tarea
      const completeTaskData = { ...taskData, completed: false }
      // Agregar un nuevo documento a la colección 'tasks' y obtener la referencia al documento.
      const docRef = await addDoc(collection(db, "tasks"), completeTaskData);
      // Actualizar el estado de tareas agregando la nueva tarea.
      setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...completeTaskData }]);
    } catch (err) {
      // Manejo de errores y actualización del estado de error.
      console.error("Error al agregar la tarea: ", err);
      setError(err);
    }
    setLoading(false);
  }, []);

  // Función para actualizar una tarea existente en Firestore y en el estado local.
  const updateTask = useCallback(async (taskId, updatedData) => {
    setLoading(true);
    try {
      // Actualizar el documento específico en la colección 'tasks'.
      await updateDoc(doc(db, "tasks", taskId), updatedData);
      // Actualizar el estado de tareas con los datos actualizados.
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedData } : task))
      );
    } catch (err) {
      // Manejo de errores y actualización del estado de error.
      console.error("Error al actualizar la tarea: ", err);
      setError(err);
    }
    setLoading(false);
  }, []);

  // Función para eliminar una tarea de Firestore y actualizar el estado local.
  const deleteTask = useCallback(async (taskId) => {
    setLoading(true);
    try {
      // Eliminar el documento específico de la colección 'tasks'.
      await deleteDoc(doc(db, "tasks", taskId));
      // Actualizar el estado de tareas eliminando la tarea específica.
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      // Manejo de errores y actualización del estado de error.
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

