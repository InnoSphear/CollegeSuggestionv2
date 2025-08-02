import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [colleges, setColleges] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    slug: "",
    ownership: "",
    established: "",
    state: "",
    city: "",
    category: "",
    courses: [],
    logo: "",
    overview: "",
    coursesAndFees: [],
    placements: {
      averagePackage: "",
      graduationPercentage: {
        ug: [],
        pg: [],
        years: []
      }
    },
    amenities: [],
    cutoff: {
      mbbs: "",
      md: "",
      bds: "",
      mds: "",
      mpharm: ""
    },
    faculty: {
      total: "",
      studentRatio: ""
    }
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const BASE_URL = "https://backend-college-suggestion.onrender.com/api/colleges";

  const fetchColleges = async () => {
    try {
      const res = await axios.get(`${BASE_URL}`);
      setColleges(res.data.colleges);
    } catch (err) {
      console.error("Error fetching colleges:", err);
    }
  };

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsLoggedIn(true);
      fetchColleges();
    }
  }, []);

  const generateSlug = (name) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "name") {
      setFormData(prev => ({ ...prev, name: value, slug: generateSlug(value) }));
    } else if (name.startsWith("placements.")) {
      const [_, field] = name.split(".");
      setFormData(prev => ({
        ...prev,
        placements: {
          ...prev.placements,
          [field]: value
        }
      }));
    } else if (name.startsWith("cutoff.")) {
      const [_, field] = name.split(".");
      setFormData(prev => ({
        ...prev,
        cutoff: {
          ...prev.cutoff,
          [field]: value
        }
      }));
    } else if (name.startsWith("faculty.")) {
      const [_, field] = name.split(".");
      setFormData(prev => ({
        ...prev,
        faculty: {
          ...prev.faculty,
          [field]: value
        }
      }));
    } else if (name === "courses" || name === "amenities") {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(",").map(item => item.trim())
      }));
    } else if (name === "graduationPercentage.ug" || name === "graduationPercentage.pg" || name === "graduationPercentage.years") {
      const [_, field] = name.split(".");
      setFormData(prev => ({
        ...prev,
        placements: {
          ...prev.placements,
          graduationPercentage: {
            ...prev.placements.graduationPercentage,
            [field]: value.split(",").map(item => parseFloat(item.trim()))
          }
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCourseFeeChange = (index, field, value) => {
    const updatedCoursesAndFees = [...formData.coursesAndFees];
    updatedCoursesAndFees[index] = {
      ...updatedCoursesAndFees[index],
      [field]: field === "seats" ? parseInt(value) : value
    };
    setFormData(prev => ({
      ...prev,
      coursesAndFees: updatedCoursesAndFees
    }));
  };

  const addCourseFee = () => {
    setFormData(prev => ({
      ...prev,
      coursesAndFees: [
        ...prev.coursesAndFees,
        { name: "", duration: "", totalFees: "", seats: "", level: "" }
      ]
    }));
  };

  const removeCourseFee = (index) => {
    const updatedCoursesAndFees = [...formData.coursesAndFees];
    updatedCoursesAndFees.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      coursesAndFees: updatedCoursesAndFees
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: parseInt(formData.id),
      faculty: {
        total: parseInt(formData.faculty.total),
        studentRatio: formData.faculty.studentRatio
      }
    };
    
    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/${editingId}`, payload);
      } else {
        await axios.post(`${BASE_URL}`, payload);
      }
      resetForm();
      fetchColleges();
    } catch (err) {
      console.error("Error submitting college:", err);
      alert("Error submitting college. Please check console for details.");
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      slug: "",
      ownership: "",
      established: "",
      state: "",
      city: "",
      category: "",
      courses: [],
      logo: "",
      overview: "",
      coursesAndFees: [],
      placements: {
        averagePackage: "",
        graduationPercentage: {
          ug: [],
          pg: [],
          years: []
        }
      },
      amenities: [],
      cutoff: {
        mbbs: "",
        md: "",
        bds: "",
        mds: "",
        mpharm: ""
      },
      faculty: {
        total: "",
        studentRatio: ""
      }
    });
    setEditingId(null);
  };

  const handleEdit = (college) => {
    setFormData({
      ...college,
      courses: college.courses || [],
      amenities: college.amenities || [],
      coursesAndFees: college.coursesAndFees || [],
      placements: college.placements || {
        averagePackage: "",
        graduationPercentage: {
          ug: [],
          pg: [],
          years: []
        }
      },
      cutoff: college.cutoff || {
        mbbs: "",
        md: "",
        bds: "",
        mds: "",
        mpharm: ""
      },
      faculty: {
        total: college.faculty?.total?.toString() || "",
        studentRatio: college.faculty?.studentRatio || ""
      }
    });
    setEditingId(college.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this college?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchColleges();
    } catch (err) {
      console.error("Error deleting college:", err);
      alert("Error deleting college. Please check console for details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsLoggedIn(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === "Admincollege" && loginData.password === "Admin@123") {
      localStorage.setItem("adminAuth", "true");
      setIsLoggedIn(true);
      fetchColleges();
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            className="w-full border p-2"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full border p-2"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Page - Manage Colleges</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow mb-10"
      >
        {/* Basic Info */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="id"
              placeholder="ID (Number)"
              value={formData.id}
              onChange={handleChange}
              className="border p-2"
              type="number"
              required
            />
            <input
              name="name"
              placeholder="College Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2"
              required
            />
            <input
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              className="border p-2 bg-gray-100"
              readOnly
            />
            <select
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
              className="border p-2"
              required
            >
              <option value="">Select Ownership</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
            <input
              name="established"
              placeholder="Established Year"
              value={formData.established}
              onChange={handleChange}
              className="border p-2"
              required
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border p-2"
              required
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-2"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2"
              required
            >
              <option value="">Select Category</option>
              <option value="Medical">Medical</option>
              <option value="Dental">Dental</option>
              <option value="Pharma">Pharma</option>
            </select>
          </div>
        </div>

        {/* Courses */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Courses</h3>
          <input
            name="courses"
            placeholder="Courses (comma separated)"
            value={formData.courses.join(", ")}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Courses & Fees */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Courses & Fees</h3>
          <div className="space-y-4">
            {formData.coursesAndFees.map((course, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
                <input
                  placeholder="Course Name"
                  value={course.name}
                  onChange={(e) => handleCourseFeeChange(index, "name", e.target.value)}
                  className="border p-2"
                />
                <input
                  placeholder="Duration"
                  value={course.duration}
                  onChange={(e) => handleCourseFeeChange(index, "duration", e.target.value)}
                  className="border p-2"
                />
                <input
                  placeholder="Total Fees"
                  value={course.totalFees}
                  onChange={(e) => handleCourseFeeChange(index, "totalFees", e.target.value)}
                  className="border p-2"
                />
                <input
                  placeholder="Seats"
                  type="number"
                  value={course.seats}
                  onChange={(e) => handleCourseFeeChange(index, "seats", e.target.value)}
                  className="border p-2"
                />
                <select
                  value={course.level}
                  onChange={(e) => handleCourseFeeChange(index, "level", e.target.value)}
                  className="border p-2"
                >
                  <option value="">Select Level</option>
                  <option value="UG">UG</option>
                  <option value="PG">PG</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeCourseFee(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCourseFee}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Course & Fee
            </button>
          </div>
        </div>

        {/* Placements */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Placements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="placements.averagePackage"
              placeholder="Average Package"
              value={formData.placements.averagePackage}
              onChange={handleChange}
              className="border p-2"
            />
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="graduationPercentage.ug"
                placeholder="UG % (comma separated)"
                value={formData.placements.graduationPercentage.ug.join(", ")}
                onChange={handleChange}
                className="border p-2"
              />
              <input
                name="graduationPercentage.pg"
                placeholder="PG % (comma separated)"
                value={formData.placements.graduationPercentage.pg.join(", ")}
                onChange={handleChange}
                className="border p-2"
              />
              <input
                name="graduationPercentage.years"
                placeholder="Years (comma separated)"
                value={formData.placements.graduationPercentage.years.join(", ")}
                onChange={handleChange}
                className="border p-2"
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Amenities</h3>
          <input
            name="amenities"
            placeholder="Amenities (comma separated)"
            value={formData.amenities.join(", ")}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Cutoff */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Cutoff Scores</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="cutoff.mbbs"
              placeholder="MBBS Cutoff"
              value={formData.cutoff.mbbs}
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="cutoff.md"
              placeholder="MD Cutoff"
              value={formData.cutoff.md}
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="cutoff.bds"
              placeholder="BDS Cutoff"
              value={formData.cutoff.bds}
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="cutoff.mds"
              placeholder="MDS Cutoff"
              value={formData.cutoff.mds}
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="cutoff.mpharm"
              placeholder="MPharm Cutoff"
              value={formData.cutoff.mpharm}
              onChange={handleChange}
              className="border p-2"
            />
          </div>
        </div>

        {/* Faculty */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Faculty Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="faculty.total"
              placeholder="Total Faculty"
              value={formData.faculty.total}
              onChange={handleChange}
              className="border p-2"
              type="number"
            />
            <input
              name="faculty.studentRatio"
              placeholder="Student Ratio (e.g., 1:8)"
              value={formData.faculty.studentRatio}
              onChange={handleChange}
              className="border p-2"
            />
          </div>
        </div>

        {/* Media & Overview */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Media & Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="logo"
              placeholder="Logo URL"
              value={formData.logo}
              onChange={handleChange}
              className="border p-2"
            />
            <div className="md:col-span-2">
              <textarea
                name="overview"
                placeholder="Overview"
                value={formData.overview}
                onChange={handleChange}
                className="border p-2 w-full"
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-between">
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update College" : "Add College"}
          </button>
        </div>
      </form>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">All Colleges</h2>
        {colleges.length === 0 ? (
          <p>No colleges found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">City</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college) => (
                  <tr key={college.id} className="border-t">
                    <td className="py-2 px-4 border">{college.id}</td>
                    <td className="py-2 px-4 border">{college.name}</td>
                    <td className="py-2 px-4 border">{college.category}</td>
                    <td className="py-2 px-4 border">{college.city}</td>
                    <td className="py-2 px-4 border">
                      <div className="flex space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                          onClick={() => handleEdit(college)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(college.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
