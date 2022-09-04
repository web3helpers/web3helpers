import Tag from "../../components/Tag";
import { chains } from "utils/";

const TagList = () => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        {chains.map((c) => (
          <Tag name={c.name} icons={c.icons} color={c.color} key={c.name} withEllipsis={c.name === 'Evm'}></Tag>
        ))}
      </div>
    </>
  );
};

export default TagList;
