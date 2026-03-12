"use client";

// import Login from "../sign-in/page";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GoSearch } from "react-icons/go";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "@/components/ui/button";

const Header = () => {

    const path = usePathname();
    const router = useRouter();
    // const { isSignedIn } = useUser();
    const [open, setOpen] = useState(false);
    return (
        <header className="fixed top-0 z-20 w-full bg-blue-50 shadow-sm">
            <div className="flex items-center justify-between gap-3 px-3 py-3 md:px-10">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 rounded-md bg-linear-to-r from-purple-500 via-gray-400 to-blue-500 p-2">
                        <Image
                            src="/logo1.png"
                            alt="logo"
                            width={40}
                            height={32}
                            className="rounded-lg"
                        />
                        <p className="text-sm font-semibold text-white sm:text-base md:text-2xl">
                            Real <span className="text-emerald-200">Estate</span>
                        </p>
                    </div>
                </Link>

                {/* Search */}
                <form className="flex flex-1 max-w-35 sm:max-w-xs md:max-w-md items-center rounded-lg bg-slate-100 px-2 py-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent text-xs sm:text-sm p-1 focus:outline-none"
                    />
                    <GoSearch className="text-slate-600 shrink-0" />
                </form>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8">
                    <li>
                        <Link
                            href="/"
                            className={`text-sm font-semibold hover:text-blue-500 ${path === "/" ? "text-blue-500" : ""
                                }`}
                        >
                            Home
                        </Link>
                    </li>

                    {/* Listings Select */}
                    <li>
                        <select
                            className="bg-transparent text-sm font-semibold cursor-pointer focus:outline-none hover:text-blue-500"
                            defaultValue=""
                            onChange={(e) => {
                                if (e.target.value) {
                                    router.push(e.target.value);
                                }
                            }}
                        >
                            <option value="" disabled>
                                Listings
                            </option>
                            <option value="/for-sale">For Sale</option>
                            <option value="/for-rent">For Rent</option>
                            <option value="/find-agent">Agent Finder</option>
                        </select>
                    </li>

                    <li>
                        <Link
                            href="/about"
                            className={`text-sm font-semibold hover:text-blue-500 ${path === "/about" ? "text-blue-500" : ""
                                }`}
                        >
                            About
                        </Link>
                    </li>
                </ul>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-2">
                    <Link href="/add-new-listing">
                        <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer">
                            + Post Your Ad


                        </div>
                    </Link>
                    {
                        <Link href="/sign-in">
                            <Button variant="outline">Log in</Button>
                        </Link>
                    }
                </div>




                <button
                    className="md:hidden shrink-0"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <HiX size={26} /> : <HiMenu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t bg-blue-50 px-4 pb-4">
                    <ul className="flex flex-col gap-4 py-4 text-sm">
                        <li>
                            <Link
                                href="/"
                                onClick={() => setOpen(false)}
                                className={`font-semibold ${path === "/" ? "text-blue-500" : ""
                                    }`}
                            >
                                Home
                            </Link>
                        </li>

                        <li className="font-semibold">For Sale</li>
                        <li className="font-semibold">For Rent</li>
                        <li className="font-semibold">Agent Finder</li>

                        <li>
                            <Link
                                href="/about"
                                onClick={() => setOpen(false)}
                                className={`font-semibold ${path === "/about" ? "text-blue-500" : ""
                                    }`}
                            >
                                About
                            </Link>
                        </li>
                    </ul>

                    <div className="flex flex-col gap-2">
                        <Link href="/add-new-listing" onClick={() => setOpen(false)}>
                            <Button className="w-full">+ Post Your Ad</Button>
                        </Link>

                        {

                            <Link href="/sign-in" onClick={() => setOpen(false)}>
                                <Button variant="outline" className="w-full">
                                    Log in
                                </Button>
                            </Link>
                        }
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

