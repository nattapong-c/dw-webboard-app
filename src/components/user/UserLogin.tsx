import { User } from "@/typing/user";
import Avartar from "./Avartar";

interface UserLoginProp {
  user: User;
}

export default function UserLogin(props: UserLoginProp) {
  return (
    <div className="flex items-center">
      <p className="text-white mr-[10px]">{props.user.username}</p>
      <Avartar src={props.user.picture} />
    </div>
  );
}
