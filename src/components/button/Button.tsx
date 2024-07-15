interface ButtonProp {
  label: string;
  outline?: boolean;
  danger?: boolean;
}

export default function Button(props: ButtonProp) {
  return (
    <>
      {props.outline ? (
        props.danger ? (
          <button className="border-2 border-danger-color text-danger-color w-full rounded-lg py-[10px] px-[20px] max-md:text-[14px]">
            {props.label}
          </button>
        ) : (
          <button className="border-2 border-confirm-color text-confirm-color w-full rounded-lg py-[10px] px-[20px] max-md:text-[14px]">
            {props.label}
          </button>
        )
      ) : props.danger ? (
        <button className="bg-danger-color text-white w-full rounded-lg py-[10px] px-[20px] max-md:text-[14px]">
          {props.label}
        </button>
      ) : (
        <button className="bg-confirm-color text-white w-full rounded-lg py-[10px] px-[20px] max-md:text-[14px]">
          {props.label}
        </button>
      )}
    </>
  );
}
