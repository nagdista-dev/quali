import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageSubscriptions.css";

const ManageSubscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        const res = await axios.get(
          "https://qualefai.runasp.net/api/Subscription",
        );
        setSubscriptions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getSubscriptions();
  }, []);

  return (
    <div className="ms-page">
      <div className="ms-header">
        <h2 className="ms-title">ادارة الاشتراكات</h2>
      </div>

      <div className="ms-table-wrapper">
        <table className="ms-table">
          <thead>
            <tr>
              <th>اسم الكلية</th>
              <th>اسم الجامعة</th>
              <th>نوع الاشتراك</th>
              <th>تاريخ البداية</th>
              <th>تاريخ النهاية</th>
              <th>الحالة</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((row) => (
              <tr
                key={row.id}
                className="ms-clickable-row"
                onClick={() =>
                  navigate("/EditSubscription", {
                    state: { subscription: row },
                  })
                }
              >
                <td>{row.collegeName}</td>
                <td>{row.university}</td>
                <td>{row.institutionType}</td>
                <td>{row.startDate?.slice(0, 10)}</td>
                <td>{row.endDate?.slice(0, 10)}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSubscriptions;
