import { forwardRef } from "react";

const Input = forwardRef(function Input(props, ref) {
  return <input {...props} ref={ref as React.RefObject<any>} className="border-2 border-black" />;
});
export default Input;
