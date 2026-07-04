import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FileText, Upload, CalendarDays, File } from "lucide-react";

import "react-calendar/dist/Calendar.css";
import "./ShowDetails.css";

const ShowDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const divisionId = location.state?.divisionId;

  const [files, setFiles] = useState([]);
  const [sectionName, setSectionName] = useState("");

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tempDate, setTempDate] = useState(new Date());

  const [remindersActive, setRemindersActive] = useState(true);
  const [weekBefore, setWeekBefore] = useState(true);
  const [dayBefore, setDayBefore] = useState(true);
  const [onDueDate, setOnDueDate] = useState(true);

  // ======================
  // Axios Instance
  // ======================
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://qualefai.runasp.net/api",
    });

    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, []);

  // ======================
  // Fetch Files
  // ======================
  const fetchFiles = async () => {
    try {
      const res = await api.get(`/Accreditation/sections/${divisionId}`);

      const docs = res.data.documents || [];
      const currentYear = new Date().getFullYear();

      const formattedDocs = docs.map((doc) => ({
        id: doc.requiredDocumentId,
        title: doc.documentName,
        years: [currentYear - 2, currentYear - 1, currentYear],
        deadline: doc.deadline
          ? new Date(doc.deadline).toLocaleDateString("en-GB")
          : null,
      }));

      setFiles(formattedDocs);
      setSectionName(res.data.sectionName);
    } catch (error) {
      console.log("Error fetching files:", error);
    }
  };

  useEffect(() => {
    if (!divisionId) return;

    const loadFiles = async () => {
      try {
        const res = await api.get(`/Accreditation/sections/${divisionId}`);

        const docs = res.data.documents || [];
        const currentYear = new Date().getFullYear();

        const formattedDocs = docs.map((doc) => ({
          id: doc.requiredDocumentId,
          title: doc.documentName,
          years: [currentYear - 2, currentYear - 1, currentYear],
          deadline: doc.deadline
            ? new Date(doc.deadline).toLocaleDateString("en-GB")
            : null,
        }));

        setFiles(formattedDocs);
        setSectionName(res.data.sectionName);
      } catch (error) {
        console.log(error);
      }
    };

    loadFiles();
  }, [divisionId, api]);

  // ======================
  // Open Calendar
  // ======================
  const openCalendar = (file) => {
    setSelectedFile(file);

    setTempDate(
      file.deadline
        ? new Date(file.deadline.split("/").reverse().join("-"))
        : new Date(),
    );

    setShowCalendar(true);
  };

  // ======================
  // Save Deadline (FIXED ✅)
  // ======================
  const saveDeadline = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (tempDate <= today) {
        alert("لازم تختاري تاريخ في المستقبل");
        return;
      }

      const formattedDate = tempDate.toISOString().split("T")[0];

      await api.post(
        `/Accreditation/documents/${selectedFile.id}/set-deadline`,
        {
          deadline: formattedDate,
          reminders: {
            oneWeekBefore: remindersActive ? weekBefore : false,
            oneDayBefore: remindersActive ? dayBefore : false,
            onDueDate: remindersActive ? onDueDate : false,
          },
        },
      );

      // ✅ نعمل refresh من السيرفر
      await fetchFiles();

      setShowCalendar(false);
    } catch (error) {
      console.error("Error setting deadline:", error.response?.data || error);
      alert("حدث خطأ أثناء تحديد الموعد النهائي!");
    }
  };

  // ======================
  // Year Click
  // ======================
  const handleYearClick = (file, year) => {
    navigate("/YearDetails", {
      state: {
        fileTitle: file.title,
        requiredDocumentId: file.id,
        sectionId: divisionId,
        sectionName,
        year: year,
      },
    });
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="gray-container">
      <div className="white-container">
        {/* Header */}
        <div className="page-header">
          <h2 className="main-title">الاعتماد الأكاديمي</h2>
          <span className="separator">&gt;</span>
          <h2 className="sub-title">{sectionName}</h2>
        </div>

        {/* Files */}
        <div className="files-table">
          <div className="table-head">
            <div className="th-name">اسم الملف</div>
            <div className="th-files">الملفات</div>
            <div className="th-actions">الإجراءات</div>
          </div>

          <div className="table-body">
            {files.map((file) => (
              <div key={file.id} className="table-row">
                <div className="td-name">
                  <FileText size={18} className="doc-icon" />
                  <span className="file-name">{file.title}</span>
                </div>

                <div className="td-files">
                  <div className="years-group">
                    {file.years.map((year) => (
                      <div
                        key={year}
                        className="file-badge"
                      >
                        <div
                          className="file-icon-wrap clickable"
                          onClick={() => handleYearClick(file, year)}
                        >
                          <File size={46} className="file-icon-svg" fill="#0d2b5b" stroke="#0d2b5b" />
                          <span className="badge-year">{year}</span>
                          <button
                            className="file-badge-x"
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: handle delete
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="td-actions">
                  <button
                    className="action-btn upload-btn"
                    onClick={() =>
                      navigate("/UploadFiles", {
                        state: {
                          fileTitle: file.title,
                          requiredDocumentId: file.id,
                        },
                      })
                    }
                  >
                    <Upload size={16} />
                    <span>رفع الملفات</span>
                  </button>
                  <button
                    className={`action-btn deadline-btn ${file.deadline ? "has-deadline" : ""}`}
                    onClick={() => openCalendar(file)}
                  >
                    <CalendarDays size={16} />
                    <span>{file.deadline || "الموعد النهائي"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Modal */}
        {showCalendar && (
          <div className="modal-overlay">
            <div className="calendar-modal">
              <div className="modal-header">
                <h3 className="modal-title">Set Deadline</h3>
                <button
                  className="close-x-btn"
                  onClick={() => setShowCalendar(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div className="modal-body">
                <Calendar onChange={setTempDate} value={tempDate} />

                <div className="calendar-footer-custom">
                  <div className="input-row">
                    <label>Deadline</label>
                    <input
                      type="text"
                      readOnly
                      value={tempDate.toLocaleDateString("en-GB")}
                    />
                  </div>

                  <div className="reminders-box">
                    <div className="reminder-toggle">
                      <span>Deadline Reminders</span>

                      <label className="ios-switch">
                        <input
                          type="checkbox"
                          checked={remindersActive}
                          onChange={() => setRemindersActive(!remindersActive)}
                        />
                        <span className="slider-round"></span>
                      </label>
                    </div>

                    {remindersActive && (
                      <div className="options-list">
                        <label>
                          <input
                            type="checkbox"
                            checked={weekBefore}
                            onChange={() => setWeekBefore(!weekBefore)}
                          />
                          1 week before
                        </label>

                        <label>
                          <input
                            type="checkbox"
                            checked={dayBefore}
                            onChange={() => setDayBefore(!dayBefore)}
                          />
                          1 Day before
                        </label>

                        <label>
                          <input
                            type="checkbox"
                            checked={onDueDate}
                            onChange={() => setOnDueDate(!onDueDate)}
                          />
                          On due date
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="modal-cancel-btn" onClick={() => setShowCalendar(false)}>
                  Cancel
                </button>
                <button className="ask-edit-btn" onClick={saveDeadline}>
                  Confirm & Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
