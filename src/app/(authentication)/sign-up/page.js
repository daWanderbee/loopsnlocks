"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import debounce from "lodash.debounce";
import BASE_URL from "@/lib/api";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    // form state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // username-check state
    const [isAvailable, setIsAvailable] = useState(null);
    const [checking, setChecking] = useState(false);

    // OTP step state (if you want to show extra UI)
    const [otpRequested, setOtpRequested] = useState(false);

    // Debounced username availability checker
    const checkUsername = debounce(async (uname) => {
        if (!uname.trim()) {
            setIsAvailable(null);
            return;
        }
        setChecking(true);
        addToast({
            title: "Checking username...",
            description: `Looking up “${uname}”`,
            promise: new Promise((res) => setTimeout(res, 500)),
            classNames: { base: "bg-lightPink text-darkPurple" },
        });

        try {
            const res = await fetch(
                `${BASE_URL}/api/check-username/?username=${encodeURIComponent(uname)}`
            );
            const data = await res.json();
            setIsAvailable(data.available);

            addToast({
                title: "Username Check Complete",
                description: data.available
                    ? `${uname} is available`
                    : `${uname} is taken`,
                classNames: {
                    base: data.available
                        ? "bg-darkPurple text-white"
                        : "bg-lightPink text-darkPurple",
                },
            });
        } catch (err) {
            console.error("Error checking username:", err);
            setIsAvailable(null);
        } finally {
            setChecking(false);
        }
    }, 500);

    // fire check when username changes
    useEffect(() => {
        checkUsername(username);
        return () => checkUsername.cancel();
    }, [username]);

    // form submission
    const submitForm = async (e) => {
        e.preventDefault();

        if (isAvailable === false) {
            addToast({
                title: "Username Unavailable",
                description: "Please choose a different username.",
                color: "error",
            });
            return;
        }

        const payload = { username, email, password };

        try {
            const res = await fetch(`${BASE_URL}/api/signup/request-otp/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Sign up request failed");

            // store JUST the email string for OTP step
            localStorage.setItem("pendingEmail", payload.email);
            setOtpRequested(true);

            addToast({
                title: "OTP Sent",
                description: "Check your inbox for your verification code.",
                color: "success",
            });

            router.push("/verify-otp");
        } catch (err) {
            console.error("Error during sign up:", err);
            addToast({
                title: "Sign Up Failed",
                description: "Unable to send OTP",
                color: "error",
            });
        }
    };

    // Google signup redirect
    const googleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/accounts/google/login/`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/background.png')] bg-cover bg-center w-full px-4 sm:px-6 lg:px-8">
            <Card
                isBlurred={true}
                className="max-w-md w-full bg-darkPink shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
                <CardHeader className="text-2xl font-bold mb-4 font-moul text-lightPink text-center drop-shadow">
                    Sign Up
                </CardHeader>

                <CardBody>
                    <form className="space-y-4" onSubmit={submitForm}>
                        {/* USERNAME */}
                        <div>
                            <label htmlFor="username" className="block text-lg font-medium text-gray-800">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-800">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label htmlFor="password" className="block text-lg font-medium text-gray-800">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm"
                            />
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="w-full bg-darkPink text-lg text-white py-2 px-4 rounded-md hover:bg-lightPink hover:text-darkPink transition duration-200 border border-black"
                        >
                            Sign Up
                        </button>

                        {/* SOCIAL & OTP OPTIONS */}
                        <div className="flex gap-2 items-center justify-between w-full">
                            <Button
                                variant="flat"
                                className="w-full bg-lightPurple text-lightPink hover:bg-darkPurple hover:text-white transition duration-200"
                                onClick={googleLogin}
                            >
                                <i className="fa-brands fa-google mr-2"></i> Sign Up with Google
                            </Button>
                        </div>
                    </form>
                </CardBody>

                <CardFooter className="text-center mt-4">
                    <p className="text-sm text-gray-800">
                        Have an account?{" "}
                        <a href="/sign-in" className="text-darkPurple hover:underline">
                            Sign In
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
