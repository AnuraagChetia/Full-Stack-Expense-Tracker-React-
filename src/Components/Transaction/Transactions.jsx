import React from "react";
import "./transaction.css";
const Transactions = () => {
  const expenses = [
    {
      amount: 200,
      category: "Rent",
      note: "Dummy note",
      date: "12/04/2023",
    },
    {
      amount: 200,
      category: "Rent",
      note: "Dummy note",
      date: "12/04/2023",
    },
    {
      amount: 200,
      category: "Rent",
      note: "Dummy note",
      date: "12/04/2023",
    },
    {
      amount: 200,
      category: "Rent",
      note: "Dummy note",
      date: "12/04/2023",
    },
    {
      amount: 200,
      category: "Rent",
      note: "Dummy note",
      date: "12/04/2023",
    },
  ];
  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader">Transactions</div>
        {expenses.map((expense) => (
          <div className="expense">
            <div className="section">
              <span className="category">{expense.category}</span>
              <span className="note">{expense.note}</span>
            </div>
            <span className="amount">₹{expense.amount}</span>
            <div className="btn-group">
              <button className="btn edit" type="button">
                Edit
              </button>
              <button className="btn dlt" type="button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
