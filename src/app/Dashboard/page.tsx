"use client";
interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}


import { useEffect, useState } from "react";
// import DeleteButton from "@/components/DeleteButton";
export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function loadMessages() {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(data);
    }
    loadMessages();
  }, []);

    // const handleDelete = async (id: string) => {
    //     await fetch(`/api/contact/${id}`, {
    //     method: "DELETE",
    //     });
    //     setMessages((prev) => prev.filter((msg) => msg.id !== id));
    // };

   return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Received Messages</h1>
            <table className="w-full border">
                < thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Message</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
            <tbody>
                {messages.map((m: Message) => (
                    <tr key={m.id}>
                        <td className="border p-2 text-center">{m.id}</td>
                        <td className="border p-2 text-center">{m.firstName} {m.lastName}</td>
                        <td className="border p-2 text-center">{m.email}</td>
                        <td className="border p-2 text-center">{m.phone}</td>
                        <td className="border p-2">{m.message}</td>
                        <td className="border p-2 text-center">
                        {/* <DeleteButton  id={m.id} onDelete={handleDelete}  /> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}
