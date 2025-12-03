"use client";
import { useState, useEffect } from "react";
import { Todo } from "@/type/todo";
import { useRouter } from "next/navigation";

export default function TodoPage() {

  const [todosUi, setTodosUi] = useState<Todo[]>([]);
  const [todosMaster, setTodosMaster] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | completed
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    let result = [...todosMaster];

    if (filter === "pending") {
      result = result.filter((t) => !t.completed);
    } else if (filter === "completed") {
      result = result.filter((t) => t.completed);
    }

    if (search.trim() !== "") {
      const keyword = search.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(keyword) ||
          t.description.toLowerCase().includes(keyword)
      );
    }

    setTodosUi(result);
  }, [filter, search, todosMaster]);

  useEffect(() => {
    const profileValue = localStorage.getItem("my_profile");
    const todoListValue = localStorage.getItem("todo_list");
    if (profileValue) {
      const profile = JSON.parse(profileValue);
      setUserName(profile.firstName || "");
    }
    if(todoListValue) {
      const todoList = JSON.parse(todoListValue);
      setTodosMaster(todoList || [])
    }
  }, []);

  const addTodo = () => {
    if (title.trim() === "" || date === "" ) return;

    const newTodo = {
      id: Date.now(),
      title,
      description,
      date: date || undefined,
      completed: false,
    };

    setTodosMaster((prev) => {
      const updated = [...prev, newTodo];
      localStorage.setItem("todo_list", JSON.stringify(updated));
      return updated;
    });

    setTitle("");
    setDescription("");
    setDate("");
  };

  const deleteTodo = (id: number) => {
    if (editId != null) {
      cancelUpdate()
    }
    setTodosMaster(todosMaster.filter((t) => t.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodosMaster((prev) => {
    const updated = prev.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );

    localStorage.setItem("todo_list", JSON.stringify(updated));
    return updated;
    });
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setDate(todo.date || "");
  };

  const updateTodo = () => {
    if (editId === null) return;
    if (title.trim() === "" || date === "" ) return;
    setTodosMaster(
      todosMaster.map((t) =>
        t.id === editId ? { ...t, title, description, date: date || undefined } : t
      )
    );
    setEditId(null);
    setTitle("");
    setDescription("");
    setDate("");
  };

  const cancelUpdate = () => {
    setEditId(null)
    setTitle("");
    setDescription("");
    setDate("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-700 to-blue-950 flex flex-col items-center px-4 py-8 space-y-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-indigo-900 font-sans">
            Hi! {userName} 👋
          </h1>
          <button
            onClick={() => router.push("/profile")}
            className="p-2 rounded-full hover:bg-indigo-100 transition">
              <h1 className="text-lg font-normal text-indigo-900 font-sans">
              Profile
              </h1>
          </button>
        </div>
        <h2 className="text-lg font-normal mb-4 text-indigo-900 font-sans">
          Summary: Pending {todosMaster.filter((t) => !t.completed).length} & Completed {todosMaster.filter((t) => t.completed).length}
        </h2>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-indigo-900">Date</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black 
                  ${date === "" ? "text-gray-400" : "text-black"}`}
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
                className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-indigo-900">Description (optional)</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder:text-gray-400"
              rows={3}
            />
          </div>

          {editId ? (
            <div className="flex gap-2 w-full">
            <button
              onClick={cancelUpdate}
              className="flex-1 px-4 py-2 bg-white text-indigo-900 border border-indigo-900 rounded hover:bg-gray-100 transition rounded-lg"
            >Cancel
            </button>
            <button
              onClick={updateTodo}
              className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            >
              Update
            </button>
            </div>
          ) : (
            <button
              onClick={addTodo}
              className="w-full bg-indigo-900 text-white py-2 rounded-lg font-semibold hover:bg-indigo-800 transition flex items-center justify-center gap-2"
            >
              + Add Todo
            </button>
          )}
        </div>

        <hr className="border-t border-gray-300 mt-6" />

        <div className="mt-6 flex flex-col gap-4 mb-2">
          <input
            type="text"
            placeholder="Search Todo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder:text-gray-400"
          />

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

        <ul className="space-y-2">
          {todosUi.map((todo) => (
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
                  <span className={`font-semibold text-black ${todo.completed ? "line-through text-gray-500" : ""
                    } text-lg`}>
                    {todo.title}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(todo)}
                    className="px-2 py-1 bg-white text-indigo-900 border border-indigo-900 rounded hover:bg-gray-100 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {todo.description && <p className="text-gray-700">{todo.description}</p>}
              {todo.date && <p className="text-sm text-gray-400">Date : {todo.date}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}