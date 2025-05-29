"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkLoggedIn } from "@/lib/auth";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verifyUser() {
            const user = await checkLoggedIn();

            if (!user.is_authenticated) {
                console.log("❌ Not logged in. Redirecting...");
                router.push("/sign-in"); // Redirect to home
            } else {
                console.log("✅ Logged in as:", user.username);
                setLoading(false); // Allow rendering
            }
        }

        verifyUser();
    }, [router]);

    if (loading) {
        return <div className="text-center text-lightPink mt-10">Checking authentication...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-darkPurple bg-cover bg-center bg-no-repeat w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-darkPink shadow-lg rounded-lg p-6 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4 font-moul self-center text-lightPink drop-shadow-[0_1px_1px_black]">
                    Dashboard
                </h1>
                <p className="text-lg text-lightPink mb-4">Welcome to your dashboard!</p>
                <div className="bg-[url('/wool.png')] bg-cover bg-center bg-no-repeat w-44 h-64 mb-4" />
            </div>
        </div>
    );
}
