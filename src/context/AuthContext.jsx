import  {auth,db } from "./firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc,doc } from "firebase/firestore";
import PropTypes from 'prop-types';
import { createContext, useContext} from "react";



import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("no ingreso contexto");
  }
  return context;
};

export function AuthProvider({ children }) {
 

  
  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response);
  };


  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      throw new Error(error)
      
    }
    
  };
  const logout = async () => {
    const response = await signOut(auth);
    console.log(response);
  };


  
  // Función para agregar una nueva tarea a la colección
const addTask = async (taskData) => {
  try {
      const docRef = await addDoc(collection(db, "todo"), taskData);
      console.log("Tarea agregada con ID: ", docRef.id);
  } catch (e) {
      console.error("Error al agregar la tarea: ", e);
  }
};

// Función para obtener todas las tareas de la colección
const getTasks = async () => {
  const tasks = [];
  const querySnapshot = await getDocs(collection(db, "todo"));
  querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
  });
  return tasks;
};

// Función para actualizar una tarea existente
const updateTask = async (taskId, updatedData) => {
  try {
      await updateDoc(doc(db, "todo", taskId), updatedData);
      console.log("Tarea actualizada con éxito");
  } catch (e) {
      console.error("Error al actualizar la tarea: ", e);
  }
};

// Función para eliminar una tarea existente
const deleteTask = async (taskId) => {
  try {
      await deleteDoc(doc(db, "todo", taskId));
      console.log("Tarea eliminada con éxito");
  } catch (e) {
      console.error("Error al eliminar la tarea: ", e);
  }
};

  return (
    <authContext.Provider
      value={{
        register,
        login,
        logout,
        addTask,
        getTasks,
        updateTask,
        deleteTask

        
      }}
    >
      {children}
    </authContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
