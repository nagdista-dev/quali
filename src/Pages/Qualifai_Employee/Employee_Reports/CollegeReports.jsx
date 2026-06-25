import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./CollegeReports.css";

const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function CollegeReports() {
  const location = useLocation();
  const navigate = useNavigate();
  const collegeName = location.state?.collegeName || "الكلية";

  const [openId, setOpenId] = useState(null); // ✅ track الـ open
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://qualefai.runasp.net/api/Reports/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReportsData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const toggleReport = (id) => {
    setOpenId(openId === id ? null : id); // ✅ لو مفتوح اقفله، لو مقفول افتحه
  };

  return (
    <div className="college-reports-container">
      {/* Breadcrumb */}
      {/* Header */}
      <div className="college-reports-header">
        <div className="college-breadcrumb">
          <span className="breadcrumb-back" onClick={() => navigate(-1)}>
            التقارير السابقة
          </span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{collegeName}</span>
        </div>
        <button className="college-filter-btn">
          <FontAwesomeIcon icon={faSliders} />
        </button>
      </div>

      {/* Search */}
      <div className="college-search-wrapper">
        <input
          type="text"
          className="college-search-input"
          placeholder="ابحث باسم الكلية"
        />
        <span className="college-search-icon">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
      </div>

      {/* Reports List */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>جاري التحميل...</p>
      ) : (
        <div className="college-reports-list">
          {reportsData.map((report) => (
            <div key={report.id} className="college-report-row">
              <div className="report-right">
                {/* ✅ السهم يفتح ويقفل */}
                <span
                  className={`report-arrow ${openId === report.id ? "open" : ""}`}
                  onClick={() => toggleReport(report.id)}
                >
                  ›
                </span>
                <div className="report-info">
                  <span className="report-title">{report.title || "عنوان التقرير غير محدد"}</span>
                  {/* ✅ التفاصيل تظهر بس لو مفتوح */}
                  {openId === report.id && (
                    <p className="report-details">{report.details || "لا توجد تفاصيل"}</p>
                  )}
                </div>
              </div>

              <div className="report-left">
                <div className="report-date-wrapper">
                  <span className="report-date-label">تاريخ الارسال</span>
                  <span className="report-date">{report.date || report.createdAt || "غير محدد"}</span>
                </div>
                <button className="report-download-btn">
                  <DownloadIcon /> تحميل التقرير
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
