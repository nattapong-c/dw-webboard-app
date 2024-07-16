import { TrashIcon } from "@heroicons/react/24/outline";

import { Comment as CommentType } from "@/typing/comment";
import UserPost from "../user/UserPost";

interface CommentProp {
  comment: CommentType;
  allowAction?: boolean;
  onDelete?: () => void;
}

export default function Comment(props: CommentProp) {
  return (
    <div className="mt-[25px]">
      <div className="flex justify-between">
        <UserPost user={props.comment.user} date={props.comment.created_at} />
        {props.allowAction && (
          <button
            type="button"
            onClick={props.onDelete ? props.onDelete : undefined}
          >
            <TrashIcon className="size-4 text-danger-color" />
          </button>
        )}
      </div>
      <div className="mt-[5px] ml-[70px]">
        <p>{props.comment.message}</p>
      </div>
    </div>
  );
}
