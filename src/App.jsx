import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/Error/ErrorPage";
import NavBar from "./Components/UI/NavBar";
import TransactionsPage from "./pages/TransactionsPage";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import { useDispatch, useSelector } from "react-redux";
import { userActons } from "./store/user-reducer";
import axios from "axios";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPasswordPage";
import ResetPage from "./pages/ResetPassword/ResetPage";
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.name);
  useEffect(() => {
    const getUser = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />
        </>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <AuthPage />,
        },
        {
          path: "/transactions",
          element: isLoggedIn ? <TransactionsPage /> : <AuthPage />,
        },
        {
          path: "/leaderboard",
          element: isLoggedIn ? <Leaderboard /> : <AuthPage />,
        },
        {
          path: "/forgetpassword",
          element: <ForgetPasswordPage />,
        },
        {
          path: "/resetpassword/:id",
          element: <ResetPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
