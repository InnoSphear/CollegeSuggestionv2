// SearchFilterBar.jsx
import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const SearchFilterBar = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filters,
  setFilters,
  isFilterOpen,
  setIsFilterOpen,
  getUniqueOptions,
}) => {
  const filterFields = [
    { key: "state", label: "State" },
    { key: "city", label: "City" },
    { key: "course", label: "Course" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search colleges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rank">Sort by: Rank</option>
              <option value="name">Sort by: Name</option>
              <option value="established">Sort by: Established Year</option>
              <option value="placement">Sort by: Placement</option>
            </select>
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
          >
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isFilterOpen && (
        <div className="mt-4 md:hidden bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <FaFilter /> Filters
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {filterFields.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  {label}
                </label>
                <select
                  value={filters[key]}
                  onChange={(e) =>
                    setFilters({ ...filters, [key]: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All {label}</option>
                  {getUniqueOptions(key).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setFilters({
                state: "",
                city: "",
                course: "",
              })
            }
            className="mt-3 text-sm text-blue-600 hover:text-blue-800"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
