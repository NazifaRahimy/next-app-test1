import { prisma } from "@/lib/db";
export async function GET() {
    const posts = await prisma.post.findMany();
  return Response.json(posts);
}

export async function POST(request: Request) {
  const data = await request.json();

  const newPost = await prisma.post.create({
    data: {
      userId: data.userId,
      title: data.title,
      body: data.body,
    },
  });

  return Response.json(newPost, { status: 201 });
}


