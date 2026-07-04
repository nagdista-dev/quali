import "./Role.css";
import { FaUser, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Role = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://qualefai.runasp.net/api/Roles", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRoles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching roles:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="gray-container">
      <div className="white-container">
        {/* Header */}
        <div className="roles-header">
          <h2>الأدوار</h2>
          <button
            className="add-role-btn"
            onClick={() => navigate("/AddNewRole")}
          >
            <FaPlus /> إنشاء دور جديد
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <p style={{ textAlign: "center" }}>جاري تحميل الأدوار...</p>
        ) : (
          <table className="roles-table">
            <thead>
              <tr>
                <th>بطاقة تعريف</th>
                <th>موظفين</th>
                <th>الدور</th>
                <th>وصف الدور</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.roleId}>
                  <td>{role.roleId}</td>
                  <td className="employees-cell">
                    <FaUser />
                    <span>{role.employeesCount}</span>
                  </td>
                  <td className="edit-text">{role.roleName}</td>
                  <td>{role.roleDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Role;
