import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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
    if (divisionId) fetchFiles();
  }, [divisionId]);

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
        <div className="main-card">
          <div className="table-header">
            <h3>الملفات المطلوبة</h3>
          </div>

          <div className="files-list">
            {files.map((file) => (
              <div key={file.id} className="file-row">
                <div className="file-info">
                  <span className="file-name">{file.title}</span>

                  <div className="file-years">
                    {file.years.map((year) => (
                      <div
                        key={year}
                        className="file-icon clickable"
                        onClick={() => handleYearClick(file, year)}
                      >
                        <span className="file-corner"></span>
                        <span className="year-text">{year}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="file-actions">
                  <button
                    className="btn btn-upload"
                    onClick={() =>
                      navigate("/UploadFiles", {
                        state: {
                          fileTitle: file.title,
                          requiredDocumentId: file.id,
                        },
                      })
                    }
                  >
                    + رفع الملفات
                  </button>

                  <button
                    className="btn btn-deadline"
                    onClick={() => openCalendar(file)}
                  >
                    {file.deadline || "تحديد الموعد النهائي"}
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
              <button
                className="close-x-btn"
                onClick={() => setShowCalendar(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

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
