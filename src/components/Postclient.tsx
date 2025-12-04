"use client";
import PostActions from "./PostActions";
import { useState } from "react";
import Link from "next/link";
import { PostT } from "@/app/post/page";

export default function PostClient({ posts }: { posts: PostT[] }) {
    const [allPosts, setAllPosts] = useState<PostT[]>(posts);
    const [userFilter, setUserFilter] = useState<number | "all">("all");
// async function handleDelete(id: number) {
//     try {
//         const res = await fetch(`/api/post/${id}`, { method: "DELETE" });

//         if (!res.ok) {
//             const error = await res.json().catch(() => null);
//             console.error("Server error:", error);
//             return;
//         }

//         // ❗ نتیجه کامل UI آپدیت
//         setAllPosts(prev => prev.filter(post =>Number(post.id)  !== id));
//     }
//     catch (err) {
//         console.error("Network error:", err);
//     }
// }

    async function handleDelete(id: number) {
        const res = await fetch(`/api/post/${id}`, { method: "DELETE" });
        if (res.ok) {
            setAllPosts((prev) => prev.filter((post) => Number(post.id) !== id));
        } else {
            console.error("Failed to delete post");
        }
    }
    function handleUpdate(updatedPost: PostT) {
        setAllPosts(prev =>
            prev.map(p => (p.id === updatedPost.id ? updatedPost : p))
        );
    }

    const filteredPosts = userFilter === "all" ? allPosts : allPosts.filter((p) => p.userId === userFilter);
    return (
        <div className="w-full h-auto p-6 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mt-24">📝 Posts</h1>
            <div className="mb-5 flex justify-start px-7 mt-12 w-full">
                <label className="mr-2 font-semibold">Filter by User:</label>
                <select value={userFilter}
                onChange={(e) => setUserFilter( e.target.value === "all" ? "all" : Number(e.target.value) )}
                className="border px-2 py-1 rounded-md">
                    <option value="all">All Users</option>
                    {[...new Set(allPosts.map((p) => p.userId))].map((id) => (
                        <option key={id} value={id}> User {id}</option>
                    ))}
                </select>
            </div>
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white shadow-md rounded-lg p-5 relative hover:shadow-xl transition-all duration-200">
                        <PostActions post={post}      onUpdate={handleUpdate}   onDelete={handleDelete} />
                        <h4 className="font-semibold text-lg mb-3 text-gray-900"> {post.title}</h4>
                        <Link href={`/post/${post.id}`} className="text-gray-600 leading-relaxed block" > {post.body.length > 120 ? post.body.substring(0, 120) + "..." : post.body} </Link>
                    </div>
                ))}
            </div>
        </div>
  );
}

