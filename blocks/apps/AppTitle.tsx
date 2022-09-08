import { Home } from "lucide-react";
import Link from "next/link";

interface AppTitleProps {
  name: string;
}
const AppTitle = ({ name }: AppTitleProps) => {
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl font-bold">{name}</span>
      </div>
    </>
  );
};

export default AppTitle;
