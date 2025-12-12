import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul className="list-none p-0 m-0 max-h-80 overflow-y-auto">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TaskList;
