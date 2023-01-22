import SearchDialog from "components/SearchDialog";
import { Search } from "lucide-react";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const SearchBox = () => {
  const ref = useRef<HTMLButtonElement>(null);
  useHotkeys("ctrl+k", (e) => {
    e.preventDefault();
    ref.current?.click();
  });

  return (
    <>
      <SearchDialog>
        <button
          ref={ref}
          className="card w-2xl flex justify-between items-center relative px-4 bg-white dark:bg-black text-bold py-5 rounded-md border-black dark:border-white border-2 before:content-[''] before:absolute before:w-full before:h-full before:box-content before:border-2 before:rounded-md before:border-black dark:before:border-white before:left-1 before:bottom-1"
        >
          <div className="flex items-center gap-4 text-black dark:text-white text-xl md:text-3xl">
            <Search size={34}></Search>
            Quick search...
          </div>
          <span className="text-2xl text-black dark:text-white hidden md:block">Ctrl K</span>
        </button>
      </SearchDialog>
    </>
  );
};

export default SearchBox;
