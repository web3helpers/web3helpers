import Tag from "../../components/Tag";

const TagList = () => {
  const tags = ["Evm", "Filecoin", "Solana"];
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        {tags.map((t) => (
          <Tag name={t} className="" key="t"></Tag>
        ))}
      </div>
    </>
  );
};

export default TagList;
