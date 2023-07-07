import React, { useEffect } from "react";
import "./transaction.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-reducer";
import axios from "axios";
import { userActons } from "../../store/user-reducer";
// const expenses = [
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
//   {
//     amount: 200,
//     category: "Rent",
//     note: "Dummy note",
//     date: "12/04/2023",
//   },
// ];
const Transactions = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  //DOMcontentLoaded
  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get("http://localhost:3000/users/get-user", {
        headers: { Authorization: token },
      });
      dispatch(
        userActons.getUser({
          name: user.data.user.name,
          email: user.data.user.email,
          premium: user.data.user.premium,
        })
      );
    };
    getUser();
  }, []);

  //delete button
  const deleteHandler = async (e) => {
    const id = e.target.id;
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await axios.delete(
        `http://localhost:3000/expense/delete-expense/${id}`,
        { headers: { Authorization: token } }
      );
      console.log(res);
      dispatch(expenseActions.deleteExpense(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader">Transactions</div>
        {expenses.map((expense) => (
          <div className="expense" key={expense.id}>
            <div className="section">
              <span className="category">{expense.category}</span>
              <span className="note">{expense.note}</span>
            </div>
            <span className="amount">₹{expense.amount}</span>
            <div className="btn-group">
              <button className="btn edit" type="button">
                Edit
              </button>
              <button
                className="btn dlt"
                type="button"
                onClick={deleteHandler}
                id={expense.id}
              >
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
