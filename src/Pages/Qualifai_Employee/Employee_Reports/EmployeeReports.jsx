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
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://qualefai.runasp.net/api/Reports/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const flattenedReports = res.data.flatMap((college) =>
        college.reports.map((report) => ({
          ...report,
          collegeId: college.collegeId,
          collegeName: college.collegeName,
        })),
      );

      setReportsData(flattenedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (collegeId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `https://qualefai.runasp.net/api/Reports/college/${collegeId}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `college-report-${collegeId}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("حدث خطأ أثناء تحميل التقرير");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="reports-container-rep">
      <div className="reports-header-rep">
        <h2 className="reports-title">التقارير</h2>

        <button className="filter-btn-rep">
          <FontAwesomeIcon icon={faSliders} />
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>جاري التحميل...</p>
      ) : reportsData.length === 0 ? (
        <p style={{ textAlign: "center" }}>لا توجد تقارير</p>
      ) : (
        <table className="reports-table-rep">
          <thead>
            <tr>
              <th>اسم الكلية</th>
              <th>اسم الملف</th>
              <th>تاريخ الرفع</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {reportsData.map((report) => (
              <tr key={report.id}>
                <td>{report.collegeName}</td>

                <td>{report.originalName}</td>

                <td className="date-cell-rep">
                  {formatDate(report.uploadedAt)}
                </td>

                <td className="status-column-rep">
                  <div className="status-cell-rep">
                    <span
                      className="status-dot1-rep"
                      style={{ background: "#28a745" }}
                    />
                    <span>تم الرفع</span>
                  </div>
                </td>

                <td>
                  <div className="actions-cell-rep">
                    <button
                      className="download-btn-rep"
                      onClick={() => handleDownload(report.collegeId)}
                    >
                      <DownloadIcon />
                      تحميل
                    </button>

                    <button
                      className="notes-btn-rep"
                      onClick={() =>
                        alert(
                          "إرسال الملاحظات متاح حالياً عبر صفحة تقييم الاعتماد",
                        )
                      }
                    >
                      إرسال ملاحظات
                    </button>
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
