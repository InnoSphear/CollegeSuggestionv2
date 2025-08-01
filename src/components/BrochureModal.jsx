import React from "react";
import CollegeCard from "./CollegeCard";

const BrochureModal = ({ modalOpen, setModalOpen, formData, setFormData, handleSubmit }) => {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold text-center">Download Brochure</h2>
        <form onSubmit={(e)=>{e.preventDefault(); ;
          if(!formData.name || !formData.phone){
            alert("Please enter your name and phone number");
            return;
          }
          handleSubmit();
        }} className="space-y-4">
        Full Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        Phone Number
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 text-gray-700 hover:text-black"
          >
            Cancel
          </button>
          <button
            // onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default BrochureModal;

