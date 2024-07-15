"use client";

import Button from "@/components/button/Button";
import { useState } from "react";
import { ArrowRightIcon, Bars3Icon } from "@heroicons/react/24/solid";

export default function Header() {
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
                  className="text-sm text-white font-bold hover:font-bold"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="pt-[10px]">
                <a className="text-sm text-white" href="#">
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
