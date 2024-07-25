import React, { useState, useEffect } from 'react';
import './InvoicesTable.css';
import Loader from '../Loader/Loader';

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [vatRate, setVatRate] = useState(23); // Default VAT rate
  const [highlightRows, setHighlightRows] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('https://test-backend-g0f7.onrender.com/api/invoices');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const handleVatChange = (e) => {
    setVatRate(parseFloat(e.target.value));
  };

  const handleHighlightRows = () => {
    setHighlightRows(!highlightRows);
  };

  const calculateAmounts = (netAmount, vatRate, quantity) => {
    const vatAmount = (netAmount * vatRate) / 100;
    const grossAmount = netAmount + vatAmount;
    return {
      vatAmount: vatAmount * quantity,
      grossAmount: grossAmount * quantity
    };
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="invoices-table">
      <h2>Invoices Table</h2>
      <div className="form-group">
        <label htmlFor="vatRate">VAT Rate (%)</label>
        <input
          type="number"
          id="vatRate"
          className="vat-rate-input"
          value={vatRate}
          onChange={handleVatChange}
          min="0"
          step="0.01"
        />
      </div>
      <button className="highlight-button" onClick={handleHighlightRows}>
        Highlight Rows with Netto {'>'} 1000.00 zł
      </button>
      <table className="invoices-table-table">
        <thead>
          <tr>
            <th>Lp.</th>
            <th>Opis</th>
            <th>MPK</th>
            <th>Kwota Netto</th>
            <th>Ilość</th>
            <th>VAT (%)</th>
            <th>Kwota Brutto</th>
            <th>Wartość Netto</th>
            <th>Wartość Brutto</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => {
            const netAmount = parseFloat(invoice.amount);
            const quantity = parseInt(invoice.quantity, 10);
            const vatRate = parseFloat(invoice.vatRate);
            const { vatAmount, grossAmount } = calculateAmounts(netAmount, vatRate, quantity);

            return (
              <tr
                key={invoice.id}
                className={highlightRows && netAmount > 1000 ? 'highlight-row' : ''}
              >
                <td>{index + 1}</td>
                <td>{invoice.description || 'N/A'}</td>
                <td>{invoice.mpk || 'N/A'}</td>
                <td>{netAmount.toFixed(2)}</td>
                <td>{quantity}</td>
                <td>{vatRate.toFixed(2)}</td>
                <td>{grossAmount.toFixed(2)}</td>
                <td>{(netAmount * quantity).toFixed(2)}</td>
                <td>{(grossAmount * quantity).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;