"use client";

import Button from "@/components/button/Button";
import CommunityDropdown from "@/components/dropdown/Community";
import TextInput from "@/components/input/Text";
import TextArea from "@/components/input/TextArea";
import Loader from "@/components/loader/Loader";
import Modal from "@/components/modal/Modal";
import Post from "@/components/post/Post";
import Header from "@/layouts/header/Header";
import MainMenu from "@/layouts/menu/Menu";
import { Auth, Post as PostService } from "@/services";
import { CommunityType, Post as PostType } from "@/typing/post";
import { User } from "@/typing/user";
import { Utils } from "@/utils";
import { useDebounce } from "@/utils/debounce";
import { useEffect, useState } from "react";
// @ts-ignore
import { useToast } from "tw-noti";

export default function Home() {
  const { enqueueToast } = useToast();
  const [openCommunity, setOpenCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(undefined);
  const [openCommunityCreate, setOpenCommunityCreate] = useState(false);
  const [selectedCommunityCreate, setSelectedCommunityCreate] =
    useState(undefined);
  const [openCreate, setOpenCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const [posts, setPost] = useState<PostType[]>([]);
  const [loadingPost, setLoadingPost] = useState(true);

  const debouncedSearch = useDebounce(search, 1500);

  const getMe = async () => {
    const userLocal = Utils.getUserLocal();

    if (userLocal._id) {
      setUser(userLocal);
    } else {
      const token = localStorage.getItem("x-access");
      if (token) {
        try {
          const me = await Auth.getMe(token);
          if (me?._id) {
            localStorage.setItem("x-user-id", me._id);
          }
          if (me?.username) {
            localStorage.setItem("x-user-username", me?.username);
          }
          if (me?.picture) {
            localStorage.setItem("x-user-picture", me.picture);
          }

          setUser(me);
        } catch (error: any) {
          enqueueToast({ content: error.message, type: "error" });
        }
      }
    }
  };

  const listPost = async (community?: string, topic?: string) => {
    setLoadingPost(true);
    try {
      const results = await PostService.list(community, topic);
      setPost(results || []);
    } catch (error: any) {
      enqueueToast({ content: error.message, type: "error" });
    }
    setLoadingPost(false);
  };

  const onCloseCreate = () => {
    setLoadingPost(false);
    setOpenCreate(false);
  };

  const createPost = async (formData: FormData) => {
    const topic = formData.get("topic") as string;
    const content = formData.get("content") as string;

    try {
      setLoadingPost(true);
      await PostService.create(
        {
          topic,
          content,
          community: selectedCommunityCreate,
        },
        localStorage.getItem("x-access") || ""
      );
      onCloseCreate();
      setOpenCommunityCreate(false);
      setSelectedCommunityCreate(undefined);
      await listPost(selectedCommunity, search);
    } catch (error: any) {
      enqueueToast({ content: error.message, type: "error" });
    }
  };

  useEffect(() => {
    setLoadingPost(true);
    getMe();
    setLoadingPost(false);
  }, []);

  useEffect(() => {
    listPost(selectedCommunity, search);
  }, [selectedCommunity]);

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      listPost(selectedCommunity, debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <main>
      {loadingPost && <Loader />}
      <Header menu="Home" user={user} />
      <div className="p-[20px] pt-[98px] flex">
        <div className="max-md:hidden w-2/12">
          <MainMenu menu="Home" desktop user={user} />
        </div>
        <div className="md:w-8/12 max-md:w-full">
          <div>
            <div className="flex">
              <TextInput
                placeholder="search"
                transparentBackground
                onChange={(event) => setSearch(event.target.value)}
              />
              <div>
                <CommunityDropdown
                  title={selectedCommunity ?? "Community"}
                  selected={selectedCommunity}
                  openOptions={openCommunity}
                  onToggle={() => setOpenCommunity(!openCommunity)}
                  onSelect={(e) => {
                    if (e.target.innerHTML.includes(selectedCommunity)) {
                      setSelectedCommunity(undefined);
                    } else {
                      setSelectedCommunity(e.target.innerHTML);
                    }
                    setOpenCommunity(false);
                  }}
                />
              </div>
              {user && (
                <div className="max-md:w-1/3 md:w-1/4">
                  <Button
                    label="Create+"
                    confirm
                    onClick={() => setOpenCreate(true)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-[15px] rounded-lg bg-white p-[2px]">
            {!posts.length && (
              <div className="py-[10px]">
                <p className="text-center">No posts to display.</p>
              </div>
            )}
            {posts?.map((post) => (
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
            <Modal title="Create Post" onClose={() => onCloseCreate()}>
              <form action={createPost}>
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
                      setOpenCommunityCreate(false);
                    }}
                  />
                </div>
                <TextInput placeholder="Title" name="topic" />
                <div className="mt-[10px]">
                  <TextArea
                    placeholder="What's on your mind..."
                    name="content"
                  />
                </div>

                <div className="mt-[20px] md:flex md:justify-end">
                  <div className="max-md:mb-[15px] md:mr-[10px]">
                    <Button
                      label="Cancel"
                      outline
                      onClick={() => onCloseCreate()}
                    />
                  </div>
                  <div>
                    <Button label="Post" confirm submit />
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
