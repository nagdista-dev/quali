import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AddFaculty.css";
import { useNavigate } from "react-router-dom";
export default function AddFaculty() {
  const [institutionTypes, setInstitutionTypes] = useState([]);
  const [accreditationTypes, setAccreditationTypes] = useState([]);
  const fileRef = useRef(null);
  const token = localStorage.getItem("token");

  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    universityName: "",
    collegeName: "",
    institutionType: "",
    accreditationType: "",
    subscriptionStartDate: "",
    managerEmail: "",
    managerPassword: "",
    image: null,
  });
  useEffect(() => {
    const fetchEnums = async () => {
      const token = localStorage.getItem("token");

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
    };

    fetchEnums();
  }, []);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      data.append("UniversityName", form.universityName);
      data.append("CollegeName", form.collegeName);
      data.append("InstitutionType", Number(form.institutionType));
      data.append("AccreditationType", Number(form.accreditationType));
      data.append(
        "SubscriptionStartDate",
        new Date(form.subscriptionStartDate).toISOString(),
      );
      data.append("ManagerEmail", form.managerEmail);
      data.append("ManagerPassword", form.managerPassword);

      if (form.image) data.append("Image", form.image);

      await axios.post("https://qualefai.runasp.net/api/Colleges", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // 👇 هنا المهم
      navigate("/FacultyManagement");
    } catch (err) {
      console.log(err);
      alert("حصل خطأ في الإضافة");
    }
  };

  return (
    <div className="add-faculty-container">
      {/* Header */}
      <div className="header">
        ادارة الكلية
        <span className="breadcrumb-icon">›</span>
        <span className="active">اضافة كلية</span>
      </div>

      {/* Upload */}
      <div className="upload-section">
        <div
          className="avatar-placeholder"
          onClick={() => fileRef.current.click()}
        >
          {avatar ? <img src={avatar} className="avatar-img" /> : "👤"}
        </div>

        <input type="file" hidden ref={fileRef} onChange={handleFile} />

        <button className="btn-upload" onClick={() => fileRef.current.click()}>
          رفع صورة الكلية
        </button>

        <button className="btn-delete">حذف 🗑</button>
      </div>

      {/* Form */}
      <div className="form-section">
        {/* Row 1 - 3 inputs */}
        <div className="form-row three-cols">
          <div className="input-group">
            <label>اسم الجامعة</label>
            <input name="universityName" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>اسم الكلية</label>
            <input name="collegeName" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>نوع المؤسسة</label>
            <select name="institutionType" onChange={handleChange}>
              <option value="">اختار</option>
              {institutionTypes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2 - 2 inputs */}
        <div className="form-row two-cols">
          <div className="input-group">
            <label>نوع الاعتماد</label>
            <select name="accreditationType" onChange={handleChange}>
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
              name="subscriptionStartDate"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Section */}
        <h3 className="section-title">حساب مدير الجودة</h3>

        {/* Row 3 - 2 inputs */}
        <div className="form-row two-cols">
          <div className="input-group">
            <label>الايميل</label>
            <input name="managerEmail" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>كلمة السر</label>
            <input
              type="password"
              name="managerPassword"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        إضافة الكلية
      </button>
    </div>
  );
}
