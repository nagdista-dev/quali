import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SendNotification.css";

const SendNotifications = () => {
  const [collegeId, setCollegeId] = useState(1);
  const [sendTime, setSendTime] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleDelete = () => {
    setCollegeId(1);
    setSendTime("");
    setTitle("");
    setMessage("");
  };

  const handleSend = async () => {
    // ✅ Validation مهم جدًا لتجنب 400
    if (!collegeId || !title.trim() || !message.trim()) {
      alert("من فضلك املي كل البيانات");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        collegeId: Number(collegeId),
        title: title.trim(),
        message: message.trim(),
        scheduledAt: sendTime
          ? new Date(sendTime).toISOString()
          : new Date().toISOString(),
      };

      const res = await axios.post(
        "https://qualefai.runasp.net/api/AdminNotification/send",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("SUCCESS:", res.data);
      alert("تم إرسال الإشعار بنجاح ✅");

      navigate("/Notifications");
    } catch (error) {
      console.error("ERROR:", error.response?.data || error);

      alert(error.response?.data?.message || "حدث خطأ أثناء إرسال الإشعار ❌");
    }
  };

  return (
    <div className="sn-page">
      <h2 className="sn-title">ارسال اشعارات</h2>

      {/* Row: إرسال + عنوان + تاريخ */}
      <div className="sn-row">
        {/* عنوان الإشعار */}
        <div className="sn-field">
          <label className="sn-label">عنوان الاشعار</label>
          <input
            type="text"
            className="sn-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="حاسبات"
          />
        </div>
        {/* إرسال إلى */}
        <div className="sn-field">
          <label className="sn-label">إرسال الى</label>
          <div className="sn-select-wrapper">
            <select
              className="sn-select"
              value={collegeId}
              onChange={(e) => setCollegeId(Number(e.target.value))}
            >
              <option value={1}>حكومية</option>
              <option value={2}>خاصة</option>
              <option value={3}>أهلية</option>
            </select>
            <span className="sn-arrow">▾</span>
          </div>
        </div>

        {/* التاريخ */}
        <div className="sn-field">
          <label className="sn-label">وقت الإرسال</label>
          <input
            type="datetime-local"
            className="sn-input"
            value={sendTime}
            onChange={(e) => setSendTime(e.target.value)}
          />
        </div>
      </div>

      {/* Message */}
      <div className="sn-field">
        <label className="sn-label">نص الاشعار</label>
        <textarea
          className="sn-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
        />
      </div>

      {/* Buttons */}
      <div className="sn-button-row">
        <button className="sn-btn sn-btn-send" onClick={handleSend}>
          ارسال
        </button>
        <button className="sn-btn sn-btn-delete" onClick={handleDelete}>
          حذف
        </button>
      </div>
    </div>
  );
};

export default SendNotifications;
