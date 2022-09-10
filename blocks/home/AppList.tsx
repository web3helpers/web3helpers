import AppCard from "../../components/AppCard";
import apps from "tools/app_list.json";
import { Condition } from "types";
interface AppListProps {
  condition: Condition;
}
const AppList = ({ condition }: AppListProps) => {
  let _apps = apps;
  if (condition.chain) {
    _apps = apps.filter((a) => a.chain.name === condition.chain);
  }
  return (
    <>
      <div className="flex flex-wrap gap-6">
        {_apps.map((a) => (
          <AppCard app={a} key={a.name}></AppCard>
        ))}
      </div>
    </>
  );
};

export default AppList;
