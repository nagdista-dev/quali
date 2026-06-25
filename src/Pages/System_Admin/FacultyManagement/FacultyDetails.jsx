import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FacultyDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faBan } from "@fortawesome/free-solid-svg-icons";
export default function FacultyDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [institutionTypes, setInstitutionTypes] = useState([]);
  const [accreditationTypes, setAccreditationTypes] = useState([]);

  const [formData, setFormData] = useState({
    UniversityName: "",
    CollegeName: "",
    InstitutionType: "",
    AccreditationType: "",
    SubscriptionStartDate: "",
    ManagerEmail: "",
    ManagerPassword: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ GET ENUMS (زي ما هو نفس السيكونس)
  useEffect(() => {
    const fetchEnums = async () => {
      try {
        const inst = await axios.get(
          "https://qualefai.runasp.net/api/Enum/institution-types",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const acc = await axios.get(
          "https://qualefai.runasp.net/api/Enum/accreditation-types",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setInstitutionTypes(inst.data);
        setAccreditationTypes(acc.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEnums();
  }, [token]);

  // ✅ GET BY ID (متعدل بس بدون تغيير السيكونس)
  useEffect(() => {
    if (!institutionTypes.length || !accreditationTypes.length) return;

    const fetchCollege = async () => {
      try {
        const res = await axios.get(
          `https://qualefai.runasp.net/api/Colleges/${id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const data = res.data;

        const instId = institutionTypes.find(
          (i) => i.name === data.institutionType,
        )?.id;

        const accId = accreditationTypes.find(
          (a) => a.name === data.accreditationType,
        )?.id;

        setFormData({
          UniversityName: data.university || "",
          CollegeName: data.name || "",
          InstitutionType: instId ? instId.toString() : "",
          AccreditationType: accId ? accId.toString() : "",
          SubscriptionStartDate: data.lastUploadDate || "",
          ManagerEmail: "",
          ManagerPassword: "",
        });

        if (data.image) {
          setPreview(`https://qualefai.runasp.net${data.image}`);
        }
      } catch (err) {
        console.log(err);
        alert("حصل خطأ أثناء تحميل البيانات");
      }
    };

    fetchCollege();
  }, [institutionTypes, accreditationTypes, id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // ✅ نفس أسماء الـ API بالظبط
      data.append("UniversityName", formData.UniversityName);
      data.append("CollegeName", formData.CollegeName);
      data.append("InstitutionType", Number(formData.InstitutionType));
      data.append("AccreditationType", Number(formData.AccreditationType));
      data.append(
        "SubscriptionStartDate",
        new Date(formData.SubscriptionStartDate).toISOString(),
      );

      if (formData.ManagerEmail)
        data.append("ManagerEmail", formData.ManagerEmail);

      if (formData.ManagerPassword)
        data.append("ManagerPassword", formData.ManagerPassword);

      if (image) data.append("Image", image);

      await axios.put(`https://qualefai.runasp.net/api/Colleges/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("تم التعديل بنجاح");
    } catch (err) {
      console.log(err);
      alert("خطأ في التعديل");
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault(); // 👈 مهم عشان ميعملش submit للفورم

    const confirmDelete = window.confirm("هل أنت متأكد من إيقاف الاشتراك؟");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://qualefai.runasp.net/api/Colleges/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("تم حذف الكلية بنجاح");
      navigate("/FacultyManagement");
    } catch (error) {
      console.log(error);
      alert("حصل خطأ أثناء الحذف");
    }
  };
  return (
    <div className="faculty-details-container" dir="rtl">
      {/* Header */}
      <div className="header">
        ادارة الكلية
        <span className="breadcrumb-icon">›</span>
        <span className="active">{formData.CollegeName || "تحميل..."}</span>
      </div>

      {/* Image */}
      <div className="profile-section">
        <div className="avatar-wrapper">
          {preview ? <img src={preview} alt="college" /> : "📷"}
        </div>

        <label className="btn-upload">
          رفع صورة
          <input
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
        </label>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="input-group">
            <label>اسم الجامعة</label>
            <input
              name="UniversityName"
              value={formData.UniversityName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>اسم الكلية</label>
            <input
              name="CollegeName"
              value={formData.CollegeName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>نوع المؤسسة</label>
            <select
              name="InstitutionType"
              value={formData.InstitutionType}
              onChange={handleChange}
            >
              <option value="">اختار</option>
              {institutionTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label>نوع الاعتماد</label>
            <select
              name="AccreditationType"
              value={formData.AccreditationType}
              onChange={handleChange}
            >
              <option value="">اختار</option>
              {accreditationTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>تاريخ الاشتراك</label>
            <input
              type="date"
              name="SubscriptionStartDate"
              value={formData.SubscriptionStartDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="sub-title">حساب مدير الجودة</h3>

        <div className="form-grid">
          <div className="input-group">
            <label>الايميل</label>
            <input
              name="ManagerEmail"
              value={formData.ManagerEmail}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>كلمة السر</label>
            <input
              type="password"
              name="ManagerPassword"
              value={formData.ManagerPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="buttons">
          <button className="btn-save" type="submit">
            حفظ التعديلات
          </button>

          <button className="stop-btn" onClick={handleDelete}>
            إيقاف الاشتراك&nbsp;
            <FontAwesomeIcon icon={faBan} />
          </button>
        </div>
      </form>
    </div>
  );
}
