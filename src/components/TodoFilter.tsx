import { useEffect, useState } from "react"
import { Task } from "./Todo";


interface TodoFilterProps {
    tasks: Task[]
    filterTasks: Function
    clearCompleted: Function
}

function TodoFilter(props: TodoFilterProps): JSX.Element {
    const { tasks, filterTasks, clearCompleted } = props
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