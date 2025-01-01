/**
 * Author: @Nirmal
 *
 * Main component that displays and manages the contract dashboard, including:
 * - Displaying a list of contracts
 * - Searching through contracts by client name
 * - Filtering contracts by status (All, Draft, Finalized)
 * - Sorting contracts by client name or status
 * - Editing and adding contracts
 * - Toggling dark mode
 */

import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import FilterBar from './components/FilterBar';
import EditContractModal from './components/EditContractModal';
import AddContractModal from './components/AddContractModal';
import ContractsTable from './components/ContractsTable';
import { fetchContracts, addContract, updateContract } from './data/contracts';

const App = () => {
  // State variables to manage contracts, search term, filter, sorting, and modal visibility
  const [contracts, setContracts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // Default to 'All'
  const [sortBy, setSortBy] = useState('clientName'); // Default sorting by clientName
  const [editingContract, setEditingContract] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch contracts on initial render
  useEffect(() => {
    fetchContracts().then(setContracts);
  }, []);

  // Handle search input change
  const handleSearch = (term) => setSearchTerm(term);

  // Handle status filter change
  const handleStatusFilter = (filter) => setStatusFilter(filter);

  // Handle sorting change
  const handleSortChange = (sort) => setSortBy(sort);

  // Filter contracts based on the search term and status filter
  const filteredContracts = contracts
    .filter((contract) =>
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((contract) =>
      statusFilter === 'All' ? true : contract.status === statusFilter
    );

  // Sort contracts based on the selected sort option (clientName or status)
  const sortedContracts = filteredContracts.sort((a, b) => {
    if (sortBy === 'clientName') {
      return a.clientName.localeCompare(b.clientName);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  // Handle saving updated contract
  const handleSaveContract = (updatedContract) => {
    setContracts((prevContracts) =>
      prevContracts.map((contract) =>
        contract.id === updatedContract.id ? updatedContract : contract
      )
    );
    setEditingContract(null); // Close the edit modal
    updateContract(updatedContract.id, updatedContract); // Update contract data in the "database"
  };

  // Handle adding a new contract
  const handleAddContract = (newContract) => {
    addContract(newContract); // Add contract to the "database"
    fetchContracts().then(setContracts); // Refresh the contracts list
    setIsAddModalOpen(false); // Close the add contract modal
  };

  // Handle opening the edit modal for a contract
  const handleEditContract = (contract) => {
    setEditingContract(contract);
    setIsAddModalOpen(false); // Close the add contract modal if open
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div
        className={`w-full max-w-full max-h-max p-6 rounded-lg shadow-lg ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Heading and Dark Mode Toggle on the same line */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl font-bold text-center w-full ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            style={{ marginLeft: '100px' }}
          >
            Dynamic Contract Dashboard
          </h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Filter Bar for searching, filtering, and sorting contracts */}
        <FilterBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          darkMode={darkMode}
          onStatusFilter={handleStatusFilter}
          onSortChange={handleSortChange}
        />

        {/* Button to open the Add Contract Modal */}
        <div className="mb-6 flex justify-center items-center">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200"
            onClick={() => {
              setIsAddModalOpen(true);
              setEditingContract(null); // Close the edit modal if open
            }}
          >
            Add New Contract
          </button>
        </div>

        {/* Contracts Table to display the filtered and sorted list of contracts */}
        <ContractsTable
          contracts={sortedContracts}
          onEdit={handleEditContract}
          darkMode={darkMode}
        />
      </div>

      {/* Edit Contract Modal */}
      {editingContract && (
        <EditContractModal
          contract={editingContract}
          onClose={() => setEditingContract(null)}
          onSave={handleSaveContract}
          isDarkMode={darkMode}
        />
      )}

      {/* Add Contract Modal */}
      {isAddModalOpen && (
        <AddContractModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddContract}
          isDarkMode={darkMode}
        />
      )}
    </div>
  );
};

export default App;
