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
    const [username, setUsername] = useState("");
    const [isAvailable, setIsAvailable] = useState(null);
    const [checking, setChecking] = useState(false);

    const googleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/accounts/google/login/`;
      };
    const checkUsername = debounce(async (uname) => {
        if (!uname.trim()) {
            setIsAvailable(null);
            return;
        }
        setChecking(true);

        addToast({
            title: "Checking username...",
            description: `Looking up \"${uname}\"`,
            color: "foreground",
            promise: new Promise((resolve) => setTimeout(resolve, 500)),
            classNames: {
                base: "bg-lightPink text-darkPurple",
            },
        });

        try {
            const res = await fetch(`${BASE_URL}/api/check-username/?username=${uname}`);
            const data = await res.json();
            setIsAvailable(data.available);

            addToast({
                title: "Username Check Complete",
                description: `${uname} is ${data.available ? "available" : "taken"}`,
                color: "foreground",
                promise: new Promise((resolve) => setTimeout(resolve, 500)),
                classNames: {
                    base: data.available
                        ? "bg-darkPurple text-white"
                        : "bg-lightPink text-darkPurple",
                },
            });
        } catch (err) {
            setIsAvailable(null);
            console.error("Error checking username:", err);
        } finally {
            setChecking(false);
        }
    }, 500);

    const submitForm = async (e) => {
        e.preventDefault();

        if (isAvailable === false) {
            addToast({
                title: "Username Unavailable",
                description: "Please choose a different username.",
                color: "error",
                classNames: { base: "bg-red-500 text-white" },
            });
            return;
        }

        const data = {
            username: username,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            const res = await fetch(`${BASE_URL}/api/signup/request-otp/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Sign up request failed");
            }

            addToast({
                title: "Sign Up Successful",
                description: `Welcome, ${username}!`,
                color: "success"
            });

            router.push("/verify-otp");
        } catch (err) {
            addToast({
                title: "Sign Up Failed",
                classNames: { base: "bg-darkPurple text-white" },
            });
        }
    };

    useEffect(() => {
        checkUsername(username);
        return () => checkUsername.cancel();
    }, [username]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-no-repeat w-full px-4 sm:px-6 lg:px-8">
            <Card
                isBlurred={true}
                className="max-w-md w-full bg-darkPink shadow-lg rounded-lg p-6 flex flex-col items-center"
            >
                <CardHeader className="justify-center text-2xl font-bold mb-4 font-moul self-center text-lightPink drop-shadow-[0_1px_1px_black]">
                    Sign Up
                </CardHeader>

                <CardBody>
                    <form className="space-y-4" onSubmit={submitForm}>
                        <div>
                            <label htmlFor="username" className="block text-lg font-medium text-gray-800">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-800">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
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
                                required
                                className="bg-lightPurple mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-darkPurple focus:border-lightPink sm:text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-darkPink text-lg text-white py-2 px-4 rounded-md hover:bg-lightPink hover:text-darkPink transition duration-200 border border-black"
                        >
                            Sign Up
                        </button>

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

                <CardFooter className="text-center mt-4 justify-center mx-auto p-4">
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