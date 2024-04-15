import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import PropTypes from 'prop-types';
import { createContext, useContext } from "react";

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
  // Función para agregar una nueva tarea a la colección
  const addTask = async (taskData) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), taskData);
      console.log("Tarea agregada con ID: ", docRef.id);
    } catch (e) {
      console.error("Error al agregar la tarea: ", e);
    }
  };

  // Función para obtener todas las tareas de la colección
  const getTasks = async () => {
    const tasks = [];
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks;
  };

  // Función para actualizar una tarea existente
  const updateTask = async (taskId, updatedData) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), updatedData);
      console.log("Tarea actualizada con éxito");
    } catch (e) {
      console.error("Error al actualizar la tarea: ", e);
    }
  };

  // Función para eliminar una tarea existente
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      console.log("Tarea eliminada con éxito");
    } catch (e) {
      console.error("Error al eliminar la tarea: ", e);
    }
  };

  return (
    <TaskContext.Provider value={{ addTask, getTasks, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
