import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import ViewStudent from "./pages/ViewStudent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Internships from "./pages/Internships";
import CareerRoadmap from "./pages/CareerRoadmap";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicationManagement from "./pages/ApplicationManagement";
import ManageUsers from "./pages/ManageUsers";
import ManageInternships from "./pages/ManageInternships";
import VerifyCertificates from "./pages/VerifyCertificates";
import ManageApplications from "./pages/ManageApplications";
import ReportAnalytics from "./pages/ReportAnalytics";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/students" element={<Students />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/view-student/:id" element={<ViewStudent />} />
        <Route
        path="/profile"
        element={
        <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
        }
        />
        <Route
        path="/internships"
        element={
        <ProtectedRoute>
          <Internships />
        </ProtectedRoute>
      }
      />
      <Route
      path="/career-roadmap"
      element={
      <ProtectedRoute>
      <CareerRoadmap />
    </ProtectedRoute>
  }
  />
  <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/application-management"
  element={
    <ProtectedRoute>
      <ApplicationManagement />
    </ProtectedRoute>
  }
/>
<Route
  path="/manage-users"
  element={
    <ProtectedRoute>
      <ManageUsers />
    </ProtectedRoute>
  }
/>
<Route
  path="/manage-internships"
  element={<ManageInternships />}
/>
<Route
  path="/verify-certificates"
  element={<VerifyCertificates />}
/>
<Route
  path="/manage-applications"
  element={<ManageApplications />}
/>
<Route
  path="/reports"
  element={
    <ProtectedRoute role="admin">
      <ReportAnalytics />
    </ProtectedRoute>
  }
/>
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;