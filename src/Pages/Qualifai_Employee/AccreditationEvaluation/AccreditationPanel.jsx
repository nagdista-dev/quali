import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

import "./AccreditationPanel.css";

const AccreditationPanel = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: "التخطيط الاستراتيجي",
      title: "التخطيط الاستراتيجي",
      hasStatus: true,
    },
    { id: "ادارة الجودة", title: "ادارة الجودة", hasStatus: false },
    { id: "أعضاء هيئة التدريس", title: "أعضاء هيئة التدريس", hasStatus: false },
    {
      id: "الموارد المالية و المادية",
      title: "الموارد المالية و المادية",
      hasStatus: false,
    },
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="accreditation-wrapper" dir="rtl">
      {/* Header */}
      <div className="header-row">
        <div className="breadcrumb">
          <span className="title-main">تقييم الاعتماد</span>

          <span className="separator">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>

          <span className="title-sub">كلية الحاسبات و المعلومات</span>
        </div>

        <div className="header-icon">
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </div>
      </div>

      {/* Accordion */}
      <div className="accordion-list">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className={`accordion-item ${openSection === sec.id ? "open" : ""}`}
          >
            <div className="accordion-header">
              <div
                className="accordion-title-group"
                onClick={() => toggleSection(sec.id)}
              >
                <span className="chevron-icon">
                  <FontAwesomeIcon
                    icon={
                      openSection === sec.id ? faChevronDown : faChevronLeft
                    }
                  />
                </span>

                <span className="row-title">{sec.title}</span>
              </div>

              <div className="action-group">
                <button className="view-reports-btn">عرض التقارير</button>
              </div>
            </div>

            {openSection === sec.id && (
              <div className="accordion-body">
                {sec.hasStatus ? (
                  <div className="status-group">
                    <button className="status-btn btn-yellow">
                      يحتاج تحسين
                    </button>

                    <button className="status-btn btn-green">ناجح</button>

                    <button className="status-btn btn-red">غير مطابق</button>
                  </div>
                ) : (
                  <p className="no-status-text">
                    لا توجد بيانات حالياً لهذا القسم.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="notes-section">
        <label className="notes-label">ملاحظات</label>

        <textarea className="notes-textarea" rows="4"></textarea>
      </div>

      {/* Footer */}
      <div className="footer-actions">
        <button className="footer-btn btn-approve">اعتماد الكلية</button>

        <button className="footer-btn btn-reject">رفض الاعتماد</button>
      </div>
    </div>
  );
};

export default AccreditationPanel;
