import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout = ({ user }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <TopBar user={user} />
        <div className="gray-container">
          <div className="white-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
