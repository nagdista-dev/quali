import "./Accreditation.css";
import { useNavigate } from "react-router-dom";
import academicIcon from "../../../assets/academic-icon.png";
import programmaticIcon from "../../../assets/programmatic-icon.png";

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
    },
    {
      id: 2,
      title: "الاعتماد البرامجي",
      description:
        "الاعتماد البرامجي أو الاعتماد الخاص بالبرامج الأكاديمية يُمنح للبرامج الدراسية التي تستوفي معايير الجودة والتميز الأكاديمي في مجالات محددة، وتطبيق المعايير المعتمدة دولياً من خلال الاعتماد البرامجي المتخصص.",
      icon: programmaticIcon,
      applyLink: "تفاصيل الاعتماد",
      detailsLink: "تقييم الاعتماد",
    },
  ];

  return (
    <div className="accreditation-page">
      <h1 className="page-title">أقسام الاعتماد</h1>

      <div className="cards-container">
        {accreditationTypes.map((type) => (
          <div key={type.id} className="accreditation-card">
            <div className="card-icon">
              <img src={type.icon} alt={type.title} />
            </div>

            <h2 className="card-title">{type.title}</h2>

            <p className="card-description">{type.description}</p>

            <div className="card-actions">
              <button
                className="btn-outline"
                onClick={() => {
                  // ⬅️ التعديل هنا: الانتقال لصفحة التفاصيل
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
                تقييم الاعتماد
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccreditationTypes;
