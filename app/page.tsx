"use client";
import React from 'react';
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-700 to-blue-950 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-900 font-sans">Todo List Application 📝</h1>

        {/* Button */}
        <button
          onClick={handleStart}
          className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
          Start
        </button>
      </div>
    </div>
  );
}

export default page;