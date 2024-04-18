import { db } from '../config/firebase';
import { collection, addDoc, doc, onSnapshot, query, where, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';

export const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export function TaskProvider({ children }) {
  const { user } = useUserContext();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      query(collection(db, 'tasks'), where('uid', '==', user.uid)),
      (snapshot) => {
        const fetchedTasks = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.order - b.order);  // Asegura el orden correcto
        setTasks(fetchedTasks);
        setLoading(false);
      },
      (err) => {
        console.error('Error al obtener las tareas:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addTask = useCallback(async (taskData) => {
    if (!user) return;
    setLoading(true);
    try {
      const newOrder = tasks.length;  // Asume que la nueva tarea va al final de la lista
      const completeTaskData = { ...taskData, uid: user.uid, order: newOrder, completed: false };
      await addDoc(collection(db, 'tasks'), completeTaskData);
      setLoading(false);
    } catch (err) {
      console.error('Error al agregar la tarea:', err);
      setError(err);
      setLoading(false);
    }
  }, [user, tasks]);

  const updateTask = useCallback(async (taskId, updatedData) => {
    if (!user) return;
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, updatedData);
    } catch (err) {
      console.error('Error al actualizar la tarea:', err);
      setError(err);
    }
  }, [user]);

  const deleteTask = useCallback(async (taskId) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (err) {
      console.error('Error al eliminar la tarea:', err);
      setError(err);
    }
  }, [user]);

  const updateTaskOrder = useCallback(async (sourceIndex, destinationIndex) => {
    if (!user) return;
    setLoading(true);
    const batch = writeBatch(db);
    const newTasks = Array.from(tasks);
    const [removed] = newTasks.splice(sourceIndex, 1);
    newTasks.splice(destinationIndex, 0, removed);

    newTasks.forEach((task, index) => {
      batch.update(doc(db, 'tasks', task.id), { order: index });
    });

    try {
      await batch.commit();
      setTasks(newTasks); // Actualizar el estado local con el nuevo orden
      setLoading(false);
    } catch (err) {
      console.error('Error al actualizar el orden de las tareas:', err);
      setError(err);
      setLoading(false);
    }
  }, [user, tasks]);

  const value = {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    updateTaskOrder,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
