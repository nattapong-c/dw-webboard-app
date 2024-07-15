"use client";

import Button from "@/components/button/Button";
import CommunityDropdown from "@/components/dropdown/Community";
import TextInput from "@/components/input/Text";
import TextArea from "@/components/input/TextArea";
import Modal from "@/components/modal/Modal";
import Post from "@/components/post/Post";
import Header from "@/layouts/header/Header";
import MainMenu from "@/layouts/menu/Menu";
import { CommunityType } from "@/typing/post";
import { useState } from "react";

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
    created_at: new Date("2024-03-09"),
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
    created_at: new Date("2024-03-09"),
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
    created_at: new Date("2024-03-09"),
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
    created_at: new Date("2024-03-09"),
  },
];

export default function Home() {
  const [openCommunity, setOpenCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(undefined);
  const [openCommunityCreate, setOpenCommunityCreate] = useState(false);
  const [selectedCommunityCreate, setSelectedCommunityCreate] =
    useState(undefined);
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <main>
      <Header menu="Home" />
      <div className="p-[20px] pt-[98px] flex">
        <div className="max-md:hidden w-2/12">
          <MainMenu menu="Home" desktop />
        </div>
        <div className="md:w-8/12 max-md:w-full">
          <div>
            <form className="flex">
              <TextInput placeholder="search" transparentBackground />
              <div>
                <CommunityDropdown
                  selected={selectedCommunity}
                  openOptions={openCommunity}
                  onToggle={() => setOpenCommunity(!openCommunity)}
                  onSelect={(e) => {
                    if (e.target.innerHTML.includes(selectedCommunity)) {
                      setSelectedCommunity(undefined);
                    } else {
                      setSelectedCommunity(e.target.innerHTML);
                    }
                  }}
                />
              </div>
              <div className="max-md:w-1/3 md:w-1/4">
                <Button label="Create+" onClick={() => setOpenCreate(true)} />
              </div>
            </form>
          </div>
          <div className="mt-[15px] rounded-lg bg-white p-[2px]">
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
                  created_at: post.created_at,
                }}
              />
            ))}
          </div>
          {openCreate && (
            <Modal title="Create Post" onClose={() => setOpenCreate(false)}>
              <form>
                <div className="mb-[10px] md:w-fit">
                  <CommunityDropdown
                    border
                    title="Choose a community"
                    titleCenter
                    createMode
                    selected={selectedCommunityCreate}
                    openOptions={openCommunityCreate}
                    onToggle={() =>
                      setOpenCommunityCreate(!openCommunityCreate)
                    }
                    onSelect={(e) => {
                      if (
                        e.target.innerHTML.includes(selectedCommunityCreate)
                      ) {
                        setSelectedCommunityCreate(undefined);
                      } else {
                        setSelectedCommunityCreate(e.target.innerHTML);
                      }
                    }}
                  />
                </div>
                <TextInput placeholder="Title" />
                <div className="mt-[10px]">
                  <TextArea placeholder="What's on your mind..." />
                </div>

                <div className="mt-[20px] md:flex md:justify-end">
                  <div className="max-md:mb-[15px] md:mr-[10px]">
                    <Button
                      label="Cancel"
                      outline
                      onClick={() => setOpenCreate(false)}
                    />
                  </div>
                  <div>
                    <Button label="Post" submit />
                  </div>
                </div>
              </form>
            </Modal>
          )}
        </div>
      </div>
    </main>
  );
}
