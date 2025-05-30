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
import { useDisclosure } from "@heroui/use-disclosure";
import { Card, CardHeader, CardBody } from "@heroui/card";

export function MyNavbar() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const pathname = usePathname();

    const [authenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [confirmation, setConfirmation] = useState(false);
    const [user, setUser] = useState({});
    const[isCreator, setIsCreator] = useState(false);
    const [creatorButtonOpen, setCreatorButtonOpen] = useState(false);

    const handleMakeCreator = async () => {
        // This function should call your Django endpoint to update the role
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/make-creator/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setCreatorButtonOpen(false);
                alert("You are now a creator!");
                checkIsCreator(); // Refresh creator status
            } else {
                console.error("Failed to become a creator");
            }
        } catch (err) {
            console.error("Error during role update:", err);
        }
    };

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
                window.location.href = "/";
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    useEffect(() => {
        async function checkUser() {
            const user = await checkLoggedIn();
            if (user?.is_authenticated) {
                setAuthenticated(true);
                setEmail(user.email);
                setUsername(user.username);
                setUser(user);
            } else {
                setAuthenticated(false);
            }
        }
        checkUser();
    }, [pathname]);

    useEffect(() => {
        async function checkIsCreator() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/is_creator/`,
                    {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setIsCreator(data?.is_creator || false);
                    return data?.is_creator || false;
                } else {
                    return false;
                }
            } catch (err) {
                console.error("Error checking creator status:", err);
                return false;
            }
        }

        checkIsCreator().then(isCreator => {
            setCreatorButtonOpen(!isCreator);
        });
    }, [pathname]);

    return (
        <>
            <Navbar className="bg-darkPink fixed drop-shadow-sm">
                <NavbarBrand>
                    <a href="/">
                        <img src="/fulllogo.png" alt="LoopsnLocks Logo" className="h-10" />
                    </a>
                </NavbarBrand>
                <NavbarContent className="flex ml-auto" justify="end">
                    {authenticated && (
                        <>
                            <NavbarItem>
                                <Button
                                    onClick={onOpen}
                                    size="sm"
                                    className="bg-lightPurple text-md hover:bg-lightPink rounded-full hover:text-darkPink"
                                >
                                    <i className="fa-solid fa-bars"></i>
                                </Button>
                            </NavbarItem>
                            <Drawer
                                placement="left"
                                size="xs"
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                className="bg-darkPink text-white"
                            >
                                <DrawerContent>
                                    {(onClose) => (
                                        <>
                                            <DrawerHeader className="flex flex-row gap-1 text-lg">
                                                Hello {username}! {isCreator ? (<Button color="success" className="w-5 m-0 pl-1 pr-1 text-sm inline rounded-full" disabled={true} isicononly="true" size="xs" variant="bordered"> Creator </Button>) : (<Button color="success" className="w-5 m-0 pl-1 pr-1 text-sm inline rounded-full" disabled={true} isicononly="true" size="xs" variant="bordered">Learner</Button>)}
                                            </DrawerHeader>
                                            <DrawerBody>
                                                <Button className="w-full bg-transparent text-left rounded-none hover:bg-lightPink text-white hover:text-darkPink text-md">
                                                    <a href="/tutorials" className="w-full">Tutorials</a>
                                                </Button>
                                                <Button className="w-full bg-transparent text-left rounded-none hover:bg-lightPink text-white hover:text-darkPink text-md">
                                                    <a href="/library" className="w-full">Patterns Library</a>
                                                </Button>
                                                <Button className="w-full bg-transparent text-left rounded-none hover:bg-lightPink text-white hover:text-darkPink text-md">
                                                    <a href="/crotchetbasics" className="w-full">Crochet Basics</a>
                                                </Button>
                                                <Button className="w-full bg-transparent text-left rounded-none hover:bg-lightPink text-white hover:text-darkPink text-md">
                                                    <a href={`/profile/${username}`} className="w-full">Profile</a>
                                                </Button>
                                                <NavbarItem>
                                                    <Button
                                                        onClick={handleLogout}
                                                        className="w-full bg-transparent text-left rounded-none hover:bg-lightPink hover:text-darkPink text-white text-md"
                                                    >
                                                        <div className="w-full">Logout</div>
                                                    </Button>
                                                </NavbarItem>
                                            </DrawerBody>
                                            <DrawerFooter>
                                                {creatorButtonOpen && (
                                                    <NavbarItem>
                                                        <Button
                                                            onClick={handleMakeCreator}
                                                            className="w-full bg-transparent text-left rounded-none hover:bg-lightPink hover:text-darkPink text-white text-md"
                                                        >
                                                            <div className="w-full">Become a creator</div>
                                                        </Button>
                                                    </NavbarItem>
                                                )}
                                            </DrawerFooter>
                                        </>
                                    )}
                                </DrawerContent>
                            </Drawer>
                        </>
                    )}
                </NavbarContent>
            </Navbar>

            {authenticated && creatorButtonOpen && (
                <div className="mt-20 p-4 max-w-md mx-auto">
                    <Card>
                        <CardBody>
                            <p className="text-white mb-2">
                                Make beautiful websites regardless of your design experience.
                            </p>
                        </CardBody>
                        <CardHeader>
                            <Button
                                onClick={() => setConfirmation(true)}
                                className="bg-lightPurple text-md hover:bg-lightPink rounded-full hover:text-darkPink"
                            >
                                Become a Creator
                            </Button>
                        </CardHeader>
                    </Card>
                </div>
            )}
        </>
    );
}
