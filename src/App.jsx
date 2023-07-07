import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/Error/ErrorPage";
import NavBar from "./Components/UI/NavBar";
import TransactionsPage from "./pages/TransactionsPage";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
function App() {
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
        {
          path: "/leaderboard",
          element: <Leaderboard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
