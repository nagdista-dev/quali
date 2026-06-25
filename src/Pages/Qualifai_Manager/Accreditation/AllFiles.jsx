import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllFiles.css";

const AccreditationDivisions = () => {
  const [divisions, setDivisions] = useState([]);
  const [openDivisions, setOpenDivisions] = useState({});
  const navigate = useNavigate();

  // ==========================
  // Axios instance with token
  // ==========================
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

  // ==========================
  // Fetch divisions
  // ==========================
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const res = await api.get("/Accreditation/sections");
        console.log(res.data);
        setDivisions(res.data);
      } catch (error) {
        console.log("Error fetching divisions:", error);
      }
    };

    fetchDivisions();
  }, [api]);

  // ==========================
  // Toggle division
  // ==========================
  const toggleDivision = (id) => {
    setOpenDivisions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="divisions-wrapper">
      {/* Header */}
      <div className="divisions-header">
        <h1 className="divisions-title">أقسام الاعتماد الأكاديمي</h1>
      </div>

      {/* Divisions List */}
      <div className="divisions-list">
        {divisions.map((division) => (
          <div key={division.sectionId} className="division-item">
            {/* Main Row */}
            <div className="division-main-row">
              {/* Right */}
              <div className="division-right-section">
                <span
                  className={`division-arrow ${
                    openDivisions[division.sectionId] ? "open" : ""
                  }`}
                  onClick={() => toggleDivision(division.sectionId)}
                >
                  ›
                </span>

                <span className="division-name">{division.sectionName}</span>
              </div>

              {/* Left */}
              <div className="division-left-section">
                <div className="division-progress-container">
                  <div className="division-progress-header">
                    <span className="division-progress-label-top">
                      درجة الاكتمال
                    </span>

                    <span className="division-percentage-left">
                      {division.completionPercentage}%
                    </span>
                  </div>

                  <div className="division-progressbar">
                    <div
                      className="division-progressbar-fill"
                      style={{
                        width: `${division.completionPercentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collapsible Content */}
            {openDivisions[division.sectionId] && (
              <div className="division-collapsible-content">
                <div className="division-description">
                  عدد الملفات: {division.totalDocs} <br />
                  الملفات المكتملة: {division.completedDocs}
                </div>

                <div className="division-info">
                  <button
                    className="division-add-btn"
                    onClick={() =>
                      navigate("/ShowDetails", {
                        state: { divisionId: division.sectionId },
                      })
                    }
                  >
                    <span className="btn-icon">+</span>
                    المزيد من التفاصيل !
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccreditationDivisions;
