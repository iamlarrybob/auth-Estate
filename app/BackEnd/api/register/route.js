import { NextResponse } from "next/server";
import { connectDB } from "../../utils/Database";
import user from "../../models/user";
import bcrypt from "bcrypt";

export async function POST(req) {

    try {
        const { name, email, password } = await req.json();

        await connectDB();
        const hashedPassword = await bcrypt.hash(password, 10);
        await user.create({ name, email, password: hashedPassword });

        // console.log("Name:", name);
        // console.log("Email:", email);
        // console.log("Password:", password);


        return NextResponse.json({ message: "user registered" }, { status: 201 })
    } catch (err) {
        return NextResponse.json({
            message: "An error occured while registering the user"
        }, { status: 500 })
    }
}