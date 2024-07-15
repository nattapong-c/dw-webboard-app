interface TextInputProp {
  placeholder: string;
  transparentBackground?: boolean;
}

export default function TextInput(props: TextInputProp) {
  return (
    <>
      <input
        type="text"
        className={`appearance-none border rounded-lg w-full py-2 px-3 ${
          props.transparentBackground ? "bg-transparent" : ""
        }`}
        placeholder={props.placeholder}
      />
    </>
  );
}
