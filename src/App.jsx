import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Layout
import Layout from "./Components/Layout/Layout";

// Auth
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";

// Manager
import DashBoard from "./Pages/Qualifai_Manager/MainHome/DashBoard";
import ActivityLog from "./Pages/Activity Log/ActivityLog";
import EmployeeProfile from "./Pages/Activity Log/EmployeeProfile";
import Employee from "./Pages/Employees/Employee";
import AddEmployee from "./Pages/Employees/AddEmployee";
import Deadlines from "./Pages/Qualifai_Manager/Deadlines";
import AccreditationTypes from "./Pages/Qualifai_Manager/Accreditation/Accreditation";
import AccreditationDivisions from "./Pages/Qualifai_Manager/Accreditation/AllFiles";
import AccreditationDetails from "./Pages/Qualifai_Manager/Accreditation/AccreditationDetails";
import ShowDetails from "./Pages/Qualifai_Manager/Accreditation/ShowDetails";
import YearDetails from "./Pages/Qualifai_Manager/Accreditation/YearDetails";
import UploadFiles from "./Pages/Qualifai_Manager/Accreditation/UploadFiles";
import SuccessUpload from "./Pages/Qualifai_Manager/Accreditation/SucessUpload";
import ReportsList from "./Pages/Qualifai_Manager/Reports/ReportsList";
import ReportDetails from "./Pages/Qualifai_Manager/Reports/ReportDetails";
import SuccessPage from "./Pages/Qualifai_Manager/Reports/SuccessPage";
import FinalReport from "./Pages/Qualifai_Manager/Reports/FinalReport";

// Admin
import DashBoard_Admin from "./Pages/System_Admin/DashBoard_Admin/DashBard_Admin";
import EditSubscription from "./Pages/System_Admin/Subscriptions/EditSubscription";
import ManageSubscriptions from "./Pages/System_Admin/Subscriptions/ManageSubscriptions";
import FacultyManagement from "./Pages/System_Admin/FacultyManagement/FacultyManagement";
import AddFaculty from "./Pages/System_Admin/FacultyManagement/AddFaculty";
import FacultyDetails from "./Pages/System_Admin/FacultyManagement/FacultyDetails";
import SendNotifications from "./Pages/System_Admin/Admin_Notification/SendNotification";

// Employee
import AccreditationEvaluation from "./Pages/Qualifai_Employee/AccreditationEvaluation/AccreditationEvaluation";
import AccreditationPanel from "./Pages/Qualifai_Employee/AccreditationEvaluation/AccreditationPanel";
import CollegesTable from "./Pages/Qualifai_Employee/Colleges/CollegesTable";
import PreviousReports from "./Pages/Qualifai_Employee/Employee_Reports/PreviousReports";
import CollegeReports from "./Pages/Qualifai_Employee/Employee_Reports/CollegeReports";
import EmployeeReports from "./Pages/Qualifai_Employee/Employee_Reports/EmployeeReports";
import Employee_DashBoard from "./Pages/Qualifai_Employee/Employee_DashBoard/Employee_DashBoard";
import ContactingColleges from "./Pages/Qualifai_Employee/Contacting colleges/ContactingColleges";

// Shared
import Profile from "./Pages/Profile";
import Notifications from "./Components/Notifications/Notifications";
import Role from "./Pages/Roles/Role";
import RoleContent from "./Pages/Roles/AddNewRole";
import Pricing from "./Pages/Qualifai_Manager/Payments/Pricing";
import PaymentPage from "./Pages/Qualifai_Manager/Payments/Payment";
import PaymentSuccess from "./Pages/Qualifai_Manager/Payments/SucessPayment";
import PaymentError from "./Pages/Qualifai_Manager/Payments/ErorrPayment";
import SupportPage from "./Help";
import ChatBot from "./Components/Layout/ChatBot";

// ✅ Protected Route
const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;

  if (roles && !roles.includes(role)) {
    return <Navigate to="/DashBoard" />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState({
    name: "",
    roleName: "",
    avatar: null,
  });

  const token = localStorage.getItem("token");
  const _role = localStorage.getItem("role");

  // ✅ جلب بيانات اليوزر دايمًا fresh
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await axios.get("https://qualefai.runasp.net/api/Profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({
          name: `${res.data.firstName} ${res.data.lastName}`,
          roleName: res.data.roleName,
          avatar: res.data.photoUrl,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* Layout */}
        <Route element={<Layout user={user} setUser={setUser} />}>
          {/* 🟢 Shared */}
          <Route
            path="/DashBoard"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ActivityLog"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <ActivityLog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EmployeeProfile/:id"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <EmployeeProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute roles={["admin", "manager", "employee"]}>
                <Profile user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Notifications"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Help"
            element={
              <ProtectedRoute roles={["admin", "manager", "employee"]}>
                <SupportPage />
              </ProtectedRoute>
            }
          />
          <Route path="/ChatBot" element={<ChatBot />} />

          {/* 🟡 Manager */}
          <Route
            path="/Employee"
            element={
              <ProtectedRoute roles={["manager", "admin"]}>
                <Employee />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AddEmployee"
            element={
              <ProtectedRoute roles={["manager", "admin"]}>
                <AddEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Deadlines"
            element={
              <ProtectedRoute roles={["manager"]}>
                <Deadlines />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Accreditation"
            element={
              <ProtectedRoute roles={["manager"]}>
                <AccreditationTypes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AllFiles"
            element={
              <ProtectedRoute roles={["manager"]}>
                <AccreditationDivisions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AccreditationDetails"
            element={
              <ProtectedRoute roles={["manager"]}>
                <AccreditationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ShowDetails"
            element={
              <ProtectedRoute roles={["manager"]}>
                <ShowDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/YearDetails"
            element={
              <ProtectedRoute roles={["manager"]}>
                <YearDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UploadFiles"
            element={
              <ProtectedRoute roles={["manager"]}>
                <UploadFiles />
              </ProtectedRoute>
            }
          />
          <Route path="/SucessUpload" element={<SuccessUpload />} />
          <Route
            path="/ReportsList"
            element={
              <ProtectedRoute roles={["manager", "employee"]}>
                <ReportsList />
              </ProtectedRoute>
            }
          />
          <Route path="/ReportDetails" element={<ReportDetails />} />
          <Route path="/SuccessPage" element={<SuccessPage />} />
          <Route path="/FinalReport" element={<FinalReport />} />

          {/* 🔴 Admin */}
          <Route
            path="/DashBard_Admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <DashBoard_Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ManageSubscriptions"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ManageSubscriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EditSubscription"
            element={
              <ProtectedRoute roles={["admin"]}>
                <EditSubscription />
              </ProtectedRoute>
            }
          />
          <Route
            path="/FacultyManagement"
            element={
              <ProtectedRoute roles={["admin"]}>
                <FacultyManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddFaculty"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AddFaculty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/FacultyDetails/:id"
            element={
              <ProtectedRoute roles={["admin"]}>
                <FacultyDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/SendNotifications"
            element={
              <ProtectedRoute roles={["admin"]}>
                <SendNotifications />
              </ProtectedRoute>
            }
          />

          {/* 🔵 Employee */}
          <Route
            path="/Employee_DashBoard"
            element={
              <ProtectedRoute roles={["employee"]}>
                <Employee_DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AccreditationEvaluation"
            element={
              <ProtectedRoute roles={["employee"]}>
                <AccreditationEvaluation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AccreditationPanel"
            element={
              <ProtectedRoute roles={["employee"]}>
                <AccreditationPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CollegesTable"
            element={
              <ProtectedRoute roles={["employee"]}>
                <CollegesTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PreviousReports"
            element={
              <ProtectedRoute roles={["employee"]}>
                <PreviousReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CollegeReports/:id"
            element={
              <ProtectedRoute roles={["employee"]}>
                <CollegeReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EmployeeReports"
            element={
              <ProtectedRoute roles={["employee"]}>
                <EmployeeReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ContactingColleges"
            element={
              <ProtectedRoute roles={["employee", "manager", "admin"]}>
                <ContactingColleges />
              </ProtectedRoute>
            }
          />

          {/* 🟣 Payments + Roles */}
          <Route
            path="/Role"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <Role />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddNewRole"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <RoleContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Pricing"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <Pricing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Payment"
            element={
              <ProtectedRoute roles={["admin", "manager"]}>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route path="/SucessPayment" element={<PaymentSuccess />} />
          <Route path="/ErorrPayment" element={<PaymentError />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
