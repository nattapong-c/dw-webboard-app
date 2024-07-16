interface TextAreaProp {
  placeholder: string;
  name?: string;
}

export default function TextArea(props: TextAreaProp) {
  return (
    <>
      <textarea
        className="rounded-lg border-2 w-full h-[150px] p-[10px]"
        placeholder={props.placeholder}
        name={props.name}
      />
    </>
  );
}
