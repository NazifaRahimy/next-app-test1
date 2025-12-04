import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// تایپ دقیق برای contact
type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
};

// تایپ پارامتر route
interface RouteParams {
  id: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: RouteParams }
): Promise<NextResponse<Contact | { error: string }>> {
  const { id } = params;

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
  { params }: { params: RouteParams }
): Promise<NextResponse<Contact | { error: string }>> {
  const { id } = params;

  try {
    const deleted = await prisma.contact.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deleted);
  } catch {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }
}