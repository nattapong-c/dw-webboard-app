interface TextAreaProp {
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (event: any) => void;
}

export default function TextArea(props: TextAreaProp) {
  return (
    <>
      <textarea
        className="rounded-lg border-2 w-full h-[150px] p-[10px]"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange ? props.onChange : undefined}
      />
    </>
  );
}
