import "./Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = ({ user, setUser }) => {
  const token = localStorage.getItem("token");

  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || null);
  const [loading, setLoading] = useState(false);

  // ✅ البداية من user عشان يظهر فورًا بعد اللوجين
  const [profileData, setProfileData] = useState({
    firstName: user.name?.split(" ")[0] || "",
    lastName: user.name?.split(" ")[1] || "",
    email: localStorage.getItem("email") || "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // ===== تحديث من user =====
  useEffect(() => {
    if (user.name) {
      const [first, last] = user.name.split(" ");
      setProfileData((prev) => ({
        ...prev,
        firstName: first || "",
        lastName: last || "",
      }));
    }
  }, [user]);

  // ===== Fetch Profile =====
  const fetchProfile = async () => {
    try {
      const res = await axios.get("https://qualefai.runasp.net/api/Profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfileData({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
      });

      const photo = res.data.photoUrl
        ? res.data.photoUrl.startsWith("http")
          ? res.data.photoUrl
          : `https://qualefai.runasp.net${res.data.photoUrl}`
        : avatar;

      setAvatar(photo);

      setUser((prev) => ({
        ...prev,
        name: `${res.data.firstName} ${res.data.lastName}`,
        avatar: photo,
        roleName: res.data.roleName || prev.roleName,
      }));
    } catch (error) {
      console.error(error);
      alert("خطأ أثناء جلب البيانات");
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  // ===== Update Profile =====
  const handleUpdateProfile = async () => {
    try {
      await axios.put(
        "https://qualefai.runasp.net/api/Profile/update",
        profileData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const fullName = `${profileData.firstName} ${profileData.lastName}`;
      setUser((prev) => ({ ...prev, name: fullName }));

      alert("تم تحديث البيانات بنجاح ✅");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تحديث البيانات");
    }
  };

  // ===== Update Password =====
  const handleUpdatePassword = async () => {
    try {
      await axios.put(
        "https://qualefai.runasp.net/api/Profile/update-password",
        { oldPassword: currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      alert("تم تغيير كلمة المرور بنجاح ✅");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      alert("خطأ أثناء تغيير كلمة المرور");
    }
  };

  // ===== Upload Avatar =====
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://qualefai.runasp.net/api/Profile/upload-photo",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAvatar(res.data.image);
      localStorage.setItem("avatar", res.data.image);

      setUser((prev) => ({ ...prev, avatar: res.data.image }));

      alert("تم رفع الصورة بنجاح ✅");
    } catch (error) {
      console.error(error);
      alert("خطأ أثناء رفع الصورة");
    } finally {
      setLoading(false);
    }
  };

  // ===== Delete Avatar =====
  const handleDeletePhoto = async () => {
    try {
      setLoading(true);
      await axios.delete(
        "https://qualefai.runasp.net/api/Profile/delete-photo",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setAvatar(null);
      localStorage.removeItem("avatar");

      setUser((prev) => ({ ...prev, avatar: "" }));

      alert("تم حذف الصورة ✅");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء حذف الصورة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gray-container">
      <div className="white-container">
        {/* Avatar */}
        <div className="profilePage-photo-section">
          <div className="profilePage-avatar-box">
            <div className="profilePage-avatar-circle">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="profilePage-upload-btn"
                onClick={() => document.getElementById("fileInput").click()}
                disabled={loading}
              >
                {loading ? "جارٍ الرفع..." : "تحميل الصورة"}
              </button>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />

              <button
                className="profilePage-delete-btn"
                onClick={handleDeletePhoto}
                disabled={!avatar || loading}
              >
                حذف <FontAwesomeIcon icon={faTrashCan} color="red" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <h3 className="profilePage-title">المعلومات الشخصية</h3>

        <div className="profilePage-grid-2">
          <div className="profilePage-input-group">
            <label>الاسم الأول</label>
            <input
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
            />
          </div>

          <div className="profilePage-input-group">
            <label>اسم العائلة</label>
            <input
              value={profileData.lastName}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
            />
          </div>

          <div className="profilePage-input-group">
            <label>البريد الإلكتروني</label>
            <input
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="profilePage-update-container">
          <button
            className="profilePage-update-btn"
            onClick={handleUpdateProfile}
          >
            تحديث البيانات
          </button>
        </div>

        {/* Password */}
        <h3 className="profilePage-title">تغيير كلمة المرور</h3>

        <div className="profilePage-grid-2">
          <div className="profilePage-input-group">
            <label>كلمة المرور الحالية</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="profilePage-input-group">
            <label>كلمة مرور جديدة</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="profilePage-update-container">
          <button
            className="profilePage-update-btn"
            onClick={handleUpdatePassword}
          >
            تغيير كلمة المرور
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
