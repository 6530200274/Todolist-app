"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Profile  {
  firstName: string;
  lastName: string;
  age: number | "";
  birthDate: string;
  sex: string;
  status: string;
  timestamp: number;
};

export default function ProfileForm() {
  const [form, setForm] = useState<Profile>({
    firstName: "",
    lastName: "",
    age: "",
    birthDate: "",
    sex: "",
    status: "",
    timestamp: Date.now(),
  });
  const [saved, setSaved] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const value = localStorage.getItem("myProfile");
    if (value) {
      setSaved(JSON.parse(value));
    }
  }, []);

  //อัปเดตฟอร์ม
  const updateForm = (key: keyof Profile, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveToLocal = () => {
    const newProfile = { ...form, timestamp: Date.now() };

    localStorage.setItem("myProfile", JSON.stringify(newProfile)); //ใช้ JSON.stringify เพราะ localStorage เก็บได้แต่ string
    setSaved(newProfile);

    console.log("Saved profile:", newProfile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveToLocal();
    router.push("/todo");
  };

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
              value={form.firstName}
              onChange={(e) => updateForm("firstName", e.target.value)}
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter first name"
            />
          </div>

          {/* Lastname */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => updateForm("lastName", e.target.value)}
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter last name"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Age</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => updateForm("age", Number(e.target.value))}
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter age"
            />
          </div>

          {/* Birthdate */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Birthdate</label>
            <input
              type="date"
              value={form.birthDate}
              onChange={(e) => updateForm("birthDate", e.target.value)}
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Sex</label>
            <select
              value={form.sex}
              onChange={(e) => updateForm("sex", e.target.value)}
              className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block font-bold mb-1 font-sans text-blue-900">Status</label>
            <select
              value={form.status}
              onChange={(e) => updateForm("status", e.target.value)} className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="relationship">In a Relationship</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit"
            onClick={saveToLocal} style={{ marginLeft: 8 }}
            className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
            Save Profile
          </button>

        </form>
      </div>
    </div>
  );
}
