import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaMapMarkerAlt, FaBookOpen } from "react-icons/fa";

const CareerSection = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore Career Pathways
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your ideal academic journey with our curated selection of top institutions, 
            locations, and programs across India
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Colleges Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaGraduationCap className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Premier Institutions
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  { name: "Engineering Colleges", path: "/colleges/engineering" },
                  { name: "Medical Colleges", path: "/colleges/medical" },
                  { name: "Dental Colleges", path: "/colleges/dental" },
                  { name: "Architecture Colleges", path: "/colleges/architecture" },
                  { name: "Pharmacy Colleges", path: "/colleges/pharmacy" },
                  { name: "IITs", path: "/colleges/iit" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.path} 
                      className="text-blue-600 hover:text-blue-800 transition flex items-center"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Locations Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Top Study Destinations
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Chennai", path: "/locations/chennai" },
                  { name: "Bangalore", path: "/locations/bangalore" },
                  { name: "Delhi", path: "/locations/delhi" },
                  { name: "Mumbai", path: "/locations/mumbai" },
                  { name: "Pune", path: "/locations/pune" },
                  { name: "Coimbatore", path: "/locations/coimbatore" },
                  { name: "Hyderabad", path: "/locations/hyderabad" },
                  { name: "Kolkata", path: "/locations/calcutta" },
                  { name: "Tamil Nadu", path: "/locations/tamil-nadu" },
                  { name: "Kerala", path: "/locations/kerala" }
                ].map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path}
                    className="text-green-600 hover:text-green-800 transition flex items-center"
                  >
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaBookOpen className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Academic Programs
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "CSE", path: "/courses/cse" },
                  { name: "ECE", path: "/courses/ece" },
                  { name: "IT", path: "/courses/it" },
                  { name: "Mechanical", path: "/courses/mechanical" },
                  { name: "Mechatronics", path: "/courses/mechatronics" },
                  { name: "Civil", path: "/courses/civil" },
                  { name: "Aeronautical", path: "/courses/aeronautical" },
                  { name: "Aerospace", path: "/courses/aerospace" },
                  { name: "Architecture", path: "/courses/architecture" },
                  { name: "AI & ML", path: "/courses/ai-ml" },
                  { name: "MBBS", path: "/courses/mbbs" },
                  { name: "Pharmacy", path: "/courses/pharmacy" }
                ].map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path}
                    className="text-purple-600 hover:text-purple-800 transition flex items-center"
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Need help choosing the right path?
          </h3>
          <Link 
            to="/career-counseling" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition shadow-md"
          >
            Get Career Guidance
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;