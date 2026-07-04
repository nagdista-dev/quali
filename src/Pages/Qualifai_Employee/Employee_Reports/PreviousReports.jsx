import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./PreviousReports.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function PreviousReports() {
  const navigate = useNavigate();

  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://qualefai.runasp.net/api/Quality/colleges",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setColleges(res.data || []);
      } catch (err) {
        console.error("Error fetching colleges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter((college) =>
    college.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="prev-reports-container">
      {/* Header */}
      <div className="prev-reports-header">
        <h2 className="prev-reports-title">التقارير السابقة</h2>

        <button className="prev-filter-btn">
          <FontAwesomeIcon icon={faSliders} />
        </button>
      </div>

      {/* Search */}
      <div className="prev-search-wrapper">
        <input
          type="text"
          className="prev-search-input"
          placeholder="ابحث باسم الكلية"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <span className="prev-search-icon">
          <SearchIcon />
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          جاري تحميل الكليات...
        </p>
      ) : filteredColleges.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#64748b",
          }}
        >
          لا توجد كليات مطابقة
        </p>
      ) : (
        <div className="prev-colleges-list">
          {filteredColleges.map((college) => (
            <div
              key={college.collegeId || college.id}
              className="prev-college-row"
            >
              <div>
                <div className="prev-college-name">{college.name}</div>

                {college.university && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#64748b",
                      marginTop: "4px",
                    }}
                  >
                    {college.university}
                  </div>
                )}
              </div>

              <button
                className="prev-show-btn"
                onClick={() =>
                  navigate(
                    `/CollegeReports/${college.collegeId || college.id}`,
                    {
                      state: {
                        collegeName: college.name,
                      },
                    },
                  )
                }
              >
                اظهار التقارير
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
