"use client";

import { Navigation } from "#types";
import Link from "next/link";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSignInAlt,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import React, {
  HTMLAttributes,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import Utils from "../utils";
import { motion, AnimationProps } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useUser from "@app/user";
import { DropdownItem, DropdownMenuWithRef } from "./Dropdown";
import { useOutsideClick } from "./useOutsideClick";

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
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const dropdownToggler = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { user, logOut } = useUser();

  useOutsideClick(
    dropdown,
    () => {
      setDropdownOpen(false);
    },
    {
      toggler: dropdownToggler,
      onTogglerClick: () => void 0,
    }
  );

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
          {user ? (
            <>
              <div className="relative">
                <button
                  className="block h-11 w-11 rounded-full overflow-hidden border-2 border-primary-500"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  ref={dropdownToggler}
                >
                  <Image
                    className="h-full w-full object-cover p-px rounded-full"
                    src="/images/dummy-pfp.jpeg"
                    alt="PFP"
                    width={256}
                    height={256}
                  />
                </button>
              </div>
              <DropdownMenuWithRef
                ref={dropdown}
                isOpen={dropdownOpen}
                className="right-4 top-14 w-48"
              >
                <div className="flex items-center justify-around p-2 border-b border-b-gray-500">
                  <Image
                    className="object-cover rounded-full h-10 w-10"
                    src="/images/dummy-pfp.jpeg"
                    alt="jane avatar"
                    width={64}
                    height={64}
                  />
                  <div>
                    <Link
                      className="text-sm text-gray-300 hover:text-gray-400 transition"
                      href="/profile"
                    >
                      {user.name}
                    </Link>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <DropdownItem icon={faUser}>View Profile</DropdownItem>
                <DropdownItem icon={faPlus}>
                  <Link href="/posts/create">Create Post</Link>
                </DropdownItem>
                <DropdownItem
                  icon={faRightFromBracket}
                  onClick={logOut}
                  className="hover:bg-rose-600 hover:text-white"
                >
                  Sign out
                </DropdownItem>
              </DropdownMenuWithRef>
            </>
          ) : (
            <Button color="primary" icon={faSignInAlt}>
              <Link href="/login">Login</Link>
            </Button>
          )}
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
            <div>
              {user ? (
                <>
                  <div className="flex items-center">
                    <Image
                      src="/images/dummy-pfp.jpeg"
                      alt="pfp"
                      className="h-11 w-11 object-cover rounded-full border-2 border-primary-500"
                      width={256}
                      height={256}
                    />
                    <div className="ml-3">
                      <p className="font-semibold text-gray-300">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2 pt-2">
                    <MobileMenuItem icon={faUser}>View Profile</MobileMenuItem>
                    <MobileMenuItem icon={faPlus}>
                      <Link href="/posts/create">Create Post</Link>
                    </MobileMenuItem>
                    <MobileMenuItem
                      icon={faRightFromBracket}
                      onClick={logOut}
                      className="hover:bg-rose-600 hover:text-white"
                    >
                      Signout
                    </MobileMenuItem>
                  </div>
                </>
              ) : (
                <div className="mt-2">
                  <MobileMenuItem icon={faSignInAlt} onClick={redirectToLogin}>
                    Sign in
                  </MobileMenuItem>
                </div>
              )}
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
