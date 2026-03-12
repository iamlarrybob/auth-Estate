import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import UserModel from "@/app/BackEnd/models/user";
import { connectDB } from "@/app/BackEnd/utils/Database";
import bcrypt from "bcrypt";

export const authOptions = {
  debug: true,

  providers: [
    // GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // EMAIL + PASSWORD LOGIN
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          await connectDB();

          const user = await UserModel.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name,
          };
        } catch (err) {
          console.error(err);
          throw new Error("Login failed");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectDB();

        const existingUser = await UserModel.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await UserModel.create({
            name: user.name,
            email: user.email,
          });
        }
      }

      return true;
    },

    async session({ session, token }) {
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

//=====================================================================



// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { credentialsProvider } from "next-auth/providers/credentials"
// import UserModel from "@/app/BackEnd/models/user";
// import { connectDB } from "@/app/BackEnd/utils/Database";
// import { signIn } from "next-auth/react";


// // const handler = NextAuth({
// //   debug: true,
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_ID,
// //       clientSecret: process.env.GOOGLE_SECRET,
// //     }),
// //   ],
// // });


// const handler = NextAuth({
//   debug: true,
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ session }) {
//       // Optionally attach extra info to session
//       return session;
//     },

//     async signIn({ user, account, profile }) {
//       try {
//         await connectDB();

//         // Check if user exists
//         const existingUser = await UserModel.findOne({ email: user.email });

//         if (!existingUser) {
//           // Create new user in MongoDB
//           await UserModel.create({
//             name: user.name,
//             email: user.email,
//           });
//         }

//         return true; // allow sign in
//       } catch (err) {
//         console.error("SignIn error:", err);
//         return false; // reject sign in on error
//       }
//     },
//   },
// });


// const authOptions = {
//   providers: [
//     credentialsProvider({
//       name: "credentials",
//       credentials: {},

//       async authorize(credentials) {
//         const user = { id: "1"};
//         return user;
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/sign-in",
//   }
// }

// const hand = NextAuth(authOptions);
// // console.log("GOOGLE_ID:", process.env.GOOGLE_ID)





// export { handler as GET, handler as POST };



