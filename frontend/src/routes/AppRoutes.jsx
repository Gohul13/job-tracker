import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import ApplicationDetails from "../pages/ApplicationDetails";
import CreateApplication from "../pages/CreateApplication";
import EditApplication from "../pages/EditApplication";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<CreateApplication />}/>
              <Route path="/applications/:id/edit" element={<EditApplication />} />
              
              <Route path="/applications/:id" element={<ApplicationDetails />} />  
            </Route>  
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;