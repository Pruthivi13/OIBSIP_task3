import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

const STORAGE_KEY = 'todo-react-tasks';

// Default sample tasks for first-time users
const DEFAULT_TASKS = [
  { id: 1, title: 'Welcome to TaskMaster! 👋', completed: false, category: 'Personal' },
  { id: 2, title: 'Click a task to mark complete', completed: false, category: 'Work' },
  { id: 3, title: 'Use the trash icon to delete', completed: true, category: 'Urgent' },
];

// Category Icons Mapping
const CATEGORY_ICONS = {
  'Personal': '👤',
  'Work': '💼',
  'Urgent': '🔥'
};

const CATEGORIES = ['Personal', 'Work', 'Urgent'];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure old tasks have a category
      const migrated = parsed.map(t => ({ ...t, category: t.category || 'Personal' }));
      return migrated.length > 0 ? migrated : DEFAULT_TASKS;
    }
    return DEFAULT_TASKS;
  });
  
  const [newTask, setNewTask] = useState('');
  const [newCategory, setNewCategory] = useState('Personal');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest'); // 'Newest', 'Oldest', 'A-Z'

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    // Check duplicates
    if (tasks.some(t => t.title.toLowerCase() === newTask.trim().toLowerCase())) {
      alert('Task already exists');
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
      category: newCategory
    };

    setTasks((prev) => [...prev, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter & Sort Logic
  const processedTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'Newest') return b.id - a.id;
      if (sortBy === 'Oldest') return a.id - b.id;
      if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <ThemeProvider>
      <div className="app-wrapper">
        <Header />
        
        {/* Main Container */}
        <div className="minimal-container">
          {/* Header Section with Sort/Filter */}
          <div className="flex flex-col items-center mb-6">
            <h1 className="app-title mb-2">TO DO</h1>
            
            {/* Controls Bar */}
            <div className="flex gap-2 items-center justify-center w-full">
              {/* Category Filter */}
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="control-pill"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {CATEGORY_ICONS[cat]} {cat}
                  </option>
                ))}
              </select>

              {/* Sort Toggle */}
              <button 
                onClick={() => setSortBy(prev => {
                  if(prev === 'Newest') return 'Oldest';
                  if(prev === 'Oldest') return 'A-Z';
                  return 'Newest';
                })}
                className="control-pill sort-btn"
              >
                {sortBy === 'Newest' && '↓ New'}
                {sortBy === 'Oldest' && '↑ Old'}
                {sortBy === 'A-Z' && 'Aa'}
              </button>
            </div>
          </div>
          
          {/* Search Section */}
          <div className="section">
            <label className="section-label">SEARCH</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="minimal-input"
            />
          </div>
          
          {/* Task List */}
          <div className="task-list-container">
            {processedTasks.length === 0 ? (
              <div className="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <p className="empty-message">
                  {searchTerm || filterCategory !== 'All' ? 'No matching tasks' : 'All caught up! 🎉'}
                </p>
              </div>
            ) : (
              processedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-row ${task.completed ? 'completed' : ''}`}
                >
                  <div className="flex flex-col flex-1 gap-1 min-w-0" onClick={() => toggleComplete(task.id)}>
                    <span className="task-text truncate">{task.title}</span>
                    <span className={`category-tag ${task.category.toLowerCase()}`}>
                      {CATEGORY_ICONS[task.category]} {task.category}
                    </span>
                  </div>
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                    className="delete-btn ml-2"
                    aria-label="Delete task"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
          
          {/* Add New Section */}
          <form onSubmit={addTask} className="section mt-auto">
            <label className="section-label">ADD NEW</label>
            <div className="flex gap-2">
              <select 
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="custom-select minimal-input !w-auto pl-3 text-sm font-medium"
                title="Select Category"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {CATEGORY_ICONS[cat]} {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new todo..."
                className="minimal-input flex-1"
              />
            </div>
            {/* Mobile Submit Button (Optional, but good for UX) */}
            <button type="submit" className="hidden">Add</button> 
          </form>
        </div>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
