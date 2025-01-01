/**
 * Author: @Nirmal
 *
 * EditContractModal component provides a modal to edit an existing contract's details.
 * It includes validation to ensure that the client name is provided and meets a minimum length requirement.
 * The modal background and input colors adjust based on dark mode setting.
 */

import React, { useState } from 'react';

const EditContractModal = ({ contract, onClose, onSave, isDarkMode }) => {
  const [formData, setFormData] = useState(contract);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client Name is required.';
    } else if (formData.clientName.length < 3) {
      newErrors.clientName = 'Client Name must be at least 3 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const inputBgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const inputTextColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';

  return (
    <div
      className={`fixed inset-0 ${bgColor} bg-opacity-75 flex justify-center items-center`}
    >
      <div className={`${bgColor} p-6 rounded-lg w-1/3`}>
        <h2 className={`text-lg font-bold mb-4 ${textColor}`}>Edit Contract</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="clientName"
              className={`block text-sm font-medium ${textColor}`}
            >
              Client Name
            </label>
            <input
              id="clientName"
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className={`${inputBgColor} ${inputTextColor} ${borderColor} border w-full p-2 mt-1 rounded`}
            />
            {errors.clientName && (
              <p className="text-red-500 text-sm">{errors.clientName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className={`block text-sm font-medium ${textColor}`}
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`${inputBgColor} ${inputTextColor} ${borderColor} border w-full p-2 mt-1 rounded`}
            >
              <option value="Draft">Draft</option>
              <option value="Finalized">Finalized</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-3 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContractModal;
