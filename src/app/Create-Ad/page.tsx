"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

const CreateAd = () => {
    const router = useRouter();
    const [post, setPost] = useState({userId: "", title: "", body: "",});

    const handleChange = ( e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...post,
                userId: Number(post.userId),
            }),

            });

            if (res.ok) {
                alert("successful post");
                setPost({ userId: "", title: "", body: "",});
                router.push("/post");
            } else {
                alert("do not sent post");
            }
            } catch (error) {
                console.log("POST ERROR:", error);
            }
        };

        return (
            <div className="w-full h-auto mt-14">
                <h1 className="px-10 mt-10 text-xl font-medium text-center">Create a New Post</h1>
                <div className="w-full flex flex-col items-center justify-center gap-4 mt-10">
                    <form onSubmit={handleSubmit} className=" w-full md:w-[500px]">
                    <input
                      type="text"
                      name="userId"
                      value={post.userId}
                      onChange={handleChange}
                      placeholder="userId"
                      className="w-full border-2 my-2 rounded-md p-2"
                    />

                    <input
                      type="text"
                      name="title"
                      value={post.title}
                      onChange={handleChange}
                      placeholder="title"
                      className="w-full border-2 rounded-md p-2"
                    />

                    <textarea
                      rows={5}
                      name="body"
                      value={post.body}
                      onChange={handleChange}
                      placeholder="body"
                      className="w-full border-2 rounded-md mt-2 p-2"
                    ></textarea>
                    <button type="submit" className="bg-slate-500 text-slate-50 p-2 w-full rounded-md"> submit </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAd;
