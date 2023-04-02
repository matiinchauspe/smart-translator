import classnames from "classnames";
import { twMerge } from "tailwind-merge";

type TextAreaProps = {
  rows?: number;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  readonly?: boolean;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
};

const TextArea = ({
  rows = 10,
  placeholder = "",
  readonly = false,
  autoFocus = false,
  loading = false,
  value,
  className,
  onChange,
}: TextAreaProps) => {
  const classes = twMerge(
    `w-[100%] h-[100%] pt-2 px-5 text-sm font-light focus:outline-none focus:ring-inset focus:ring-1 focus:ring-teal-200 resize-none`,
    className,
    classnames({ "bg-gray-50 focus:ring-0": readonly })
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange(e.target.value);

  return (
    <textarea
      className={classes}
      autoFocus={autoFocus}
      readOnly={readonly}
      rows={rows}
      placeholder={loading ? "Translating..." : placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextArea;
