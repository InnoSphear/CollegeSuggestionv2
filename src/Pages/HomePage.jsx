import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Carousel from "../components/Carousel";
import CareerSection from "../components/CareerSection";
import Modal from "react-modal";
import Slider from "react-slick";
import collegesData from "./collegesData.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Modal.setAppElement("#root");

const CollegeCard = ({ college, openForm }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mx-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex justify-center items-center h-20 mb-4">
      <img
        src={college.logo}
        alt={college.name}
        className="max-h-full max-w-full object-contain"
      />
    </div>
    <h3 className="text-lg font-semibold text-center text-gray-800 line-clamp-2">
      {college.name}
    </h3>
    <p className="text-sm text-center text-gray-500 mt-1">
      {college.city}, {college.state}
    </p>
    <div className="mt-2 flex justify-center items-center space-x-2">
      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
        {college.category}
      </span>
      <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded">
        {college.placements?.averagePackage || "N/A"} LPA
      </span>
    </div>
    <button
      onClick={() => openForm(college)}
      className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300"
    >
      Download Brochure
    </button>
  </div>
);

const HomePage = () => {
  const colleges = collegesData.colleges;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", number: "" });
  const [selectedCollege, setSelectedCollege] = useState(null);

  const openForm = (college) => {
    setSelectedCollege(college);
    setFormData({ name: "", number: "" });
    setModalIsOpen(true);
  };

  const handleFormSubmit = () => {
    console.log("Submitted:", formData, "For college:", selectedCollege?.name);
    setModalIsOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 mt-20 w-full">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-5 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-10 lg:py-16">
          {/* Left */}
          <div className="w-full lg:w-1/2 space-y-4 text-center lg:ml-18 lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your College <br /> Decision, Informed <br /> and Assured
            </h1>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-lg mx-auto lg:mx-0">
              Search with confidence for colleges & courses backed by verified data on
              <span className="font-semibold"> Placements, Median Salary, Career Outcomes, Diversity, Faculty Excellence</span> and more.
            </p>
            <div className="mt-5 flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md focus-within:border-blue-500 transition-all max-w-md mx-auto lg:mx-0">
              <IoMdSearch className="text-gray-500 text-2xl" />
              <input
                placeholder="Search for colleges, courses..."
                type="search"
                className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <img
              className="w-[70%] sm:w-[300px] md:w-[400px] lg:w-[480px] xl:w-[520px] object-contain"
              src="https://png.pngtree.com/png-vector/20240309/ourmid/pngtree-medical-student-vector-concept-black-illustration-png-image_11905027.png"
              alt="College Stats"
            />
          </div>
        </div>
      </section>

      {/* Hero Carousel (Optional) */}
      <Carousel />

      {/* College Cards Carousel */}
      <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Top Colleges at a Glance
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Explore our curated selection of premier institutions with outstanding placement records
          </p>
          
          <div className="relative">
            <Slider {...sliderSettings}>
              {colleges.map((college) => (
                <div key={college.id} className="px-2">
                  <CollegeCard college={college} openForm={openForm} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Career Section */}
      <CareerSection />

      {/* Modal for Brochure Form */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md mx-auto mt-24 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Download Brochure - {selectedCollege?.name}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-between gap-4 pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2 rounded-md font-medium transition-all duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md font-medium transition-all duration-300"
              onClick={() => setModalIsOpen(false)}
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default HomePage;