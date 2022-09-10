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
          className="card w-2xl flex justify-between items-center relative px-4 bg-white text-bold py-5 rounded-md border-black border-2 before:content-[''] before:absolute before:w-full before:h-full before:box-content before:border-2 before:rounded-md before:border-black before:left-1 before:bottom-1"
        >
          <div className="flex items-center gap-4 text-3xl">
            <Search size={34}></Search>
            Quick search...
          </div>
          <span className="text-2xl">Ctrl K</span>
        </button>
      </SearchDialog>
    </>
  );
};

export default SearchBox;
