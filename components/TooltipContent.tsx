import * as Tooltip from "@radix-ui/react-tooltip";
interface TooltipContentProps {
  children: React.ReactNode;
}
const TooltipContent = ({ children }: TooltipContentProps) => {
  return (
    <Tooltip.Content sideOffset={3} className="border-2 border-black rounded-lg px-2 py-1 bg-white">
      {children}
      <Tooltip.Arrow width={11} height={5} />
    </Tooltip.Content>
  );
};

export default TooltipContent;
