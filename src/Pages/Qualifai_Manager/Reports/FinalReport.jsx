import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "./FinalReport.css";

export default function FinalReport() {
  return (
    <div className="final-report-wrapper" dir="rtl">
      <div className="final-report-container">
        {/* الرأس - العنوان وأيقونة التحميل */}
        <div className="report-header">
          <h1 className="report-title">التقارير</h1>
          <div className="download-btn">
            <FontAwesomeIcon icon={faDownload} />
          </div>
        </div>

        {/* النص الوصفي العلوي */}
        <p className="top-description">
          تمت مراجعة التقرير بدقة من قبل المقيم الأكاديمي المعين. بشكل عام، فإنه
          يُظهر توافقاً قوياً مع المعايير المؤسسية ويقدم المعلومات بطريقة واضحة
          ومنظمة. ومع ذلك، تم تحديد بعض المجالات التي تتطلب تنقيحات طفيفة لتعزيز
          الوضوح والاتساق.
        </p>

        {/* قسم المراجعات المطلوبة */}
        <div className="reviews-section">
          <h3 className="section-heading">المراجعات الرئيسية المطلوبة</h3>
          <ul className="bullet-list">
            <li>اضبط التنسيق في القسم 2.1 لضمان اتساق أنماط العناوين.</li>
            <li>توضيح وصف المنهجية في قسم تحليل البيانات.</li>
            <li>إضافة الاقتباس للمرجع المذكور في الصفحة 5.</li>
            <li>أعد صياغة الاستنتاج ليعكس النتائج بشكل أفضل.</li>
            <li>التأكد من تسمية كافة الجداول والإشارة إليها في النص.</li>
          </ul>
        </div>

        {/* قسم شريط التقدم */}
        <div className="progress-area">
          <div className="progress-info">
            <span className="progress-label">درجة الاكتمال</span>
            <span className="progress-percent">40%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: "40%" }}></div>
          </div>
        </div>

        {/* قسم التفاصيل السفلية (أعمدة) */}
        <div className="details-grid">
          {/* تقييم المراجع */}
          <div className="details-box">
            <h3 className="box-title">تقييم المراجع</h3>
            <p className="box-text">
              يظهر هذا التقرير توافقاً قوياً مع المعايير المطلوبة. المنهجية
              سليمة، والبيانات منظمة بشكل جيد. تمت ملاحظة مشكلات بسيطة في
              التنسيق ولكنها لا تؤثر على الجودة الشاملة.
            </p>
          </div>

          {/* تاريخ التعديل */}
          <div className="details-box">
            <h3 className="box-title">تاريخ التعديل</h3>

            <p className="meta-line">
              <strong>تم التعديل الأخير بواسطة:</strong>
              lalis.usdetemario.rg@meallcom
            </p>

            <p className="meta-line">
              <strong>نوع التحرير:</strong>
              التنسيق النهائي والتحقق من صحة البيانات
            </p>

            <p className="meta-line">
              <strong>الطابع الزمني:</strong>
              17 أبريل 2067 – 2:15 صباحاً
            </p>
          </div>
        </div>
        {/* الأزرار السفلية */}
        <div className="footer-actions">
          <button className="btn-submit">رفع التقارير</button>
          <button className="btn-contact">التواصل مع المراجع</button>
        </div>
      </div>
    </div>
  );
}
