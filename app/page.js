import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="bg-[url('/yoo.png')] bg-cover bg-center h-screen">
      <div className="bg-black/50 h-full flex flex-col items-center justify-center text-center gap-6">

        <h1 className="text-white text-5xl font-bold">
          Find Your Dream Home
        </h1>

        <p className="text-white text-lg max-w-xl">
          Discover the best properties, apartments, and houses in the perfect location for you.
        </p>
        <Link href="/sign-in">
          <button className="bg-linear-to-r from-blue-600 via-gray-400 to to-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 active:scale-95 transition">
            Let's Get Started
          </button>
        </Link>

      </div>
    </div>
  );
}
