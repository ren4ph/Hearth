import React, { useRef, useEffect } from "react";
import { Input } from "./ui/input";

function InputWithAutoSelect({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <Input
      type="text"
      defaultValue="Text to be selected"
      ref={inputRef}
      onFocus={handleFocus}
      {...props}
    />
  );
}

export default InputWithAutoSelect;
