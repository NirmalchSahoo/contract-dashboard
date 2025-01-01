/**
 * Author: @Nirmal
 *
 * FilterBar component that allows the user to:
 * - Search contracts by client name.
 * - Filter contracts by status (All, Draft, Finalized).
 * - Sort contracts by client name or status.
 * It accepts the search term, functions to handle search, status filtering, and sorting updates,
 * as well as a flag for dark mode styling.
 */

import React from 'react';

const FilterBar = ({
  searchTerm,
  onSearch,
  darkMode,
  onStatusFilter,
  onSortChange,
}) => (
  <div className="flex w-full justify-center items-center mb-4">
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search by client name..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)} // Update search term on change
      className={`border p-2 rounded w-1/2 ${
        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
      }`} // Apply styles based on dark mode
    />

    {/* Status Filter Dropdown */}
    <select
      onChange={(e) => onStatusFilter(e.target.value)}
      className={`ml-4 border p-2 rounded ${
        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <option value="All">All Statuses</option>
      <option value="Draft">Draft</option>
      <option value="Finalized">Finalized</option>
    </select>

    {/* Sort Dropdown */}
    <select
      onChange={(e) => onSortChange(e.target.value)}
      className={`ml-4 border p-2 rounded ${
        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <option value="clientName">Sort by Client Name</option>
      <option value="status">Sort by Status</option>
    </select>
  </div>
);

export default FilterBar;
