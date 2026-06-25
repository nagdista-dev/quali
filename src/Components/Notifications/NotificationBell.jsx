import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function NotificationBell() {
  const navigate = useNavigate();

  // اقري القيمة من localStorage كل مرة يحصل render
  const unreadCount = Number(localStorage.getItem("unreadCount")) || 0;

  return (
    <div
      style={{ position: "relative", cursor: "pointer" }}
      onClick={() => navigate("/notifications")}
    >
      <FontAwesomeIcon
        icon={faBell}
        style={{ fontSize: 25, color: "#002d6f" }}
      />
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: -6,
            right: -6,
            background: "#ff4757",
            color: "#fff",
            padding: "2px 6px",
            borderRadius: "50%",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {unreadCount}
        </span>
      )}
         
    </div>
  );
}
