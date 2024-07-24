import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import ControlPanel from './components/ControlPanel/ControlPanel';
import EmployeesTable from './components/EmployeesTable/EmployeesTable';
import InvoicesTable from './components/InvoicesTable/InvoicesTable';
import DelegationsTable from './components/DelegationsTable/DelegationsTable';
import ContractorsTable from './components/ContractorsTable/ContractorsTable';
import './App.css'; // Оновлений шлях до стилів

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/control-panel" element={<ControlPanel />} />
            <Route path="/employees-table" element={<EmployeesTable />} />
            <Route path="/invoices-table" element={<InvoicesTable />} />
            <Route path="/delegations-table" element={<DelegationsTable />} />
            <Route path="/contractors-table" element={<ContractorsTable />} />
            <Route path="*" element={<ControlPanel />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;