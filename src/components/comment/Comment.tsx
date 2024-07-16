import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

import { Comment as CommentType } from "@/typing/comment";
import UserPost from "../user/UserPost";

interface CommentProp {
  comment: CommentType;
  allowAction?: boolean;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function Comment(props: CommentProp) {
  return (
    <div className="mt-[25px]">
      <div className="flex justify-between">
        <UserPost user={props.comment.user} date={props.comment.created_at} />
        {props.allowAction && (
          <div className="mt-[5px]">
            <button
              type="button"
              onClick={props.onUpdate ? props.onUpdate : undefined}
            >
              <PencilIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={props.onDelete ? props.onDelete : undefined}
            >
              <TrashIcon className="size-4 text-danger-color ml-[20px]" />
            </button>
          </div>
        )}
      </div>
      <div className="mt-[5px] ml-[70px]">
        <p>{props.comment.message}</p>
      </div>
    </div>
  );
}
