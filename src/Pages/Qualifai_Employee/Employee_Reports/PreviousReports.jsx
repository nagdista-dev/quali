import { useNavigate } from "react-router-dom";
import "./PreviousReports.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const collegesData = [
  { id: 1, name: "كلية الحاسبات و المعلومات" },
  { id: 2, name: "كلية الصيدلة" },
  { id: 3, name: "كلية الطب" },
  { id: 4, name: "كلية التجارة" },
  { id: 5, name: "كلية الهندسة" },
  { id: 6, name: "كلية العلوم" },
];

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

  return (
    <div className="prev-reports-container">
      <div className="prev-reports-header">
        <h2 className="prev-reports-title">التقارير السابقة</h2>

        {/* فلتر FontAwesome */}
        <button className="prev-filter-btn">
          <FontAwesomeIcon icon={faSliders} />
        </button>
      </div>

      <div className="prev-search-wrapper">
        <input
          type="text"
          className="prev-search-input"
          placeholder="ابحث باسم الكلية"
        />
        <span className="prev-search-icon">
          <SearchIcon />
        </span>
      </div>

      <div className="prev-colleges-list">
        {collegesData.map((college) => (
          <div key={college.id} className="prev-college-row">
            <span className="prev-college-name">{college.name}</span>

            <button
              className="prev-show-btn"
              onClick={() =>
                navigate(`/CollegeReports/${college.id}`, {
                  state: { collegeName: college.name },
                })
              }
            >
              اظهار التقارير
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
