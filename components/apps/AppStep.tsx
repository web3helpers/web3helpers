import { css } from "@emotion/css";
import classNames from "classnames";

interface AppStepProps {
  step: number;
  children: React.ReactNode;
  className: string;
}
const AppStep = ({ step, children, className }: AppStepProps) => {
  const basicClassName =
    "rounded-full text-xl text-center w-10 h-10 border-2 border-black flex flex-col justify-center";
  return (
    <>
      <div className="flex justify-start items-start gap-4">
        <span className={classNames(basicClassName, className)}>
          {step}
        </span>
        {children}
      </div>
    </>
  );
};

export default AppStep;
