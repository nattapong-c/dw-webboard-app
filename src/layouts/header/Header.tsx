"use client";

import Button from "@/components/button/Button";
import { useState } from "react";
import {
  ArrowRightIcon,
  Bars3Icon,
  HomeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

enum Menu {
  "Home",
  "OurBlog",
}
interface HeaderProp {
  menu: keyof typeof Menu;
}

export default function Header(props: HeaderProp) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className="bg-main-color py-[15px] px-[20px] flex justify-between">
        <div>
          <h1 className="text-white font-castoro italic text-24">a Board</h1>
        </div>
        <div>
          <div className="max-md:hidden">
            <Button label="Sign in" />
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
                ? "md:hidden absolute top-0 right-0 h-full w-5/6 bg-main-color p-[30px]"
                : "hidden"
            }
          >
            <ul>
              <li className="mb-[40px]">
                <button onClick={() => setOpenMenu(false)}>
                  <ArrowRightIcon className="size-6 text-white" />
                </button>
              </li>
              <li>
                <a
                  className={
                    props.menu === "Home"
                      ? "text-sm text-white font-bold hover:font-bold flex"
                      : "text-sm text-white hover:font-bold flex"
                  }
                  href="#"
                >
                  <HomeIcon className="size-6 text-white mr-[15px]" />
                  Home
                </a>
              </li>
              <li className="pt-[10px]">
                <a
                  className={
                    props.menu === "OurBlog"
                      ? "text-sm text-white font-bold hover:font-bold flex"
                      : "text-sm text-white hover:font-bold flex"
                  }
                  href="#"
                >
                  <PencilSquareIcon className="size-6 text-white mr-[15px]" />
                  Our Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
