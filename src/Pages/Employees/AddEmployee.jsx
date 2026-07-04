import "./AddEmployee.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EmployeeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    employeeId: "",
  });

  const [errors, setErrors] = useState({});
  const [roles, setRoles] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // =================== Load Roles from API =================== //
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://qualefai.runasp.net/api/Roles", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRoles(res.data))
      .catch(() => console.log("خطأ في تحميل الأدوار"));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ======================= Validation ======================= //
  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[\u0621-\u064A]+$/;
    const idRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName) newErrors.firstName = "الاسم الأول مطلوب";
    else if (!nameRegex.test(formData.firstName))
      newErrors.firstName = "الاسم الأول يجب أن يحتوي على حروف فقط";

    if (!formData.lastName) newErrors.lastName = "الاسم الأخير مطلوب";
    else if (!nameRegex.test(formData.lastName))
      newErrors.lastName = "الاسم الأخير يجب أن يحتوي على حروف فقط";

    if (!formData.employeeId) newErrors.employeeId = "تعريف الموظف مطلوب";
    else if (!idRegex.test(formData.employeeId))
      newErrors.employeeId = "تعريف الموظف يجب أن يحتوي على أرقام فقط";

    if (!formData.email) newErrors.email = "الإيميل مطلوب";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "الإيميل غير صالح";

    if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";

    if (!formData.role) newErrors.role = "يرجى اختيار دور الموظف";

    return newErrors;
  };

  // ======================= Submit Handler ======================= //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const selectedRole = roles.find((r) => r.roleName === formData.role);

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        employeeId: formData.employeeId,
        roleId: selectedRole?.roleId,
      };

      const token = localStorage.getItem("token");

      await axios.post("https://qualefai.runasp.net/api/Employee", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Show Success Modal
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        employeeId: "",
      });

      // ⏳ Redirect after 2s
      setTimeout(() => {
        navigate("/Employee");
      }, 2000);
    } catch (error) {
      console.log("خطأ أثناء إضافة الموظف:", error);
      alert(error.response?.data || "حدث خطأ أثناء إضافة الموظف");
    }
  };

  return (
    <div className="form-container">
      <div className="breadcrumb1">
        <span className="current">الموظفين</span>
        <span className="separator">›</span>
        <span className="current">إضافة موظف جديد</span>
      </div>

      <form className="employee-form" onSubmit={handleSubmit}>
        {/* Row 1: First & Last Name */}
        <div className="row">
          <div className="input-group1">
            <label>الاسم الأول للموظف</label>
            <input
              type="text"
              name="firstName"
              placeholder="اضافه الاسم الأول"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>

          <div className="input-group1">
            <label>الاسم الأخير للموظف</label>
            <input
              type="text"
              name="lastName"
              placeholder="اضافه الاسم الأخير"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>
        </div>

        {/* Row 2: Email & Password */}
        <div className="row">
          <div className="input-group1">
            <label>اسم المستخدم (الإيميل)</label>
            <input
              type="email"
              name="email"
              placeholder="User@gmail.com" // ✅ غير الـ placeholder
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="input-group1">
            <label>كلمة المرور</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********" // ✅ غير الـ placeholder
                value={formData.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
        </div>

        {/* Row 3: Employee ID */}
        <div className="row">
          <div className="input-group1 full">
            <label>تعريف الموظف</label>
            <input
              type="text"
              name="employeeId"
              placeholder="ID"
              value={formData.employeeId}
              onChange={handleChange}
            />
            {errors.employeeId && (
              <span className="error">{errors.employeeId}</span>
            )}
          </div>
        </div>

        {/* Row 4: Role */}
        <div className="row">
          <div className="input-group1 full">
            <label>دور الموظف</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="" disabled hidden>
                اختر من القائمة
              </option>
              {roles
                .filter((role) => role.roleName !== "string")
                .map((role) => (
                  <option key={role.roleId} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
            </select>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>
        </div>

        <div className="submit-wrapper">
          <button className="submit-btn2" type="submit">
            إضافة موظف
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </div>
      </form>

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">✔</div>
            <h2>تمت إضافة الموظف بنجاح</h2>
            <p>تم حفظ بيانات الموظف في النظام بنجاح</p>
            <button onClick={() => navigate("/Employee")}>حسنًا</button>
          </div>
        </div>
      )}
    </div>
  );
}
