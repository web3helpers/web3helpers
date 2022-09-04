interface AppStepProps {
  step: number;
  children: React.ReactNode;
}
const AppStep = ({ step, children }: AppStepProps) => {
  return (
    <>
      <div className="flex justify-start items-start gap-4">
        <span className="bg-solana rounded-full text-xl text-center w-10 h-10 border-2 border-black flex flex-col justify-center">
          {step}
        </span>
        {children}
      </div>
    </>
  );
};

export default AppStep;
