import { useState } from "react";
import "./UploadFiles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function UploadFiles() {
  const navigate = useNavigate();
  const location = useLocation();
  const requiredDocumentId = location.state?.requiredDocumentId; // لازم تبعتيه من ShowDetails

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showNotesBox, setShowNotesBox] = useState(false);
  const [currentFileNotes, setCurrentFileNotes] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    // تحقق من الحجم
    const maxSize = 5 * 1024 * 1024 * 1024; // 5GB
    const largeFiles = selectedFiles.filter((file) => file.size > maxSize);
    if (largeFiles.length > 0) {
      setShowError(true);
      setErrorMessage("ملفاتك أكبر من 5 جيجا!");
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setShowError(false);
    setUploadedFiles((prev) => [...prev, ...selectedFiles]);

    setIsUploading(true);
    setProgress(0);

    // رفع كل ملف على حدة
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("File", file); // ✅ نفس الاسم بالظبط
      formData.append("notes", currentFileNotes); // لو تحبي تبعتي الملاحظات مع الملف

      try {
        await axios.post(
          `https://qualefai.runasp.net/api/Accreditation/documents/${requiredDocumentId}/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setProgress(percent);
            },
          },
        );
      } catch (error) {
        setShowError(true);
        setErrorMessage("حدث خطأ أثناء رفع الملف!");
        setIsUploading(false);
        console.error(error);
        return;
      }
    }

    setTimeout(() => {
      setIsUploading(false);
      setShowNotesBox(true);
    }, 500);
  };

  const handleAddNotes = () => {
    console.log("Notes added:", currentFileNotes);
    setShowNotesBox(false);
    setCurrentFileNotes("");
    setProgress(0);

    navigate("/SucessUpload");
  };
  console.log("requiredDocumentId:", requiredDocumentId);
  return (
    <div className="upload-page">
      <div className="upload-header">
        <span className="uploaded-files">الملفات المرفوعة</span>
        <div className="separator">
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <span className="upload-new">تحميل ملف جديد</span>
      </div>

      {!isUploading && (
        <div className="upload-box">
          {showError && (
            <div className="error-message">
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="upload-text">قم بسحب وإسقاط الملفات هنا أو</p>

          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileUpload}
            multiple
            accept="video/*,application/pdf,.doc,.docx"
          />

          <button
            className="upload-btn"
            onClick={() => document.getElementById("fileInput").click()}
          >
            اختر الملفات
          </button>
        </div>
      )}

      {isUploading && (
        <div className="upload-box uploading">
          <p>جاري التحميل... يرجى الانتظار</p>
          <div className="upload-progress">
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files-list">
          <h3>الملفات التي تم رفعها</h3>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="uploaded-file-item">
              📄 {file.name}
            </div>
          ))}
        </div>
      )}

      {showNotesBox && (
        <div className="notes-box-below">
          <h3>ملاحظات على الملف</h3>
          <textarea
            placeholder="اكتب ملاحظاتك هنا..."
            value={currentFileNotes}
            onChange={(e) => setCurrentFileNotes(e.target.value)}
            rows="6"
          />
          <div className="notes-actions">
            <button
              onClick={() => {
                setShowNotesBox(false);
                setCurrentFileNotes("");
              }}
            >
              إلغاء
            </button>
            <button onClick={handleAddNotes}>رفع</button>
          </div>
        </div>
      )}
    </div>
  );
}
