import React, { useState, useEffect, useRef } from "react";
import {
  FaDownload,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import collegesData from "../Pages/collegesData.json";
import CtaSection from "./CtaSection";

const Carousel = () => {
  // Get government and private colleges
  const govtColleges = collegesData.colleges
    .filter((college) => college.ownership === "Government")
    .slice(0, 10);

  const privateColleges = collegesData.colleges
    .filter((college) => college.ownership === "Private")
    .slice(0, 10);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isHovered, setIsHovered] = useState(false);

  const govtRef = useRef(null);
  const privateRef = useRef(null);
  const autoPlayInterval = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayInterval.current = setInterval(() => {
        if (!isHovered) {
          scroll(govtRef, "right");
          scroll(privateRef, "right");
        }
      }, 5000);
    };

    startAutoPlay();
    return () => clearInterval(autoPlayInterval.current);
  }, [isHovered]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      
      // Reset to start if at end
      if (direction === "right" && ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth - 50) {
        setTimeout(() => {
          ref.current.scrollTo({ left: 0, behavior: "smooth" });
        }, 500);
      }
    }
  };

  const handleBrochureClick = (college) => {
    setSelectedCollege(college);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log("Submitted:", formData, "For college:", selectedCollege?.name);
    setModalOpen(false);
    setFormData({ name: "", phone: "" });
  };

  const handleModalClose = () => {
    if (formData.name || formData.phone) {
      handleSubmit();
    } else {
      setModalOpen(false);
    }
  };

  // Enhanced College Card component
  const CollegeCard = ({ college }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 w-60 flex-shrink-0 mx-2 h-full flex flex-col">
      <Link to={`/college/${college.slug}`} className="block flex-grow">
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-start mb-3">
            <img
              src={college.logo}
              alt={college.name}
              className="w-12 h-12 rounded-md object-contain border border-gray-200"
              onError={(e) => {
                e.target.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
                e.target.onerror = null;
              }}
            />
            <div className="ml-3 flex-1">
              <h3 className="text-base font-semibold text-gray-800 line-clamp-2 leading-tight">
                {college.name.split(",")[0]}
              </h3>
              <div className="text-xs text-gray-500 mt-1">
                {college.city}, {college.state}
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                {college.category}
              </span>
              <span className="text-xs text-gray-500">Est. {college.established}</span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <div>
                <div className="text-gray-500">Avg. Package</div>
                <div className="font-medium text-blue-600">
                  {college.placements?.averagePackage || "N/A"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-500">Ownership</div>
                <div className="font-medium">
                  <span className={`px-1 rounded ${
                    college.ownership === "Government" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-purple-100 text-purple-800"
                  }`}>
                    {college.ownership}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleBrochureClick(college);
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 transition text-sm font-medium"
        >
          <FaDownload size={12} /> Brochure
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Premier Medical Colleges in India
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover top-ranked institutions with verified placement records and
          admission details
        </p>
      </div>

      {/* Government Colleges Section */}
      <div className="max-w-7xl mx-auto mb-16 relative group">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium mr-3">
              Govt
            </span>
            <h3 className="text-xl font-semibold text-gray-800">
              Top Government Medical Colleges
            </h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll(govtRef, "left")}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition text-gray-600 hover:text-blue-600"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll(govtRef, "right")}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition text-gray-600 hover:text-blue-600"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        <div
          ref={govtRef}
          className="flex overflow-x-auto pb-6 -mx-2 scrollbar-hide"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex space-x-4 px-2">
            {govtColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </div>

      {/* Private Colleges Section */}
      <div className="max-w-7xl mx-auto mb-16 relative group">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium mr-3">
              Private
            </span>
            <h3 className="text-xl font-semibold text-gray-800">
              Top Private Medical Colleges
            </h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll(privateRef, "left")}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition text-gray-600 hover:text-purple-600"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll(privateRef, "right")}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition text-gray-600 hover:text-purple-600"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        <div
          ref={privateRef}
          className="flex overflow-x-auto pb-6 -mx-2 scrollbar-hide"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex space-x-4 px-2">
            {privateColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-8 mb-16 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: "150+", label: "Medical Colleges", sublabel: "Across India", color: "blue" },
            { value: "90%", label: "Placement Rate", sublabel: "Top Institutions", color: "purple" },
            { value: "₹8-15 LPA", label: "Average Package", sublabel: "For Top Graduates", color: "green" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 hover:bg-gray-50 rounded-lg transition">
              <div className={`text-4xl font-bold mb-2 ${
                stat.color === "blue" ? "text-blue-600" : 
                stat.color === "purple" ? "text-purple-600" : "text-green-600"
              }`}>
                {stat.value}
              </div>
              <div className="text-lg font-medium text-gray-700">{stat.label}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
          <CtaSection/>

      {/* Brochure Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Download Brochure</h3>
                <button
                  onClick={handleModalClose}
                  className="text-white hover:text-gray-200 transition"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="mt-1 text-blue-100 text-sm">{selectedCollege?.name}</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-md font-medium hover:from-blue-700 hover:to-blue-800 transition text-sm"
                >
                  Download Now
                </button>
              </form>
            </div>
            <div className="bg-gray-50 px-6 py-3 text-center">
              <p className="text-xs text-gray-500">
                We'll send the brochure to your email and WhatsApp
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
