import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faDownload,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./ReportDetails.css";
import { useNavigate } from "react-router-dom";

export default function ReportDetails() {
  const navigate = useNavigate();

  return (
    <div className="report-details-container" dir="rtl">
      {/* رأس الصفحة */}
      <div className="report-header">
        <div className="header-titles">
          <h1 className="main-title">الاعتماد الأكاديمي</h1>
          <span className="breadcrumb-separator">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span className="sub-title">تقرير</span>
        </div>

        <div className="download-icon">
          <FontAwesomeIcon icon={faDownload} />
        </div>
      </div>

      {/* نص الوصف */}
      <div className="report-body">
        <p className="description-text">
          تمت مراجعة التقرير بدقة من قبل المقيم الأكاديمي المعين. بشكل عام، فإنه
          يُظهر توافقاً قوياً مع المعايير المؤسسية ويقدم المعلومات بطريقة واضحة
          ومنظمة. ومع ذلك، تم تحديد بعض المجالات التي تتطلب مراجعات طفيفة لتعزيز
          الوضوح والاتساق.
        </p>
      </div>

      {/* قائمة المراجعات */}
      <div className="reviews-section">
        <h3 className="section-title">المراجعات الرئيسية المطلوبة</h3>
        <ul className="reviews-list">
          <li>اضبط التنسيق في القسم 2.1 لضمان اتساق أنماط العناوين.</li>
          <li>توضيح وصف المنهجية في قسم تحليل البيانات.</li>
          <li>إضافة الاقتباس للمرجع المذكور في الصفحة 5.</li>
          <li>أعد صياغة الاستنتاج ليعكس النتائج بشكل أفضل.</li>
          <li>التأكد من تسمية كافة الجداول والإشارة إليها في النص.</li>
        </ul>
      </div>

      {/* شريط التقدم */}
      <div className="progress-section">
        <div className="progress-labels">
          <span className="progress-title">درجة الاكتمال</span>
          <span className="progress-value">40%</span>
        </div>

        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: "40%" }}></div>
        </div>
      </div>

      {/* الأزرار */}
      <div className="report-actions">
        {/* 👇 ده الزرار اللي مربوط بصفحة Success */}
        <button
          className="btn btn-primary"
          onClick={() => navigate("/SuccessPage")}
        >
          عرض تقرير المراجع
          <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
        </button>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          العودة إلى الملفات
        </button>
      </div>
    </div>
  );
}
