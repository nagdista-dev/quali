import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FacultyManagement.css";

const statusConfig = {
  مفعلة: { color: "#16a34a", bg: "#dcfce7" },
  متأخرة: { color: "#dc2626", bg: "#fee2e2" },
  قيد: { color: "#ca8a04", bg: "#fef9c3" },
};

export default function FacultyManagement() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchColleges();
  }, [token]);

  return (
    <div className="college-root">
      <div className="header">
        <h3>ادارة الكليات</h3>
        <button className="add-faculty" onClick={() => navigate("/AddFaculty")}>
          + إضافة كلية
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>اسم الكلية</th>
            <th>اسم الجامعة</th>
            <th>نوع المؤسسة</th>
            <th>نوع الاعتماد</th>
            <th>الحالة</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {
            const s = statusConfig[item.status] || statusConfig["قيد"];

            return (
              <tr
                key={item.id}
                onClick={() => navigate(`/FacultyDetails/${item.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{item.name}</td>
                <td>{item.university}</td>
                <td>{item.institutionType}</td>
                <td>{item.accreditationType}</td>
                <td>
                  <span
                    style={{
                      background: s.bg,
                      color: s.color,
                      padding: "6px 14px",
                      borderRadius: "14px",
                      display: "inline-block",
                      fontWeight: "600",
                    }}
                  >
                    ● {item.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
