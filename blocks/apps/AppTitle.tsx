import { Code2 } from "lucide-react";
import Link from "next/link";
import appList from "tools/app_list.json";

interface AppTitleProps {
  name: string;
  id?: number;
}
const AppTitle = ({ name, id }: AppTitleProps) => {
  const app = appList.find((a) => a.id === id);
  const sourceLink = "https://github.com/stonega/web3helpers/pages/" + app?.path ?? "";
  return (
    <>
      <div className="flex items-end gap-4 mb-6">
        <span className="text-4xl font-bold">{name}</span>
        <a className="cursor-pointer ml-2" target="_blank" href={sourceLink} rel="noreferrer">
          <Code2></Code2>
        </a>
      </div>
    </>
  );
};

export default AppTitle;
