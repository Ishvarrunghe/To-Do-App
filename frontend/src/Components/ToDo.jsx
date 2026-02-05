import React, { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever, MdEdit } from "react-icons/md";

const ToDo = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  // ✅ Load tasks from LocalStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todoTasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // ✅ Save tasks in LocalStorage
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Add Task
  const handleAddTask = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  // ✅ Delete Task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✅ Toggle Complete Task
  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // ✅ Edit Task
  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);

    const newText = prompt("Edit your task:", taskToEdit.text);

    if (!newText.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // ✅ Clear All Tasks
  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Modern To-Do App
        </h1>

        <p className="text-center text-gray-500 mb-4">
          Total Tasks: <span className="font-bold">{tasks.length}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-xl focus:outline-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-3 rounded-xl shadow-sm 
              ${
                task.completed
                  ? "bg-green-100 line-through text-gray-500"
                  : "bg-gray-100"
              }`}
            >
              {task.text}

              <div className="flex gap-3 text-xl">
                {/* Complete */}
                <button
                  onClick={() => handleComplete(task.id)}
                  className="text-green-600 hover:scale-125 transition"
                >
                  <MdCheck />
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleEdit(task.id)}
                  className="text-blue-600 hover:scale-125 transition"
                >
                  <MdEdit />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:scale-125 transition"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Clear All */}
        {tasks.length > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full mt-5 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
};

export default ToDo;
