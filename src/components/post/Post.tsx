import { Post as PostType } from "@/typing/post";
import { ChatBubbleOvalLeftIcon, UserIcon } from "@heroicons/react/24/outline";

interface PostProp {
  post: PostType;
}

export default function Post(props: PostProp) {
  return (
    <>
      <div className="p-[20px] bg-white border-b-2">
        <div className="flex items-center">
          {props.post.user.picture !== undefined &&
          props.post.user.picture !== "" ? (
            <p className="mr-[15px]">user image</p>
          ) : (
            <div className="w-[50px] h-[50px] bg-gray-f3 p-[5px] rounded-full">
              <UserIcon className="text-gray-300" />
            </div>
          )}

          <p className="text-gray-300 ml-[20px]">{props.post.user.username}</p>
        </div>
        <div className="mt-[15px]">
          <div className="rounded-full text-gray-4a bg-gray-f3 text-center w-fit px-[12px] py-[5px]">
            <p>{props.post.community}</p>
          </div>
        </div>
        <div className="mt-[15px]">
          <h2 className="text-main-black font-semibold text-[16px]">
            {props.post.topic}
          </h2>
          <p className="line-clamp-2">{props.post.content}</p>
        </div>
        <div className="mt-[15px] flex text-gray-300">
          <ChatBubbleOvalLeftIcon className="size-6 mr-[10px]" />
          {props.post.comment_count} Comments
        </div>
      </div>
    </>
  );
}
