import Link from "next/link";
import { Metadata } from "next";
import { PostT } from "../page";

interface PropId {
  params: { id: string }
}

export async function generateMetadata({ params }: PropId): Promise<Metadata> {
    const { id } = params;
    const res = await fetch(`http://localhost:3000/api/post/${Number(id)}`);
    const post: PostT = await res.json();

    return {
        title: {absolute: post.title},
        description:`Read the full post titled "${post.title}", written by user ${post.userId}`
    };
}

const PostDetail = async ({ params }: PropId) => {
  const { id } = params;
  const res = await fetch(`http://localhost:3000/api/post/${Number(id)}`);
  const post: PostT = await res.json();

  return (
    <div className="flex flex-col w-full h-[500px]  items-center justify-center">
        <div className="w-[650px] h-auto border rounded-md p-10 space-y-3">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="mb-2"> {post.body}</p>
            <p className="text-sm text-gray-600 ">Author ID: {post.userId}</p>
            <Link href="/Post" className="text-blue-600 pt-5">All Posts</Link>
        </div>
    </div>
  );
};

export default PostDetail;