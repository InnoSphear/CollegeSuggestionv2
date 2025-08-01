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
    courses: "",
    logo: "",
    overview: "",
    coursesAndFees: "",
    amenities: "",
    cutoff: {
      mbbs: "",
      md: "",
      bds: ""
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
    } else if (name.startsWith("cutoff.")) {
      const cutoffField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        cutoff: {
          ...prev.cutoff,
          [cutoffField]: value
        }
      }));
    } else if (name.startsWith("faculty.")) {
      const facultyField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        faculty: {
          ...prev.faculty,
          [facultyField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: parseInt(formData.id),
      courses: formData.courses.split(",").map(c => c.trim()),
      amenities: formData.amenities.split(",").map(a => a.trim()),
      coursesAndFees: formData.coursesAndFees.split(",").map(cf => {
        const [name, duration, totalFees, seats, level] = cf.split("|").map(item => item.trim());
        return { name, duration, totalFees, seats: parseInt(seats), level };
      }),
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
      setFormData({
        id: "",
        name: "",
        slug: "",
        ownership: "",
        established: "",
        state: "",
        city: "",
        category: "",
        courses: "",
        logo: "",
        overview: "",
        coursesAndFees: "",
        amenities: "",
        cutoff: {
          mbbs: "",
          md: "",
          bds: ""
        },
        faculty: {
          total: "",
          studentRatio: ""
        }
      });
      setEditingId(null);
      fetchColleges();
    } catch (err) {
      console.error("Error submitting college:", err);
      alert("Error submitting college. Please check console for details.");
    }
  };

  const handleEdit = (college) => {
    setFormData({
      ...college,
      courses: (college.courses || []).join(", "),
      amenities: (college.amenities || []).join(", "),
      coursesAndFees: (college.coursesAndFees || []).map(cf => 
        `${cf.name}|${cf.duration}|${cf.totalFees}|${cf.seats}|${cf.level}`
      ).join(", "),
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
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2"
            />
          </div>
        </div>

        {/* Courses & Amenities */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Courses & Amenities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="courses"
              placeholder="Courses (comma separated)"
              value={formData.courses}
              onChange={handleChange}
              className="border p-2"
            />
            <input
              name="amenities"
              placeholder="Amenities (comma separated)"
              value={formData.amenities}
              onChange={handleChange}
              className="border p-2"
            />
            <div className="md:col-span-2">
              <textarea
                name="coursesAndFees"
                placeholder="Courses & Fees (format: name|duration|fees|seats|level, separated by commas)"
                value={formData.coursesAndFees}
                onChange={handleChange}
                className="border p-2 w-full"
                rows={3}
              />
            </div>
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
                rows={3}
              />
            </div>
          </div>
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
              placeholder="Student Ratio"
              value={formData.faculty.studentRatio}
              onChange={handleChange}
              className="border p-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
        >
          {editingId ? "Update College" : "Add College"}
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">All Colleges</h2>
        {colleges.length === 0 ? (
          <p>No colleges found.</p>
        ) : (
          <ul className="space-y-4">
            {colleges.map((college) => (
              <li
                key={college._id}
                className="border p-4 rounded shadow flex flex-col md:flex-row justify-between gap-4"
              >
                <div>
                  <h3 className="text-xl font-bold">{college.name}</h3>
                  <p className="text-sm text-gray-500">ID: {college.id} | Slug: {college.slug}</p>
                  <p className="text-sm text-gray-700">{college.overview}</p>
                  <p className="text-sm">City: {college.city}, State: {college.state}</p>
                  <p className="text-sm">Courses: {(college.courses || []).join(", ")}</p>
                  <p className="text-sm">MBBS Cutoff: {college.cutoff?.mbbs || 'N/A'}</p>
                  {college.logo && (
                    <img src={college.logo} alt={college.name} className="w-32 mt-2 rounded" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPage;