import { Search } from "lucide-react";
const SearchBox = () => {
  return (
    <>
      <button className="card w-2xl flex justify-between items-center relative px-4 bg-white text-bold py-5 rounded-md border-black border-2 before:content-[''] before:absolute before:w-full before:h-full before:box-content before:border-2 before:rounded-md before:border-black before:left-1 before:bottom-1">
        <div className="flex items-center gap-4 text-3xl">
          <Search size={34}></Search>
          Quick search...
        </div>
        <span className="text-2xlweb">Ctrl K</span>
      </button>
    </>
  );
};

export default SearchBox;
