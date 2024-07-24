import React, { useState } from 'react';
import './ControlPanel.css';

const ControlPanel = () => {
  // State for input values and errors
  const [formData, setFormData] = useState({
    nip: '',
    regon: '',
    name: '',
    date: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    comments: '',
    color: '',
    vat: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.nip) newErrors.nip = 'NIP is required';
    if (!formData.regon) newErrors.regon = 'REGON is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.street) newErrors.street = 'Street is required';
    if (!formData.houseNumber) newErrors.houseNumber = 'House number is required';
    if (!formData.color) newErrors.color = 'Color selection is required';
    if (!formData.vat) newErrors.vat = 'VAT selection is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form data:', formData);
      // Reset form and errors if needed
      setFormData({
        nip: '',
        regon: '',
        name: '',
        date: '',
        street: '',
        houseNumber: '',
        apartmentNumber: '',
        comments: '',
        color: '',
        vat: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="control-panel">
      <h2>Różne kontrolki HTML</h2>
      <form className="control-panel-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nip">NIP</label>
          <input
            type="text"
            id="nip"
            name="nip"
            className="form-input"
            placeholder="Podaj NIP"
            value={formData.nip}
            onChange={handleChange}
          />
          {errors.nip && <p className="error-text">{errors.nip}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="regon">REGON</label>
          <input
            type="number"
            id="regon"
            name="regon"
            className="form-input"
            placeholder="Podaj REGON"
            value={formData.regon}
            onChange={handleChange}
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
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="date">Data Powstania</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-input"
            placeholder="Wybierz datę"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <p className="error-text">{errors.date}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="street">Ulica</label>
          <input
            type="text"
            id="street"
            name="street"
            className="form-input"
            placeholder="Podaj ulicę"
            value={formData.street}
            onChange={handleChange}
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
            value={formData.houseNumber}
            onChange={handleChange}
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
            value={formData.apartmentNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Uwagi</label>
          <textarea
            id="comments"
            name="comments"
            className="form-textarea"
            placeholder="Podaj uwagi"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Kolory</label>
          <select
            id="color"
            name="color"
            className="form-select"
            value={formData.color}
            onChange={handleChange}
          >
            <option value="">Wybierz kolor</option>
            <option value="green">Zielony</option>
            <option value="blue">Niebieski</option>
            <option value="gray">Szary</option>
            <option value="turquoise">Turkusowy</option>
            <option value="navy">Granatowy</option>
            <option value="red">Czerwony</option>
            <option value="white">Biały</option>
          </select>
          {errors.color && <p className="error-text">{errors.color}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="vat">VAT</label>
          <select
            id="vat"
            name="vat"
            className="form-select"
            value={formData.vat}
            onChange={handleChange}
          >
            <option value="">Wybierz VAT</option>
            <option value="ZW">ZW</option>
            <option value="NP">NP.</option>
            <option value="0%">0%</option>
            <option value="3%">3%</option>
            <option value="8%">8%</option>
            <option value="23%">23%</option>
          </select>
          {errors.vat && <p className="error-text">{errors.vat}</p>}
        </div>
        <ol className="ordered-list">
          <li>Element 1</li>
          <li>Element 2</li>
          <li>Element 3</li>
        </ol>
        <button type="submit" className="btn">Wyślij</button>
      </form>
    </div>
  );
};

export default ControlPanel;