import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Deadlines.css";

export default function Deadlines() {
  const [tasks, setTasks] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tempDate, setTempDate] = useState(new Date());

  const [remindersActive, setRemindersActive] = useState(true);
  const [weekBefore, setWeekBefore] = useState(true);
  const [dayBefore, setDayBefore] = useState(true);
  const [onDueDate, setOnDueDate] = useState(true);

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "https://qualefai.runasp.net/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const colorMap = {
    gray: "#bfbfbf",
    green: "#28a745",
    red: "#dc3545",
    yellow: "#ffc107",
  };

  const fetchDeadlines = async () => {
    try {
      const res = await api.get("/Accreditation/deadlines");

      const formatted = res.data.map((item) => ({
        id: item.requiredDocumentId,
        name: item.name,
        date: item.deadline
          ? new Date(item.deadline).toLocaleDateString("en-GB")
          : null,
        status: item.statusLabel,
        color: colorMap[item.statusColor] || "#003366",
        btn: item.showButton ? item.buttonLabel : null,
        btnClass: "blue-btn",
      }));

      setTasks(formatted);
    } catch (error) {
      console.log("Error fetching deadlines", error);
    }
  };

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const openCalendarForTask = (task) => {
    setSelectedTask(task);

    setTempDate(
      task.date
        ? new Date(task.date.split("/").reverse().join("-"))
        : new Date(),
    );

    setShowCalendar(true);
  };

  const handleSaveDate = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (tempDate <= today) {
        alert("لازم تختاري تاريخ في المستقبل");
        return;
      }

      const formattedDate = tempDate.toISOString().split("T")[0];

      await api.post(
        `/Accreditation/documents/${selectedTask.id}/set-deadline`,
        {
          deadline: formattedDate,
          reminders: {
            oneWeekBefore: remindersActive ? weekBefore : false,
            oneDayBefore: remindersActive ? dayBefore : false,
            onDueDate: remindersActive ? onDueDate : false,
          },
        },
      );

      setShowCalendar(false);
      fetchDeadlines();
    } catch (error) {
      console.log("Error saving deadline", error.response?.data || error);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="gray-container">
      <div className="white-container">
        <h2 className="main-title1">المواعيد النهائية</h2>

        <div className="table-container">
          {/* HEADER */}
          <div className="custom-table-header">
            <div className="header-cell name-cell">اسم الملف</div>
            <div className="header-cell date-cell">موعد التسليم</div>
            <div className="header-cell status-cell">الحالة</div>
            <div className="header-cell button-cell"></div>
          </div>

          {/* ROWS */}
          <div className="table-rows-wrapper">
            {tasks.map((task) => (
              <div key={task.id} className="custom-table-row">
                <div className="row-cell name-cell">{task.name}</div>

                <div className="row-cell date-cell">
                  {task.date ? task.date : <span className="empty-dash"></span>}
                </div>

                {/* الحالة */}
                <div className="row-cell status-cell">
                  <div className="status-box1">
                    <span className="status-label1">{task.status}</span>
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{ color: task.color, fontSize: "10px" }}
                    />
                  </div>
                </div>

                {/* الزرار */}
                <div className="row-cell button-cell">
                  {task.btn && (
                    <button
                      className={`status-action-btn1 ${task.btnClass}`}
                      onClick={() => openCalendarForTask(task)}
                    >
                      {task.btn}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL */}
        {showCalendar && (
          <div className="modal-overlay">
            <div className="calendar-modal">
              <button
                className="close-x-btn"
                onClick={() => setShowCalendar(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <Calendar
                onChange={setTempDate}
                value={tempDate}
                minDate={tomorrow}
              />

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

                <button className="ask-edit-btn" onClick={handleSaveDate}>
                  Confirm & Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
