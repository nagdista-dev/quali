// import { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  const API = "https://qualefai.runasp.net/api/Notification";

  // 1️⃣ جلب الإشعارات
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(API, { headers });
      setNotifications(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [API, headers]);

  // 2️⃣ جلب unread count (لو عايزة تعرضيه في navbar)
  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/unread-count`, { headers });
      localStorage.setItem("unreadCount", res.data.unreadCount);
    } catch (error) {
      console.error(error);
    }
  }, [API, headers]);

  // 3️⃣ mark all as read
  const markAllAsRead = async () => {
    try {
      await axios.put(`${API}/mark-all-read`, {}, { headers });
      localStorage.setItem("unreadCount", 0);
      fetchNotifications(); // refresh
    } catch (error) {
      console.error(error);
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

  return (
    <div className="gray-container">
      <div className="white-container">
        <h2 className="title">الإشعارات</h2>

        {/* زرار مهم */}
        <button className="mark-all-btn" onClick={markAllAsRead}>
          تعيين الكل كمقروء
        </button>

        <div className="notifications-card">
          {notifications.length === 0 && (
            <p className="no-data">لا توجد إشعارات حالياً</p>
          )}

          {notifications.map((item) => (
            <div key={item.id} className="notification-item">
              <h3>• {item.title}</h3>
              <p>{item.description}</p>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chatbot-btn" onClick={() => navigate("/ChatBot")} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faRobot} />
      </div>
    </div>
  );
}
