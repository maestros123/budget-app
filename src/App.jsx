import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Dashboard, dashboardAction, dashboardLoader} from "./pages/Dashboard";
import {Error} from "./pages/Error";
import {Main, mainLoader} from "./layouts/Main.jsx";
import {logoutAction} from "./actions/logout.jsx";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {expensesAction, expensesLoader, ExpensesPage} from "./pages/ExpensesPage.jsx";
import {budgetAction, budgetLoader, BudgetPage} from "./pages/BudgetPage.jsx";
import {deleteBudget} from "./actions/deleteBudget.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error/>
      },
      {
        path: "budget/:id",
        element: <BudgetPage/>,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error/>,
        children: [
          {
            path: "delete",
            action: deleteBudget
          }
        ]

      },
      {
        path: "expenses",
        element: <ExpensesPage/>,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error/>
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer />
    </>
  )
}

export default App
