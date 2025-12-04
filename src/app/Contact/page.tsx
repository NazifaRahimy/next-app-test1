"use client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
const Contact = () => {
  const router = useRouter()
  const [form, setForm] = useState({  firstName: "",  lastName: "",  email: "",   phone: "", message: "",});
  const handleChange = ( e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
   try{
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            alert("Message sent ✔");
            setForm({firstName: "", lastName: "", email: "", message: "", phone: ""});
            router.push("/Dashboard")
        }else{
            alert("do not send")
        }
        }catch(error:  unknown) {
    console.log("Network error:", error);
    alert("Please check your network");
}
    }
    return (
        <div className="w-full flex justify-center md:h-screen items-center py-10 bg-gray-100">
            <div className="w-[90%] max-w-5xl bg-white rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 overflow-hidden">  
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Send Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded-md w-full" />
                            <input type="text"  name="lastName"  value={form.lastName}  onChange={handleChange} placeholder="Last Name"  className="border p-2 rounded-md w-full"/>
                        </div>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="eg.example@email.com" className="border p-2 rounded-md w-full" />
                        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="+93770000000" className="border p-2 rounded-md w-full" />
                        <textarea name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Write your message here..." className="border p-2 rounded-md w-full" ></textarea>
                        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"> Send Message</button>
                    </form>
                </div>
                <div className="bg-black bg-opacity-80 text-black flex flex-col justify-center items-start px-10 py-10 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=60')",   }} >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><GrLocation size={20}/> Address</h2>
                    <p className=" mb-6 ml-4">  Kabul City, Pol-e-Khoshk, Shahid Abdul Rahim Alizadah Street, East 1</p>
                    <h3 className="text-lg font-semibold mt-2 flex items-center gap-3"> <FiPhone size={20} /> Phone </h3>
                    <p className="text-green-500 mb-4 ml-5">+93770000000</p>
                    <h3 className="text-lg font-semibold flex items-center gap-3"> <FiMail size={20} /> Email</h3>
                    <p className="text-green-500 ml-5">contact@example.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
