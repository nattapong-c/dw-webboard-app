import { User } from "@/typing/user";
import { UserIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface UserPostProp {
  user: User;
  date: Date;
}

export default function UserPost(props: UserPostProp) {
  return (
    <div className="flex items-center">
      {props.user.picture !== undefined && props.user.picture !== "" ? (
        // TODO user image circle
        <p className="">user image</p>
      ) : (
        <div className="w-[50px] h-[50px] bg-gray-f3 p-[5px] rounded-full">
          <UserIcon className="text-gray-300" />
        </div>
      )}

      <p className="ml-[20px]">{props.user.username}</p>
      <p className="text-gray-300 ml-[10px] max-md:text-[12px]">
        {dayjs().to(props.date)}
      </p>
    </div>
  );
}
