'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function signUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name || !password) {
      setError("All fields are necessary !");
      return;
    }

    try {
      const response = await fetch('/BackEnd/api/userExist', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
      });
      // const { User } = await response.json();
      const data = await response.json();

      if (data.User) {
        setError("User already exists.!")
        return;
      }


      const res = await fetch('/BackEnd/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
        })
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/sign-in")

      } else {
        console.log("user registration failed");
      }
    } catch (err) {
      console.log("Error during registration:", err);

    }
  }



  const { data: session } = useSession()

  const router = useRouter()

  if (session) {
    router.replace('/mainPage')
    return null
  }


  console.log("Name:", name)
  return (
    <div className="bg-[url('/yoo.png')] min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Create an account
        </h1>

        {/* Google Sign Up */}
        <button onClick={() => {
          signIn("google")
        }}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.4H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.6z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.2C29.4 35.6 26.8 36 24 36c-5.3 0-9.8-3.3-11.4-8l-6.5 5C9.4 39.7 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.4H42V20H24v8h11.3c-1.1 3-3.4 5.4-6.3 6.8l6.3 5.2C38.7 36.6 42 30.9 42 24c0-1.3-.1-2.2-.4-3.6z"
            />
          </svg>
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="h-px w-full bg-gray-300" />
          <span className="mx-3 text-xs text-gray-500">OR</span>
          <div className="h-px w-full bg-gray-300" />
        </div>

        {/* Email Sign Up */}
        <form onSubmit={handleSubmit}
          className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="John Doe"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Sign up
          </button>

          {
            error && (
              <div className=" text-shadow-2xs font-semibold text-red-500">
                {error}
              </div>)
          }
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>

  )
}

export default signUp