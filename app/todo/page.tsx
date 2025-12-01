"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { title } from "process";

interface Todo {
  id: number;
  title: string;
  description: string;
  date?: string;
  completed: boolean;
}

export default function TodoPage() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  
  const [editId, setEditId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | completed

  const addTodo = () => {
    if (!title.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), title, description, date: date || undefined, completed: false },
    ]);
    setTitle("");
    setDescription("");
    setDate("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setDate(todo.date || "");
  };

  const updateTodo = () => {
    if (editId === null) return;
    setTodos(
      todos.map((t) =>
        t.id === editId ? { ...t, title, description, date: date || undefined } : t
      )
    );
    setEditId(null);
    setTitle("");
    setDescription("");
    setDate("");
  };

  // Filter + Search
  const filteredTodos = todos.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  })
  .filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-700 to-blue-950 flex flex-col items-center px-4 py-8 space-y-6">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-indigo-900 font-sans">
          Hi! 👋
        </h1>
        <h2 className="text-lg font-normal mb-4 text-indigo-900 font-sans">
          Set today’s main goal. You got this! 💪
        </h2>

        {/* Date Title Description */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-indigo-900">Date</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-semibold text-indigo-900">Todo Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-indigo-900">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={3}
            />
          </div>

          {/* Update Button */}
          {editId ? (
            <button
              onClick={updateTodo}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Update
            </button>
          ) : (
            /* Add Todo Button */
            <button
              onClick={addTodo}
              className="w-full bg-indigo-900 text-white py-2 rounded-lg font-semibold hover:bg-indigo-800 transition flex items-center justify-center gap-2"
            >
              + Add Todo
            </button>
          )}
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-300 mt-6" />

        <div className="mt-6 flex flex-col gap-4 mb-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Todo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-2 rounded-lg font-semibold ${filter === "all" ? "bg-indigo-900 text-white" : "bg-gray-200 text-gray-700"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-2 rounded-lg font-semibold ${filter === "pending" ? "bg-indigo-900 text-white" : "bg-gray-200 text-gray-700"
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-2 rounded-lg font-semibold ${filter === "completed" ? "bg-indigo-900 text-white" : "bg-gray-200 text-gray-700"
                }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Todo list */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    className="w-4 h-4 text-indigo-600 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400"
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={`font-semibold ${todo.completed ? "line-through text-gray-500" : ""
                    } text-lg`}>
                    {todo.title}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(todo)}
                    className="px-2 py-1 bg-white text-indigo-900 border border-indigo-900 rounded hover:bg-yellow-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-2 py-1 bg-orange-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {todo.description && <p className="text-gray-600">{todo.description}</p>}
              {todo.date && <p className="text-sm text-gray-400">Date : {todo.date}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}