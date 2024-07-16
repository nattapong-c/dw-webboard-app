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

  onLogout?: () => void;
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
      <ul className={props.desktop ? "fixed top-[100px]" : ""}>
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
        {props.user && (
          <li className="pt-[10px]">
            <a
              className={`text-sm hover:font-bold flex ${
                props.desktop ? "text-black" : "text-white"
              } ${props.menu === "OurBlog" ? "font-bold" : ""}`}
              href="/our-blog"
            >
              <PencilSquareIcon
                className={`size-6 ${
                  props.desktop ? "text-black" : "text-white"
                } mr-[15px]`}
              />
              Our Blog
            </a>
          </li>
        )}
      </ul>
      {props.user && !props.desktop && (
        <div className="mt-[30px]">
          <Button label="Sign out" danger outline onClick={props.onLogout} />
        </div>
      )}
    </>
  );
}
