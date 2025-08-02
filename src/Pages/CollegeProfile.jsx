import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { FaMapMarkerAlt, FaClock, FaCheck, FaChevronRight, FaGraduationCap, FaRupeeSign, FaUsers, FaChartLine } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { MdWork, MdLibraryBooks, MdPeople, MdQuestionAnswer } from 'react-icons/md';

const CollegeProfile = () => {
  const { collegeSlug } = useParams();
  const [college, setCollege] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "https://backend-college-suggestion.onrender.com/api/colleges";

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        const foundCollege = response.data.colleges.find(
          c => c.slug === collegeSlug || slugify(c.name) === collegeSlug
        );
        
        if (!foundCollege) {
          navigate('/not-found');
          return;
        }
        
        setCollege(foundCollege);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching college:", err);
        setError("Failed to load college data. Please try again later.");
        setLoading(false);
      }
    };

    fetchCollege();
  }, [collegeSlug, navigate]);

  const slugify = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  // Prepare data for charts
  const graduationData = college?.placements?.graduationPercentage?.years?.map((year, index) => ({
    year,
    ug: college.placements.graduationPercentage.ug[index],
    pg: college.placements.graduationPercentage.pg[index]
  })) || [];

  const tabs = [
    { name: 'Overview', icon: <MdLibraryBooks className="mr-2" /> },
    { name: 'Course & Fees', icon: <FaRupeeSign className="mr-2" /> },
    { name: 'Placements', icon: <MdWork className="mr-2" /> },
    { name: 'Student Strength', icon: <FaUsers className="mr-2" /> },
    { name: 'Admission', icon: <IoMdSchool className="mr-2" /> },
    { name: 'Amenities', icon: <FaCheck className="mr-2" /> },
    { name: 'Cutoff', icon: <FaChartLine className="mr-2" /> },
    { name: 'Faculty', icon: <MdPeople className="mr-2" /> },
    { name: 'Review', icon: <FaGraduationCap className="mr-2" /> },
    { name: 'Q&A', icon: <MdQuestionAnswer className="mr-2" /> }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!college) return null;

  return (
    <div className="bg-gray-50 min-h-screen mt-24">
      {/* Header with college image */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-indigo-700 h-48 md:h-64 w-full">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{college.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-blue bg-opacity-20 backdrop-blur-sm">
                {college.ownership}
              </span>
              <span className="flex items-center text-sm md:text-base">
                <FaMapMarkerAlt className="mr-1.5" /> {college.city}, {college.state}
              </span>
              {college.ranking?.nirf && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 backdrop-blur-sm">
                  NIRF Rank: #{college.ranking.nirf}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <div className="flex items-center">
                  <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Home
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link to="/medical" className="ml-2 text-indigo-600 hover:text-indigo-800 font-medium">
                    Medical Colleges
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-500 font-medium">{college.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
            <div className="text-center p-3 border-r border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Established</p>
              <p className="text-lg font-bold text-indigo-700">{college.established}</p>
            </div>
            <div className="text-center p-3 border-r border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Courses</p>
              <p className="text-lg font-bold text-indigo-700">{college.courses?.length || 0}</p>
            </div>
            <div className="text-center p-3 border-r border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Approved By</p>
              <p className="text-lg font-bold text-indigo-700">{college.approvedBy || 'N/A'}</p>
            </div>
            <div className="text-center p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Campus Size</p>
              <p className="text-lg font-bold text-indigo-700">{college.campusSize || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-sm sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-4 py-4 font-medium text-sm border-b-2 transition-colors duration-200 whitespace-nowrap flex items-center ${
                  activeTab === tab.name
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'Overview' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {college.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{college.overview || 'No overview available.'}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Key Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-indigo-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="ml-2 text-gray-700">Established in {college.established}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-indigo-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="ml-2 text-gray-700">{college.ownership} ownership</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-indigo-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="ml-2 text-gray-700">Located in {college.city}, {college.state}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-indigo-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="ml-2 text-gray-700">Offers {college.courses?.length || 0} courses</span>
                    </li>
                    {college.ranking?.nirf && (
                      <li className="flex items-start">
                        <span className="flex-shrink-0 h-6 w-6 text-indigo-600 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="ml-2 text-gray-700">NIRF Rank: #{college.ranking.nirf}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Infrastructure & Facilities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {(college.amenities || []).slice(0, 6).map((amenity, index) => (
                      <div key={index} className="bg-indigo-50 p-3 rounded-lg flex items-center">
                        <div className="p-1.5 rounded-full bg-indigo-100 text-indigo-700">
                          <FaCheck className="text-sm" />
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-700">{amenity}</span>
                      </div>
                    ))}
                    {college.amenities?.length > 6 && (
                      <div className="bg-gray-50 p-3 rounded-lg flex items-center">
                        <span className="text-sm font-medium text-gray-700">
                          +{college.amenities.length - 6} more
                        </span>
                      </div>
                    )}
                    {(!college.amenities || college.amenities.length === 0) && (
                      <div className="col-span-2 text-gray-500 text-center py-4">
                        No amenities information available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses & Fees Tab */}
        {activeTab === 'Course & Fees' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Courses Offered</h2>
              <p className="text-gray-600 mb-6">
                {college.name} offers {college.courses?.length || 0} courses at UG and PG levels. 
                Below are the details about the courses, fees, duration and eligibility.
              </p>
              
              <div className="space-y-5">
                {(college.coursesAndFees || []).map((course, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            course.level === 'UG' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {course.level}
                          </span>
                          <span className="flex items-center text-sm text-gray-500">
                            <FaClock className="mr-1.5" /> {course.duration || 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-0">
                        <span className="text-xl font-bold text-indigo-700">
                          {course.totalFees || 'Fees not available'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Seats</p>
                        <p className="mt-1 font-medium text-gray-900">{course.seats || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Eligibility</p>
                        <p className="mt-1 font-medium text-gray-900">
                          {course.eligibility || '10+2 with 50% marks'}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admission Criteria</p>
                        <p className="mt-1 font-medium text-gray-900">
                          {course.admissionCriteria || 'NEET Entrance Exam'}
                        </p>
                      </div>
                    </div>
                    
                    <button className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
                      View Detailed Fee Structure
                      <FaChevronRight className="ml-2 h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                {(!college.coursesAndFees || college.coursesAndFees.length === 0) && (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <div className="mx-auto h-24 w-24 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Course Information Not Available</h3>
                    <p className="mt-2 text-gray-600">We don't have course details for this college yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Placements Tab */}
        {activeTab === 'Placements' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Placement Statistics</h2>
              <p className="text-gray-600 mb-6">
                {college.name} has an active placement cell with an average package of {college.placements?.averagePackage || 'N/A'}.
                Below are the detailed placement statistics and trends over the years.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-indigo-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Highest Package</h3>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-indigo-700">
                      {college.placements?.highestPackage || 'N/A'}
                    </span>
                    {college.placements?.highestPackage && (
                      <span className="ml-2 text-green-600 flex items-center">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-1">12%</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Compared to last year</p>
                </div>
                
                <div className="bg-indigo-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Average Package</h3>
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-indigo-700">
                      {college.placements?.averagePackage || 'N/A'}
                    </span>
                    {college.placements?.averagePackage && (
                      <span className="ml-2 text-green-600 flex items-center">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-1">8%</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Compared to last year</p>
                </div>
              </div>
              
              {graduationData.length > 0 ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Graduation Percentage Trend</h3>
                    <div className="h-80 bg-gray-50 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={graduationData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="year" 
                            stroke="#6b7280" 
                            tick={{ fill: '#6b7280' }}
                          />
                          <YAxis 
                            stroke="#6b7280" 
                            tick={{ fill: '#6b7280' }}
                            domain={[0, 100]}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e5e7eb', 
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                              padding: '0.75rem'
                            }}
                            itemStyle={{ color: '#4f46e5' }}
                            labelStyle={{ fontWeight: '600', color: '#111827' }}
                          />
                          <Legend 
                            wrapperStyle={{ paddingTop: '1rem' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="ug" 
                            stroke="#4f46e5" 
                            strokeWidth={3}
                            dot={{ r: 5, stroke: '#4f46e5', strokeWidth: 2, fill: '#fff' }}
                            activeDot={{ r: 7, stroke: '#4f46e5', strokeWidth: 2, fill: '#fff' }}
                            name="UG Percentage" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="pg" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            dot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
                            activeDot={{ r: 7, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
                            name="PG Percentage" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Placement Data Not Available</h3>
                  <p className="mt-2 text-gray-600">We don't have placement statistics for this college yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Student Strength Tab */}
        {activeTab === 'Student Strength' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Strength</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Demographics</h3>
                  {college.studentStrength ? (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Students</p>
                        <p className="text-2xl font-bold text-indigo-700 mt-1">
                          {college.studentStrength.total || 'N/A'}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Male Students</p>
                        <p className="text-2xl font-bold text-indigo-700 mt-1">
                          {college.studentStrength.male || 'N/A'}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Female Students</p>
                        <p className="text-2xl font-bold text-indigo-700 mt-1">
                          {college.studentStrength.female || 'N/A'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <div className="mx-auto h-24 w-24 text-gray-400">
                        <FaUsers className="w-full h-full" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">Student Data Not Available</h3>
                      <p className="mt-2 text-gray-600">We don't have student strength information for this college yet.</p>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Student Ratio</h3>
                  {college.studentStrength ? (
                    <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                      {/* Placeholder for pie chart */}
                      <div className="text-center">
                        <div className="w-40 h-40 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                          <span className="text-indigo-700 font-bold">M:F Ratio</span>
                        </div>
                        <p className="text-gray-700">
                          {college.studentStrength.male || 'N/A'} : {college.studentStrength.female || 'N/A'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                      <div className="mx-auto h-24 w-24 text-gray-400">
                        <FaUsers className="w-full h-full" />
                      </div>
                      <p className="mt-4 text-gray-600">Student ratio data not available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admission Tab */}
        {activeTab === 'Admission' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Admission Process</h2>
              
              {college.admission ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Eligibility Criteria</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="list-disc pl-5 space-y-2">
                        {(college.admission.eligibility || []).map((item, index) => (
                          <li key={index} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Application Process</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ol className="list-decimal pl-5 space-y-3">
                        {(college.admission.process || []).map((step, index) => (
                          <li key={index} className="text-gray-700">
                            <span className="font-medium">{step.title}:</span> {step.description}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Dates</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {(college.admission.importantDates || []).map((date, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{date.event}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{date.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-400">
                    <IoMdSchool className="w-full h-full" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Admission Information Not Available</h3>
                  <p className="mt-2 text-gray-600">We don't have admission details for this college yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Amenities Tab */}
        {activeTab === 'Amenities' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">College Amenities</h2>
              
              {college.amenities && college.amenities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {college.amenities.map((amenity, index) => (
                    <div key={index} className="bg-indigo-50 p-4 rounded-lg flex items-start">
                      <div className="p-2 rounded-full bg-indigo-100 text-indigo-700 flex-shrink-0">
                        <FaCheck className="text-sm" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-800">{amenity}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {amenityDescriptions[amenity] || 'Available for students'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-400">
                    <FaCheck className="w-full h-full" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Amenities Information Not Available</h3>
                  <p className="mt-2 text-gray-600">We don't have amenities details for this college yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other Tabs - Placeholder Content */}
        {['Cutoff', 'Faculty', 'Review', 'Q&A'].includes(activeTab) && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{activeTab}</h2>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  {activeTab === 'Cutoff' && <FaChartLine className="w-full h-full" />}
                  {activeTab === 'Faculty' && <MdPeople className="w-full h-full" />}
                  {activeTab === 'Review' && <FaGraduationCap className="w-full h-full" />}
                  {activeTab === 'Q&A' && <MdQuestionAnswer className="w-full h-full" />}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{activeTab} Information</h3>
                <p className="mt-2 text-gray-600">
                  {activeTab === 'Cutoff' && 'Cutoff marks and trends will be displayed here.'}
                  {activeTab === 'Faculty' && 'Faculty details and qualifications will be displayed here.'}
                  {activeTab === 'Review' && 'Student and alumni reviews will be displayed here.'}
                  {activeTab === 'Q&A' && 'Questions and answers about the college will be displayed here.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Similar Colleges Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Similar Colleges</h2>
          <Link 
            to="/medical" 
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View all medical colleges
            <FaChevronRight className="ml-2 h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for similar colleges - in a real app, you would map through actual data */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="h-40 bg-indigo-100"></div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Similar College {item}</h3>
                <p className="text-gray-600 text-sm mb-3">City, State</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">NIRF Rank: #{item}00</span>
                  <Link 
                    to={`/college/similar-college-${item}`} 
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper object for amenity descriptions
const amenityDescriptions = {
  'Library': 'Well-stocked library with thousands of books and journals',
  'Hostel': 'Separate hostel facilities for boys and girls',
  'Sports': 'Excellent sports facilities including indoor and outdoor games',
  'Cafeteria': 'Clean and hygienic cafeteria serving quality food',
  'Hospital': 'College hospital with modern medical facilities',
  'Labs': 'Well-equipped laboratories for practical learning',
  'Auditorium': 'Spacious auditorium for events and seminars',
  'Wi-Fi': 'Campus-wide high-speed internet connectivity',
  'Gym': 'Fully-equipped gymnasium for students',
  'Transport': 'College bus service for easy commuting'
};

export default CollegeProfile;
