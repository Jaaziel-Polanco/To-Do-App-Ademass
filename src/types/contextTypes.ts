import { FormInstance } from "antd";
import { User } from "firebase/auth";
import { Dispatch } from "react";

export interface FormValuesAccess {
    email: string;
    password: string;
}

export interface FormValuesRegister extends FormValuesAccess {
    name: string;
    lastName: string;
}


export interface UserContextType {
    userAccess: (values: FormValuesAccess, navigate: (path: string) => void) => Promise<void>;
    userRegister: (values: FormValuesRegister, navigate: (path: string) => void) => Promise<void>;
    userRecovery: (values: Pick<FormValuesAccess, 'email'>) => void;
    loading: boolean;
    form: FormInstance;
    user: User | null;
    setUser: Dispatch<React.SetStateAction<User | null>>;
}


//task 
export interface Task {
    id: string;
    uid: string;
    title: string;
    description: string;
    completed: boolean;
    date: any;
}

export interface UpdateTask {
    [key: string]: any;
    title?: string;
    description?: string;
    date?: string;
}

export interface ContextType {
    tasks: Task[];
    loading: boolean;
    error: Error | null;
    addTask: (taskData: Task) => void;
    updateTask: (taskId: string, updatedData: UpdateTask) => void;
    deleteTask: (taskId: string) => void;
}