import { useContext } from "react";
import { TodoItem } from "./TodoItem";
import { TodoContext } from "../useContext";


function TodoList(): JSX.Element {
    const context = useContext(TodoContext)
    if(context === null) {
        throw new Error('Error on useContext')
    }
    const {toggleDone, filteredTasks} = context

    return (
        <>
            {filteredTasks.length > 0 ? (
                <ol className="todo_list">
                    {filteredTasks.map((task) => (
                        <li onClick={() => toggleDone(task.id)} key={task.id} className='todo_item'>
                            <TodoItem task={task} />
                        </li>
                    ))}
                </ol>
            ) : (
                <h2 className="todo_title" style={{ margin: '50px 0' }}>Tasks list empty</h2>
            )}
        </>
    );
}

export { TodoList };