

import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/post/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json(post, { status: 200 });
}

// PATCH /api/post/:id
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, body } = await req.json();

  try {
    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, body },
    });

    return Response.json(updated);
  } catch {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }
}

// DELETE /api/post/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deleted = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return Response.json(deleted);
  } catch {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }
}

