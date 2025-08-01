import React, { useState, useEffect } from "react";
import TopBanner from "../components/TopBanner";
import SearchFilterBar from "../components/SearchFilterBar";
import CollegeCard from "../components/CollegeCard";
import FilterSidebar from "../components/FilterSidebar";
import BrochureModal from "../components/BrochureModal";
import axios from "axios";

const DentalTopTenGov = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ state: "", city: "", course: "" });
  const [sortBy, setSortBy] = useState("rank");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [allColleges, setAllColleges] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = "https://backend-college-suggestion.onrender.com/api/colleges";

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(API_URL);
        // Filter government dental colleges and take only first 10
        const governmentDentalColleges = response.data.colleges
          .filter(
            (college) =>
              college.ownership === "Government" &&
              college.category === "Dental"
          )
          .slice(0, 10); // Take first 10 colleges

        setAllColleges(governmentDentalColleges);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching colleges:", err);
        setError("Failed to load colleges. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const filteredColleges = allColleges.filter(
    (college) =>
      (searchQuery === "" ||
        college.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filters.state === "" || college.state === filters.state) &&
      (filters.city === "" || college.city === filters.city) &&
      (filters.course === "" ||
        (college.courses && college.courses.includes(filters.course)))
  );

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === "established") return a.established - b.established;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "placement") {
      return (
        parseFloat(b.placements?.averagePackage?.match(/\d+/)?.[0] || 0) -
        parseFloat(a.placements?.averagePackage?.match(/\d+/)?.[0] || 0)
      );
    }
    return a.id - b.id;
  });

  const getUniqueOptions = (key) => {
    const options = new Set();
    allColleges.forEach((college) => {
      if (key === "course") college.courses?.forEach((c) => options.add(c));
      else if (college[key]) options.add(college[key]);
    });
    return Array.from(options).sort();
  };

  const handleBrochureClick = (college) => {
    setSelectedCollege(college);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log("Submitted:", selectedCollege.name, formData);
    setModalOpen(false);
    setFormData({ name: "", phone: "" });
  };

  const handleModalClose = () => {
    if (formData.name || formData.phone) handleSubmit();
    else setModalOpen(false);
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  if (error) {
    return (
      <div className="mt-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 bg-gray-50 min-h-screen">
      <TopBanner />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filters={filters}
          setFilters={setFilters}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          getUniqueOptions={getUniqueOptions}
        />

        {/* Optional Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {isFilterOpen && (
          <div className="lg:hidden mb-6">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              getUniqueOptions={getUniqueOptions}
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              getUniqueOptions={getUniqueOptions}
            />
          </div>

          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm p-6 h-32 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : sortedColleges.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No colleges found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedColleges.map((college) => (
                  <CollegeCard
                    key={college.id}
                    college={college}
                    onBrochureClick={handleBrochureClick}
                    slugify={slugify}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <BrochureModal
          selectedCollege={selectedCollege}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DentalTopTenGov;
