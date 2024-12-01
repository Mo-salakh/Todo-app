import {  createContext, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const TodoContext = createContext<TodoContextType | null>(null);

interface TodoContextType {
    tasks: Task[];
    filteredTasks: Task[];
    setTasks: Function;
    setFilteredTasks: Function;
    isVisible: boolean;
    addTask: (newTask: string) => void;
    toggleDone: (id: string) => void;
    toggleShow: () => void;
    filterTasks: (type: string) => void;
    clearCompleted: () => void;
}
export interface Task {
  id: string
  text: string
  done: boolean
}
interface UserProviderProps {
    children: React.ReactNode
}

export const TodoProvider = ({ children }: UserProviderProps) => {
    const [tasks, setTasks] = useLocalStorage('tasks',[]);
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [isVisible, setIsVisible] = useState(false)

    function addTask(newTask: string): void {
        if (newTask.trim().length > 0) {
          const fullTask: Task = {
            id: Date.now().toString(),
            text: newTask,
            done: false
          };
      
          setTasks((prevTasks: Task[]): Task[] => {
            const updatedTasks = [...prevTasks, fullTask];
            return updatedTasks;
          });
        }
    }

    function toggleDone(id:string): void {
        setTasks((prevTasks:Task[]): Task[] => 
          prevTasks.map((task: Task): Task => task.id === id ? { ...task, done: !task.done } : task
        ));
    }

    function toggleShow(): void {
        setIsVisible(!isVisible)  
    }

    function filterTasks(type:string): void | null {
        switch(type) {
          case 'all': 
          setFilteredTasks(tasks);
          break;
          case 'completed': 
          let completedTasks = tasks.filter((task: { done: boolean; }) => task.done === true)
          setFilteredTasks(completedTasks)
            break;
          case 'uncompleted':
          let uncompletedTasks = tasks.filter((task: { done: boolean; }) => task.done === false)
            setFilteredTasks(uncompletedTasks)
            break;
          default :
            return null
        }
    }

    function clearCompleted(): void {
        setTasks(tasks.filter((task: { done: boolean; }) => task.done !== true))
    }

    const value:TodoContextType = {
        tasks,
        setTasks,
        filteredTasks,
        setFilteredTasks,
        isVisible,
        addTask,
        toggleDone,
        toggleShow,
        filterTasks,
        clearCompleted
    };
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}