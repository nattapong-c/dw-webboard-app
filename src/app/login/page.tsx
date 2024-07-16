"use client";

import Button from "@/components/button/Button";
import TextInput from "@/components/input/Text";
import { Auth } from "@/services";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
// @ts-ignore
import { useToast } from "tw-noti";

export default function Login() {
  const { enqueueToast } = useToast();
  const [token, setToken] = useState<string | any>(undefined);

  const handleLogin = async (formData: FormData) => {
    try {
      const username = formData.get("username") as string;
      const result = await Auth.login(username);
      setToken(result?.access_token);
    } catch (error: any) {
      enqueueToast({ content: error.message, type: "error" });
    }
  };

  useEffect(() => {
    const existToken = localStorage.getItem("x-access");
    if (existToken) {
      redirect("/");
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("x-access", token);
      redirect("/");
    }
  }, [token]);

  return (
    <>
      <div className="flex max-md:flex-col h-screen max-md:w-screen bg-main-color ">
        <div className="bg-main-color max-md:order-last flex-auto">
          <div className="items-center justify-center flex h-full max-md:w-128">
            <div className="px-[40px] max-md:w-full md:w-6/12">
              <h2 className="text-white font-inter text-28 font-semibold mb-[30px]">
                Sign in
              </h2>
              <form action={handleLogin}>
                <TextInput placeholder="username" name="username" />
                <div className="mt-[15px]">
                  <Button label="Sign in" confirm submit />
                </div>
              </form>
              <a href="/">
                <p className="text-gray-300 text-[12px] mt-[30px]">
                  skip sign in
                </p>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-secondary-color max-md:px-[5rem] max-md:py-[3rem] md:px-[6rem] md:w-1/3 max-md:rounded-b-lg md:rounded-l-lg">
          <div className="items-center justify-center flex h-full">
            <div>
              <Image
                src={`/logo.png`}
                alt={"logo"}
                sizes="75vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                width={350}
                height={350}
              />
              <h1 className="text-center text-white font-castoro italic md:text-28 max-md:text-24 max-md:m-[20px]">
                a Board
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
