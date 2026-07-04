import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ReportsList.css";

const ReportsList = () => {
  const navigate = useNavigate();
  const [reportsData, setReportsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

        console.log("Reports API:", res.data);

        setReportsData(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="reports-container">
        <p className="loading">جاري تحميل التقارير...</p>
      </div>
    );
  }

  return (
    <div className="reports-container" dir="rtl">
      <div className="reports-header">
        <h2 className="header-title">التقارير</h2>
      </div>

      {reportsData.length === 0 ? (
        <p className="no-data">لا توجد تقارير</p>
      ) : (
        <div className="reports-list">
          {reportsData.map((college) => (
            <div key={college.collegeId} className="college-section">
              <h3 className="college-title">كلية {college.collegeName}</h3>

              {college.reports?.length > 0 ? (
                college.reports.map((report) => (
                  <div key={report.id} className="report-item">
                    <div className="report-info">
                      <h4>{report.originalName}</h4>

                      <span className="report-date">
                        {new Date(report.uploadedAt).toLocaleDateString(
                          "ar-EG",
                        )}
                      </span>
                    </div>

                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate("/ReportDetails", {
                          state: {
                            report,
                            reportId: report.id,
                            collegeId: college.collegeId,
                            collegeName: college.collegeName,
                          },
                        })
                      }
                    >
                      عرض التقرير
                    </button>
                  </div>
                ))
              ) : (
                <p>لا توجد تقارير لهذه الكلية</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsList;
