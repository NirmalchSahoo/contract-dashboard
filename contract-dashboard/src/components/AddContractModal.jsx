/**
 * Author: @Nirmal
 *
 * AddContractModal component displays a modal to add a new contract with a form to input client name and status.
 * The form validates input and calls the onAdd callback to save the contract data.
 * The modal background and input colors adjust based on dark mode setting.
 */

import React, { useState } from 'react';

const AddContractModal = ({ isOpen, onClose, onAdd, isDarkMode }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    status: 'Draft',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client Name is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (validateForm()) {
      onAdd(formData);
      setFormData({ clientName: '', status: 'Draft' });
    }
  };

  const modalBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const inputBgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const placeholderColor = isDarkMode
    ? 'placeholder-gray-400'
    : 'placeholder-gray-600';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${modalBgColor} ${textColor} rounded-lg p-6 w-96 shadow-lg`}
      >
        <h2 className="text-lg font-bold mb-4">Add New Contract</h2>
        <div className="mb-4">
          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            value={formData.clientName}
            onChange={handleChange}
            className={`${inputBgColor} ${textColor} ${borderColor} ${placeholderColor} border px-4 py-2 rounded w-full`}
          />
          {errors.clientName && (
            <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
          )}
        </div>
        <div className="mb-4">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`${inputBgColor} ${textColor} ${borderColor} border px-4 py-2 rounded w-full`}
          >
            <option value="Draft">Draft</option>
            <option value="Finalized">Finalized</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContractModal;
