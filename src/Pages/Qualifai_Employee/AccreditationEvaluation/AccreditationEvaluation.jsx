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

        const res = await axios.get(
          "https://qualefai.runasp.net/api/Quality/colleges",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setColleges(res.data || []);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const filtered = colleges.filter((college) =>
    college.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const dotClass = (type) => {
    switch (type) {
      case "green":
        return "dot-green";
      case "red":
        return "dot-red";
      case "orange":
        return "dot-orange";
      default:
        return "dot-yellow";
    }
  };

  const textClass = (type) => {
    switch (type) {
      case "green":
        return "text-green";
      case "red":
        return "text-red";
      case "orange":
        return "text-orange";
      default:
        return "text-yellow";
    }
  };

  return (
    <div className="accreditation-page">
      {/* Header */}
      <div className="top-nav">
        <span className="nav-title">تقييم الاعتماد</span>

        <button className="filter-btn">⇅</button>
      </div>

      {/* Search */}
      <div className="search-wrap">
        <div className="search-box">
          <input
            type="text"
            placeholder="ابحث باسم الكلية"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          جاري التحميل...
        </p>
      ) : filtered.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#64748b",
          }}
        >
          لا توجد كليات
        </p>
      ) : (
        <div className="colleges-grid">
          {filtered.map((college) => {
            const statusColor = college.accreditationStatusColor || "orange";

            const logoUrl = college.imagePath
              ? `https://qualefai.runasp.net${college.imagePath}`
              : collegeImage;

            return (
              <div className="college-card" key={college.id}>
                {/* Logo */}
                <div className="card-logo">
                  <img
                    src={logoUrl}
                    alt={college.name}
                    onError={(e) => {
                      e.target.src = collegeImage;
                    }}
                  />
                </div>

                {/* College Name */}
                <div className="card-name">{college.name}</div>

                {/* University */}
                <div
                  style={{
                    textAlign: "center",
                    color: "#64748b",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                >
                  {college.university}
                </div>

                {/* Accreditation Status */}
                <div className="status-row">
                  <span className="status-label">حالة الاعتماد</span>

                  <div className={`status-badge ${textClass(statusColor)}`}>
                    <span
                      className={`status-dot ${dotClass(statusColor)}`}
                    ></span>

                    {college.accreditationStatus}
                  </div>
                </div>

                {/* Readiness */}

                {/* Button */}
                <button
                  className="card-btn"
                  onClick={() =>
                    navigate("/AccreditationPanel", {
                      state: {
                        collegeId: college.id,
                        collegeName: college.name,
                      },
                    })
                  }
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
