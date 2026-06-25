import React, { useState, useEffect } from "react";
import "./AddNewRole.css";
import {
  FaPlus,
  FaEye,
  FaPen,
  FaBan,
  FaChevronLeft,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddNewRole() {
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [isAccreditationOpen, setIsAccreditationOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // -----------------------------
  // Load Permissions
  // -----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://qualefai.runasp.net/api/Permissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPermissions(res.data);

        const defaults = {};

        const categories = [...new Set(res.data.map((p) => p.category))];

        categories.forEach((cat) => {
          const nothingPermission = res.data.find(
            (p) =>
              p.category === cat &&
              p.permissionName.toLowerCase() === "nothing",
          );

          if (nothingPermission) {
            defaults[cat] = nothingPermission.permissionId;
          }
        });

        setSelectedPermissions(defaults);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // -----------------------------
  // Categories
  // -----------------------------
  const permissionItems = [
    "المواعيد النهائية",
    "التقارير",
    "موظفين",
    "الأدوار",
    "الاعتماد الأكاديمي",
  ];

  const subFiles = ["الملف 1", "الملف 2", "الملف 3"];

  // -----------------------------
  // Select Permission
  // -----------------------------
  const selectPermission = (category, permissionType) => {
    const permission = permissions.find(
      (p) =>
        p.category === category &&
        p.permissionName.toLowerCase() === permissionType.toLowerCase(),
    );

    if (!permission) return;

    setSelectedPermissions((prev) => ({
      ...prev,
      [category]: permission.permissionId,
    }));
  };

  const isSelected = (category, permissionType) => {
    const permission = permissions.find(
      (p) =>
        p.category === category &&
        p.permissionName.toLowerCase() === permissionType.toLowerCase(),
    );

    if (!permission) return false;

    return selectedPermissions[category] === permission.permissionId;
  };

  // -----------------------------
  // Save Role
  // -----------------------------
  const handleSave = () => {
    if (!roleName || !description) {
      setModalType("error");
      setModalMessage("من فضلك املأ اسم الدور والوصف");
      setShowModal(true);
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");

    axios
      .post(
        "https://qualefai.runasp.net/api/Roles",
        {
          roleName,
          description,
          permissionIds: Object.values(selectedPermissions),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setModalType("success");
        setModalMessage("تم إنشاء الدور بنجاح");
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          navigate("/Role");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);

        setModalType("error");
        setModalMessage("حدث خطأ أثناء إنشاء الدور");
        setShowModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="gray-container">
      <div className="white-container">
        <div className="role-header">
          <div className="role-title">
            <h2 className="main-title">الأدوار</h2>
            <FaChevronLeft className="separator-icon" />
            <h2 className="sub-title">إنشاء دور جديد</h2>
          </div>
        </div>

        <div className="role-form">
          <div className="form-group2">
            <label>اسم الدور</label>
            <input
              type="text"
              placeholder="مثال: Employee"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          <div className="form-group2 wide">
            <label>وصف الدور</label>
            <input
              type="text"
              placeholder="وصف صلاحيات الدور"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="permissions-box">
          <div className="permissions-header">
            <span className="header2">التحكم في الوصول</span>
            <span className="header2">الأذونات</span>
          </div>

          {permissionItems.map((item, index) => (
            <React.Fragment key={index}>
              <div className="permission-row">
                <div
                  className="permission-name"
                  onClick={() =>
                    item === "الاعتماد الأكاديمي" &&
                    setIsAccreditationOpen(!isAccreditationOpen)
                  }
                  style={{
                    cursor:
                      item === "الاعتماد الأكاديمي" ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {item === "الاعتماد الأكاديمي" &&
                    (isAccreditationOpen ? (
                      <FaChevronDown size={12} />
                    ) : (
                      <FaChevronLeft size={12} />
                    ))}
                  <span>{item}</span>
                </div>

                <div className="permission-actions">
                  <button
                    className={isSelected(item, "Nothing") ? "active" : ""}
                    onClick={() => selectPermission(item, "Nothing")}
                  >
                    <FaBan /> لا أحد
                  </button>

                  <button
                    className={isSelected(item, "Edit") ? "active" : ""}
                    onClick={() => selectPermission(item, "Edit")}
                  >
                    <FaPen /> تعديل
                  </button>

                  <button
                    className={isSelected(item, "View") ? "active" : ""}
                    onClick={() => selectPermission(item, "View")}
                  >
                    <FaEye /> القراءة
                  </button>
                </div>
              </div>

              {item === "الاعتماد الأكاديمي" && isAccreditationOpen && (
                <div className="sub-rows-container">
                  {subFiles.map((file, i) => (
                    <div className="permission-row sub-row" key={i}>
                      <span className="sub-file-name">- {file}</span>

                      <div className="permission-actions">
                        <button
                          className={
                            isSelected(file, "Nothing") ? "active" : ""
                          }
                          onClick={() => selectPermission(file, "Nothing")}
                        >
                          <FaBan /> لا أحد
                        </button>

                        <button
                          className={isSelected(file, "Edit") ? "active" : ""}
                          onClick={() => selectPermission(file, "Edit")}
                        >
                          <FaPen /> تعديل
                        </button>

                        <button
                          className={isSelected(file, "View") ? "active" : ""}
                          onClick={() => selectPermission(file, "View")}
                        >
                          <FaEye /> القراءة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <button className="save-btn" onClick={handleSave} disabled={loading}>
          <FaPlus />
          <span>{loading ? "جاري الحفظ..." : "حفظ"}</span>
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className={`modal-box ${modalType}`}>
            <h3>{modalType === "success" ? "تم بنجاح" : "خطأ"}</h3>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
