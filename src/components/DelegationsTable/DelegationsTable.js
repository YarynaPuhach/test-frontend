import React, { useState, useEffect } from 'react';
import './DelegationsTable.css';

const DelegationsTable = () => {
  const [delegations, setDelegations] = useState([]);

  useEffect(() => {
    const fetchDelegations = async () => {
      try {
        const response = await fetch('https://test-backend-g0f7.onrender.com/api/delegations');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDelegations(data);
      } catch (error) {
        console.error('Error fetching delegations:', error);
      }
    };
    fetchDelegations();
  }, []);

  return (
    <div className="delegations-table">
      <h2>Tabela Delegacji BD</h2>
      <table className="delegations-table-table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Imię i Nazwisko</th>
            <th>Data od:</th>
            <th>Data do:</th>
            <th>Miejsce wyjazdu:</th>
            <th>Miejsce przyjazdu:</th>
          </tr>
        </thead>
        <tbody>
          {delegations.map((delegation, index) => (
            <tr key={delegation.id}>
              <td>{index + 1}</td>
              <td>{delegation.fullName}</td>
              <td>{new Date(delegation.dateFrom).toLocaleDateString()}</td>
              <td>{new Date(delegation.dateTo).toLocaleDateString()}</td>
              <td>{delegation.departureLocation}</td>
              <td>{delegation.arrivalLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DelegationsTable;