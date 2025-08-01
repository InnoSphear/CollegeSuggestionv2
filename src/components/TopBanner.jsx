// TopBanner.jsx
import React from "react";

const TopBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Top {} Medical Colleges
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Discover India's premier {} medical institutions with
            verified data on admissions, courses, and placements
          </p>
        </div>
        <img
          className="h-48 md:h-64 w-auto object-contain"
          src="https://medicaldialogues.in/h-upload/2022/06/06/180246-aiims-delhi.jpg"
          alt="Medical College"
        />
      </div>
    </div>
  );
};

export default TopBanner;
