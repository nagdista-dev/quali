import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import loginImage from "../../assets/sucessImage.png";
import backgroundImage from "../../assets/BG.jpg";
import "./SignUp.css";

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

    // ======= التحقق من الاسم والبريد قبل الإرسال =======
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
    // ================================================

    try {
      // 🔥 إرسال البيانات للباك اند
      const response = await fetch(
        "https://qualefai.runasp.net/api/Auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
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
        // رسالة محددة لو السيرفر رجع خطأ
        setError(data.message || "هناك خطأ في البيانات، تحقق وحاول مرة أخرى");
      }
    } catch (err) {
      // فقط لو فيه مشكلة اتصال بالإنترنت أو السيرفر
      setError("فشل الاتصال بالخادم، يرجى المحاولة لاحقًا");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-card">
        <div className="login-left">
          <img src={loginImage} alt="robot" />
        </div>

        <div className="login-right">
          <h2>Welcome to QualifAI</h2>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>اسم المستخدم</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label>البريد الالكتروني</label>
              <div className="input-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  type="email"
                  placeholder="الرجاء كتابة البريد الالكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* رسائل النجاح والخطأ */}
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? "جاري الإرسال..." : "ارسال كلمة المرور"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
