import { prisma } from "@/lib/db";

export async function GET() {
  const contacts = await prisma.contact.findMany();
  return Response.json(contacts);
}

export async function POST(request: Request) {
  const contact = await request.json();

  const newContact = await prisma.contact.create({
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
    },
  });

  return Response.json(newContact, { status: 201 });
}
