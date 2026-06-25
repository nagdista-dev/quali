import { useNavigate } from "react-router-dom";
import "./AccreditationDetails.css";

const AccreditationDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="accreditation-details-page">
      <div className="details-container">
        <h1 className="details-title">أقسام الاعتماد</h1>

        <div className="video-placeholder">
          <span className="video-text">Vedio</span>
        </div>

        <button className="back-button" onClick={() => navigate(-1)}>
          رجوع
        </button>
      </div>
    </div>
  );
};

export default AccreditationDetails;
