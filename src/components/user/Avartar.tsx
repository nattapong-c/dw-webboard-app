import { UserIcon } from "@heroicons/react/24/outline";

interface AvartarProp {
  src?: string;
}
export default function Avartar(props: AvartarProp) {
  return (
    <>
      {props.src ? (
        <img src={props.src} className="rounded-full w-[50px]" />
      ) : (
        <div className="w-[50px] h-[50px] bg-gray-f3 p-[5px] rounded-full">
          <UserIcon className="text-gray-300" />
        </div>
      )}
    </>
  );
}
