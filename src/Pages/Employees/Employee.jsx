import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Employee.css";

export default function EmployeeBox() {
  const location = useLocation();
  const navigate = useNavigate();
  const newEmployee = location.state?.updatedEmployee || null;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // 🔹 Toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // 🔹 جلب الموظفين
  useEffect(() => {
    axios
      .get("https://qualefai.runasp.net/api/Employee")
      .then((response) => {
        let employees = response.data;

        if (newEmployee) {
          const index = employees.findIndex(
            (e) => e.employeeId === newEmployee.employeeId,
          );
          if (index !== -1) employees[index] = newEmployee;
          else employees.push(newEmployee);
        }

        setData(employees);
        setLoading(false);
      })
      .catch(() => {
        setError("فشل تحميل البيانات");
        setLoading(false);
      });
  }, [newEmployee]);

  // 🔹 فتح المودال
  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // 🔹 تنفيذ الحذف
  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(
        `https://qualifai.runasp.net/api/Employee/${selectedId}`,
      );
      setData((prev) => prev.filter((emp) => emp.employeeId !== selectedId));
      showToast("تم حذف الموظف بنجاح ✅", "success");
    } catch {
      showToast("حدث خطأ أثناء حذف الموظف ❌", "error");
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
  };

  // 🔹 زر التعديل: ينقل لصفحة EmployeeProfile
  const handleEditEmployee = (employee) => {
    // هنا ممكن نمرر الـ employeeId كـ param
    navigate(`/EmployeeProfile/${employee.employeeId}`);
  };

  if (loading) return <p>جارٍ التحميل…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="white-container">
      {/* Toast */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}

      {/* Header */}
      <div className="add-btn-container">
        <h2 className="page-title">الموظفين</h2>
        <Link to="/AddEmployee" className="add-btn">
          <FontAwesomeIcon icon={faPlus} /> إضافة موظف جديد
        </Link>
      </div>

      {/* Table */}
      <table className="employees-table">
        <thead>
          <tr>
            <th>الدور</th>
            <th>الإيميل</th>
            <th>الفعل</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.employeeId}>
              <td>{row.roleName}</td>
              <td>{row.userName}</td>
              <td>{row.action}</td>
              <td className="actions-cell">
                {/* هنا زر التعديل ينقلك مباشرة للـ EmployeeProfile */}
                <button
                  className="btn-edit"
                  onClick={() => handleEditEmployee(row)}
                >
                  تعديل <FontAwesomeIcon icon={faPenToSquare} />
                </button>

                <button
                  className="btn-delete1"
                  onClick={() => openDeleteModal(row.employeeId)}
                >
                  حذف الموظف <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h3>تأكيد الحذف</h3>
            <p>هل أنتِ متأكدة من حذف هذا الموظف؟</p>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                إلغاء
              </button>
              <button className="btn-confirm" onClick={handleDeleteEmployee}>
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
