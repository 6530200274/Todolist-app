"use client";
import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  date?: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | completed

  // เพิ่มงาน
  const addTodo = () => {
    if (!title.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        description,
        date: date || undefined,
        completed: false,
      },
    ]);
    setTitle("");
    setDescription("");
    setDate("");
  };

  // ลบงาน
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Toggle ทำเสร็จ
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // เริ่มแก้ไข
  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setDate(todo.date || "");
  };

  // บันทึกงานที่แก้ไข
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

  // --------------------------
  // ⭐ SEARCH + FILTER
  // --------------------------
  const filteredTodos = todos
    .filter((t) => {
      if (filter === "pending") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="w-full border rounded-lg px-3 py-2"
      />

      {/* ⭐ Filter Buttons */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-lg border ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1 rounded-lg border ${
            filter === "pending" ? "bg-yellow-500 text-white" : "bg-white"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-lg border ${
            filter === "completed" ? "bg-green-500 text-white" : "bg-white"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Form */}
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border rounded-lg px-3 py-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        {editId ? (
          <button
            onClick={updateTodo}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addTodo}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Add
          </button>
        )}
      </div>

      {/* Todo List */}
      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex flex-col gap-2 p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.completed ? "line-through text-gray-500" : ""}>
                  {todo.title}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(todo)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>

            {todo.description && <p className="text-gray-600">{todo.description}</p>}
            {todo.date && <p className="text-sm text-gray-400">Due: {todo.date}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
