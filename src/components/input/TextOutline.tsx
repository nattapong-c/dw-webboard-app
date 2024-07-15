interface TextInputProp {
  placeholder: string;
}

export default function TextOutlineInput(props: TextInputProp) {
  return (
    <>
      <input
        type="text"
        className="appearance-none border rounded-lg w-full py-2 px-3 bg-transparent"
        placeholder={props.placeholder}
      />
    </>
  );
}
