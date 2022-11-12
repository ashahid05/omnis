"use client";

import { Navigation } from "#types";
import Link from "next/link";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import React, { HTMLAttributes, MouseEventHandler, useState } from "react";
import Utils from "../utils";
import { motion, AnimationProps } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const routes: Navigation[] = [
  { title: "Posts", path: "/posts" },
  { title: "Search", path: "/search" },
  { title: "Todos", path: "/todos" },
];

const variants: AnimationProps["variants"] = {
  opened: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
    display: "block",
  },
  closed: {
    y: -10,
    opacity: 0,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const redirectToLogin = () => router.push("/login");

  return (
    <header className="bg-cool-gray-900 text-primary-50 p-4">
      <div className="flex justify-between">
        <div className="flex space-x-6 select-none">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo/logo-icon.svg"
              alt="logo"
              width={32}
              height={32}
            />
            <span className="font-medium text-2xl flex-1 font-logo">OMNIS</span>
          </Link>
          <div className="hidden space-x-2 items-center sm:flex">
            {routes.map((route, index) => (
              <Link
                href={route.path}
                key={index}
                className="hover:bg-primary-600 p-2 rounded-md transition-colors font-medium"
              >
                {route.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden sm:flex">
          <Button color="primary" icon={faSignInAlt}>
            <Link href="/login">Login</Link>
          </Button>
        </div>
        <div className="flex items-center sm:hidden">
          <button onClick={() => setMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="block sm:hidden">
        <motion.div
          className="bg-cool-gray-900 w-full px-4 fixed z-50 right-0 left-0"
          variants={variants}
          animate={isMenuOpen ? "opened" : "closed"}
          initial="closed"
        >
          <div className="space-y-2 my-4">
            {routes.map((route, index) => (
              <Link
                onClick={() => setMenuOpen(false)}
                href={route.path}
                key={index}
                className="block py-2 px-4 rounded-md text-gray-200 hover:bg-zinc-700 hover:text-primary-350 transition duration-150"
              >
                {route.title}
              </Link>
            ))}
          </div>
          <div className="px-2 py-5 border-t border-zinc-700">
            <div className="mt-2">
              <MobileMenuItem icon={faSignInAlt} onClick={redirectToLogin}>
                Sign in
              </MobileMenuItem>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

const MobileMenuItem: React.FC<{
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  icon: FontAwesomeIconProps["icon"];
}> = ({ children, onClick, icon, className }) => {
  return (
    <div
      className={Utils.concat(
        "flex items-center py-2 rounded-md cursor-pointer text-gray-200 hover:bg-zinc-700 hover:text-primary-350 transiton duration-150",
        className
      )}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mx-3" />}
      {children}
    </div>
  );
};

export default Header;
