"use client";

import Button from "@/components/button/Button";
import TextOutlineInput from "@/components/input/TextOutline";
import Post from "@/components/post/Post";
import Header from "@/layouts/header/Header";
import MainMenu from "@/layouts/menu/Menu";
import { CommunityType } from "@/typing/post";

const posts = [
  {
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
  },
  {
    _id: "2",
    topic: "The Big Short War",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.",
    community: "History",
    comment_count: 32,
    user: {
      username: "Wieee",
      picture: "",
    },
  },
  {
    _id: "3",
    topic: "The Big Short War",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.",
    community: "History",
    comment_count: 32,
    user: {
      username: "Wieee",
      picture: "",
    },
  },
  {
    _id: "4",
    topic: "The Big Short War",
    content:
      "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.",
    community: "Exercise",
    comment_count: 32,
    user: {
      username: "Wieee",
      picture: "",
    },
  },
];

export default function Home() {
  return (
    <main className={`bg-main-gray ${posts.length > 0 ? "" : "h-screen"}`}>
      <Header menu="Home" />
      <div className="p-[20px] pt-[98px] flex">
        <div className="max-md:hidden w-1/4">
          <MainMenu menu="Home" desktop />
        </div>
        <div className="md:w-2/4 max-md:w-full">
          <div>
            <form className="flex">
              <TextOutlineInput placeholder="search" />
              <div>dropdown</div>
              <div className="max-md:w-1/3 md:w-1/4">
                <Button label="Create+" />
              </div>
            </form>
          </div>
          <div className="mt-[15px] rounded-t-lg bg-white p-[2px]">
            {posts.map((post) => (
              <Post
                key={post._id}
                post={{
                  _id: post._id,
                  topic: post.topic,
                  content: post.content,
                  community: post.community as CommunityType,
                  comment_count: post.comment_count,
                  user: post.user,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
