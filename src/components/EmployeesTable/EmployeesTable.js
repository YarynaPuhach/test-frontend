import React, { useState, useEffect } from 'react';
import './EmployeesTable.css';
import Loader from '../Loader/Loader';
import { fetchEmployees } from './../../api';

const EmployeesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [rowColor1, setRowColor1] = useState('#f8f9fa');
  const [rowColor2, setRowColor2] = useState('#e9ecef');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const handleColorChange = (e) => {
    const { id, value } = e.target;
    if (id === 'rowColor1') {
      setRowColor1(value);
    } else if (id === 'rowColor2') {
      setRowColor2(value);
    }
  };

  return (
    <div className="employees-table">
      <h2>Tabela Pracowników</h2>
      {loading && <Loader />}
      <div className="color-picker-container">
        <div className="form-group">
          <label htmlFor="rowColor1">Row Color 1</label>
          <input
            type="color"
            id="rowColor1"
            className="color-picker"
            value={rowColor1}
            onChange={handleColorChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rowColor2">Row Color 2</label>
          <input
            type="color"
            id="rowColor2"
            className="color-picker"
            value={rowColor2}
            onChange={handleColorChange}
          />
        </div>
      </div>
      <table className="employees-table-table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Stanowisko</th>
            <th>Data zatrudnienia</th>
            <th>Ilość dni urlopowych</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={employee.id}
              style={{ backgroundColor: index % 2 === 0 ? rowColor1 : rowColor2 }}
            >
              <td>{index + 1}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.position}</td>
              <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
              <td>{employee.vacationDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;