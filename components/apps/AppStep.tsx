import classNames from "classnames";
import { generateCustomClassName } from "utils";

interface AppStepProps {
  step: number;
  children: React.ReactNode;
  color: string;
}
const AppStep = ({ step, children, color }: AppStepProps) => {
  const customClassName = generateCustomClassName(["bg"], color);
  const basicClassName =
    "rounded-full text-xl text-center w-10 h-10 border-2 border-black flex flex-col justify-center";
  return (
    <>
      <div className="flex justify-start items-start gap-4">
        <span className={classNames(basicClassName, customClassName)}>
          {step}
        </span>
        {children}
      </div>
    </>
  );
};

export default AppStep;
