import React, { useState } from "react";
import "./YearDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChartLine,
  faSitemap,
  faFileLines,
  faPenNib,
  faHourglassHalf,
  faMagnifyingGlass,
  faBookOpen,
  faFilePdf,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const YearDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [showImprovementModal, setShowImprovementModal] = useState(false);

  const barData = [
    { label: "معايير البنية التحتية", value: "35%", color: "red-bar" },
    { label: "معايير البرمجيات", value: "90%", color: "green-bar" },
    { label: "معايير أعضاء هيئة التدريس", value: "75%", color: "yellow-bar" },
    { label: "معايير الطلاب", value: "55%", color: "red-bar" },
  ];

  const filesData = [
    { id: 1, year: "2023", score: "50%", date: "2023" },
    { id: 2, year: "2023", score: "80%", date: "2023" },
    { id: 3, year: "2023", score: "30%", date: "2023" },
    { id: 4, year: "2023", score: "70%", date: "2023" },
    { id: 5, year: "2023", score: "60%", date: "2023" },
  ];

  const reportItems = [
    {
      icon: faChartLine,
      color: "text-red",
      text: "يتماشى التقرير مع معايير الاعتماد الأكاديمي بمعدل امتثال 92%.",
    },
    {
      icon: faSitemap,
      color: "text-orange",
      text: "تم اكتشاف هيكل قوي وتدفق منطقي عبر جميع الأقسام.",
    },
    {
      icon: faFileLines,
      color: "text-gray",
      text: "لوحظت تناقضات طفيفة في التنسيق، لكنها لا تؤثر على الجودة العامة.",
    },
    {
      icon: faPenNib,
      color: "text-yellow",
      text: "لم يتم العثور على مشكلات نحوية أو لغوية حرجة.",
    },
    {
      icon: faHourglassHalf,
      color: "text-brown",
      text: "وقت إعداد التقرير أسرع بنسبة 18% من متوسط المعيار.",
    },
    {
      icon: faMagnifyingGlass,
      color: "text-dark",
      text: "لا توجد علامات على المحتوى المكرر أو المسروق.",
    },
    {
      icon: faBookOpen,
      color: "text-green",
      text: "المراجع الداعمة ذات مصداقية ومحدثة.",
    },
  ];

  return (
    <div className="page-container">
      {/* Header Navigation */}
      <nav className="header-nav">
        <span>الاعتماد الأكاديمي</span>
        <span className="chevron">
          <FontAwesomeIcon icon={faChevronLeft} size="xs" />
        </span>
        <span className="gray-text">التخطيط الاستراتيجي</span>
      </nav>

      {/* Dashboard Section */}
      <div className="dashboard-top">
        <div className="report-section">
          <h2 className="report-title">تقرير الذكاء الاصطناعي</h2>
          <ul className="report-list">
            {reportItems.map((item, index) => (
              <li key={index}>
                <span className={`icon-wrapper ${item.color}`}>
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="chart-section">
          <div className="chart-container">
            <div className="chart-grid">
              {[100, 80, 60, 40, 20, 0].map((val) => (
                <div key={val} className="grid-line">
                  <span>{val}</span>
                </div>
              ))}
            </div>

            <div className="bar-group">
              <div className="bar green" style={{ height: "50%" }}></div>
              <span className="bar-label">2026</span>
            </div>
            <div className="bar-group">
              <div className="bar green" style={{ height: "92%" }}></div>
              <span className="bar-label">2025</span>
            </div>
            <div className="bar-group">
              <div className="bar yellow" style={{ height: "70%" }}></div>
              <span className="bar-label">2024</span>
            </div>
            <div className="bar-group">
              <div className="bar red" style={{ height: "50%" }}></div>
              <span className="bar-label">2023</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-labels">
          <span className="progress-title">درجة الاكتمال</span>
          <span className="progress-value">50%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: "50%" }}></div>
        </div>
      </div>

      {/* Files Table */}
      <div className="files-card">
        <div className="files-header">
          <div className="header-info">تاريخ الملف</div>
          <div className="header-score">درجة التقييم</div>
          <div className="header-actions"></div>
        </div>

        {filesData.map((file) => (
          <div key={file.id} className="file-row">
            <div className="file-info">
              <div className="pdf-icon-wrapper">
                <FontAwesomeIcon icon={faFilePdf} />
              </div>
              <div className="file-details">
                <h4>التخطيط الاستراتيجي</h4>
                <span>لعام {file.year}</span>
              </div>
            </div>

            <div className="score-col">{file.score}</div>

            <div className="actions-col">
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                تحليل الملف
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setShowImprovementModal(true)}
              >
                عرض التحسينات
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - File Analysis */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="modal-pie-section">
              <div className="pie-wrapper">
                <div className="pie-chart-main"></div>
                <div className="pie-percentage-tag">30%</div>
              </div>
              <div className="pie-legend">
                <span className="dot"></span>
                <span>نسبة التشابه مع المعايير</span>
              </div>
            </div>

            <ul className="report-list modal-list">
              {reportItems.map((item, index) => (
                <li key={index}>
                  <span className={`icon-wrapper ${item.color}`}>
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Modal - Improvement */}
      {showImprovementModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowImprovementModal(false)}
        >
          <div
            className="modal-content improvement-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowImprovementModal(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="bar-chart-modal">
              <div className="chart-y-axis">
                {[100, 80, 60, 40, 20, 0].map((val) => (
                  <span key={val}>{val}</span>
                ))}
              </div>
              <div className="bars-container">
                {barData.map((bar, index) => (
                  <div className="bar-wrapper" key={index}>
                    <div
                      className={`modal-v-bar ${bar.color}`}
                      style={{ height: bar.value }}
                    ></div>
                    <span className="bar-name">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-completion-section">
              <div className="completion-text">
                <span className="label">درجة الاكتمال</span>
                <span className="value">40%</span>
              </div>
              <div className="modal-progress-bg">
                <div
                  className="modal-progress-fill"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>

            <ul className="report-list modal-list">
              {reportItems.map((item, index) => (
                <li key={index}>
                  <span className={`icon-wrapper ${item.color}`}>
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearDetails;
