"use client"
import { signOut } from "next-auth/react";

const main = () => {
    return (
        <div className="bg-linear-to-r flex justify-center items-center from-green-100 via-yellow-200 to-blue-200 h-screen">
            <button className="border text-2xl rounded-3xl bg-amber-500 p-3"
                onClick={() =>
                    signOut({
                        callbackUrl: "/sign-in",
                    })
                }
            >
                Logout
            </button>
        </div>
    )
}
export default main

