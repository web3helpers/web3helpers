import React, { forwardRef, useImperativeHandle, useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { ToastProps } from "@radix-ui/react-toast";

type MyToastProps = ToastProps & {
  children: React.ReactNode;
};
const Toast = forwardRef(function Toast(props: MyToastProps, forwardedRef) {
  const { children, ...toastProps } = props;
  const [count, setCount] = useState<number>(0);

  useImperativeHandle(forwardedRef, () => ({
    publish: () => setCount((count) => count + 1),
  }));

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ToastPrimitive.Root key={index} {...toastProps}>
          <ToastPrimitive.Description>{children}</ToastPrimitive.Description>
          <ToastPrimitive.Close>Dismiss</ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
    </>
  );
});

export default Toast;
