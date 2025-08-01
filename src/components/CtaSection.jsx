import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const CtaSection = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted with:", formData)
    // Here you would typically send data to your backend
    setModalOpen(false)
    setFormData({ name: "", phone: "" })
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-16 border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Need help choosing the right college?
        </h3>
        <p className="text-gray-600 mb-6">
          Our education experts can guide you to find the perfect institution
          for your medical career
        </p>
        <button 
          onClick={() => setModalOpen(true)}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-sm text-sm"
        >
          Get Personalized Counseling
        </button>
      </div>

      {/* Brochure Form Modal - Same as in your carousel */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Personalized Counseling</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-white hover:text-gray-200 transition"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="mt-1 text-blue-100 text-sm">
                Our expert will contact you shortly
              </p>
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
                  Request Call Back
                </button>
              </form>
            </div>
            <div className="bg-gray-50 px-6 py-3 text-center">
              <p className="text-xs text-gray-500">
                Our counselor will contact you within 24 hours
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CtaSection