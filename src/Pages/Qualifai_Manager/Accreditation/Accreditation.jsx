import "./Accreditation.css";
import { useNavigate } from "react-router-dom";
import academicIcon from "../../../assets/academic-icon.png";
import programmaticIcon from "../../../assets/programmatic-icon.png";
import { CheckCircle, ChevronLeft } from "lucide-react";

const AccreditationTypes = () => {
  const navigate = useNavigate();

  const accreditationTypes = [
    {
      id: 1,
      title: "الاعتماد الأكاديمي",
      description:
        "الاعتماد الأكاديمي في عام 2026 يُمنح إلى المؤسسات التعليمية بناءً على الاعتماد المؤسسي للجامعة التي تنتمي إليها والتقييم الأكاديمي للبرامج المقدمة بشكل متكامل وفقاً للمعايير الدولية للجودة والتميز.",
      icon: academicIcon,
      applyLink: "تفاصيل الاعتماد",
      detailsLink: "تقييم الاعتماد",
      features: ["اعتماد مؤسسي", "معايير دولية", "جودة أكاديمية"],
    },
    {
      id: 2,
      title: "الاعتماد البرامجي",
      description:
        "الاعتماد البرامجي أو الاعتماد الخاص بالبرامج الأكاديمية يُمنح للبرامج الدراسية التي تستوفي معايير الجودة والتميز الأكاديمي في مجالات محددة، وتطبيق المعايير المعتمدة دولياً من خلال الاعتماد البرامجي المتخصص.",
      icon: programmaticIcon,
      applyLink: "تفاصيل الاعتماد",
      detailsLink: "تقييم الاعتماد",
      features: ["برامج متخصصة", "تميز أكاديمي", "جودة دولية"],
    },
  ];

  return (
    <div className="accreditation-page">
      <h1 className="page-title">أقسام الاعتماد</h1>

      <div className="cards-container">
        {accreditationTypes.map((type) => (
          <div key={type.id} className="accreditation-card">
            <div className="card-header">
              <div className="card-icon">
                <img src={type.icon} alt={type.title} />
              </div>
              <h2 className="card-title">{type.title}</h2>
            </div>

            <div className="card-body">
              <p className="card-description">{type.description}</p>

              <div className="card-features">
                {type.features.map((feature, i) => (
                  <span key={i} className="feature-badge">
                    <CheckCircle size={14} />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-actions">
              <button
                className="btn-outline"
                onClick={() => {
                  navigate("/AccreditationDetails", {
                    state: { accreditationType: type.title },
                  });
                }}
              >
                تفاصيل الاعتماد
              </button>

              <button
                className="btn-primary"
                onClick={() => {
                  if (type.title === "الاعتماد الأكاديمي") {
                    navigate("/AllFiles", {
                      state: { accreditationType: type.title },
                    });
                  }
                }}
              >
                تقييم الاعتماد <ChevronLeft size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccreditationTypes;
