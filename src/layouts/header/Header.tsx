"use client";

import Button from "@/components/button/Button";
import { useState } from "react";
import { ArrowRightIcon, Bars3Icon } from "@heroicons/react/24/solid";
import MainMenu from "../menu/Menu";
import { User } from "@/typing/user";
import UserLogin from "@/components/user/UserLogin";

enum Menu {
  "Home",
  "OurBlog",
}
interface HeaderProp {
  menu: keyof typeof Menu;
  user?: User;
}

export default function Header(props: HeaderProp) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className="bg-main-color py-[15px] px-[20px] flex justify-between fixed w-full z-50">
        <div>
          <a href="/">
            <h1 className="text-white font-castoro italic text-24">a Board</h1>
          </a>
        </div>
        <div>
          <div className="max-md:hidden">
            {props.user ? (
              <UserLogin user={props.user} />
            ) : (
              <a href="/login">
                <Button label="Sign in" confirm />
              </a>
            )}
          </div>
          <div className="md:hidden">
            <button
              className="navbar-burger flex items-center text-white p-3"
              onClick={() => setOpenMenu(true)}
            >
              <Bars3Icon className="size-6 text-white" />
            </button>
          </div>
          <div
            className={
              openMenu
                ? "md:hidden fixed top-0 right-0 h-full w-5/6 bg-main-color p-[30px]"
                : "hidden"
            }
          >
            <button className="mb-[40px]" onClick={() => setOpenMenu(false)}>
              <ArrowRightIcon className="size-6 text-white" />
            </button>
            <MainMenu menu={props.menu} />
          </div>
        </div>
      </div>
    </>
  );
}
