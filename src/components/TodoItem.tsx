import doneI from '../img/free-icon-approve-sign-8373208.png';
import { Task } from '../useContext'


interface TodoItemProps {
    task: Task
}

function TodoItem(props: TodoItemProps) {
    const  {task} = props
    return (
        <>
        <i className='checking' style={{backgroundImage: task.done ? `url(${doneI})` : 'none', borderColor: task.done ? 'green' : '#cccc'}} />
        <p className={task.done ? 'done' : ''}>{task.text}</p>
        </>
    )
}


export { TodoItem }