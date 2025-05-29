"use client"

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { useEffect, useState } from "react";
import { checkLoggedIn } from "@/lib/auth";
import { Button } from "@heroui/button";

export function MyNavbar() {
    
    const [authenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState("");

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
                credentials: 'include', // ✅ Required for session logout via cookies
            });

            if (response.ok) {
                console.log("✅ Logout successful");
                setAuthenticated(false);
                window.location.href = '/'; // ✅ Redirect after logout
            } else {
                console.error("❌ Logout failed");
            }
        } catch (error) {
            console.error("❌ Error during logout:", error);
        }
    };

    useEffect(() => {
        async function checkUser() {
            const user = await checkLoggedIn();
            if (user?.is_authenticated) {
                console.log("✅ Logged in as:", user.username);
                setAuthenticated(true);
                setEmail(user.email);
            } else {
                console.log("❌ Not logged in");
                setAuthenticated(false);
            }
        }

        checkUser();
    }, []);

    return (
        <Navbar className="bg-darkPink fixed drop-shadow-sm">
            <NavbarBrand>
                <a href="/"><img src="/fulllogo.png" alt="LoopsnLocks Logo" className="h-10" /></a>
            </NavbarBrand>
            <NavbarContent className="flex flex-row ml-auto" justify="end">
                {authenticated ? (
                    <>
                        <NavbarItem>
                            <a href="/crotchetbasics" className="text-darkPurple hover:text-lightPurple">Crochet Basics</a>
                        </NavbarItem>
                        <NavbarItem>
                            <a href="/tutorials" className="text-darkPurple hover:text-lightPurple">Tutorials</a>
                        </NavbarItem>
                        <NavbarItem>
                            <a href="/library" className="text-darkPurple hover:text-lightPurple">Patterns Library</a>
                        </NavbarItem>
                        <NavbarItem>
                            <a href="/profile" className="text-darkPurple hover:text-lightPurple">Profile</a>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onClick={handleLogout} size="md" className="bg-transparent" >Logout</Button>
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
}
