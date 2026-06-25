import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { CheckCircle, Bell, FileText, Landmark } from "lucide-react";
import checkImage from "../../../assets/check.png";
import "./Employee_DashBoard.css";

const Employee_DashBoard = () => {
  // --- Data ---
  const pieData = [
    { name: "نسبة الكليات المعتمدة", value: 72 },
    { name: "نسبة الكليات الغير معتمدة", value: 28 },
  ];
  const PIE_COLORS = ["#0b2559", "#00d2ff"];

  const complianceData = [
    { name: "كلية الصيدلة", value: 30 },
    { name: "كلية الهندسة", value: 95 },
    { name: "كلية الطب", value: 75 },
    { name: "كلية الحاسبات", value: 65 },
  ];

  const notificationsList = [
    { id: 1, title: "مساحة التخزين المتوفرة على وشك النفاد..", date: "اليوم 12:45 مساءا", desc: "تم تحديث اسم الملف في الإصدار الأخير بواسطة أحمد علي" },
    { id: 2, title: "مساحة التخزين المتوفرة على وشك النفاد..", date: "اليوم 10:15 صباحا", desc: "تم تحديث اسم الملف في الإصدار الأخير بواسطة أحمد علي" },
    { id: 3, title: "مساحة التخزين المتوفرة على وشك النفاد..", date: "اليوم 08:30 صباحا", desc: "تم تحديث اسم الملف في الإصدار الأخير بواسطة أحمد علي" },
    { id: 4, title: "مساحة التخزين المتوفرة على وشك النفاد..", date: "الأمس 11:45 مساءا", desc: "تم تحديث اسم الملف في الإصدار الأخير بواسطة أحمد علي" },
    { id: 5, title: "مساحة التخزين المتوفرة على وشك النفاد..", date: "الأمس 09:15 صباحا", desc: "تم تحديث اسم الملف في الإصدار الأخير بواسطة أحمد علي" },
  ];

  return (
    <div className="ed-container" dir="rtl">
      
      {/* --- Top Section --- */}
      <div className="ed-top-section">
        {/* Right: Pie Chart (First in DOM = Right in RTL) */}
        <div className="ed-card ed-pie-card">
          <h3 className="ed-card-title">نسبة الكليات المعتمدة</h3>
          <div className="ed-pie-content">
            <div className="ed-pie-legend">
              {pieData.map((entry, index) => (
                <div key={index} className="ed-legend-item">
                  <span className="ed-legend-color" style={{ backgroundColor: PIE_COLORS[index] }}></span>
                  <span className="ed-legend-text">{entry.name}</span>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Left: Blue Banner (Second in DOM = Left in RTL) */}
        <div className="ed-card ed-blue-banner">
          <div className="ed-banner-content">
            <h2>الجودة للجميع</h2>
            <ul className="ed-features-list">
              <li><CheckCircle size={16} color="#00ff00" className="ed-check-icon" /> رفع مستوى الأداء عبر كل مستوى</li>
              <li><CheckCircle size={16} color="#00ff00" className="ed-check-icon" /> تعزيز ثقافة التحسين</li>
              <li><CheckCircle size={16} color="#00ff00" className="ed-check-icon" /> المستمر لتمكين الأفراد من تقديم التميز</li>
              <li><CheckCircle size={16} color="#00ff00" className="ed-check-icon" /> بناء الثقة من خلال الوضوح والنزاهة</li>
            </ul>
            <button className="ed-start-btn">ابدأ رحلتك الجيدة</button>
          </div>
          <div className="ed-banner-image">
            <img src={checkImage} alt="check" className="ed-check-img" />
          </div>
        </div>
      </div>

      {/* --- Middle Section: Stats Cards --- */}
      <div className="ed-stats-section">
        <div className="ed-card ed-stat-card">
          <div className="ed-stat-header">
            <FileText size={20} color="#0b2559" />
            <span>تقارير جديدة</span>
          </div>
          <div className="ed-stat-value">+10</div>
        </div>

        <div className="ed-card ed-stat-card">
          <div className="ed-stat-header">
            <Bell size={20} color="#0b2559" />
            <span>اشعارات جديدة</span>
          </div>
          <div className="ed-stat-value">+10</div>
        </div>

        <div className="ed-card ed-stat-card">
          <div className="ed-stat-header">
            <Landmark size={20} color="#0b2559" />
            <span>طلبات تقييم الاعتماد</span>
          </div>
          <div className="ed-stat-value">+2</div>
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div className="ed-bottom-section">
        {/* Right: Bar Chart */}
        <div className="ed-card ed-bar-card">
          <h3 className="ed-card-title">الامتثال للجودة</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={complianceData} barSize={35} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
              <YAxis orientation="right" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip cursor={{ fill: '#f4f6fb' }} />
              <Bar dataKey="value" fill="#0b2559" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Left: Notifications List */}
        <div className="ed-card ed-notifications-card">
          <h3 className="ed-card-title ed-align-center">الاشعارات</h3>
          <div className="ed-notifications-list">
            {notificationsList.map((item) => (
              <div key={item.id} className="ed-notification-item">
                <div className="ed-notif-dot"></div>
                <div className="ed-notif-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="ed-notif-date">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Employee_DashBoard;
