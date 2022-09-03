import AppCard from "../../components/AppCard";

const AppList = () => {
  const apps = [
    { name: "Deploy erc1155 contract", link: "" },
    { name: "Generate new eth address", link: "/apps/generate_new_address" },
    { name: "Deploy erc20 contract", link: "" },
  ];
  return (
    <>
      <div className="flex flex-wrap gap-6">
        {apps.map((a) => (
          <AppCard name={a.name} key={a.link} link={a.link}></AppCard>
        ))}
      </div>
    </>
  );
};

export default AppList;
