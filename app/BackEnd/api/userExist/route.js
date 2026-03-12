// import { NextResponse } from "next/server";
// import user from "../../models/user";
// import { connectDB } from "../../utils/Database";

// export async function POST(req) {
//     try {
//         await connectDB();
//         const { email } = await req.json();
//         const User = await user.findOne({ email }).select("_id");
//         console.log("user:", User);
//         return NextResponse.json({ User })

//     } catch (err) {
//         console.log(err);

//     }
// }


import { NextResponse } from "next/server";
import user from "../../models/user";
import { connectDB } from "../../utils/Database";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    const User = await user.findOne({ email }).select("_id");

    console.log("user:", User);

    return NextResponse.json({ User });

  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}