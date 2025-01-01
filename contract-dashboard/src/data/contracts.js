/**
 * Author: @Nirmal
 *
 * This module manages contracts by providing functions to fetch, add, and update contracts.
 * - fetchContracts returns the current list of contracts.
 * - addContract generates a new unique ID and adds the new contract to the list.
 * - updateContract updates an existing contract based on the provided ID.
 */

let contracts = [
  { id: 1, clientName: 'Acme Corp', status: 'Draft' },
  { id: 2, clientName: 'Globex', status: 'Draft' },
  { id: 3, clientName: 'Initech', status: 'Finalized' },
  { id: 4, clientName: 'Umbrella Corp', status: 'Draft' },
  { id: 5, clientName: 'Wayne Enterprises', status: 'Finalized' },
  { id: 6, clientName: 'Stark Industries', status: 'Draft' },
];

export const fetchContracts = () =>
  new Promise((resolve) => setTimeout(() => resolve([...contracts]), 500));

export const addContract = (newContract) => {
  // Get the highest current ID and increment by 1
  const newId =
    contracts.length > 0
      ? Math.max(...contracts.map((contract) => contract.id)) + 1
      : 1;
  console.log('Generated new contract ID:', newId); // Debugging line to check the ID
  contracts = [...contracts, { ...newContract, id: newId }];
};

export const updateContract = (id, updatedData) => {
  contracts = contracts.map((contract) =>
    contract.id === id ? { ...contract, ...updatedData } : contract
  );
};
