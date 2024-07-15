"use client";

import Button from "@/components/button/Button";
import UserLogin from "@/components/user/UserLogin";
import { User } from "@/typing/user";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

enum MenuEnum {
  "Home",
  "OurBlog",
}

interface MenuProp {
  menu: keyof typeof MenuEnum;
  desktop?: boolean;
  user?: User;
}

export default function MainMenu(props: MenuProp) {
  return (
    <>
      {!props.desktop && (
        <div className="mb-[30px] flex justify-end">
          {props.user ? (
            <UserLogin user={props.user} />
          ) : (
            <a href="/login">
              <Button label="Sign in" confirm />
            </a>
          )}
        </div>
      )}
      <ul>
        <li>
          <a
            className={`text-sm hover:font-bold flex ${
              props.desktop ? "text-black" : "text-white"
            } ${props.menu === "Home" ? "font-bold" : ""}`}
            href="/"
          >
            <HomeIcon
              className={`size-6 ${
                props.desktop ? "text-black" : "text-white"
              } mr-[15px]`}
            />
            Home
          </a>
        </li>
        <li className="pt-[10px]">
          <a
            className={`text-sm hover:font-bold flex ${
              props.desktop ? "text-black" : "text-white"
            } ${props.menu === "OurBlog" ? "font-bold" : ""}`}
            href="#"
          >
            <PencilSquareIcon
              className={`size-6 ${
                props.desktop ? "text-black" : "text-white"
              } mr-[15px]`}
            />
            Our Blog
          </a>
        </li>
      </ul>
    </>
  );
}
