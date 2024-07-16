interface TextInputProp {
  name?: string;
  value?: string;
  placeholder: string;
  transparentBackground?: boolean;
  onChange?: (value: any) => void;
  onBlur?: () => void;
}

export default function TextInput(props: TextInputProp) {
  return (
    <>
      <input
        type="text"
        name={props.name}
        className={`appearance-none border rounded-lg w-full py-2 px-3 ${
          props.transparentBackground ? "bg-transparent" : ""
        }`}
        placeholder={props.placeholder}
        value={props.value}
        onBlur={props.onBlur ? props.onBlur : undefined}
        onChange={props.onChange ? props.onChange : undefined}
      />
    </>
  );
}
