import { useEffect, useState } from "react";
import { TodoList } from "./TodoList";
import { TodoInput } from "./TodoInput";
import { TodoFilter } from "./TodoFilter";


export interface Task {
  id: string
  text: string
  done: boolean
}

function Todo():JSX.Element {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
    const [isVisible, setIsVisible] = useState(false)


    useEffect(() => {
      setFilteredTasks(tasks);
    }, [tasks]);

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
        let completedTasks = tasks.filter(task => task.done === true)
        setFilteredTasks(completedTasks)
          break;
        case 'uncompleted':
        let uncompletedTasks = tasks.filter(task => task.done === false)
          setFilteredTasks(uncompletedTasks)
          break;
        default :
          return null
      }
    }

    function clearCompleted(): void {
      setTasks(tasks.filter(task => task.done !== true))
    }

    return (
    <div className="todo_content">
      <h1 className="todo_title">Todos</h1>
      <TodoInput isVisible= {isVisible} addTask= {addTask} toggleShow={toggleShow} />
      {isVisible ? <TodoList filteredTasks={filteredTasks} toggleDone={toggleDone} /> : null}
      <TodoFilter tasks= {tasks} filterTasks={filterTasks} clearCompleted={clearCompleted} />
    </div>
    );
}

export { Todo }