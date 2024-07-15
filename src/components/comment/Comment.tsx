import { Comment as CommentType } from "@/typing/comment";
import UserPost from "../user/UserPost";

interface CommentProp {
  comment: CommentType;
}

export default function Comment(props: CommentProp) {
  return (
    <div className="mt-[25px]">
      <UserPost user={props.comment.user} date={props.comment.created_at} />
      <div className="mt-[5px] ml-[70px]">
        <p>{props.comment.message}</p>
      </div>
    </div>
  );
}
