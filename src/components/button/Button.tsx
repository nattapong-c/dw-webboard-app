interface ButtonProp {
  label: string;
}

export default function Button(props: ButtonProp) {
  return (
    <>
      <button className="bg-confirm-color text-white w-full rounded py-[10px]">
        {props.label}
      </button>
    </>
  );
}
