import "./Pricing.css";
import { RotateCcw, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

const PricingCard = ({
  title,
  description,
  price,
  features,
  isGrowth,
  buttonStyle,
}) => {
  const navigate = useNavigate();

  return (
    <div className="pricing-card">
      {isGrowth && (
        <div className="growth-badge">
          <TrendingUp size={14} />
          <span>خطة النمو</span>
        </div>
      )}

      <h2 className="card-title">{title}</h2>
      <p className="card-desc">{description}</p>

      <div className="price-section">
        <span className="currency">$</span>
        <span className="amount">{price}</span>
      </div>

      <button
        onClick={() => navigate("/Payment")}
        className={`btn-start ${buttonStyle === "solid" ? "btn-solid" : "btn-outline"}`}
      >
        ابدأ الآن
      </button>

      <div className="features-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <RotateCcw size={18} className="icon-blue" strokeWidth={2.5} />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      title: "أساسي",
      description: "مثالي للفرق الصغيرة التي تبدأ في تنظيم عملها بشكل احترافي",
      price: "44",
      buttonStyle: "outline",
      features: [
        "ما يصل إلى 7 مستخدمين",
        "مساحة تخزين آمنة تبلغ 150 جيجابايت",
        "أذونات الوصول المستندة إلى الدور",
        "التحكم في الإصدار البسيط",
      ],
    },
    {
      title: "مميز",
      description: "مثالي للفرق التي تحتاج إلى بحث متقدم وعمليات تكامل سلسة",
      price: "87",
      isGrowth: true,
      buttonStyle: "solid",
      features: [
        "ما يصل إلى 10 مستخدمين",
        "مساحة تخزين آمنة تبلغ 250 جيجابايت",
        "البحث عن النص الكامل (OCR)",
        "الإدارة الآلية للمستندات",
      ],
    },
    {
      title: "مصممة",
      description:
        "مصممة للمؤسسات الكبيرة التي تتطلب مستوى عالٍ من الأمان والدعم",
      price: "100",
      isGrowth: true,
      buttonStyle: "solid",
      features: [
        "أكثر من 15 مستخدمًا",
        "مساحة تخزين آمنة تبلغ 500 جيجابايت",
        "أولوية دعم العملاء",
        "عمليات تكامل مخصصة لسيبر عملك",
      ],
    },
  ];

  return (
    <div className="white-container">
      <header className="pricing-header">
        <h1>اختر خطتك</h1>
        <p>فتح إمكانيات لا نهاية لها</p>
      </header>

      <div className="cards-grid">
        {plans.map((p, i) => (
          <PricingCard key={i} {...p} />
        ))}
      </div>

      <footer className="pricing-footer">
        <span className="footer-text">
          تم ضبط خطتك الحالية على التجديد التلقائي بشكل منتظم.
        </span>
        <button className="btn-cancel">قم بإلغاء اشتراكك</button>
      </footer>
    </div>
  );
};

export default Pricing;
