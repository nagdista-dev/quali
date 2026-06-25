import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker"; // استيراد المكتبة
import "react-datepicker/dist/react-datepicker.css"; // استيراد تنسيقات المكتبة
import "./Payment.css"; // استيراد ملف التنسيق الخاص بها

const PaymentPage = () => {
  const navigate = useNavigate();
  const datePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // الحالة لتخزين بيانات الفورم
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: null,
    rememberCardInfo: false,
  });

  const handlePayNow = async () => {
    if (loading) return;

    setLoading(true);
    const payload = {
      cardHolderName: formData.cardHolderName,
      cardNumber: formData.cardNumber,
      cvv: formData.cvv,
      expiryDate: formData.expiryDate ? formData.expiryDate.toISOString() : "", // تحويل التاريخ لنص
      rememberCardInfo: formData.rememberCardInfo,
    };

    try {
      const response = await axios.post(
        "https://qualefai.runasp.net/api/Pricing/subscribe",
        payload,
      );
      if (response.data.success || response.status === 200) {
        alert(response.data.message || "تمت معالجة معاملتك بنجاح");
        navigate("/SucessPayment"); // العودة للصفحة الرئيسية أو النجاح
      } else {
        alert(response.data.message || "حدث خطأ أثناء الدفع");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("حدث خطأ أثناء عملية الدفع، يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="payment-outer-wrapper">
      <div className="payment-inner-box">
        {/* شريط المسار - Breadcrumb */}
        <div className="payment-breadcrumb">
          <span className="payment-breadcrumb-active">الاسعار</span>
          <ChevronLeft size={20} className="payment-breadcrumb-icon" />
          <span
            className="payment-breadcrumb-link"
            onClick={() => navigate("/Pricing")}
          >
            الاشتراك
          </span>
        </div>

        <form className="payment-form">
          <div className="payment-form-grid">
            <div className="payment-form-group">
              <label>رقم البطاقة</label>
              <input
                type="text"
                placeholder="3992..."
                onChange={(e) =>
                  setFormData({ ...formData, cardNumber: e.target.value })
                }
                className="payment-input"
              />
            </div>
            <div className="payment-form-group">
              <label>اسم حامل البطاقة</label>
              <input
                type="text"
                placeholder="سلمى"
                onChange={(e) =>
                  setFormData({ ...formData, cardHolderName: e.target.value })
                }
                className="payment-input"
              />
            </div>
          </div>

          <div className="payment-form-group">
            <label>رمز التحقق (CVV)</label>
            <input
              type="text"
              placeholder="347"
              onChange={(e) =>
                setFormData({ ...formData, cvv: e.target.value })
              }
              className="payment-input"
            />
          </div>

          <div className="payment-form-group relative">
            <label>تاريخ الانتهاء</label>
            <div className="payment-input-with-icon">
              <DatePicker
                selected={formData.expiryDate}
                onChange={(date) =>
                  setFormData({ ...formData, expiryDate: date })
                }
                ref={datePickerRef}
                className="payment-input"
                dateFormat="dd/MM/yyyy"
              />
              <CalendarIcon
                className="payment-calendar-icon clickable-icon"
                onClick={() => {
                  if (datePickerRef.current && datePickerRef.current.setOpen) {
                    datePickerRef.current.setOpen(true);
                  }
                }}
              />
            </div>
          </div>

          <div className="payment-checkbox-group">
            <input
              type="checkbox"
              onChange={(e) =>
                setFormData({ ...formData, rememberCardInfo: e.target.checked })
              }
              id="remember"
            />
            <label htmlFor="remember">تذكر معلومات البطاقة</label>
          </div>

          <button
            type="button"
            onClick={handlePayNow}
            className="payment-btn-submit"
            disabled={loading}
          >
            {loading ? "جاري الدفع..." : "ادفع الآن"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default PaymentPage;
