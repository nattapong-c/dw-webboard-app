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
import { Comment as CommentType } from "@/typing/comment";
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
  const [openDelete, setOpenDelete] = useState(false);
  const [commentDelete, setCommentDelete] = useState<string | undefined>(
    undefined
  );
  const [openUpdate, setOpenUpdate] = useState(false);
  const [formDataUpdate, setFormDataUpdate] = useState({
    id: "",
    message: "",
    post_id: "",
  });

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

  const openDeletePost = (commentId: string) => {
    setOpenDelete(true);
    setCommentDelete(commentId);
  };

  const handleDeletePost = async () => {
    if (commentDelete) {
      setLoadingPost(true);
      try {
        await CommentService.deleteComment(commentDelete, token);
        setOpenDelete(false);
      } catch (error: any) {
        enqueueToast({ content: error.message, type: "error" });
      }
      setLoadingPost(false);
      await getPost();
    }
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

  const openUpdateComment = (comment: CommentType) => {
    setOpenUpdate(true);
    setFormDataUpdate({
      id: comment._id,
      message: comment.message,
      post_id: comment.post_id,
    });
  };

  const onCloseUpdate = () => {
    setOpenUpdate(false);
    setLoadingPost(false);
  };

  const onChangeComment = (event: any) => {
    setFormDataUpdate({
      ...formDataUpdate,
      message: event.target.value,
    });
  };

  const handleUpdateComment = async (formData: FormData) => {
    const message = formData.get("message") as string;
    console.log(formDataUpdate);
    try {
      setLoadingPost(true);
      await CommentService.update(
        formDataUpdate.id,
        {
          message,
          post_id: formDataUpdate.post_id,
        },
        token
      );
      onCloseUpdate();
      await getPost();
    } catch (error: any) {
      enqueueToast({ content: error.message, type: "error" });
    }
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
                  onUpdate={() => openUpdateComment(comment)}
                  onDelete={() => openDeletePost(comment._id)}
                  allowAction={user?._id === comment.user._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {openUpdate && (
        <Modal title="Edit Comment" onClose={() => onCloseUpdate()}>
          <form action={handleUpdateComment}>
            <div>
              <TextArea
                placeholder="What's on your mind..."
                name="message"
                value={formDataUpdate.message}
                onChange={(event) => onChangeComment(event)}
              />
            </div>

            <div className="mt-[20px] md:flex md:justify-end">
              <div className="max-md:mb-[15px] md:mr-[10px]">
                <Button
                  label="Cancel"
                  outline
                  onClick={() => onCloseUpdate()}
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
          title="Please comfirm if you wish to delete the comment"
          titleCenter
          subtitle="Are you sure you want to delete the comment? Once deleted, it cannot be recovered."
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
    </main>
  );
}
