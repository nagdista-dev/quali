import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import loginImage from "../../assets/sucessImage.png";
import backgroundImage from "../../assets/BG.jpg";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const mapRole = (roleName) => {
    switch (roleName) {
      case "مدير النظام":
        return "admin";
      case "مدير الجوده":
        return "manager";
      case "موظف الجوده":
        return "employee";
      default:
        return "employee";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("من فضلك أدخل بريد إلكتروني صحيح");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://qualefai.runasp.net/api/Auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        const mappedRole = mapRole(data.role);

        console.log("API Role:", data.role);
        console.log("Mapped Role:", mappedRole);

        localStorage.clear();

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", mappedRole);
        localStorage.setItem("email", email);

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        if (mappedRole === "admin") {
          navigate("/DashBard_Admin");
        } else if (mappedRole === "manager") {
          navigate("/DashBoard");
        } else {
          navigate("/Employee_DashBoard");
        }
      } else {
        setError(data.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("حدث خطأ في الاتصال بالخادم");
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

          <form onSubmit={handleLogin} className="auth-form" autoComplete="off">
            {/* Email */}
            <div className="auth-input-group">
              <label className="auth-label">البريد الإلكتروني</label>
              <div className="auth-input-container">
                <FontAwesomeIcon icon={faUser} className="auth-input-icon" />
                <input
                  type="email"
                  autoComplete="off"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="auth-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-input-group">
              <label className="auth-label">كلمة المرور</label>
              <div className="auth-input-container auth-password-container">
                <FontAwesomeIcon icon={faLock} className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="auth-input auth-password-input"
                />
                <button
                  type="button"
                  className="auth-toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && <div className="auth-error-message">{error}</div>}

            <div className="auth-options-row">
              <label className="auth-remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>تذكرني في المرة القادمة</span>
              </label>

              <a href="/SignUp" className="auth-forgot-link">
                نسيت كلمة المرور؟
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
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
