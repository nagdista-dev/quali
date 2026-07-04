import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import loginImage from "../../assets/sucessImage.png";
import backgroundImage from "../../assets/BG.jpg";

// استخدمي نفس CSS الخاص بالـ Login
import "./Login.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    if (!username.trim()) {
      setError("يجب إدخال اسم المستخدم");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("البريد الإلكتروني غير صحيح");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://qualefai.runasp.net/api/Auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("تم إرسال كلمة المرور على بريدك الإلكتروني");

        setTimeout(() => {
          navigate("/verify-password");
        }, 2000);
      } else {
        setError(data.message || "هناك خطأ في البيانات");
      }
    } catch (err) {
      console.error(err);
      setError("فشل الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-page-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="auth-card">
        {/* الفورم على اليمين */}
        <div className="auth-card-right">
          <h2 className="auth-title">Welcome to QualifAI</h2>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-input-group">
              <label className="auth-label">اسم المستخدم</label>

              <div className="auth-input-container">
                <FontAwesomeIcon icon={faUser} className="auth-input-icon" />

                <input
                  type="text"
                  className="auth-input"
                  placeholder="اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label">البريد الإلكتروني</label>

              <div className="auth-input-container">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="auth-input-icon"
                />

                <input
                  type="email"
                  className="auth-input"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {message && (
              <div
                style={{
                  background: "rgba(34,197,94,.15)",
                  border: "1px solid rgba(34,197,94,.4)",
                  padding: "12px",
                  borderRadius: "8px",
                  color: "#86efac",
                  textAlign: "center",
                  direction: "rtl",
                }}
              >
                {message}
              </div>
            )}

            {error && <div className="auth-error-message">{error}</div>}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "جاري الإرسال..." : "إرسال كلمة المرور"}
            </button>
          </form>
        </div>

        {/* الروبوت على الشمال */}
        <div className="auth-card-left">
          <img src={loginImage} alt="robot" className="robot-image" />
        </div>
      </div>
    </div>
  );
}
