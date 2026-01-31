import { Filter } from "lucide-react";

export default function StatusSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className = "",
}) {
  return (
    <div className="relative w-full md:w-auto">
      <Filter
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <select
        value={value}
        onChange={onChange}
        className={`pl-9 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
