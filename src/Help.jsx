import React, { useState } from "react";
import "./Help.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("من فضلك املأ جميع الحقول");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://qualefai.runasp.net/api/Support/submit",
        {
          name,
          email,
          message,
        },
      );

      if (response.data.success) {
        alert(response.data.message);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إرسال الرسالة ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="support-page">
      <div className="support-container">
        {/* الهيدر */}
        <div className="header-section1">
          <h1>فريق الدعم</h1>
          <p>
            نحن نقدم دعماً موثوقاً وحلولاً مخصصة لضمان حل مشكلاتك بسرعة وكفاءة.
          </p>
        </div>

        {/* الفورم */}
        <form onSubmit={handleSubmit}>
          <div className="form-group-row1">
            <div className="input-wrapper1">
              <label>الاسم</label>
              <input
                type="text"
                placeholder="الاسم"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-wrapper1">
              <label>الايميل</label>
              <input
                type="email"
                placeholder="user@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-wrapper1">
            <label>الرسالة</label>
            <textarea
              placeholder="اكتب رسالتك هنا..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn1" disabled={loading}>
            {loading ? (
              "جاري الإرسال..."
            ) : (
              <>
                إرسال
                <FontAwesomeIcon icon={faPaperPlane} className="send-icon1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;
