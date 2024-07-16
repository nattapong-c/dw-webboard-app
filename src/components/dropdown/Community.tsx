import { CommunityType } from "@/typing/post";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const community = [
  "History",
  "Food",
  "Pets",
  "Health",
  "Fashion",
  "Exercise",
  "Others",
];

interface CommunityDropdownProp {
  title?: string;
  titleCenter?: boolean;
  border?: boolean;
  selected?: CommunityType;
  createMode?: boolean;

  openOptions?: boolean;
  onToggle?: () => void;
  onSelect?: (event: any) => void;
}

export default function CommunityDropdown(props: CommunityDropdownProp) {
  let classes =
    "flex w-full rounded-lg py-[10px] px-[20px] max-md:text-[12px] md:text-[14px]";
  if (props.border) {
    classes += " border-2 border-confirm-color text-confirm-color bg-white";
  } else {
    classes += " ";
  }

  return (
    <div className="w-full relative inline-block">
      <div className="flex justify-end">
        <button
          type="button"
          className={classes}
          onClick={props.onToggle ? props.onToggle : undefined}
        >
          <p className={props.titleCenter ? "w-full text-center" : ""}>
            {props.title ? props.title : "Community"}
          </p>
          <ChevronDownIcon className="max-md:size-4 md:size-4 mt-[3px]" />
        </button>
      </div>
      {props.openOptions && (
        <div
          className={
            props.createMode
              ? "max-md:w-full md:w-56 absolute right-0 z-1 mt-2 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              : "w-56 absolute right-0 z-1 mt-2 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          }
        >
          <ul
            className=""
            onClick={props.onSelect ? props.onSelect : undefined}
          >
            {community.map((comm, index) =>
              props.selected === comm ? (
                <li
                  className="p-[15px] bg-gray-f3 flex justify-between"
                  key={index}
                >
                  {comm} <CheckIcon className="size-4 mt-[3px]" />
                </li>
              ) : (
                <li className="p-[15px] hover:bg-gray-f3" key={index}>
                  {comm}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
