import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const collegeName = location.state?.collegeName || "الكلية";

  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://qualefai.runasp.net/api/Reports/college/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setReportsData(res.data || []);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReports();
    }
  }, [id]);

  const toggleReport = (reportId) => {
    setOpenId(openId === reportId ? null : reportId);
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://qualefai.runasp.net/api/Reports/college/${id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${collegeName}.pdf`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download Error:", error);
      alert("فشل تحميل التقرير");
    }
  };

  const formatDate = (date) => {
    if (!date) return "غير متوفر";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const filteredReports = reportsData.filter((report) =>
    report.originalName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="college-reports-container">
      {/* Header */}
      <div className="college-reports-header">
        <div className="college-breadcrumb">
          <span
            className="breadcrumb-back"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          >
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
          placeholder="ابحث باسم التقرير"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Reports */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          جاري التحميل...
        </p>
      ) : filteredReports.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#64748b",
          }}
        >
          لا توجد تقارير
        </p>
      ) : (
        <div className="college-reports-list">
          {filteredReports.map((report) => (
            <div key={report.id} className="college-report-row">
              <div className="report-right">
                <span
                  className={`report-arrow ${
                    openId === report.id ? "open" : ""
                  }`}
                  onClick={() => toggleReport(report.id)}
                  style={{ cursor: "pointer" }}
                >
                  ›
                </span>

                <div className="report-info">
                  <span className="report-title">{report.originalName}</span>

                  {openId === report.id && (
                    <div className="report-details">
                      <p>
                        <strong>اسم الكلية:</strong> {report.collegeName}
                      </p>

                      <p>
                        <strong>رقم التقرير:</strong> {report.id}
                      </p>

                      <p>
                        <strong>تاريخ الرفع:</strong>{" "}
                        {formatDate(report.uploadedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="report-left">
                <div className="report-date-wrapper">
                  <span className="report-date-label">تاريخ الرفع</span>

                  <span className="report-date">
                    {formatDate(report.uploadedAt)}
                  </span>
                </div>

                <button
                  className="report-download-btn"
                  onClick={handleDownload}
                >
                  <DownloadIcon />
                  تحميل التقرير
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
