import { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      alert('Please enter a task title');
      return;
    }
    
    if (description.trim() === '') {
      alert('Please enter a task description');
      return;
    }
    
    const success = onAddTask(title.trim(), description.trim());
    if (success) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="task-input w-full p-3 border rounded-lg font-bold focus:border-green-500 focus:outline-none transition-colors"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        rows={3}
        className="task-input w-full p-3 border rounded-lg font-bold focus:border-green-500 focus:outline-none transition-colors resize-none"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg cursor-pointer transition-all hover:bg-green-700 hover:scale-105"
      >
        Add
      </button>
    </form>
  );
}

export default TaskInput;
