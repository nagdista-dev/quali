import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NotificationBell from "../Notifications/NotificationBell";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./TopBar.css";

const TopBar = ({ user }) => {
  return (
    <div className="topbar">
      <div className="topbar-item">
        <Link to="/Profile" className="user-profile-link">
          <div className="user-info-text">
            <span className="username">{user.name || "المستخدم"}</span>
            {user.roleName && <span className="role">{user.roleName}</span>}
          </div>

          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUser} className="avatar-icon" />
          )}
        </Link>
      </div>

      <div className="search">
        <div className="search-input-wrapper">
          <span className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input type="text" placeholder="نص البحث" />
        </div>
      </div>

      <div className="topbar-item notifications">
        <NotificationBell />
      </div>
    </div>
  );
};

export default TopBar;
