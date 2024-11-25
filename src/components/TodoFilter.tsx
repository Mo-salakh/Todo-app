import { useContext, useEffect, useState } from "react"
import { Task } from "../useContext";
import { TodoContext } from "../useContext";


function TodoFilter(): JSX.Element {
    const context = useContext(TodoContext)
    if(context === null) {
        throw new Error('Error on useContext')
    }
    const { tasks, filterTasks, clearCompleted } = context
    const [uncompleted, setUncompleted] = useState<Task[]>([])


    useEffect(() => {
        const uncompletedTasks = tasks.filter(task => !task.done);
        setUncompleted(uncompletedTasks);
    }, [tasks]);



    return (
        <div className="todo_filter">
        <ul className="filter_list">
            <li className="filter_item">{uncompleted.length} task{uncompleted.length >= 2 ? 's' : ''} left</li>
            <li className="filter_item">
                <button onClick={() => filterTasks('all')} className="btn">All</button>
                <button onClick={() => filterTasks('uncompleted')} className="btn">Active</button>
                <button onClick={() => filterTasks('completed')} className="btn">Completed</button>
            </li>
            <li onClick={() => clearCompleted()} className="filter_item">Clear Complited</li>
        </ul>
        </div>
    )
}

export {TodoFilter}