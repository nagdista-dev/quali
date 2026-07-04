import "./ActivityLog.css";
import { Link } from "react-router-dom";
import {
  faArrowDownWideShort,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ActivityLog() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token"); // مهم

    axios
      .get("https://qualefai.runasp.net/api/ActivityLog", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("فشل تحميل سجل الأنشطة:", err);
        setError("فشل تحميل البيانات");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>جارٍ التحميل…</p>;
  if (error) return <p>{error}</p>;

  // ✅ فلترة صح
  const filteredRows = rows.filter(
    (row) =>
      row.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.action.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ✅ Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <div className="gray-container">
      <div className="white-container">
        <div className="title-row">
          <h2 className="title">سجل الأنشطة</h2>

          <FontAwesomeIcon
            icon={faArrowDownWideShort}
            className="filter-icon"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>

        {showFilter && (
          <input
            type="text"
            placeholder="ابحث بالاسم أو الدور أو الفعل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        )}

        <table className="activities-table">
          <thead>
            <tr>
              <th>بطاقة تعريف</th>
              <th>اسم الموظف</th>
              <th>الدور</th>
              <th>الفعل</th>
              <th>آخر تعديل</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row, i) => (
              <tr key={i}>
                <td>{row.employeeId}</td>

                <td>
                  <Link to={`/EmployeeProfile/${row.employeeId}`}>
                    {row.employeeName}
                  </Link>
                </td>

                <td>{row.role}</td>
                <td>{row.action}</td>

                <td>{row.lastModifiedFormatted}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {(currentPage > 1 || totalPages > 1) && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowRight} /> السابق
            </button>

            <span>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              التالي <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
