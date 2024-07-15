"use client";

import Button from "@/components/button/Button";
import Comment from "@/components/comment/Comment";
import TextArea from "@/components/input/TextArea";
import Modal from "@/components/modal/Modal";
import Post from "@/components/post/Post";
import Header from "@/layouts/header/Header";
import MainMenu from "@/layouts/menu/Menu";
import { CommunityType } from "@/typing/post";
import { User } from "@/typing/user";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

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
  comments: [
    {
      _id: "11",
      message: "Lorem ipsum dolor sit amet consectetur. Purus cursu",
      created_at: new Date("2024-04-19"),
      user: {
        username: "testuser",
      },
    },
    {
      _id: "22",
      message: "Lorem ipsum dolor sit amet consectetur. Purus cursu",
      created_at: new Date("2024-04-19"),
      user: {
        username: "testuser2",
      },
    },
  ],
};

export default function PostDetail() {
  const [openModal, setOpenModal] = useState(false);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const userId = localStorage.getItem("x-user-id");
    if (userId) {
      const username = localStorage.getItem("x-user-username") as string;
      const picture = localStorage.getItem("x-user-picture") as string;
      setUser({
        _id: userId,
        username,
        picture,
      });
    }
  }, []);

  return (
    <main>
      <Header menu="Home" user={user} />
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
          <div className="w-fit px-[20px] mt-[20px] md:hidden">
            <Button
              label="Add Comments"
              outline
              confirm
              onClick={() => setOpenModal(true)}
            />
          </div>
          {!openTextArea && (
            <div className="w-fit px-[20px] mt-[20px] max-md:hidden">
              <Button
                label="Add Comments"
                outline
                confirm
                onClick={() => setOpenTextArea(true)}
              />
            </div>
          )}

          {openModal && (
            <div className="md:hidden">
              <Modal title="Add Comments" onClose={() => setOpenModal(false)}>
                <form>
                  <TextArea placeholder="What's on your mind..." />
                  <div className="mt-[20px] mb-[15px]">
                    <Button
                      label="Cancel"
                      outline
                      onClick={() => setOpenModal(false)}
                    />
                  </div>
                  <div>
                    <Button label="Post" confirm submit />
                  </div>
                </form>
              </Modal>
            </div>
          )}
          {openTextArea && (
            <div className="max-md:hidden px-[20px]">
              <form>
                <TextArea placeholder="What's on your mind..." />
                <div className="mt-[20px] flex justify-end">
                  <div className="mr-[10px]">
                    <Button
                      label="Cancel"
                      outline
                      onClick={() => setOpenTextArea(false)}
                    />
                  </div>
                  <div>
                    <Button label="Post" confirm submit />
                  </div>
                </div>
              </form>
            </div>
          )}
          <div className="px-[20px] mt-[30px]">
            {post.comments?.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
