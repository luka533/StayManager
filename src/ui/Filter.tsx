import { useSearchParams } from "react-router";

interface FilterProps {
  filterField: string;
  options: { value: string; label: string }[];
}

function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get(filterField) ?? options[0].value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <ul className="flex gap-2">
      {options.map((option) => (
        <li key={option.label}>
          <button
            className={`min-w-28 px-4 py-2 rounded-lg font-medium transition cursor-pointer
                        ${
                          option.value === active
                            ? "bg-emerald-500 text-white hover:bg-emerald-600"
                            : "bg-stone-100 text-stone-800 hover:bg-stone-200"
                        }`}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Filter;
