import axios from "axios";
import "./Notifications.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token],
  );

  const API = "https://qualefai.runasp.net/api/Notification";

  // Get Notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(API, { headers });

      console.log(res.data); // 👈 ضيفي السطر ده

      setNotifications(res.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [headers]);

  // Get Unread Count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/unread-count`, {
        headers,
      });

      setUnreadCount(res.data.unreadCount || 0);
      localStorage.setItem("unreadCount", res.data.unreadCount || 0);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  }, [headers]);

  // Mark All Read
  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${API}/mark-all-read`,
        {},
        {
          headers,
        },
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );

      setUnreadCount(0);
      localStorage.setItem("unreadCount", "0");
    } catch (error) {
      console.error("Error marking notifications:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([fetchNotifications(), fetchUnreadCount()]);

      setLoading(false);
    };

    loadData();
  }, [fetchNotifications, fetchUnreadCount]);

  if (loading) {
    return <div className="loading">جاري تحميل الإشعارات...</div>;
  }
  console.log("Notifications Page Rendered");
  return (
    <div className="gray-container">
      <div className="white-container">
        <div className="notifications-header">
          <h2 className="title">الإشعارات</h2>

          <span className="unread-count">غير المقروءة: {unreadCount}</span>

          <button className="mark-all-btn" onClick={markAllAsRead}>
            تعيين الكل كمقروء
          </button>
        </div>

        <div className="notifications-card">
          {notifications.length === 0 ? (
            <p className="no-data">لا توجد إشعارات حالياً</p>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`notification-item ${!item.isRead ? "unread" : ""}`}
              >
                <div className="notification-content">
                  <h3 className="notification-title">{item.title}</h3>

                  <p className="notification-message">{item.message}</p>

                  <span className="notification-time">{item.createdAt}</span>
                </div>

                {!item.isRead && <div className="notification-dot"></div>}
              </div>
            ))
          )}
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
