import React, { useState, useEffect } from 'react';
import './DelegationsTable.css';
import Loader from '../Loader/Loader';
import { fetchDelegations } from './../../api';

const DelegationsTable = () => {
  const [delegations, setDelegations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDelegations = async () => {
      try {
        const data = await fetchDelegations();
        setDelegations(data);
      } catch (error) {
        console.error('Error fetching delegations:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDelegations();
  }, []);

  return (
    <div className="delegations-table">
      <h2>Tabela Delegacji BD</h2>
      {loading && <Loader />}
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