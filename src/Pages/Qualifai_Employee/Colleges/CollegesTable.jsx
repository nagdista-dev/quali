import React, { useEffect, useState } from "react";
import "./CollegesTable.css";
import axios from "axios";

const CollegesTable = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ================= GET ALL COLLEGES =================
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get(
          "https://qualefai.runasp.net/api/Colleges",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setColleges(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, [token]);

  return (
    <div className="colleges-container1">
      {/* Header */}
      <div className="colleges-header1">
        <h2 className="header-title1">الكليات</h2>

        <button className="filter-btn1">
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
            <line x1="4" y1="8" x2="20" y2="8"></line>
            <circle cx="8" cy="8" r="2" fill="white"></circle>
            <line x1="4" y1="16" x2="20" y2="16"></line>
            <circle cx="16" cy="16" r="2" fill="white"></circle>
          </svg>
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper1">
        {loading ? (
          <p style={{ textAlign: "center" }}>جاري التحميل...</p>
        ) : (
          <table className="colleges-table1">
            <thead>
              <tr>
                <th>اسم الكلية</th>
                <th>الجهة</th>
                <th>نسبة الجاهزية</th>
                <th>تاريخ آخر رفع</th>
                <th>الحالة</th>
              </tr>
            </thead>

            <tbody>
              {colleges.map((row) => (
                <tr key={row.id}>
                  {/* اسم الكلية */}
                  <td className="college-name1">{row.name}</td>

                  {/* الجامعة */}
                  <td className="college-entity1">{row.university}</td>

                  {/* نسبة الجاهزية */}
                  <td className="college-readiness1">
                    {row.readinessPercentage}%
                  </td>

                  {/* التاريخ */}
                  <td className="college-date1">{row.lastUploadDate || "-"}</td>

                  {/* الحالة */}
                  <td>
                    <div className="status-container1">
                      <span className="status-text1">{row.status}</span>
                      <span className={`status-dot9 ${row.statusColor}`}></span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CollegesTable;
