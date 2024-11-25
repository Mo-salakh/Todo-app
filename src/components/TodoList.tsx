import { Task } from "./Todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
    toggleDone: Function
    filteredTasks: Task[]
}

function TodoList(props: TodoListProps): JSX.Element {
    let { toggleDone, filteredTasks = [] } = props;

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