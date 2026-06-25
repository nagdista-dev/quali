import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ReportsList.css";

const ReportsList = () => {
  const navigate = useNavigate(); // ← ده المسؤول عن فتح صفحة جديدة
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

  return (
    <div className="reports-container" dir="rtl">
      {/* رأس القائمة */}
      <div className="reports-header">
        <h2 className="header-title">التقارير</h2>

        <div className="header-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </div>
      </div>

      {/* قائمة التقارير */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>جاري التحميل...</p>
      ) : (
        <div className="reports-list">
          {reportsData.map((report) => (
            <div key={report.id} className="report-item">
              <span className="report-date">
                تقرير بتاريخ <span className="date-number">{report.date || report.createdAt || "غير محدد"}</span>
              </span>

              <button
                className="view-btn"
                onClick={() => navigate("/ReportDetails")}
              >
                عرض التقرير
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsList;
