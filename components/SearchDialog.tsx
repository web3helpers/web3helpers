import React, { useState } from "react";
import apps from "tools/app_list.json";
import { Web3ToolsApp } from "types";
import * as Dialog from "@radix-ui/react-dialog";
import AppCard from "./AppCard";
import { Search } from "lucide-react";

interface SearchDialogProps {
  children: React.ReactNode;
}
const SearchDialog = ({ children }: SearchDialogProps) => {
  const [result, setResult] = useState<Web3ToolsApp[]>([]);
  const handleChange = (event) => {
    const searchVale = event.target.value;
    if (searchVale) {
      const result = apps.filter((a) =>
        a.name.toLowerCase().includes(searchVale.toLowerCase().trim())
      );
      setResult(result);
    } else {
      setResult([]);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-white/30 fixed inset-0 backdrop-blur-xl">
          <Dialog.Content className="bg-white dark:bg-black w-1/2 h-1/2 fixed top-[25%] left-[25%] py-14 px-10 rounded-lg shadow-lg">
            <div className="relative rounded-md">
              <input
                type="text"
                placeholder="Search helpers"
                onChange={handleChange}
                className="w-full px-4 py-6 rounded-lg text-2xl border-0 focus-visible:!border-b-4 focus-visible:!border-t-0 border-black dark:border-white"
              />
              <Search size={30} className="absolute right-2 top-[calc(50%-15px)]"></Search>
            </div>
            <div className="flex flex-wrap gap-6 mt-8">
              {result.map((a) => (
                <AppCard app={a} key={a.name}></AppCard>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SearchDialog;
