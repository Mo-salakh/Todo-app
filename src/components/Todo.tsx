import { useContext, useEffect } from 'react';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { TodoFilter } from './TodoFilter';
import { TodoContext } from '../useContext';

function Todo(): JSX.Element {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error('Error on useContext');
  }

  const {
    tasks,
    setFilteredTasks,
    isVisible,
  } = context;

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [setFilteredTasks, tasks]);

  return (
    <div className="todo_content">
      <h1 className="todo_title">Todos</h1>
      <TodoInput/>
      {isVisible ? ( <TodoList/>) : null}
      <TodoFilter/>
    </div>
  );
}

export { Todo };
