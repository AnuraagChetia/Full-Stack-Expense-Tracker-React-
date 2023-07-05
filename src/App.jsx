import "./App.css";
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/Error/ErrorPage";
import NavBar from "./Components/UI/NavBar";
import TransactionsPage from "./pages/TransactionsPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseActions } from "./store/expense-reducer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const get = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.get("http://localhost:3000/expense/get-expense", {
        headers: { Authorization: token },
      });
      const expenses = res.data;
      expenses.forEach((exp) => {
        dispatch(expenseActions.addExpenses(exp));
      });
    };
    get();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: <NavBar />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/transactions",
          element: <TransactionsPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
