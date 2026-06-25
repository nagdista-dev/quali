import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentStatus.css";
import errorImage from "../../../assets/errorImage.png"; // تأكدي من مسار الصورة

const PaymentError = () => {
  const navigate = useNavigate();

  return (
    <div className="status-container">
      <div className="status-content">
        <img src={errorImage} alt="Payment Failed" className="status-image" />

        <h2 className="status-title error-title">فشل الدفع.</h2>
        <p className="status-message">
          يرجى التحقق من تفاصيل بطاقتك أو تجربة طريقة مختلفة.
        </p>

        <button onClick={() => navigate("/Payment")} className="btn-retry">
          حاول مرة أخرى
        </button>
      </div>
    </div>
  );
};

export default PaymentError;
