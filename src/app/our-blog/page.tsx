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
import { User } from "@/typing/user";
import { Utils } from "@/utils";
import { useEffect, useState } from "react";

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
      picture:
        "https://scontent.fkdt3-1.fna.fbcdn.net/v/t39.30808-6/439895622_298237006662240_1963575465128457687_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF8hyEB2oU_QBcibnZMSY08wsJTGi0fVrjCwlMaLR9WuGe1HQ0-pj-8XvzMs_g7cGxWmOqpzZSqTYmexn05vC9K&_nc_ohc=cq_XMG_-LGkQ7kNvgEVycnA&_nc_ht=scontent.fkdt3-1.fna&oh=00_AYA0tvSunD8_T4kz0Yffmft2fLOJC_UAsPtwENdHek4XMw&oe=669B1FB7",
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

export default function OurBlog() {
  const [openCommunity, setOpenCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(undefined);
  const [openCommunityCreate, setOpenCommunityCreate] = useState(false);
  const [selectedCommunityCreate, setSelectedCommunityCreate] =
    useState(undefined);
  const [openCreate, setOpenCreate] = useState(false);
  // const [focusSearch, setFocusSearch] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const handleUpdatePost = () => {
    setOpenUpdate(true);
    // TODO fill form
    // TODO reset form
  };

  const handleDeletePost = () => {
    setOpenDelete(true);
  };

  useEffect(() => {
    const userLocal = Utils.getUserLocal();
    if (userLocal._id) {
      setUser(userLocal);
    }
  }, []);

  return (
    <main>
      <Header menu="OurBlog" user={user} />
      <div className="p-[20px] pt-[98px] flex">
        <div className="max-md:hidden w-2/12">
          <MainMenu menu="OurBlog" desktop />
        </div>
        <div className="md:w-8/12 max-md:w-full">
          <div>
            <form className="flex">
              {/* <button
                    className={focusSearch ? "hidden" : ""}
                    type="button"
                    onClick={() => setFocusSearch(true)}
                  >
                    <MagnifyingGlassIcon className="size-6" />
                  </button> */}
              <TextInput
                placeholder="search"
                transparentBackground
                // onBlur={() => setFocusSearch(false)}
              />
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
                <Button
                  label="Create+"
                  confirm
                  onClick={() => setOpenCreate(true)}
                />
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
                allowAction
                onUpdate={() => handleUpdatePost()}
                onDelete={() => handleDeletePost()}
              />
            ))}
          </div>
          {openCreate && (
            <Modal title="Create Post" onClose={() => setOpenCreate(false)}>
              <form>
                <div className="mb-[10px] md:w-fit">
                  <CommunityDropdown
                    border
                    title={selectedCommunityCreate ?? "Choose a community"}
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
                    <Button label="Post" confirm submit />
                  </div>
                </div>
              </form>
            </Modal>
          )}
          {openUpdate && (
            <Modal title="Edit Post" onClose={() => setOpenUpdate(false)}>
              <form>
                <div className="mb-[10px] md:w-fit">
                  <CommunityDropdown
                    border
                    title={selectedCommunityCreate ?? "Choose a community"}
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
                      onClick={() => setOpenUpdate(false)}
                    />
                  </div>
                  <div>
                    <Button label="Confirm" confirm submit />
                  </div>
                </div>
              </form>
            </Modal>
          )}
          {openDelete && (
            <Modal
              title="Please comfirm if you wish to delete the post"
              titleCenter
              subtitle="Are you sure you want to delete the post? Once deleted, it cannot be recovered."
              onClose={() => setOpenDelete(false)}
            >
              <div className="md:flex md:justify-end">
                <div className="max-md:mb-[15px] md:order-last">
                  <Button label="Delete" submit danger />
                </div>
                <div className="md:mr-[10px]">
                  <Button
                    label="Cancel"
                    outline
                    onClick={() => setOpenDelete(false)}
                  />
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </main>
  );
}
