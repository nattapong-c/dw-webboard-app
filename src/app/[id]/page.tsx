"use client";

import Button from "@/components/button/Button";
import Post from "@/components/post/Post";
import Header from "@/layouts/header/Header";
import MainMenu from "@/layouts/menu/Menu";
import { CommunityType } from "@/typing/post";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const post = {
  _id: "1",
  topic: "The Big Short War",
  content:
    "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.",
  community: "History",
  comment_count: 32,
  user: {
    username: "Wieee",
    picture: "",
  },
  created_at: new Date("2024-03-09"),
};

export default function PostDetail() {
  return (
    <main>
      <Header menu="Home" />
      <div className="pt-[74px] flex bg-white">
        <div className="p-[20px] max-md:hidden w-1/4 bg-main-gray">
          <MainMenu menu="Home" desktop />
        </div>
        <div className="h-full bg-white py-[20px]">
          <div className="pl-[20px] mb-[40px]">
            <div className="rounded-full bg-gray-f3 w-fit p-[20px]">
              <a href="/">
                <ArrowLeftIcon className="size-6 text-main-black" />
              </a>
            </div>
          </div>
          <div className="">
            <Post
              detail
              post={{
                _id: post._id,
                topic: post.topic,
                content: post.content,
                community: post.community as CommunityType,
                comment_count: post.comment_count,
                user: post.user,
                created_at: post.created_at,
              }}
            />
          </div>
          <div className="w-fit px-[20px] mt-[20px]">
            <Button label="Add Comments" outline />
          </div>
        </div>
      </div>
    </main>
  );
}
