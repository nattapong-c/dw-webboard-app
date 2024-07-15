import { Post as PostType } from "@/typing/post";
import {
  ChatBubbleOvalLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UserPost from "../user/UserPost";

dayjs.extend(relativeTime);

interface PostProp {
  post: PostType;
  detail?: boolean;
  allowAction?: boolean;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function Post(props: PostProp) {
  return (
    <>
      <div className={`p-[20px] ${props.detail ? "" : "bg-white border-b-2"} `}>
        <div className={props.allowAction ? "flex justify-between" : ""}>
          <UserPost user={props.post.user} date={props.post.created_at} />
          {props.allowAction && (
            <div className="flex mt-[3px]">
              <button
                type="button"
                onClick={props.onUpdate ? props.onUpdate : undefined}
              >
                <PencilIcon className="size-6" />
              </button>
              <button
                type="button"
                onClick={props.onDelete ? props.onDelete : undefined}
              >
                <TrashIcon className="size-6 ml-[20px]" />
              </button>
            </div>
          )}
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
