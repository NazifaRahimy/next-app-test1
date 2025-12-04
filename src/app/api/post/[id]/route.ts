import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/post/:id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post, { status: 200 });
}

// PATCH /api/post/:id
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { title, body } = await req.json();

  try {
    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, body },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}

// DELETE /api/post/:id
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const deleted = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deleted);
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}
