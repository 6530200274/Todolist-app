"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Todo {
    date: string;
    title: string;
    description: string;
    completed: boolean;
}

export default function TodoFormPage() {
    const router = useRouter();
    const [todo, setTodo] = useState({
        date: "",
        title: "",
        description: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    };

    const handleAddTodo = () => {
        if (todo.title.trim() === "") return;

        // อ่านข้อมูลเก่า
        const existingTodos = JSON.parse(localStorage.getItem("todos") || "[]");

        // เพิ่มรายการใหม่
        const updatedTodos = [...existingTodos, { ...todo, completed: false }];

        // เก็บกลับลง localStorage
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        // clear form
        setTodo({ date: "", title: "", description: "" });

        // กลับไปหน้า todo
        router.push("/todo");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-700 to-blue-950 flex flex-col items-center px-4 py-8 space-y-6">
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
                            onClick={() => router.push("/todo")}
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
    );
}
