import { User } from "@/typing/user";
import { UserIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Avartar from "./Avartar";

dayjs.extend(relativeTime);

interface UserPostProp {
  user: User;
  date: Date;
}

export default function UserPost(props: UserPostProp) {
  return (
    <div className="flex items-center">
      <Avartar src={props.user.picture} />
      <p className="ml-[20px]">{props.user.username}</p>
      <p className="text-gray-300 ml-[10px] max-md:text-[12px]">
        {dayjs().to(props.date)}
      </p>
    </div>
  );
}
