import { useEffect, useState } from "react";
import { TodoList } from "./TodoList.jsx";
import { TodoInput } from "./TodoInput.jsx";
import { TodoFilter } from "./TodoFilter.jsx";




function Todo() {

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [isVisible, setIsVisible] = useState(false)


    useEffect(() => {
      setFilteredTasks(tasks);
    }, [tasks]);

    function addTask(newTask) {
      if (newTask.trim().length > 0) {
        const fullTask = {
          id: Date.now(),
          text: newTask,
          done: false
        };  
        setTasks(prevTasks => {
          const updatedTasks = [...prevTasks, fullTask];
          return updatedTasks;
        });
      }  
    }  
  
    function toggleDone(id) {
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
    }


    function toggleShow() {
      setIsVisible(!isVisible)  
    }

    function filterTasks(type) {
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

    function clearCompleted() {
      setTasks(tasks.filter(task => task.done !== true))
    }

    return (
    <div className="todo_content">
      <h1 className="todo_title">Todos</h1>
      <TodoInput isVisible= {isVisible} addTask= {addTask} toggleShow={toggleShow} />
      {isVisible ? <TodoList tasks={tasks} filteredTasks={filteredTasks} toggleDone={toggleDone} /> : null}
      <TodoFilter tasks= {tasks} filterTasks={filterTasks} clearCompleted={clearCompleted} />
    </div>
    );
}

export { Todo }