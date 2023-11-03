"use client";

import { Google, LogoutOutlined } from "@mui/icons-material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

const Component = () => {
    const { data: session } = useSession();
    const divStyle = `flex flex-col md:flex-row items-center justify-center bg-gray2 gap-5 font-semibold px-2 rounded-lg mt-4`;

    const handleLogin = () => {
        signIn("google");
    };

    if (!session) {
        return (
            <div className={divStyle}>
                <p
                    className={`text-red-500 `}
                    role="status"
                    tabIndex={0}
                >
                    Not Signed In:
                </p>

                <button
                    className="p-2  w-100 flex items-center font-semibold justify-center h-14 px-6 text-xl transition-colors duration-300 bg-black border-2 border-black text-white rounded-lg focus:shadow-outline hover:bg-primary"
                    onClick={handleLogin}
                    aria-label="Sign In With Google."
                >
                    <Google />
                    <span className="ml-4">Sign In With Google.</span>
                </button>
            </div>
        );
    }
    return (
        <div className={divStyle}>
            <p
                className="text-green-500"
                role="status"
                tabIndex={0}
            >
                Signed in as: {session?.user?.email}
            </p>
            <button
                className="p-2 bg-secondary rounded-xl text-white hover:bg-black transition-all duration-300 hover:shadow-md focus:bg-black"
                onClick={() => signOut()}
                aria-label="Sign out"
            >
                <LogoutOutlined /> Sign out
            </button>
        </div>
    );
};

export default Component;
