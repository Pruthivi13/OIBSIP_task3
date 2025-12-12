import { useState } from 'react';

function TaskItem({ task, onDelete, onToggle }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <li
      className={`task-item cursor-pointer ${task.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}
      onClick={() => onToggle(task.id)}
    >
      <h2 className="m-0 text-lg font-bold text-gray-100">{task.title}</h2>
      <p className="m-0 text-sm text-gray-400">{task.description}</p>
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white border-none rounded-full cursor-pointer text-lg flex items-center justify-center transition-all hover:bg-red-600 hover:scale-110"
      >
        ×
      </button>
    </li>
  );
}

export default TaskItem;
