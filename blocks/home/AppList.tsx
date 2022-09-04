import AppCard from "../../components/AppCard";
import apps from "tools/app_list.json";

const AppList = () => {
  return (
    <>
      <div className="flex flex-wrap gap-6">
        {apps.map((a) => (
          <AppCard app={a} key={a.name}></AppCard>
        ))}
      </div>
    </>
  );
};

export default AppList;
