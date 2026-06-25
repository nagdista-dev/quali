import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./EditSubscription.css";

const EditSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sub = location.state?.subscription;

  const [collegeName, setCollegeName] = useState(sub?.collegeName || "");
  const [universityName, setUniversityName] = useState(sub?.university || "");
  const [institutionType, setInstitutionType] = useState(
    sub?.institutionType || "",
  );
  const [startDate, setStartDate] = useState(
    sub?.startDate?.slice(0, 10) || "",
  );
  const [endDate, setEndDate] = useState(sub?.endDate?.slice(0, 10) || "");

  // ✅ حفظ التعديل
  const handleSave = async () => {
    try {
      await axios.put(`https://qualefai.runasp.net/api/Subscription/${sub.id}`, {
        collegeName,
        university: universityName,
        institutionType,
        startDate,
        endDate,
      });

      alert("تم التعديل بنجاح");
      navigate(-1);
    } catch (err) {
      console.log(err);
      alert("حصل خطأ");
    }
  };

  // ❌ ايقاف
  const handleSuspend = async () => {
    try {
      await axios.put(
        `https://qualefai.runasp.net/api/Subscription/suspend/${sub.id}`,
      );

      alert("تم إيقاف الاشتراك");
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ تفعيل
  const handleActivate = async () => {
    try {
      await axios.put(
        `https://qualefai.runasp.net/api/Subscription/activate/${sub.id}`,
      );

      alert("تم التفعيل");
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="es-page">
      <div className="es-breadcrumb">
        <span onClick={() => navigate(-1)}>ادارة الاشتراكات</span>
        <span> ❯ </span>
        <span>{collegeName}</span>
      </div>

      <div className="es-row">
        <input
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          placeholder="اسم الكلية"
        />

        <input
          value={universityName}
          onChange={(e) => setUniversityName(e.target.value)}
          placeholder="اسم الجامعة"
        />

        <input
          value={institutionType}
          onChange={(e) => setInstitutionType(e.target.value)}
          placeholder="نوع المؤسسة"
        />
      </div>

      <div className="es-row">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="es-button-row">
        <button onClick={handleSave}>حفظ</button>
        <button onClick={handleSuspend}>ايقاف</button>
        <button onClick={handleActivate}>تفعيل</button>
      </div>
    </div>
  );
};

export default EditSubscription;
