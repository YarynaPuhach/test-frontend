import React, { useState, useEffect } from 'react';
import './ContractorsTable.css';
import Loader from '../Loader/Loader';
import { fetchContractors, addContractor, editContractor, deleteContractor } from './../../api';

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
  const [editContractorState, setEditContractor] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContractors = async () => {
      try {
        const data = await fetchContractors();
        setContractors(data);
      } catch (error) {
        console.error('Error loading contractors:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContractors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'nip' || name === 'regon') {
      const numericRegex = /^[0-9]*$/;
      if (!numericRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.toUpperCase()} must contain only numbers`
        }));
        return;
      } else if (value.length < 7 || value.length > 15) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.toUpperCase()} must be between 7 and 15 digits`
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: ''
        }));
      }
    }

    if (editContractorState) {
      setEditContractor((prevContractor) => ({
        ...prevContractor,
        [name]: type === 'checkbox' ? checked : value
      }));
    } else {
      setNewContractor((prevContractor) => ({
        ...prevContractor,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const nipRegex = /^[0-9]{7,15}$/;
    const regonRegex = /^[0-9]{7,15}$/;

    if (!newContractor.nip) {
      newErrors.nip = 'NIP is required';
    } else if (!nipRegex.test(newContractor.nip)) {
      newErrors.nip = 'NIP must be between 7 and 15 digits';
    }

    if (!newContractor.regon) {
      newErrors.regon = 'REGON is required';
    } else if (!regonRegex.test(newContractor.regon)) {
      newErrors.regon = 'REGON must be between 7 and 15 digits';
    }

    if (!newContractor.name) newErrors.name = 'Name is required';
    if (!newContractor.street) newErrors.street = 'Street is required';
    if (!newContractor.houseNumber) newErrors.houseNumber = 'House number is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      window.scrollTo(0, 0);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleAddContractor = async () => {
    if (!validateForm()) return;

    try {
      const data = await addContractor(newContractor);
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
      alert('Contractor added successfully!');
    } catch (error) {
      console.error('Error adding contractor:', error);
    }
  };

  const handleEditContractor = async () => {
    if (!editContractorState) return;

    const updatedFields = {};
    Object.keys(editContractorState).forEach((key) => {
      if (editContractorState[key] !== (contractors.find(c => c.id === editContractorState.id) || {})[key]) {
        updatedFields[key] = editContractorState[key];
      }
    });

    try {
      const updatedContractor = await editContractor(editContractorState.id, updatedFields);
      setContractors((prevContractors) =>
        prevContractors.map((contractor) =>
          contractor.id === updatedContractor.id ? updatedContractor : contractor
        )
      );
      setEditContractor(null);
      setErrors({});
      alert('Contractor edited successfully!');
    } catch (error) {
      console.error('Error editing contractor:', error);
    }
  };

  const handleDeleteContractor = async (id) => {
    try {
      await deleteContractor(id);
      setContractors((prevContractors) =>
        prevContractors.filter((contractor) => contractor.id !== id)
      );
      alert('Contractor deleted successfully!');
    } catch (error) {
      console.error('Error deleting contractor:', error);
    }
  };

  return (
    <div className="contractors-table">
      <h2>Dane Kontrahentów</h2>
      {loading && <Loader />}
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

      <h3>{editContractorState ? 'Edytuj kontrahenta' : 'Dodaj kontrahenta'}</h3>
      <form className="contractor-form">
        <div className="form-group">
          <label htmlFor="nip">NIP</label>
          <input
            type="text"
            id="nip"
            name="nip"
            className="form-input"
            placeholder="Podaj NIP"
            value={editContractorState ? editContractorState.nip : newContractor.nip}
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
            value={editContractorState ? editContractorState.regon : newContractor.regon}
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
            value={editContractorState ? editContractorState.name : newContractor.name}
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
            checked={editContractorState ? editContractorState.vatPayer : newContractor.vatPayer}
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
            value={editContractorState ? editContractorState.street : newContractor.street}
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
            value={editContractorState ? editContractorState.houseNumber : newContractor.houseNumber}
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
            placeholder="Podaj numer mieszkania"
            value={editContractorState ? editContractorState.apartmentNumber : newContractor.apartmentNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button
          type="button"
          className="btn"
          onClick={editContractorState ? handleEditContractor : handleAddContractor}
        >
          {editContractorState ? 'Zapisz zmiany' : 'Dodaj kontrahenta'}
        </button>
      </form>
    </div>
  );
};

export default ContractorsTable;