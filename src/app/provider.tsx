"use client";
import { PropsWithChildren } from "react";
// @ts-ignore
import { ToastProvider } from "tw-noti";

export default function CustomProvider(props: PropsWithChildren) {
  return (
    <ToastProvider
      maxToasts={3}
      timeout={2600}
      containerClasses="max-sm:right-0 sm:right-3 top-3 z-[100]"
      layoutClasses="p-[10px] pl-[20px]"
      messageClasses="mr-[20px]"
      iconClasses={{
        info: { altText: "Green Icon", classes: "hidden" },
        error: { altText: "Teal Icon", classes: "hidden" },
      }}
    >
      {props.children}
    </ToastProvider>
  );
}
