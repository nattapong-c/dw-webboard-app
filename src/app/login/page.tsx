import Button from "@/components/button/Button";
import TextInput from "@/components/input/Text";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex max-md:flex-col h-screen max-md:w-screen bg-main-color ">
      <div className="bg-main-color max-md:order-last flex-auto">
        <div className="items-center justify-center flex h-full max-md:w-128">
          <div className="px-[40px] max-md:w-full md:w-6/12">
            <h2 className="text-white font-inter text-28 font-semibold mb-[30px]">
              Sign in
            </h2>
            <form>
              <TextInput placeholder="username" />
              <div className="mt-[15px]">
                <Button label="Sign in" />
              </div>
            </form>
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
  );
}
