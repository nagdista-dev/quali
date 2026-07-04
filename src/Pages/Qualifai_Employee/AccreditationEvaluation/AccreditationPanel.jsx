import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronDown,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

import "./AccreditationPanel.css";

const AccreditationPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const collegeId = location.state?.collegeId;
  const collegeName = location.state?.collegeName || "الكلية";

  const [sections, setSections] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [sectionFiles, setSectionFiles] = useState([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [notes, setNotes] = useState("");

  // Load college details + sections
  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://qualefai.runasp.net/api/Quality/colleges/${collegeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setSections(res.data.sections || []);
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };

    if (collegeId) {
      fetchCollegeDetails();
    }
  }, [collegeId]);

  // Open Section
  const toggleSection = async (sectionId) => {
    if (openSection === sectionId) {
      setOpenSection(null);
      return;
    }

    setOpenSection(sectionId);
    setFilesLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://qualefai.runasp.net/api/Quality/colleges/${collegeId}/sections/${sectionId}/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSectionFiles(res.data.documents || []);
    } catch (err) {
      console.error("Error fetching files:", err);
      setSectionFiles([]);
    } finally {
      setFilesLoading(false);
    }
  };

  // Accreditation Decision
  const handleDecision = async (decision) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `https://qualefai.runasp.net/api/Quality/colleges/${collegeId}/decision`,
        {
          decision,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      alert(
        decision === "Approved"
          ? "تم اعتماد الكلية بنجاح ✅"
          : "تم رفض الاعتماد بنجاح ✅",
      );

      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حفظ القرار");
    }
  };

  const getStatusColor = (color) => {
    switch (color) {
      case "green":
        return "#16a34a";
      case "red":
        return "#dc2626";
      case "orange":
        return "#f97316";
      case "gray":
        return "#64748b";
      default:
        return "#64748b";
    }
  };

  return (
    <div className="accreditation-wrapper" dir="rtl">
      {/* Header */}
      <div className="header-row">
        <div className="breadcrumb">
          <span
            className="title-main"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          >
            تقييم الاعتماد
          </span>

          <span className="separator">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>

          <span className="title-sub">{collegeName}</span>
        </div>

        <div className="header-icon">
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </div>
      </div>

      {/* Sections */}
      <div className="accordion-list">
        {sections.map((section) => (
          <div
            key={section.sectionId}
            className={`accordion-item ${
              openSection === section.sectionId ? "open" : ""
            }`}
          >
            <div className="accordion-header">
              <div
                className="accordion-title-group"
                onClick={() => toggleSection(section.sectionId)}
              >
                <span className="chevron-icon">
                  <FontAwesomeIcon
                    icon={
                      openSection === section.sectionId
                        ? faChevronDown
                        : faChevronLeft
                    }
                  />
                </span>

                <span className="row-title">{section.sectionName}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                  }}
                >
                  {section.uploadedDocuments}/{section.totalDocuments}
                </span>

                <button
                  className="view-reports-btn"
                  onClick={() => toggleSection(section.sectionId)}
                >
                  عرض الملفات
                </button>
              </div>
            </div>

            {openSection === section.sectionId && (
              <div className="accordion-body">
                {filesLoading ? (
                  <p className="no-status-text">جاري تحميل الملفات...</p>
                ) : sectionFiles.length === 0 ? (
                  <p className="no-status-text">لا توجد ملفات لهذا القسم</p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {sectionFiles.map((file) => (
                      <div
                        key={file.requiredDocumentId}
                        style={{
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          padding: "12px",
                          background: "#f8fafc",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          {file.documentName}
                        </div>

                        {file.originalName && (
                          <div
                            style={{
                              fontSize: "14px",
                              color: "#0c2d64",
                              marginBottom: "6px",
                            }}
                          >
                            📄 {file.originalName}
                          </div>
                        )}

                        <div
                          style={{
                            fontSize: "13px",
                            color: getStatusColor(file.submissionStatusColor),
                            fontWeight: "500",
                          }}
                        >
                          {file.submissionStatus}
                        </div>

                        {file.uploadedAt && (
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#64748b",
                              marginTop: "5px",
                            }}
                          >
                            تاريخ الرفع:{" "}
                            {new Date(file.uploadedAt).toLocaleDateString(
                              "ar-EG",
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="notes-section">
        <label className="notes-label">ملاحظات وقرار الاعتماد</label>

        <textarea
          className="notes-textarea"
          rows="5"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="اكتب ملاحظات التقييم هنا..."
        />
      </div>

      {/* Actions */}
      <div className="footer-actions">
        <button
          className="footer-btn btn-approve"
          onClick={() => handleDecision("Approved")}
        >
          اعتماد الكلية
        </button>

        <button
          className="footer-btn btn-reject"
          onClick={() => handleDecision("Rejected")}
        >
          رفض الاعتماد
        </button>
      </div>
    </div>
  );
};

export default AccreditationPanel;
