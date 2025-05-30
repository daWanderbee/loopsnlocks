"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpRequested, setOtpRequested] = useState(false);

    const router = useRouter();

    // 🔹 Request OTP from backend
    const requestOtp = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/login/request-otp/`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );
            if (res.ok) {
                setOtpRequested(true);
               addToast({
                    title: "OTP Sent",
                    description: "An OTP has been sent to your email. Please check your inbox.",
                    color: "success",
                });
            } else {
                const { error, detail } = await res.json();
               addToast({
                    title: "Error",
                    description: error || detail || "Failed to send OTP",
                    color: "error",
                });
            }
        } catch (err) {
            console.error(err);
            alert("Error sending OTP");
        }
    };

    // 🔹 Submit login using password or OTP
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                addToast({
                    title: "Login Successful",
                    description: "You have successfully logged in!",
                    color: "success",
                });    
                router.push("/dashboard");
            } else {
                alert(`Login failed: ${data.error || data.detail || "Invalid credentials"}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error during login");
        }
    };

    // 🔹 Redirect to Django Google Login
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/accounts/google/login/`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/background.png')] bg-cover bg-center w-full px-4 sm:px-6 lg:px-8">
            <Card isBlurred className="max-w-md w-full bg-darkPink shadow-lg rounded-lg p-6">
                <CardHeader className="text-2xl font-bold mb-4 font-moul text-lightPink text-center drop-shadow">
                    Sign In
                </CardHeader>
                <CardBody>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-800">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-lg font-medium text-gray-800">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm"
                            />
                        </div>

                        {otpRequested && (
                            <div>
                                <label htmlFor="otp" className="block text-lg font-medium text-gray-800">
                                    OTP
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-darkPink text-white py-2 px-4 rounded-md hover:bg-lightPink hover:text-darkPink transition duration-200 border border-black"
                        >
                            Sign In
                        </button>

                        <div className="flex gap-2 items-center justify-between w-full">
                            <Button
                                variant="flat"
                                className="w-full bg-lightPurple text-lightPink hover:bg-darkPurple hover:text-white transition duration-200"
                                onClick={handleGoogleLogin}
                            >
                                <i className="fa-brands fa-google mr-2" /> Sign in with Google
                            </Button>

                            <Button
                                variant="flat"
                                className="w-full bg-darkPurple text-lightPink hover:bg-lightPink hover:text-darkPurple transition duration-200"
                                onClick={requestOtp}
                            >
                                Request OTP
                            </Button>
                        </div>
                    </form>
                </CardBody>
                <CardFooter className="text-center mt-4">
                    <p className="text-sm text-gray-800">
                        Don't have an account?{" "}
                        <a href="/sign-up" className="text-darkPurple hover:underline">
                            Sign Up
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
