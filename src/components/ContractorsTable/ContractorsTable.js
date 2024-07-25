import React, { useState, useEffect } from 'react';
import './ContractorsTable.css';
import Loader from '../Loader/Loader';

const ContractorsTable = () => {
  const [contractors, setContractors] = useState([]);
  const [newContractor, setNewContractor] = useState({
    nip: '',
    regon: '',
    name: '',
    vatPayer: false,
    street: '',
    houseNumber: '',
    apartmentNumber: ''
  });
  const [editContractor, setEditContractor] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await fetch('https://test-backend-g0f7.onrender.com/api/contractors');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContractors(data);
      } catch (error) {
        console.error('Error fetching contractors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContractors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewContractor((prevContractor) => ({
      ...prevContractor,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newContractor.nip) newErrors.nip = 'NIP is required';
    if (!newContractor.regon) newErrors.regon = 'REGON is required';
    if (!newContractor.name) newErrors.name = 'Name is required';
    if (!newContractor.street) newErrors.street = 'Street is required';
    if (!newContractor.houseNumber) newErrors.houseNumber = 'House number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddContractor = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('https://test-backend-g0f7.onrender.com/api/contractors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContractor)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setContractors((prevContractors) => [...prevContractors, data]);
      setNewContractor({
        nip: '',
        regon: '',
        name: '',
        vatPayer: false,
        street: '',
        houseNumber: '',
        apartmentNumber: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding contractor:', error);
    }
  };

  const handleEditContractor = async () => {
    if (!editContractor || !validateForm()) return;

    try {
      const response = await fetch(`https://test-backend-g0f7.onrender.com/api/contractors/${editContractor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editContractor)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedContractor = await response.json();
      setContractors((prevContractors) =>
        prevContractors.map((contractor) =>
          contractor.id === updatedContractor.id ? updatedContractor : contractor
        )
      );
      setEditContractor(null);
      setErrors({});
    } catch (error) {
      console.error('Error editing contractor:', error);
    }
  };

  const handleDeleteContractor = async (id) => {
    try {
      await fetch(`https://test-backend-g0f7.onrender.com/api/contractors/${id}`, {
        method: 'DELETE'
      });
      setContractors((prevContractors) =>
        prevContractors.filter((contractor) => contractor.id !== id)
      );
    } catch (error) {
      console.error('Error deleting contractor:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className="contractors-table">
      <h2>Dane Kontrahentów</h2>
      <table className="contractors-table-table">
        <thead>
          <tr>
            <th>NIP</th>
            <th>REGON</th>
            <th>Nazwa</th>
            <th>Czy płatnik VAT?</th>
            <th>Ulica</th>
            <th>Numer Domu</th>
            <th>Numer Mieszkania</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {contractors.map((contractor) => (
            <tr key={contractor.id} className={contractor.deleted ? 'deleted' : ''}>
              <td>{contractor.nip}</td>
              <td>{contractor.regon}</td>
              <td>{contractor.name}</td>
              <td>{contractor.vatPayer ? 'Tak' : 'Nie'}</td>
              <td>{contractor.street}</td>
              <td>{contractor.houseNumber}</td>
              <td>{contractor.apartmentNumber}</td>
              <td>
                <button onClick={() => setEditContractor(contractor)}>Edytuj</button>
                <button onClick={() => handleDeleteContractor(contractor.id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editContractor ? 'Edytuj kontrahenta' : 'Dodaj kontrahenta'}</h3>
      <form className="contractor-form">
        <div className="form-group">
          <label htmlFor="nip">NIP</label>
          <input
            type="text"
            id="nip"
            name="nip"
            className="form-input"
            placeholder="Podaj NIP"
            value={editContractor ? editContractor.nip : newContractor.nip}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.nip && <p className="error-text">{errors.nip}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="regon">REGON</label>
          <input
            type="text"
            id="regon"
            name="regon"
            className="form-input"
            placeholder="Podaj REGON"
            value={editContractor ? editContractor.regon : newContractor.regon}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.regon && <p className="error-text">{errors.regon}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Nazwa</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Podaj nazwę"
            value={editContractor ? editContractor.name : newContractor.name}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="vatPayer">Czy płatnik VAT?</label>
          <input
            type="checkbox"
            id="vatPayer"
            name="vatPayer"
            className="form-checkbox"
            checked={editContractor ? editContractor.vatPayer : newContractor.vatPayer}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Ulica</label>
          <input
            type="text"
            id="street"
            name="street"
            className="form-input"
            placeholder="Podaj ulicę"
            value={editContractor ? editContractor.street : newContractor.street}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.street && <p className="error-text">{errors.street}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="houseNumber">Numer Domu</label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            className="form-input"
            placeholder="Podaj numer domu"
            value={editContractor ? editContractor.houseNumber : newContractor.houseNumber}
            onChange={(e) => handleInputChange(e)}
          />
          {errors.houseNumber && <p className="error-text">{errors.houseNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="apartmentNumber">Numer Mieszkania</label>
          <input
            type="text"
            id="apartmentNumber"
            name="apartmentNumber"
            className="form-input"
            placeholder="Podaj numer mieszkania (opcjonalnie)"
            value={editContractor ? editContractor.apartmentNumber : newContractor.apartmentNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button
          type="button"
          className="btn"
          onClick={editContractor ? handleEditContractor : handleAddContractor}
        >
          {editContractor ? 'Zapisz zmiany' : 'Dodaj kontrahenta'}
        </button>
      </form>
    </div>
  );
};

export default ContractorsTable;