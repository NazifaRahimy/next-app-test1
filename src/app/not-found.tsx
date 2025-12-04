"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4">
        <div className="bg-white text-gray-800 rounded-3xl shadow-xl p-10 max-w-md text-center">
            <h1 className="text-7xl font-extrabold mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-6">Page Not Found!</h2>
            <p className="mb-6 text-gray-600"> Sorry, the page you are looking for does not exist or has been removed. </p>
            <Link href="/"  className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition" >Back to Home</Link>
        </div>
    </div>
  );
}
