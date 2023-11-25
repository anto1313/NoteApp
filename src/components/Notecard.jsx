"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Save, Trash2 } from "lucide-react";

export const Notecard = ({ id, content }) => {
  const router = useRouter();
  const [onEdit, setOnEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  async function handleUpdate() {
    const res = await fetch(`https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
    {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({content:currentContent})
    })
    const data = await res.json();
    setOnEdit(false);
    console.log(data);
    router.refresh();
  } 
  
  async function handleDelete() {
    await fetch(
      `https://devscale-mockapi.fly.dev/api/collections/notes/records/${id}`,
      {
        method: "DELETE",
      }
    );
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2 p-2 rounded mb-4 bg-slate-400 border-zinc-800 shadow-md">
      {onEdit ? (
        <input
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
          className="p-2 rounded "
        />
      ) : (
        <div>{currentContent}</div>
      )}
      <div className="text-right space-x-3">
        {onEdit ? (
          <button
          className="text-xs bg-teal-500 p-1 rounded-lg"
          onClick={handleUpdate}
        >
          <Save />
        </button>
        ) : (
          <button
            className="text-xs bg-teal-500 p-1 rounded-lg"
            onClick={() => setOnEdit(true)}
          >
            <Pencil />
          </button>
        )}
        
        <button
          className="text-xs bg-teal-500 p-1 rounded-lg"
          onClick={handleDelete}
        >
         <Trash2 />
        </button>
      </div>
    </div>
  );
};
