//todolist.jsx file
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const clearMessage = () => {
    setTimeout(() => setMessage(null), 2000);
  };

  const handleAddTask = () => {
    if (!task.trim()) return;

    if (editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = { text: task, completed: false };
      setTodos(updatedTodos);
      setMessage('Task updated successfully!');
      setEditingIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false }]);
      setMessage('Task added successfully!');
    }

    setTask('');
    clearMessage();
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    setMessage('Task deleted successfully!');
    clearMessage();
  };

  const handleEdit = (index) => {
    setTask(todos[index].text);
    setEditingIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 px-4 transition-colors duration-700 ease-in-out ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <button
        onClick={toggleDarkMode}
        className="self-end mb-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md flex items-center gap-2 shadow-lg hover:opacity-90 transition"
      >
        <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <div className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 shadow-2xl rounded-3xl transition-all duration-500">
        <h1 className="text-4xl font-bold mb-6 text-center font-[Poppins] bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          To-Do List
        </h1>

        {message && (
          <div className="mb-4 text-center text-green-500 font-semibold transition-all">
            {message}
          </div>
        )}

        {/* Task Input and Add Button */}
        <div className="flex flex-col sm:flex-row mb-6 gap-3">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-4 border rounded-xl focus:outline-none dark:bg-gray-700 text-black shadow-sm focus:border-blue-400 transition-all duration-300"
            placeholder="Add a new task..."
          />
          <button
            onClick={handleAddTask}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-4 rounded-xl hover:from-teal-500 hover:to-green-400 active:scale-95 transition-transform duration-200 shadow-lg"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 rounded-2xl transition-all duration-300 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              } shadow-md`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(index)}
                  className="mr-3"
                />
                <span className={`text-lg ${todo.completed ? 'line-through text-gray-500 opacity-70' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <div className="flex space-x-3">
                <button onClick={() => handleEdit(index)} className="text-yellow-500 hover:text-yellow-400">
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-400">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
