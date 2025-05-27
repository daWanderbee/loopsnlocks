"use client"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { useEffect,useState } from "react";

export function MyNavbar(isAuthenticated = false) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        //TODO: Check if user is authenticated
    }, []);

  return (
      <Navbar className="bg-darkPink fixed drop-shadow-sm">
          <NavbarBrand>
              <a href="/"><img src="/fulllogo.png" alt="LoopsnLocks Logo" className="h-10" /></a>
          </NavbarBrand>
          <NavbarContent className="flex flex-row ml-auto" justify="end">
          </NavbarContent>
      </Navbar>
  );
}