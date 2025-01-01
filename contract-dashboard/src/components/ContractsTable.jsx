/**
 * Author: @Nirmal
 *
 * ContractsTable component renders a table to display contract details such as ID, client name, and status.
 * It allows the user to edit a contract, and applies different styles based on the dark mode setting.
 */

import React from 'react';

const ContractsTable = ({ contracts, onEdit, darkMode }) => (
  <div className="flex items-center justify-center min-h-fit">
    <div className="w-full max-w-full overflow-x-auto">
      <table
        className={`w-full border-collapse border ${
          darkMode ? 'border-gray-700' : 'border-gray-300'
        }`}
      >
        <thead
          className={`${
            darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-200'
          }`}
        >
          <tr>
            <th className="p-2 border">Contract ID</th>
            <th className="p-2 border">Client Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr
              key={contract.id}
              className={`text-center ${
                darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'
              }`}
            >
              <td className="p-2 border">{contract.id}</td>
              <td className="p-2 border">{contract.clientName}</td>
              <td className="p-2 border">{contract.status}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => onEdit(contract)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ContractsTable;
