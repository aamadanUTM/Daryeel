import React from "react";
import { Navigate } from "react-router-dom";
import RouteWrapper from "../components/Common/routeWrapper";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/forms/Employees";

//User Management
import CreateUser from "../pages/Users/CreateUser";
import UpdateUser from "../pages/Users/UpdateUser";
import UsersList from "../pages/Users/UsersList";
import Roles from "../pages/Users/Roles";
import CreateRole from "../pages/Users/CreateRole";

//Branches
import BranchesList from "../pages/branches/BranchesList";

//Owners
import OwnersList from "../pages/Owners/OwnersList";
import CreateOwner from "../pages/Owners/CreateOwner";
import UpdateOwner from "../pages/Owners/UpdateOwner";

//Vehicles
import VehicleModels from "../pages/vehicles/VehicleModels";
import VehicleMakes from "../pages/vehicles/VehicleMakes";
import VehiclesList from "../pages/vehicles/VehiclesList";

const authProtectedRoutes = [
  {
    path: "/dashboard",
    component: (
      <RouteWrapper>
        <Dashboard />
      </RouteWrapper>
    ),
  },
  {
    path: "/employees/:id",
    component: (
      <RouteWrapper>
        <Employees />
      </RouteWrapper>
    ),
  },
  {
    path: "/createUser",
    component: (
      <RouteWrapper>
        <CreateUser />
      </RouteWrapper>
    ),
  },
  {
    path: "/users/:id",
    component: (
      <RouteWrapper>
        <UpdateUser />
      </RouteWrapper>
    ),
  },
  {
    path: "/users",
    component: (
      <RouteWrapper>
        <UsersList />
      </RouteWrapper>
    ),
  },
  {
    path: "/createRole",
    component: (
      <RouteWrapper>
        <CreateRole />
      </RouteWrapper>
    ),
  },
  {
    path: "/roles",
    component: (
      <RouteWrapper>
        <Roles />
      </RouteWrapper>
    ),
  },
  {
    path: "/branches",
    component: (
      <RouteWrapper>
        <BranchesList />
      </RouteWrapper>
    ),
  },
  {
    path: "/owners",
    component: (
      <RouteWrapper>
        <OwnersList />
      </RouteWrapper>
    ),
  },
  {
    path: "/createOwner",
    component: (
      <RouteWrapper>
        <CreateOwner />
      </RouteWrapper>
    ),
  },
  {
    path: "/owners/:id",
    component: (
      <RouteWrapper>
        <UpdateOwner />
      </RouteWrapper>
    ),
  },
  {
    path: "/vehicleModels",
    component: (
      <RouteWrapper>
        <VehicleModels />
      </RouteWrapper>
    ),
  },
  {
    path: "/vehicleMakes",
    component: (
      <RouteWrapper>
        <VehicleMakes />
      </RouteWrapper>
    ),
  },
  {
    path: "/vehiclesList",
    component: (
      <RouteWrapper>
        <VehiclesList />
      </RouteWrapper>
    ),
  },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/lock-screen", component: <AuthLockScreen /> },
];

export { authProtectedRoutes, publicRoutes };
