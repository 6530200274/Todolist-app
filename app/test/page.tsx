"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState("");

  // โหลดค่าจาก localStorage ตอน component mount
  useEffect(() => {
    const value = localStorage.getItem("myText");
    if (value) setSaved(value);
  }, []);

  // ฟังก์ชันบันทึกลง localStorage
  const saveToLocal = () => {
    localStorage.setItem("myText", text);
    setSaved(text);
    console.log('dream', text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>LocalStorage Example</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="พิมพ์ข้อความ"
      />

      <button onClick={saveToLocal} style={{ marginLeft: 8 }}>
        บันทึก
      </button>

      <p style={{ marginTop: 16 }}>ค่าที่เคยบันทึก: {saved || "(ยังไม่มี)"}</p>
    </div>
  );
}
