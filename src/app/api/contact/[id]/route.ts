import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // توجه: await اینجا باید باشد

  const contact = await prisma.contact.findUnique({
    where: { id: Number(id) },
  });

  if (!contact) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(contact);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const deleted = await prisma.contact.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deleted);
  } catch {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }
}
