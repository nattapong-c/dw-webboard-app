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
import { CommunityType, Post as PostType } from "@/typing/post";
import { User } from "@/typing/user";
import { Utils } from "@/utils";
import { useEffect, useState } from "react";
import { Post as PostService } from "@/services";
import { useDebounce } from "@/utils/debounce";
import { redirect } from "next/navigation";

export default function OurBlog() {
  const [openCommunity, setOpenCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(undefined);
  const [openCommunityCreate, setOpenCommunityCreate] = useState(false);
  const [selectedCommunityCreate, setSelectedCommunityCreate] =
    useState(undefined);
  const [openCommunityUpdate, setOpenCommunityUpdate] = useState(false);
  const [selectedCommunityUpdate, setSelectedCommunityUpdate] = useState<
    CommunityType | undefined
  >(undefined);
  const [openCreate, setOpenCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loadingPost, setLoadingPost] = useState(false);
  const [posts, setPost] = useState<PostType[]>([]);
  const [formDataUpdate, setFormDataUpdate] = useState({
    id: "",
    topic: "",
    content: "",
  });
  const [token, setToken] = useState("");
  const [postDelete, setPostDelete] = useState<PostType | undefined>(undefined);

  const debouncedSearch = useDebounce(search, 1500);

  const openUpdatePost = (post: PostType) => {
    setOpenUpdate(true);
    setSelectedCommunityUpdate(post.community);
    setFormDataUpdate({
      id: post._id,
      topic: post.topic,
      content: post.content,
    });
  };

  const onChangeTopic = (event: any) => {
    setFormDataUpdate({
      ...formDataUpdate,
      topic: event.target.value,
    });
  };

  const onChangeContent = (event: any) => {
    setFormDataUpdate({
      ...formDataUpdate,
      content: event.target.value,
    });
  };

  const onSelectCommunity = (event: any) => {
    if (event.target.innerHTML.includes(selectedCommunityUpdate)) {
      setSelectedCommunityUpdate(undefined);
    } else {
      setSelectedCommunityUpdate(event.target.innerHTML);
    }
    setOpenCommunityUpdate(false);
  };

  const handleUpdatePost = async (formData: FormData) => {
    setLoadingPost(true);
    const topic = formData.get("topic") as string;
    const content = formData.get("content") as string;

    await PostService.update(
      formDataUpdate.id,
      {
        topic,
        content,
        community: selectedCommunityUpdate as CommunityType,
      },
      token
    );

    setLoadingPost(false);
    setOpenUpdate(false);
    await listPost(selectedCommunity, search);
  };

  const openDeletePost = (post: PostType) => {
    setOpenDelete(true);
    setPostDelete(post);
  };

  const handleDeletePost = async () => {
    if (postDelete) {
      setLoadingPost(true);
      await PostService.deletePost(postDelete._id, token);
      setLoadingPost(false);
      await listPost(selectedCommunity, search);
      setOpenDelete(false);
    }
  };

  const listPost = async (community?: string, topic?: string) => {
    setLoadingPost(true);
    if (token) {
      const results = await PostService.list(community, topic, token, true);
      setPost(results || []);
    }
    setLoadingPost(false);
  };

  const createPost = async (formData: FormData) => {
    setLoadingPost(true);
    const topic = formData.get("topic") as string;
    const content = formData.get("content") as string;

    if (!selectedCommunityCreate) {
      // TODO handle validate
      return "";
    }
    await PostService.create(
      {
        topic,
        content,
        community: selectedCommunityCreate,
      },
      token
    );

    setLoadingPost(false);
    setOpenCreate(false);
    setOpenCommunityCreate(false);
    setSelectedCommunityCreate(undefined);
    await listPost(selectedCommunity, search);
  };

  useEffect(() => {
    setLoadingPost(true);
    const userLocal = Utils.getUserLocal();
    if (userLocal._id) {
      setUser(userLocal);
      setToken(localStorage.getItem("x-access") || "");
    } else {
      redirect("/login");
    }
    setLoadingPost(false);
  }, []);

  useEffect(() => {
    listPost(selectedCommunity, search);
  }, [token]);

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
      <Header menu="OurBlog" user={user} />
      <div className="p-[20px] pt-[98px] flex">
        <div className="max-md:hidden w-2/12">
          <MainMenu menu="OurBlog" desktop user={user} />
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
                allowAction={user !== undefined}
                onUpdate={() => openUpdatePost(post)}
                onDelete={() => openDeletePost(post)}
              />
            ))}
          </div>
          {openCreate && (
            <Modal title="Create Post" onClose={() => setOpenCreate(false)}>
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
              <form action={handleUpdatePost}>
                <div className="mb-[10px] md:w-fit">
                  <CommunityDropdown
                    border
                    title={selectedCommunityUpdate ?? "Choose a community"}
                    titleCenter
                    createMode
                    selected={selectedCommunityUpdate}
                    openOptions={openCommunityUpdate}
                    onToggle={() =>
                      setOpenCommunityUpdate(!openCommunityUpdate)
                    }
                    onSelect={(e) => onSelectCommunity(e)}
                  />
                </div>
                <TextInput
                  placeholder="Title"
                  name="topic"
                  value={formDataUpdate.topic}
                  onChange={(event) => onChangeTopic(event)}
                />
                <div className="mt-[10px]">
                  <TextArea
                    placeholder="What's on your mind..."
                    name="content"
                    value={formDataUpdate.content}
                    onChange={(event) => onChangeContent(event)}
                  />
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
                  <Button
                    label="Delete"
                    submit
                    danger
                    onClick={() => handleDeletePost()}
                  />
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
