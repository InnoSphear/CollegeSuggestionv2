// CollegeCard.jsx
import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";

const CollegeCard = ({ college, onBrochureClick }) => {
  const slugify = (str) =>
    str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().replace(/\s+/g, "-");

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition">
      <Link to={`/college/${college.slug || slugify(college.name)}`}>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img
                src={college.logo}
                alt={college.name}
                className="w-16 h-16 rounded-lg object-contain border"
                onError={(e) => {
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
                  e.target.onerror = null;
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">
                {college.name}
              </h3>
              <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt /> {college.city}, {college.state}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt /> Est. {college.established}
                </span>
                <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                  {college.category}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500">Avg. Package</div>
              <div className="font-semibold text-blue-600">
                {college.placements?.averagePackage || "N/A"}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500">Courses</div>
              <div className="font-semibold">
                {college.courses?.slice(0, 3).join(", ")}
                {college.courses?.length > 3 ? "..." : ""}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500">Faculty Ratio</div>
              <div className="font-semibold">
                {college.faculty?.studentRatio || "N/A"}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500">Ownership</div>
              <div className="font-semibold">{college.ownership}</div>
            </div>
          </div>
        </div>
      </Link>

      <div className="border-t px-6 py-4 bg-gray-50">
        <button
          onClick={() => onBrochureClick(college)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition"
        >
          <FaDownload /> Download Brochure
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;

