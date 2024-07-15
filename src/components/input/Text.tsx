interface TextInputProp {
  placeholder: string;
}

export default function TextInput(props: TextInputProp) {
  return (
    <>
      <input
        type="text"
        className="appearance-none border rounded w-full py-2 px-3"
        placeholder={props.placeholder}
      />
    </>
  );
}
