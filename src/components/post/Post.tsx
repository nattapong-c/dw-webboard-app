import { Post as PostType } from "@/typing/post";
import { ChatBubbleOvalLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface PostProp {
  post: PostType;
  detail?: boolean;
}

export default function Post(props: PostProp) {
  return (
    <>
      <div className={`p-[20px] ${props.detail ? "" : "bg-white border-b-2"} `}>
        <div className="flex items-center">
          {props.post.user.picture !== undefined &&
          props.post.user.picture !== "" ? (
            <p className="mr-[15px]">user image</p>
          ) : (
            <div className="w-[50px] h-[50px] bg-gray-f3 p-[5px] rounded-full">
              <UserIcon className="text-gray-300" />
            </div>
          )}

          <p className="ml-[20px]">{props.post.user.username}</p>
          <p className="text-gray-300 ml-[10px]">
            {dayjs().to(props.post.created_at)}
          </p>
        </div>
        <div className="mt-[15px]">
          <div className="rounded-full text-gray-4a bg-gray-f3 text-center w-fit px-[12px] py-[5px]">
            <p>{props.post.community}</p>
          </div>
        </div>
        <a
          href={`/${props.post._id}`}
          className={props.detail ? "pointer-events-none" : ""}
        >
          <div className="mt-[15px]">
            <h2
              className={`text-main-black font-semibold ${
                props.detail ? "text-[28px]" : "text-[16px]"
              }`}
            >
              {props.post.topic}
            </h2>
            <p className={`${props.detail ? "" : "line-clamp-2 text-[14px]"}`}>
              {props.post.content}
            </p>
          </div>
          <div className="mt-[15px] flex text-gray-300">
            <ChatBubbleOvalLeftIcon className="size-6 mr-[10px]" />
            {props.post.comment_count} Comments
          </div>
        </a>
      </div>
    </>
  );
}
