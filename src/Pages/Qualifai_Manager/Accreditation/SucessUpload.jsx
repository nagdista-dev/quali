import React from "react";
import { useNavigate } from "react-router-dom";
import "./SucessUpload.css";
import sucessImage from "../../../assets/sucessImg .png";
const SuccessUpload = () => {
  const navigate = useNavigate();

  return (
    <div className="status-container">
      <div className="status-content">
        <img src={sucessImage} alt="Payment Success" className="status-image" />

        <h2 className="status-title">شكرا لك على الرفع.</h2>
        <p className="status-message">. لقد تم تحميل ملفك بنجاح</p>

        <button onClick={() => navigate("/AllFiles")} className="btn-home">
          العودة الي الملفات
        </button>
      </div>
    </div>
  );
};

export default SuccessUpload;
