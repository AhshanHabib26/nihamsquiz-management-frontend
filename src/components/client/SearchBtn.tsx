import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

interface SearchBtnProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  inputBelow: boolean;
}

const SearchBtn: React.FC<SearchBtnProps> = ({ setSearchTerm, inputBelow }) => {
  const [inputValue, setInputValue] = useState("");

  // Debounced function to update the search term
  const debouncedUpdateSearchTerm = useMemo(
    () =>
      debounce((term: string) => {
        setSearchTerm(term);
      }, 300),
    [setSearchTerm]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedUpdateSearchTerm.cancel();
    };
  }, [debouncedUpdateSearchTerm]);

  // Handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value); // Update local state for immediate UI feedback

      if (value.trim() === "") {
        // If input is cleared, immediately update search term
        setSearchTerm("");
        debouncedUpdateSearchTerm.cancel(); // Cancel pending debounced updates
      } else {
        // Debounce the update for regular input
        debouncedUpdateSearchTerm(value);
      }
    },
    [debouncedUpdateSearchTerm, setSearchTerm]
  );

  return (
    <div>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          size={20}
        />
        <Input
          value={inputValue} // Controlled input
          onChange={handleInputChange}
          type="text"
          className="pl-10 h-[45px] py-2 border border-gray-800 placeholder:text-gray-600 text-gray-600 hind-siliguri-regular rounded-md w-full"
          placeholder="এখানে খুজুন..."
        />
      </div>
      {inputBelow && (
        <span className="text-sm text-gray-300 hind-siliguri-light">
          একাডেমিক, শিক্ষা, চিকিৎসা, স্বাস্থ্য, অনলাইন ইনকাম, প্রোগ্রামিং...
        </span>
      )}
    </div>
  );
};

export default SearchBtn;
