import { useState, useEffect } from "react";
import "./AccreditationEvaluation.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import collegeImage from "../../../assets/college-logo.png";

export default function AccreditationEvaluation() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://qualefai.runasp.net/api/Colleges", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setColleges(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const filtered = colleges.filter(
    (c) => (c.name && c.name.includes(search)) || search === "",
  );

  const dotClass = (type) =>
    type === "red" ? "dot-red" : type === "green" ? "dot-green" : "dot-yellow";

  const textClass = (type) =>
    type === "red"
      ? "text-red"
      : type === "green"
        ? "text-green"
        : "text-yellow";

  return (
    <div className="accreditation-page">
      <div className="top-nav">
        <span className="nav-title">تقييم الاعتماد</span>

        <button className="filter-btn">⇅</button>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <input
            type="text"
            placeholder="ابحث بـ اسم الكلية"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>جاري التحميل...</p>
      ) : (
        <div className="colleges-grid">
          {filtered.map((college) => {
            const statusType = college.statusColor || "yellow"; // Default if not provided
            return (
              <div className="college-card" key={college.id}>
                <div className="card-logo">
                  <img src={collegeImage} alt="College Logo" />
                </div>
                <div className="card-name">{college.name}</div>
                <div className="status-row">
                  <span className="status-label">حالة الاعتماد</span>

                  <div className={`status-badge ${textClass(statusType)}`}>
                    <span
                      className={`status-dot ${dotClass(statusType)}`}
                    ></span>
                    {college.status || "قيد المراجعة"}
                  </div>
                </div>
                <button
                  className="card-btn"
                  onClick={() => navigate("/AccreditationPanel")}
                >
                  عرض تقييم الاعتماد
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
