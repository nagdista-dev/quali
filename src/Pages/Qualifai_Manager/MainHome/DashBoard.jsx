import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { CheckCircle, AlertTriangle, XCircle, Rocket } from "lucide-react";
import "./DashBoard.css";

// استبدل هذا المسار بمسار صورة اللوجو الحقيقية لديك
import logoUrl from "../../../assets/college-logo.png";

const DashBoard = () => {
  // بيانات الشارت الخطي (أداء)
  const performanceData = [
    { name: "نوف", value: 700 },
    { name: "أكت", value: 400 },
    { name: "سبت", value: 200 },
    { name: "أغس", value: 350 },
    { name: "يول", value: 500 },
    { name: "يون", value: 850 },
    { name: "مايو", value: 300 },
    { name: "أبر", value: 150 },
    { name: "مار", value: 400 },
    { name: "فبر", value: 650 },
    { name: "ينا", value: 350 },
  ];

  // بيانات الشارت العمودي (الامتثال للجودة)
  const complianceData = [
    { name: "معايير البنية التحتية", value: 25 },
    { name: "معايير البرمجيات", value: 80 },
    { name: "معايير أعضاء هيئة التدريس", value: 60 },
    { name: "معايير الطلاب", value: 50 },
  ];

  // بيانات الجدول (سجل النشاط)
  const activityData = [
    {
      id: 1,
      name: "سلمي",
      role: "حرر",
      date: "1/10/2025",
      time: "1:10 مساء",
      action: "إضافة ملف",
    },
    {
      id: 2,
      name: "سلمي",
      role: "حرر",
      date: "1/10/2025",
      time: "1:10 مساء",
      action: "إضافة ملف",
    },
    {
      id: 3,
      name: "سلمي",
      role: "حرر",
      date: "1/10/2025",
      time: "1:10 مساء",
      action: "إضافة ملف",
    },
    {
      id: 4,
      name: "سلمي",
      role: "حرر",
      date: "1/10/2025",
      time: "1:10 مساء",
      action: "إضافة ملف",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* القسم العلوي */}
      <div className="top-section">
        {/* البانر الأزرق */}{" "}
        <div className="line-chart-container">
          <div className="chart-title">أداء</div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={true}
                horizontal={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={true}
              />
              <YAxis
                orientation="right"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 1000]}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={1}
                dot={{ r: 3, stroke: "#8884d8", strokeWidth: 1, fill: "white" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="blue-banner">
          <div className="banner-content">
            <h2>الجودة للجميع</h2>
            <ul className="features-list">
              <li>
                <CheckCircle size={16} className="check-icon" color="white" />{" "}
                رفع مستوى الأداء عبر كل مستوى
              </li>
              <li>
                <CheckCircle size={16} className="check-icon" color="white" />{" "}
                تعزيز ثقافة التحسين
              </li>
              <li>
                <CheckCircle size={16} className="check-icon" color="white" />{" "}
                المستمر تمكين الأفراد من تقديم التميز
              </li>
              <li>
                <CheckCircle size={16} className="check-icon" color="white" />{" "}
                بناء الثقة من خلال الوضوح والنزاهة
              </li>
            </ul>
            <button className="start-btn">
              ابدأ رحلتك الجيدة <Rocket size={16} />
            </button>
          </div>
          <div className="college-logo-container">
            {/* هنا نضع صورة اللوجو */}
            <img src={logoUrl} alt="شعار الكلية" className="college-logo" />
          </div>
        </div>
        {/* الشارت الخطي */}
      </div>

      {/* بطاقات المعايير */}
      <div className="status-cards">
        <div className="card red">
          <h3>معيار البرنامج</h3>
          <XCircle color="#dc3545" size={24} />
        </div>
        <div className="card yellow">
          <h3>معيار أعضاء هيئة التدريس</h3>
          <AlertTriangle color="#ffc107" size={24} />
        </div>
        <div className="card green">
          <h3>معيار الطالب</h3>
          <CheckCircle color="#28a745" size={24} />
        </div>
      </div>

      {/* القسم السفلي */}
      <div className="bottom-section6">
        <div className="table-box6">
          <div className="section-title6">سجل النشاط </div>
          <table className="custom-table6">
            <thead>
              <tr>
                <th>اسم</th>
                <th>دور</th>
                <th>آخر تعديل</th>
                <th>فعل</th>
              </tr>
            </thead>
            <tbody>
              {activityData.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.role}</td>
                  <td className="date-cell">
                    <span>{row.date}</span>
                    <span>{row.time}</span>
                  </td>
                  <td>{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* شارت الامتثال (يسار) */}
        <div className="chart-box">
          <div className="section-title">الامتثال للجودة</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={complianceData} barSize={30}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={true}
                horizontal={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, width: 50 }}
                interval={0}
                height={60}
              />
              <YAxis orientation="right" />
              <Tooltip />
              <Bar dataKey="value" fill="#0b2559" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* جدول النشاط (يمين) */}
      </div>
    </div>
  );
};

export default DashBoard;
