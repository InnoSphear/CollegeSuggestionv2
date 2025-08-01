import { FaMapMarkerAlt, FaUniversity } from "react-icons/fa";

const FilterSidebar = ({ filters, setFilters, getUniqueOptions }) => {
  const filterList = [
    { key: "state", label: "State", icon: <FaMapMarkerAlt /> },
    { key: "city", label: "City", icon: <FaMapMarkerAlt /> },
    { key: "course", label: "Courses", icon: <FaUniversity /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
      <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Refine Results</h3>
      {filterList.map(({ key, label, icon }) => (
        <div key={key} className="mb-5">
          <label className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2">
            {icon} {label}
          </label>
          <select
            value={filters[key]}
            onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All {label}</option>
            {getUniqueOptions(key).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}
      <button
        onClick={() => setFilters({ state: "", city: "", course: "" })}
        className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition text-sm"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
