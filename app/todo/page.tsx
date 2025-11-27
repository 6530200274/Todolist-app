"use client";
import { useState } from "react";

interface Todo {
  date: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function TodoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [todo, setTodo] = useState({ date: "", title: "", description: "" });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleAddTodo = () => {
    if (todo.title.trim() === "") return;
    setTodos([...todos, { ...todo, completed: false }]);
    setIsOpen(false);
    setTodo({ date: "", title: "", description: "" });
  };

  const handleToggleComplete = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Filter + Search
  const filteredTodos = todos.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    if (filter === "all") return matchesSearch;
    if (filter === "completed") return t.completed && matchesSearch;
    if (filter === "pending") return !t.completed && matchesSearch;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-700 to-blue-950 flex flex-col items-center px-4 py-8 space-y-6">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-indigo-900 font-sans">
          Hi! Panisara 👋
        </h1>
        <h2 className="text-lg font-normal mb-4 text-indigo-900 font-sans">
          Set today’s main goal. You got this! 💪
        </h2>

        {/* Add Todo Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-indigo-900 text-white py-2 rounded-lg font-semibold hover:bg-indigo-800 transition flex items-center justify-center gap-2"
        >
          + Add Todo
        </button>

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
              onClick={() => setFilter("completed")}
              className={`px-3 py-2 rounded-lg font-semibold ${filter === "completed" ? "bg-indigo-900 text-white" : "bg-gray-200 text-gray-700"
                }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-2 rounded-lg font-semibold ${filter === "pending" ? "bg-indigo-900 text-white" : "bg-gray-200 text-gray-700"
                }`}
            >
              Pending
            </button>
          </div>
        </div>


        {/* Todo List */}
        <ul className="mt-4 space-y-3">
          {filteredTodos.length === 0 && <p className="text-gray-500">No todos found.</p>}
          {filteredTodos.map((t, idx) => (
            <li
              key={idx}
              className="p-3 border border-indigo-200 rounded-lg flex justify-between items-center bg-indigo-50"
            >
              <div>
                <h4 className={`font-semibold ${t.completed ? "line-through text-gray-500" : ""}`}>
                  {t.title}
                </h4>
                <p className="text-sm text-gray-700">{t.description}</p>
                <p className="text-xs text-gray-400">{t.date}</p>
              </div>
              <button
                onClick={() => handleToggleComplete(idx)}
                className={`px-2 py-1 rounded-lg text-white ${t.completed ? "bg-green-600" : "bg-gray-400"
                  }`}
              >
                {t.completed ? "Done" : "Mark"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4 text-indigo-900">Add New Todo 📝</h3>
            <hr className="border-t border-gray-300 mb-4" />

            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-indigo-900">Date</label>
                <input
                  type="date"
                  name="date"
                  value={todo.date}
                  onChange={handleChange}
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-indigo-900">Todo Title</label>
                <input
                  type="text"
                  name="title"
                  value={todo.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-indigo-900">Description</label>
                <textarea
                  name="description"
                  value={todo.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTodo}
                  className="px-4 py-2 rounded-lg bg-indigo-900 text-white hover:bg-indigo-800 transition"
                >
                  Add Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}