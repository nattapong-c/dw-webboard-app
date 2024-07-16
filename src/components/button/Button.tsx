interface ButtonProp {
  label: string;
  outline?: boolean;
  danger?: boolean;
  confirm?: boolean;
  submit?: boolean;

  onClick?: () => void;
}

export default function Button(props: ButtonProp) {
  let classes = "w-full rounded-lg py-[10px] px-[20px] max-md:text-[14px]";
  if (props.outline) {
    if (props.danger) {
      classes += " border-2 border-danger-color text-danger-color";
    } else if (props.confirm) {
      classes += " border-2 border-confirm-color text-confirm-color";
    } else {
      classes += " border-2";
    }
  } else {
    if (props.danger) {
      classes += " border-2 border-danger-color bg-danger-color text-white";
    } else if (props.confirm) {
      classes += " border-2 border-confirm-color bg-confirm-color text-white";
    } else {
      classes += " border-2";
    }
  }

  return (
    <button
      type={props.submit ? "submit" : "button"}
      className={classes}
      onClick={props.onClick ? props.onClick : undefined}
    >
      {props.label}
    </button>
  );
}
