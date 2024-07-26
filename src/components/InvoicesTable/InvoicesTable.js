import React, { useState, useEffect } from 'react';
import './InvoicesTable.css';
import Loader from '../Loader/Loader';
import { fetchInvoices, updateInvoice } from './../../api';

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [vatRate, setVatRate] = useState(23);
  const [highlightRows, setHighlightRows] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    loadInvoices();
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

  const handleNetAmountChange = (index, newNetAmount) => {
    const updatedInvoices = invoices.map((invoice, i) => {
      if (i === index) {
        return { ...invoice, amount: newNetAmount };
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedInvoices = invoices.map((invoice, i) => {
      if (i === index) {
        return { ...invoice, quantity: newQuantity };
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
  };

  const saveChanges = async (invoice) => {
    try {
      await updateInvoice(invoice);
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  return (
    <div className="invoices-table">
      <h2>Invoices Table</h2>
      {loading && <Loader />}
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
            const currentVatRate = parseFloat(invoice.vatRate || vatRate);
            const { vatAmount, grossAmount } = calculateAmounts(netAmount, currentVatRate, quantity);

            return (
              <tr
                key={invoice.id}
                className={highlightRows && netAmount > 1000 ? 'highlight-row' : ''}
              >
                <td>{index + 1}</td>
                <td>{invoice.description || 'N/A'}</td>
                <td>{invoice.mpk || 'N/A'}</td>
                <td>
                  <input
                    type="number"
                    value={netAmount}
                    onChange={(e) => handleNetAmountChange(index, parseFloat(e.target.value))}
                    onBlur={() => saveChanges(invoice)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    onBlur={() => saveChanges(invoice)}
                  />
                </td>
                <td>{currentVatRate.toFixed(2)}</td>
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