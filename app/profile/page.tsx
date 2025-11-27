"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/todo");
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-700 to-blue-950 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-900 font-sans">Profile🙂</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Firstname */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">First Name</label>
            <input
              type="text"
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter first name"
            />
          </div>

          {/* Lastname */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Last Name</label>
            <input
              type="text"
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter last name"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Age</label>
            <input
              type="number"
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter age"
            />
          </div>

          {/* Birthdate */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Birthdate</label>
            <input
              type="date"
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Sex</label>
            <select className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Status</label>
            <select className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="relationship">In a Relationship</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
