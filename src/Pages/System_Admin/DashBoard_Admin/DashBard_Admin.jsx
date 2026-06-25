import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { Bell, BarChart3, Landmark } from "lucide-react";

import checkImage from "../../../assets/check.png";
import "./DashBard_Admin.css";

export default function DashBard_Admin() {
  const pieData = [
    {
      name: "نسبة الكليات المعتمدة",
      value: 70,
    },
    {
      name: "نسبة الكليات الغير معتمدة",
      value: 30,
    },
  ];

  const PIE_COLORS = ["#0A2540", "#18C7E6"];

  const notificationsList = [
    {
      id: 1,
      title: "مساحة التخزين المتوفرة على وشك النفاد.",
      subtitle: "تم تحديث اسم الملف إلى الإصدار الأحدث بواسطة أحمد علي.",
      time: "اليوم، 09:10 صباحاً",
    },
    {
      id: 2,
      title: "مساحة التخزين المتوفرة على وشك النفاد.",
      subtitle: "تم تحديث اسم الملف إلى الإصدار الأحدث بواسطة أحمد علي.",
      time: "اليوم، 09:10 صباحاً",
    },
    {
      id: 3,
      title: "مساحة التخزين المتوفرة على وشك النفاد.",
      subtitle: "تم تحديث اسم الملف إلى الإصدار الأحدث بواسطة أحمد علي.",
      time: "اليوم، 09:10 صباحاً",
    },
    {
      id: 4,
      title: "مساحة التخزين المتوفرة على وشك النفاد.",
      subtitle: "تم تحديث اسم الملف إلى الإصدار الأحدث بواسطة أحمد علي.",
      time: "اليوم، 09:10 صباحاً",
    },
    {
      id: 5,
      title: "مساحة التخزين المتوفرة على وشك النفاد.",
      subtitle: "تم تحديث اسم الملف إلى الإصدار الأحدث بواسطة أحمد علي.",
      time: "اليوم، 09:10 صباحاً",
    },
    {
      id: 6,
      title: "مساحة التخزين المتوفرة على وشك النفاد.",
      subtitle: "تم تحديث اسم الملف إلى الإصدار الأحدث بواسطة أحمد علي.",
      time: "اليوم، 09:10 صباحاً",
    },
  ];

  return (
    <div className="da-container">
      {/* ================= TOP SECTION ================= */}

      <div className="da-top-section">
        {/* Pie Chart */}

        <div className="da-card da-pie-card">
          <h3 className="da-card-title">نسبة الكليات المعتمدة</h3>

          <div className="da-pie-content">
            <div className="da-pie-legend">
              {pieData.map((item, index) => (
                <div key={index} className="da-legend-item">
                  <span
                    className="da-legend-color"
                    style={{
                      backgroundColor: PIE_COLORS[index],
                    }}
                  />

                  <span className="da-legend-text">{item.name}</span>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="55%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blue Banner */}

        <div className="da-card da-blue-banner">
          <div className="da-banner-content">
            <h2>الجودة للجميع</h2>

            <ul className="da-features-list">
              <li>
                <span className="da-check">✓</span>
                رفع مستوى الأداء عبر كل مستوى
              </li>

              <li>
                <span className="da-check">✓</span>
                تعزيز ثقافة التحسين المستمر
              </li>

              <li>
                <span className="da-check">✓</span>
                تمكين الأفراد من تقديم التميز
              </li>

              <li>
                <span className="da-check">✓</span>
                بناء الثقة من خلال الوضوح والنزاهة
              </li>
            </ul>

            <button className="da-start-btn">ابدأ رحلتك الجيدة</button>
          </div>

          <div className="da-banner-image">
            <img src={checkImage} alt="check" className="da-check-img" />
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="da-stats-section">
        <div className="da-card da-stat-card">
          <div className="da-stat-header">
            <Bell size={20} color="#0A2540" />

            <span>إشعارات جديدة</span>
          </div>

          <div className="da-stat-value">+10</div>
        </div>

        <div className="da-card da-stat-card">
          <div className="da-stat-header">
            <BarChart3 size={20} color="#0A2540" />

            <span>إشعارات جديدة</span>
          </div>

          <div className="da-stat-value">+10</div>
        </div>

        <div className="da-card da-stat-card">
          <div className="da-stat-header">
            <Landmark size={20} color="#0A2540" />

            <span>طلبات تقييم الاعتماد</span>
          </div>

          <div className="da-stat-value">+2</div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}

      <div className="da-bottom-section">
        {/* Subscriptions */}

        <div className="da-card da-subscriptions-card">
          <h3 className="da-card-title">الاشتراكات</h3>

          <div className="da-progress-group">
            <div className="da-progress-item">
              <span>نسبة الاشتراكات النشطة</span>

              <div className="da-track">
                <div
                  className="da-fill da-fill-blue"
                  style={{
                    width: "55%",
                  }}
                />
              </div>
            </div>

            <div className="da-progress-item">
              <span>نسبة الاشتراكات قيد التجديد</span>

              <div className="da-track">
                <div
                  className="da-fill da-fill-lime"
                  style={{
                    width: "28%",
                  }}
                />
              </div>
            </div>

            <div className="da-progress-item">
              <span>نسبة الاشتراكات المنتهية</span>

              <div className="da-track">
                <div
                  className="da-fill da-fill-red"
                  style={{
                    width: "12%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}

        <div className="da-card da-notifications-card">
          <h3 className="da-card-title">الإشعارات</h3>

          <div className="da-notifications-list">
            {notificationsList.map((item) => (
              <div key={item.id} className="da-notification-item">
                <div className="da-notif-content">
                  <h4>{item.title}</h4>

                  <p>{item.subtitle}</p>
                </div>

                <div className="da-notif-time">{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
