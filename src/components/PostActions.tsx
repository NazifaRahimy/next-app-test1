"use client";
import { PostT } from "@/app/post/page";
import { useState } from "react";

export default function PostActions({
  post,
  onDelete,
  onUpdate,
}: {
  post: PostT;
  onDelete: (id: number) => void;
  onUpdate: (updated: PostT) => void;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [loading, setLoading] = useState(false);

  async function handleDelete(id: number) {
    if (!confirm("آیا مطمئنی می‌خواهی حذف کنی؟")) return;

    // await fetch(`/api/post/${id}`, { method: "DELETE" });

    onDelete(id); 

    setOpenMenu(false);
  }

  async function handleUpdate() {
    setLoading(true);

    const res = await fetch(`/api/post/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    const updated = await res.json();

    onUpdate(updated); 

    setLoading(false);
    setOpenEdit(false);
  }

  return (
    <div className="relative">
        <button className="p-2 text-xl font-bold absolute -top-5 right-1" onClick={() => setOpenMenu(!openMenu)}> ... </button>
            {openMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow rounded w-32 z-50">
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => { setOpenEdit(true);  setOpenMenu(false); }} > ✏️ ویرایش</button>
                    <button className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100" onClick={() => handleDelete(Number(post.id))}> 🗑 حذف </button>
                </div>
            )}
            {openEdit && (
                <div className="absolute right-0 mt-2 bg-white shadow p-4 rounded w-64 z-50">
                    <h3 className="font-bold mb-2">ویرایش پست</h3>
                    <input className="border w-full p-1 mb-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <textarea className="border w-full p-1 mb-2 rounded h-20" value={body} onChange={(e) => setBody(e.target.value)} />
                    <button  onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded w-full"  disabled={loading} >   {loading ? "در حال ذخیره..." : "ذخیره"}</button>
                </div>
           )}
        </div>
    );
}
