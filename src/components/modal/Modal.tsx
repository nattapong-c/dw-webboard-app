import { PropsWithChildren } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProp extends PropsWithChildren {
  title: string;
  subtitle?: string;
  titleCenter?: boolean;
  onClose: () => void;
}

export default function Modal(props: ModalProp) {
  return (
    <div className="z-50 fixed top-0 right-0 left-0 h-screen justify-center items-center flex bg-opacity-30 bg-black">
      <div className="bg-white rounded-lg p-[20px] w-9/12 md:max-w-screen-md">
        <div className="flex justify-end">
          <div className="">
            <button onClick={props.onClose ? props.onClose : undefined}>
              <XMarkIcon className="size-6" />
            </button>
          </div>
        </div>
        <div className="mb-[25px]">
          <h5
            className={`text-[20px] font-medium ${
              props.titleCenter ? "text-center" : ""
            }`}
          >
            {props.title}
          </h5>
          {props.subtitle && (
            <p className="text-gray-4a text-center mt-[10px]">
              {props.subtitle}
            </p>
          )}
        </div>
        {props.children}
      </div>
    </div>
  );
}
