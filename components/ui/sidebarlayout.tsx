"use client";
import React, { useState, ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconChartBar,
  IconFlask,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../global/mode-toggle";

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Experiments",
      href: "/experiments",
      icon: <IconFlask className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Analysis",
      href: "/analysis",
      icon: <IconChartBar className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div className="h-dvh flex">
      {/* Sidebar Section */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 sticky left-0 top-0 z-[10] bg-gray-200">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pl-1">
            <Logo />
            <div className="mt-8 flex flex-col gap-2 text-black">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col gap-2">
            {/* <SidebarLink
              link={{
                label: "Jishnu",
                href: "#",
                icon: (
                  <Image
                    src="/jishnu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            /> */}

            {/* Clerk Sign-Out Button */}
            {/* <SignOutButton>
              <button className="flex w-full items-center gap-3 p-0 text-left text-gray-700 hover:bg-gray-100 rounded-md">
                <IconArrowLeft className="h-5 w-5 flex-shrink-0" />
              </button>
            </SignOutButton> */}
            <SignedIn>
              <button className="flex w-full items-center gap-3 p-0 text-left text-gray-700 hover:bg-gray-100 rounded-md">
                <div className="h-5 w-5 flex-shrink-0">
                  <UserButton />
                </div>
              </button>
            </SignedIn>
            {/* <ModeToggle /> */}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Section */}
      <div className="flex-1">{children}</div>
    </div>
  );
}

const Logo = () => (
  <Link
    href="/"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      D2CPropelX
    </motion.span>
  </Link>
);
