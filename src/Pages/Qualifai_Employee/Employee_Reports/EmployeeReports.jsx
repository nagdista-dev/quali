import { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeReports.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const DownloadIcon = () => (
  <svg
    width="15"
    height="15"
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

export default function EmployeeReports() {
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
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <h2 className="reports-title">التقارير</h2>

        {/* فلتر FontAwesome */}
        <button className="filter-btn">
          <FontAwesomeIcon icon={faSliders} />
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>جاري التحميل...</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>اسم الكلية</th>
              <th>عنوان التقرير</th>
              <th>تاريخ الارسال</th>
              <th>الحالة</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {reportsData.map((r) => (
              <tr key={r.id}>
                <td>{r.collegeName}</td>
                <td>{r.reportTitle}</td>

                <td className="date-cell">{r.sendDate}</td>

                <td className="status-column">
                  <div className="status-cell" style={{ color: r.statusColor || "#000" }}>
                    <span
                      className="status-dot1"
                      style={{ background: r.statusColor || "#ccc" }}
                    />
                    <span>{r.status}</span>
                  </div>
                </td>

                <td>
                  <div className="actions-cell">
                    <button className="download-btn">
                      <DownloadIcon /> تحميل
                    </button>

                    <button className="notes-btn">ارسال ملاحظات</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
