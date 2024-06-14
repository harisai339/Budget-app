import React, { useState } from 'react'
import './App.css';

function App() {
  // Here, we initialize the state variables using React's useState hook.
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState({});

  // These functions update the state as the user types into the input fields.
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  // Add Expense Function:
  const handleAddExpense = () => {
    if (name && amount && category) {
      const newExpense = {
        name: name,
        amount: parseFloat(amount),
        category: category,
      };
      setExpenses([...expenses, newExpense]);
      setName('');
      setAmount('');
      setCategory('');

      // Update category budget
      const updatedCategories = { ...categories };
      if (updatedCategories[newExpense.category]) {
        updatedCategories[newExpense.category] += newExpense.amount;
      } else {
        updatedCategories[newExpense.category] = newExpense.amount;
      }
      setCategories(updatedCategories);
    }
  };
  // Remove Expense Function:
  const handleRemoveExpense = (index) => {
    const removedExpense = expenses[index];
    setExpenses(expenses.filter((_, i) => i !== index));

    // Update category budget
    const updatedCategories = { ...categories };
    updatedCategories[removedExpense.category] -= removedExpense.amount;
    setCategories(updatedCategories);
  };
//Rendering App
 //This section renders the input fields, expenses list, total budget, and category budgets.
  return (
    <div className="App">
      <h1>Budget Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={handleChangeName}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleChangeAmount}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={handleChangeCategory}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div className="expenses-container">
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.name} - ${expense.amount} ({expense.category})
              <button onClick={() => handleRemoveExpense(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="totals-container">
        <h2>Total Budget</h2>
        <p>${expenses.reduce((total, expense) => total + expense.amount, 0)}</p>
        <h2>Category Budget</h2>
        <ul>
          {Object.entries(categories).map(([category, total]) => (
            <li key={category}>
              {category} - ${total}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

