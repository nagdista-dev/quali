import React from "react";
import "./SuccessPage.css";
import robotImg from "../../../assets/Sucess.png"; // استبدلي المسار بمسار الصورة عندك
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="success-wrapper" dir="rtl">
      <div className="success-card">
        {/* الصورة */}
        <div className="robot-container">
          <img src={robotImg} alt="Success Robot" className="robot-image" />
        </div>

        {/* النصوص */}
        <div className="text-content">
          <h1 className="success-title">لقد تم إرسال تقريرك بنجاح.</h1>
          <p className="success-subtitle">
            وسوف تظهر بمجرد استلام المراجع لها.
          </p>
        </div>

        {/* زر إضافي للعودة للرئيسية (اختياري لكنه مفيد للمستخدم) */}
        <button
          className="back-home-btn"
          onClick={() => navigate("/FinalReport")}
        >
          <FontAwesomeIcon icon={faHouse} style={{ marginLeft: "8px" }} />
          عرض التقرير
        </button>
      </div>
    </div>
  );
}
