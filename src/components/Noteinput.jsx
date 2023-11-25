"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const Noteinput = () => {
const router = useRouter();
const [note, setNote] = useState("");

async function createNote() {
const res = await fetch("https://devscale-mockapi.fly.dev/api/collections/notes/records", {
    method: "POST",
    headers: {
        "Content-Type":"application/json",
    },
    body: JSON.stringify({content: note, user: "anthorouw@gmail.com", additionalData: ""}),
});
    const data = await res.json();
    console.log(data);
    router.refresh()
}
  return (
    <div className="flex flex-col">
      <input onChange={(e) => setNote(e.target.value)} placeholder="Type Here..." className="p-4 space-y-5 rounded-md w-full h-12 shadow-lg" />
      <button onClick={createNote} className="bg-teal-500 text-white gap-4 m-2 shadow-lg rounded ">Save</button>
    </div>
  );
};
