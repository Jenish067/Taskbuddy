import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import ESewaPayment from "./pages/PaymentPage/ESewaPayment"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ProposalPage from "./pages/ProposalPage/ProposalPage"; 
import User from "./pages/user/User";
import adminDashboard from "./pages/dashboard/admin/adminDashboard";
import clientTable from "./pages/dashboard/admin/clientTable";
import freelancerTable from "./pages/dashboard/admin/freelancerTable";
import paymentTable from "./pages/dashboard/admin/paymentTable";
import projectsTable from "./pages/dashboard/admin/projectsTable"
import Dashboard from "./pages/dashboard/admin/Dashboard"
function App() {
  const queryClient = new QueryClient();

  // useEffect(() => {
  //   // Assume getToken is a function to retrieve the token from local storage or other storage
  //   const token = localStorage.getItem('token');
  //   setAuthToken(token);
  // }, []);

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/project/getProject/:id",
          element: <Gig />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path:"/proposal",
          element: <ProposalPage/>
        },
      
        {
          path:"/user/:email",
          element:<User/>
        },
        {
          path:"/pay",
          element:<ESewaPayment/>
        },
        {
          path:"/admin",
          element:<adminDashboard/>
        },
        {
          path:"/dashboard_table",
          element:<Dashboard/>
        },
        {
          path:"/client_table",
          element:<clientTable/>
        },
        {
          path:"/freelancer_table",
          element:<freelancerTable/>
        },
        {
          path:"/project_table",
          element:<projectsTable/>
        },
        {
          path:"/payment_table",
          element:<paymentTable/>
        },

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
