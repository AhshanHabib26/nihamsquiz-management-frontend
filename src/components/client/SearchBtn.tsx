import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBtnProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  inputBelow: null;
}

const SearchBtn: React.FC<SearchBtnProps> = ({ setSearchText, inputBelow }) => {
  return (
    <div>
      <div>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            size={20}
          />
          <Input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="pl-10 h-[45px] py-2 border border-gray-800 placeholder:text-gray-600 text-gray-600 hind-siliguri-regular rounded-md w-full"
            placeholder="এখানে খুজুন..."
          />
        </div>
        {inputBelow === null ? null : (
          <span className="text-sm text-gray-300 hind-siliguri-light">
            একাডেমিক, শিক্ষা, চিকিৎসা, স্বাস্থ্য, অনলাইন ইনকাম, প্রোগ্রামিং...{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBtn;
