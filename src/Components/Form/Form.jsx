import React, { useRef } from "react";
import "./form.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";
const Form = () => {
  const categoryRef = useRef();
  const amountRef = useRef();
  const noteRef = useRef();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredCategory = categoryRef.current.value;
    const enteredAmount = amountRef.current.value;
    const enteredNote = noteRef.current.value;
    let expense = {
      category: enteredCategory,
      amount: enteredAmount,
      note: enteredNote,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/expense/add-expense",
        expense
      );
      dispatch(expenseActions.addExpenses(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="formContainer">
      <div className="header">Add transaction</div>
      <form onSubmit={submitHandler}>
        <select name="category" id="categpry" ref={categoryRef}>
          <option value="rent">Rentals</option>
          <option value="food">Food & Beverage</option>
          <option value="water">Water Bill</option>
          <option value="electricity">Electricity Bill</option>
          <option value="gas">Gas Bill</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          className="number-input"
          ref={amountRef}
        />
        <input type="text" placeholder="Note" ref={noteRef} />
        <div className="formBtn">
          <button type="button" className="cancel">
            Cancel
          </button>
          <button type="submit" className="save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
