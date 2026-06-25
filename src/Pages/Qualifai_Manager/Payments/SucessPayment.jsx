import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentStatus.css";
import sucessImage from "../../../assets/sucessImage.png"; // تأكدي من مسار الصورة
const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="status-container">
      <div className="status-content">
        <img src={sucessImage} alt="Payment Success" className="status-image" />

        <h2 className="status-title">شكرا لك على الدفع.</h2>
        <p className="status-message">. تمت معالجة معاملتك بنجاح</p>

        <button onClick={() => navigate("/Pricing")} className="btn-home">
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
