import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCopy,
  faBuildingColumns,
  faUsers,
  faRightFromBracket,
  faSquarePollVertical,
  faStopwatch,
  faMoneyCheckDollar,
  faUserShield,
  faHeadset,
  faChartLine,
  faBell,
  faRobot,
  faFileCircleCheck,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/logo.png";
import "./Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "employee";

  const isActive = (path) => {
    if (Array.isArray(path)) {
      return path.some((p) =>
        location.pathname.toLowerCase().startsWith(p.toLowerCase()),
      );
    }
    return location.pathname.toLowerCase().startsWith(path.toLowerCase());
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuByRole = {
    admin: [
      { path: "/DashBard_Admin", label: "الصفحة الرئيسية ", icon: faHouse },
      {
        path: ["/FacultyManagement", "/FacultyDetails", "/AddFaculty"],
        label: "إدارة الكليات",
        icon: faCopy,
      },
      { path: ["/Employee", "/AddEmployee"], label: "الموظفين", icon: faUsers },
      { path: ["/Role", "/AddNewRole"], label: "الأدوار", icon: faUserShield },
      {
        path: ["/ManageSubscriptions", "/EditSubscription"],
        label: "اداره الاشتراكات ",
        icon: faMoneyCheckDollar,
      },
      {
        path: ["/SendNotifications", "/Notifications"],
        label: "الإشعارات",
        icon: faBell,
      },
      {
        path: ["/ActivityLog", "/EmployeeProfile"],
        label: "سجل النشاط",
        icon: faChartLine,
      },
    ],

    manager: [
      { path: "/DashBoard", label: "الصفحة الرئيسية", icon: faHouse },
      {
        path: [
          "/Accreditation",
          "/AccreditationDetails",
          "/AllFiles",
          "/ShowDetails",
          "/SuccessUpload",
          "/UploadFiles",
          "/YearDetails",
        ],
        label: "الاعتماد",
        icon: faCopy,
      },
      { path: "/Deadlines", label: "المواعيد النهائية", icon: faStopwatch },
      {
        path: [
          "/ReportsList",
          "/ReportDetails",
          "/FinalReport",
          "/SuccessPage",
        ],
        label: "التقارير",
        icon: faSquarePollVertical,
      },
      { path: ["/Employee", "/AddEmployee"], label: "الموظفين", icon: faUsers },
      { path: ["/Role", "/AddNewRole"], label: "الأدوار", icon: faUserShield },
      {
        path: ["/Pricing", "/Payment"],
        label: "الأسعار",
        icon: faMoneyCheckDollar,
      },
      {
        path: ["/ActivityLog", "/EmployeeProfile"],
        label: "سجل النشاط",
        icon: faChartLine,
      },
    ],

    employee: [
      { path: "/Employee_DashBoard", label: "الرئيسية", icon: faHouse },
      { path: "/CollegesTable", label: "الكليات", icon: faBuildingColumns },
      {
        path: ["/EmployeeReports"],
        label: "التقارير",
        icon: faSquarePollVertical,
      },
      {
        path: ["/PreviousReports", "/CollegeReports"],
        label: "التقارير السابقة",
        icon: faChartLine,
      },
      {
        path: ["/AccreditationEvaluation", "/AccreditationPanel"],
        label: "تقييم الاعتماد",
        icon: faFileCircleCheck,
      },
      {
        path: "/ContactingColleges",
        label: "التواصل مع الكليات",
        icon: faMessage,
      },
    ],
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img className="logo-image" src={logo} alt="Logo" />
      </div>

      <ul className="menu">
        {menuByRole[role]?.map((item) => (
          <li
            key={Array.isArray(item.path) ? item.path[0] : item.path}
            className={isActive(item.path) ? "active item" : "item"}
          >
            <FontAwesomeIcon className="menu-icon" icon={item.icon} />
            <span>
              <Link to={Array.isArray(item.path) ? item.path[0] : item.path}>
                {item.label}
              </Link>
            </span>
          </li>
        ))}
      </ul>

      <div className="suppor-logout">
        <div className={isActive("/Help") ? "active item" : "item"}>
          <FontAwesomeIcon className="menu-icon" icon={faHeadset} />
          <span>
            <Link to="/Help">الدعم</Link>
          </span>
        </div>

        <div
          className="item"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon className="menu-icon" icon={faRightFromBracket} />
          <span>الخروج</span>
        </div>
      </div>

      <div
        className="chatbot-btn"
        onClick={() => navigate("/ChatBot")}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faRobot} />
      </div>
    </div>
  );
}
