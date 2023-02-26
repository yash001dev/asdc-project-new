import SignIn from "pages/Auth/SignIn";
import Dashboard from "pages/Dashboard";
import SignUp from "pages/Auth/SignUp";
import Account from "./pages/Dashboard/Account";

const routes = [
  {
    path: "/",
    name: "SignIn",
    component: SignIn,
    layout: "auth",
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    layout: "auth",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "account",
        name: "Account",
        component: Account,
      },
    ],
  },
];

export default routes;
