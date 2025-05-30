"use client";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

export default function Page() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const router = useRouter();

    // Load the pendingEmail on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("pendingEmail");
            console.log("Loaded pendingEmail:", saved);
            if (saved) {
                setEmail(saved);
            } else {
                // if no email found, send user back to signup
                router.push("/sign-up");
            }
        }
    }, [router]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const payload = { email, otp };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/signup/verify-otp/`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json();

            if (res.ok) {
                addToast({
                    title: "OTP Verified",
                    description: "Your email has been successfully verified!",
                    color: "success",
                });
                localStorage.removeItem("pendingEmail");
                router.push("/sign-in");
            } else {
                alert(`Verification failed: ${data.detail || data.error || "Something went wrong"}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error verifying OTP");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/background.png')] bg-cover bg-center w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-darkPink shadow-lg rounded-lg p-6 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4 font-moul self-center text-lightPink drop-shadow-[0_1px_1px_black]">
                    OTP Verification
                </h1>
                <form onSubmit={handleFormSubmit} className="space-y-4 w-full">
                    {/* Show the email so user knows which account */}


                    <div>
                        <label htmlFor="otp" className="block text-lg font-medium text-gray-800">
                            Enter OTP
                        </label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-darkPink text-white py-2 px-4 rounded-md hover:bg-lightPink hover:text-darkPink transition duration-200 border border-black"
                    >
                        Verify OTP
                    </Button>
                </form>
            </div>
        </div>
    );
}
