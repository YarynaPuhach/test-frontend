import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-heading">Menu</div>
      <div className="sidebar-menu">
        <Link to="/control-panel" className="sidebar-link">Różne kontrolki HTML</Link>
        <Link to="/employees-table" className="sidebar-link">Tabela Pracowników</Link>
        <Link to="/invoices-table" className="sidebar-link">Tabela Faktur VAT</Link>
        <Link to="/delegations-table" className="sidebar-link">Tabela Delegacji BD</Link>
        <Link to="/contractors-table" className="sidebar-link">Dane Kontrahentów</Link>
      </div>
    </div>
  );
};

export default Sidebar;