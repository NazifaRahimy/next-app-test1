// import { prisma } from "@/lib/db";

// export async function GET() {
//   const contacts = await prisma.contact.findMany();
//   return Response.json(contacts);
// }

// export async function POST(request: Request) {
//   const contact = await request.json();

//   const newContact = await prisma.contact.create({
//     data: {
//       firstName: contact.firstName,
//       lastName: contact.lastName,
//       email: contact.email,
//       phone: contact.phone,
//       message: contact.message,
//     },
//   });

//   return Response.json(newContact, { status: 201 });
// }
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const contacts = await prisma.contact.findMany();
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  try {
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

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}
