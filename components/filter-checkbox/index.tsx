import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { useState } from "react";

interface Props {
  title?: string;
  data: string[];
}

const FilterCheckboxList = ({ data }: Props) => {
  const [search, setSearch] = useState("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const clearAll = () => {
    setCheckedItems([]);
  };

  return (
    <div className="flex flex-col gap-3 h-full mr-3 md:mr-0">
      <button
        onClick={clearAll}
        className="text-end text-blue-500 text-sm cursor-pointer"
      >
        Clear All
      </button>

      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 "
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredData.map((item) => (
          <label
            key={item}
            className="flex items-center gap-3 text-[12px] md:text-sm cursor-pointer"
          >
            <Checkbox
              checked={checkedItems.includes(item)}
              onCheckedChange={() => toggleCheck(item)}
            />
            {item}
          </label>
        ))}

        {filteredData.length === 0 && (
          <p className="text-sm text-gray-400">No results found</p>
        )}
      </div>
    </div>
  );
};

export default FilterCheckboxList;
