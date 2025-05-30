"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { useEffect, useState } from "react";
import { checkLoggedIn } from "@/lib/auth";
import { Button } from "@heroui/button";
import { usePathname } from "next/navigation";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter
} from "@heroui/drawer";
import {useDisclosure} from "@heroui/use-disclosure";

export function MyNavbar() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const pathname = usePathname();
    const [authenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const handleLogout = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/logout/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email }),
                }
            );

            if (response.ok) {
                setAuthenticated(false);
                // force a route change so useEffect above runs
                window.location.href = "/";
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    // Whenever the path changes, re-check auth
    useEffect(() => {
        async function checkUser() {
            const user = await checkLoggedIn();
            if (user?.is_authenticated) {
                setAuthenticated(true);
                setEmail(user.email);
                setUsername(user.username);

            } else {
                setAuthenticated(false);
            }
        }
        checkUser();
    }, [pathname]);  // ← dependency on pathname


    return (
        <Navbar className="bg-darkPink fixed drop-shadow-sm">
            <NavbarBrand>
                <a href="/"><img src="/fulllogo.png" alt="LoopsnLocks Logo" className="h-10" /></a>
            </NavbarBrand>
            <NavbarContent className="flex ml-auto" justify="end">
                {authenticated ? (
                    <>
                        <NavbarItem>
                            <Button onClick={onOpen} size="sm" className="bg-lightPurple text-md hover:bg-lightPink rounded-full hover:text-darkPink ">
                                <i className="fa-solid fa-bars"></i>
                            </Button>
                        </NavbarItem>
                        <Drawer placement="left" size="xs" isOpen={isOpen} onOpenChange={onOpenChange} className="bg-darkPink text-white">
                            <DrawerContent>
                                {(onClose) => (
                                    <>
                                        <DrawerHeader className="flex flex-col gap-1 text-lg">Hello {username}</DrawerHeader>
                                        <DrawerBody>
                                            <Button className="w-full bg-transparent text-left rounded-none hover:bg-lightPink text-white  hover:text-darkPink text-md"><a href="/tutorials" className="w-full ">Tutorials</a></Button>
                                            <Button className="w-full bg-transparent text-left rounded-none hover:bg-lightPink text-white  hover:text-darkPink text-md"><a href="/library" className="w-full ">Patterns Library</a></Button>
                                            <Button className="w-full bg-transparent text-left rounded-none hover:bg-lightPink text-white  hover:text-darkPink text-md"><a href="/crotchetbasics" className="w-full ">Crochet Basics</a></Button>
                                            <Button className="w-full bg-transparent text-left rounded-none hover:bg-lightPink text-white  hover:text-darkPink text-md"><a href="/profile" className="w-full ">Profile</a></Button>
                                            <NavbarItem>
                                                <Button onClick={handleLogout} className="w-full bg-transparent text-left rounded-none hover:bg-lightPink hover:text-darkPink text-white text-md">
                                                    <div className="w-full">Logout</div>
                                                </Button>
                                            </NavbarItem>
                                        </DrawerBody>
                                        <DrawerFooter>
                                            
                                        </DrawerFooter>
                                    </>
                                )}
                            </DrawerContent>
                        </Drawer>
                    </>
                ) : (
                    <></>
                )}
            </NavbarContent>
        </Navbar>
    );
}
