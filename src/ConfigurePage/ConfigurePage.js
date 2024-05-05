// import React from 'react';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConfigurePage() {
  

  
  const [budgetItem, setBudgetItem] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  // const [budgetItems, setBudgetItems] = useState([]);

    function getColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const budgetData = { 
            title: budgetItem, 
            budget: budgetAmount,
            color: getColor()
        };
        await axios.post('http://localhost:3000/addBudget', budgetData);
        setBudgetItem('');
        setBudgetAmount('');
    };

    return (
      <div className="budget-configuration-container">
        <h1>Configure Your Budget</h1>
        <h2>Add New Budget Item</h2>
        <form className="budget-form" onSubmit={handleSubmit}>
          <label htmlFor="budgetItem">Budget Item:</label>
          <input type="text" id="budgetItem" name="budgetItem" required value={budgetItem} onChange={e => setBudgetItem(e.target.value)} />
          <label htmlFor="budgetAmount">Budget Amount:</label>
          <input type="number" id="budgetAmount" name="budgetAmount" required value={budgetAmount} onChange={e => setBudgetAmount(e.target.value)} />
          <button type="submit">Add Budget Item</button>
        </form>
    </div>
    );
}

export default ConfigurePage;
