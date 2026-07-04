import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NotificationBell from "../Notifications/NotificationBell";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./Topbar.css";

const TopBar = ({ user }) => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <Link to="/Profile" className="user-profile-link">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="avatar" />
          ) : (
            <FontAwesomeIcon icon={faUser} className="avatar-icon" />
          )}
          <div className="user-info-text">
            <span className="username">{user.name || "المستخدم"}</span>
            {user.roleName && <span className="role">{user.roleName}</span>}
          </div>
        </Link>
      </div>

      <div className="topbar-right">
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
    </div>
  );
};

export default TopBar;
