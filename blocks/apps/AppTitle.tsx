import { Code2 } from "lucide-react";
import appList from "tools/app_list.json";

interface AppTitleProps {
  name: string;
  description?: string;
  id?: number;
}
const AppTitle = ({ name, description, id }: AppTitleProps) => {
  const app = appList.find((a) => a.id === id);
  const sourceLink = "https://github.com/web3helpers/web3helpers/tree/main/pages/" + app?.path ?? "";
  return (
    <>
      <div className="flex items-end gap-4">
        <span className="text-4xl font-bold">{name}</span>
        <a className="cursor-pointer ml-2" target="_blank" href={sourceLink} rel="noreferrer">
          <Code2></Code2>
        </a>
      </div>
      <span className="text-xl mb-6">{description}</span>
    </>
  );
};

export default AppTitle;
