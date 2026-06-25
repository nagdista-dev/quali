import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./EmployeeProfile.css";

export default function EmployeeProfile() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    employeeId: "",
    role: "",
  });

  const [activities, setActivities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ تحميل بيانات الموظف
  useEffect(() => {
    axios
      .get("https://qualefai.runasp.net/api/Employee")
      .then((res) => {
        const emp = res.data.find((e) => e.employeeId == id);

        if (emp) {
          setFormData({
            firstName: emp.userName?.split("@")[0] || "",
            lastName: "",
            email: emp.userName || "",
            password: "",
            employeeId: emp.employeeId,
            role: emp.roleName || "",
          });
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  // ✅ تحميل سجل الأنشطة الحقيقي
  useEffect(() => {
    axios
      .get("https://qualefai.runasp.net/api/ActivityLog", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const filtered = res.data.filter((item) => item.employeeId == id);
        setActivities(filtered);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // تحويل roleName → roleId
  const getRoleId = (roleName) => {
    if (roleName === "مدير النظام") return 1;
    if (roleName === "مدير الجوده") return 2;
    if (roleName === "موظف الجوده") return 3;
    return 0;
  };

  // ✅ حفظ التعديلات
  const handleSave = () => {
    axios
      .put(`https://qualefai.runasp.net/api/Employee/${id}`, {
        employeeId: formData.employeeId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        roleId: getRoleId(formData.role),
      })
      .then(() => {
        alert("تم حفظ التعديلات بنجاح! ✅");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="gray-container">
      <div className="white-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="title">موظف</span>
          <span className="separator">›</span>
          <span className="current">الملف الشخصي لـ {formData.firstName}</span>
        </div>

        {/* بطاقة الملف الشخصي */}
        <div className="profile-card">
          {/* الصف الأول */}
          <div className="row">
            <div className="input-group">
              <label>الاسم الأول للموظف</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>الاسم الأخير للموظف</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>اسم المستخدم (الإيميل)</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* الصف الثاني */}
          <div className="profile-row">
            <div className="input-group password-group">
              <label>كلمة المرور</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className="input-group">
              <label>معرف الموظف (ID)</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                readOnly
              />
            </div>

            <div className="input-group">
              <label>دور الموظف</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="مدير النظام">مدير النظام</option>
                <option value="مدير الجوده">مدير الجوده</option>
                <option value="موظف الجوده">موظف الجوده</option>
              </select>
            </div>
          </div>

          {/* أزرار */}
          <div className="profile-actions">
            <button className="save-btn" onClick={handleSave}>
              حفظ <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </div>
        </div>

        {/* سجل الأنشطة */}
        <h3 className="activities-title">سجل الأنشطة</h3>
        <div className="activities-card">
          <table className="activities-table">
            <thead>
              <tr>
                <th>الملف</th>
                <th>الحدث</th>
                <th>آخر تعديل</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((act, index) => {
                const [date, time] =
                  act.lastModifiedFormatted?.split(" ") || [];

                return (
                  <tr key={index}>
                    <td>{act.employeeName}</td>
                    <td>{act.action}</td>
                    <td>
                      {date} <br />
                      <small>{time}</small>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
