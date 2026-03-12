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


//================================================================================================================================

// import { NextResponse } from "next/server";
// import user from "../../models/user";
// import { connectDB } from "../../utils/Database";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { email } = await req.json();

//     const User = await user.findOne({ email }).select("_id");

//     console.log("user:", User);

//     return NextResponse.json({ User });

//   } catch (err) {
//     console.log(err);

//     return NextResponse.json(
//       { message: "Server Error" },
//       { status: 500 }
//     );
//   }
// }

//============================================================================================================================================
import { NextResponse } from "next/server";
import user from "../../models/user";
import { connectDB } from "../../utils/Database";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const existingUser = await user.findOne({ email }).select("_id");

    if (existingUser) {
      return NextResponse.json({ User: existingUser });
    }

    return NextResponse.json({ User: null });

  } catch (error) {
    console.error("Error in userExist API:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}