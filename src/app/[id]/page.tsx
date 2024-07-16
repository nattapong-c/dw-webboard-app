"use client";

import Button from "@/components/button/Button";
import Comment from "@/components/comment/Comment";
import TextArea from "@/components/input/TextArea";
import Loader from "@/components/loader/Loader";
import Modal from "@/components/modal/Modal";
import Post from "@/components/post/Post";
import Header from "@/layouts/header/Header";
import MainMenu from "@/layouts/menu/Menu";
import { Comment as CommentService, Post as PostService } from "@/services";
import { CommunityType, Post as PostType } from "@/typing/post";
import { User } from "@/typing/user";
import { Utils } from "@/utils";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// @ts-ignore
import { useToast } from "tw-noti";

export default function PostDetail() {
  const { enqueueToast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loadingPost, setLoadingPost] = useState(true);
  const [post, setPost] = useState<PostType | undefined>(undefined);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const params = useParams<{ id: string }>();

  const getPost = async () => {
    setLoadingPost(true);
    try {
      const post = await PostService.get(params.id);
      setPost(post);
    } catch (error: any) {
      enqueueToast({ content: error.message, type: "error" });
    }
    setLoadingPost(false);
  };

  const deleteComment = async (commentId: string) => {
    setLoadingPost(true);
    try {
      await CommentService.deleteComment(commentId, token);
    } catch (error: any) {
      enqueueToast({ content: error.message, type: "error" });
    }
    setLoadingPost(false);
    await getPost();
  };

  useEffect(() => {
    setLoadingPost(true);
    const userLocal = Utils.getUserLocal();
    if (userLocal._id) {
      setUser(userLocal);
      setToken(localStorage.getItem("x-access") || "");
    }
    setLoadingPost(false);
    getPost();
  }, []);

  const onCloseCreateMobile = () => {
    setLoadingPost(false);
    setOpenModal(false);
  };

  const onCloseCreateDesktop = () => {
    setLoadingPost(false);
    setOpenTextArea(false);
  };

  const handleCreateComment = async (formData: FormData) => {
    setLoadingPost(true);
    const message = formData.get("message") as string;
    try {
      await CommentService.create(
        {
          message,
          post_id: params.id,
        },
        token
      );
      await getPost();
      onCloseCreateMobile();
    } catch (error: any) {
      enqueueToast({ content: error.message, type: "error" });
    }
  };

  const createOnMobile = async (formData: FormData) => {
    await handleCreateComment(formData);
  };

  const createOnDesktop = async (formData: FormData) => {
    await handleCreateComment(formData);
    setLoadingPost(false);
    setMessage("");
  };

  return (
    <main>
      {loadingPost && <Loader />}
      <Header menu="Home" user={user} />
      <div className="pt-[74px] flex bg-white">
        <div className="p-[20px] max-md:hidden w-1/4 bg-main-gray">
          <MainMenu menu="Home" desktop user={user} />
        </div>
        <div className="h-full w-full bg-white py-[20px]">
          <div className="pl-[20px] mb-[40px]">
            <div className="rounded-full bg-gray-f3 w-fit p-[20px]">
              <a href="/">
                <ArrowLeftIcon className="size-6 text-main-black" />
              </a>
            </div>
          </div>
          <div className="w-full">
            {!post ? (
              <p className="text-center">No post data</p>
            ) : (
              <>
                <Post
                  detail
                  post={{
                    _id: post._id,
                    topic: post.topic,
                    content: post.content,
                    community: post.community as CommunityType,
                    comment_count: post.comments?.length || 0,
                    user: post.user,
                    created_at: post.created_at,
                  }}
                />
                {user && (
                  <>
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
                  </>
                )}
              </>
            )}
          </div>

          {openModal && (
            <div className="md:hidden">
              <Modal title="Add Comments" onClose={() => onCloseCreateMobile()}>
                <form action={createOnMobile}>
                  <TextArea
                    placeholder="What's on your mind..."
                    name="message"
                  />
                  <div className="mt-[20px] mb-[15px]">
                    <Button
                      label="Cancel"
                      outline
                      onClick={() => onCloseCreateMobile()}
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
              <form action={createOnDesktop}>
                <TextArea
                  placeholder="What's on your mind..."
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <div className="mt-[20px] flex justify-end">
                  <div className="mr-[10px]">
                    <Button
                      label="Cancel"
                      outline
                      onClick={() => onCloseCreateDesktop()}
                    />
                  </div>
                  <div>
                    <Button label="Post" confirm submit />
                  </div>
                </div>
              </form>
            </div>
          )}
          {post !== undefined && (
            <div className="px-[20px] mt-[30px]">
              {post.comments?.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  onDelete={() => deleteComment(comment._id)}
                  allowAction={user?._id === comment.user._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
