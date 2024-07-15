"use client";

import Button from "@/components/button/Button";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

enum MenuEnum {
  "Home",
  "OurBlog",
}

interface MenuProp {
  menu: keyof typeof MenuEnum;
  desktop?: boolean;
}

export default function MainMenu(props: MenuProp) {
  return (
    <>
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
      {!props.desktop && (
        <div className="mt-[30px]">
          <Button label="Sign in" confirm />
        </div>
      )}
    </>
  );
}
