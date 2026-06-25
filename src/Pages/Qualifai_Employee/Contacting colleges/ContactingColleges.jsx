import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { Send, ArrowLeft, Smile, Search, MoreVertical, Paperclip, PlusCircle } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import "./ContactingColleges.css";

const BASE_URL = "https://qualefai.runasp.net";

export default function ContactingColleges() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const token = localStorage.getItem("token");

  const headers = useMemo(() => ({
    Authorization: `Bearer ${token}`,
  }), [token]);

  // Fetch college list
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/Chat/colleges`, { headers });
        setColleges(res.data || []);
      } catch (err) {
        console.error("Error fetching colleges", err);
      }
    };
    fetchColleges();
  }, [headers]);

  // Fetch messages when college selected
  useEffect(() => {
    if (!selectedCollege) return;
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const collegeId = selectedCollege.id || selectedCollege.collegeId;
        const res = await axios.get(`${BASE_URL}/api/Chat/${collegeId}/messages`, { headers });
        const mapped = (res.data || []).map((msg) => ({
          id: msg.id,
          sender: msg.isCurrentUser ? "me" : "them",
          text: msg.content || msg.message || "",
          fileUrl: msg.fileUrl || null,
          time: msg.sentAt || msg.time || "",
        }));
        setMessages(mapped);
      } catch (err) {
        console.error("Error fetching messages", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCollege]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !selectedCollege) return;
    const text = inputValue;
    setInputValue("");
    setShowEmoji(false);

    // Optimistic update
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "me", text, time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }) },
    ]);

    try {
      const formData = new FormData();
      formData.append("Content", text);
      formData.append("CollegeId", selectedCollege.id || selectedCollege.collegeId || 1);
      formData.append("ReceiverId", selectedCollege.receiverId || 1);
      await axios.post(`${BASE_URL}/api/Chat/send`, formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const formatTime = (t) => {
    if (!t) return "";
    try {
      return new Date(t).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return t;
    }
  };

  return (
    <div className="cc-wrapper" dir="rtl">
      {/* ===== Left: Chat Panel ===== */}
      <div className="cc-chat-panel">
        {!selectedCollege ? (
          <div className="cc-empty-state">
            <div className="cc-empty-icon">💬</div>
            <p>اختر كلية من القائمة لبدء المحادثة</p>
          </div>
        ) : (
          <>
            {/* Chat Header (LTR so Name is left, icons are right) */}
            <div className="cc-chat-header" dir="ltr">
              <div className="cc-chat-header-info">
                <button className="cc-back-btn" onClick={() => setSelectedCollege(null)}>
                  <ArrowLeft size={20} />
                </button>
                <span className="cc-chat-name">{selectedCollege.name || selectedCollege.collegeName || "الكلية"}</span>
              </div>
              <div className="cc-chat-header-actions">
                <Paperclip size={20} color="#000" />
                <MoreVertical size={20} color="#000" />
              </div>
            </div>

            {/* Messages */}
            <div className="cc-messages-area">
              {loading && <div className="cc-loading">جاري التحميل...</div>}
              {!loading && messages.length === 0 && (
                <div className="cc-no-messages">لا توجد رسائل بعد، ابدأ المحادثة!</div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`cc-msg-row ${msg.sender === "me" ? "cc-msg-me" : "cc-msg-them"}`}>
                  {msg.sender === "them" && (
                    <div className="cc-avatar">
                      <img src={selectedCollege.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCollege.name || "C")}&background=e0e7ff&color=0c2d64&size=40`} alt="avatar" />
                    </div>
                  )}
                  <div className="cc-bubble">
                    {msg.fileUrl ? (
                      <img src={msg.fileUrl} alt="file" className="cc-bubble-img" />
                    ) : (
                      <span>{msg.text}</span>
                    )}
                    <span className="cc-bubble-time">{formatTime(msg.time)}</span>
                  </div>
                  {msg.sender === "me" && (
                    <div className="cc-avatar cc-avatar-me">
                      <div className="cc-avatar-initials">أنا</div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="cc-input-bar">
              {showEmoji && (
                <div className="cc-emoji-wrapper">
                  <EmojiPicker
                    onEmojiClick={(e) => setInputValue((prev) => prev + e.emoji)}
                    height={320}
                    width="100%"
                  />
                </div>
              )}
              <button className="cc-send-btn" onClick={handleSend}>
                <Send size={22} />
              </button>
              <div className="cc-input-wrapper">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب رسالة..."
                />
                <Search size={16} className="cc-search-icon" />
              </div>
              <div className="cc-input-icons">
                <button className="cc-icon-btn" onClick={() => setShowEmoji(!showEmoji)}>
                  <Smile size={22} color="#fff" />
                </button>
                <button className="cc-icon-btn">
                  <PlusCircle size={22} color="#fff" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===== Right: Colleges List ===== */}
      <div className="cc-sidebar">
        <div className="cc-sidebar-header">Conversations</div>
        <div className="cc-colleges-list">
          {colleges.length === 0 && (
            <p className="cc-no-colleges">لا توجد كليات متاحة</p>
          )}
          {colleges.map((college) => {
            const id = college.id || college.collegeId;
            const name = college.name || college.collegeName || "كلية";
            const sub = college.lastMessage || college.description || "Supporting line text lorem...";
            const time = college.lastMessageTime ? formatTime(college.lastMessageTime) : "10 min";
            const img = college.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=dbeafe&color=0c2d64&size=40`;
            const isActive = selectedCollege && (selectedCollege.id || selectedCollege.collegeId) === id;

            return (
              <div
                key={id}
                className={`cc-college-item ${isActive ? "cc-college-active" : ""}`}
                onClick={() => setSelectedCollege(college)}
              >
                <img src={img} alt={name} className="cc-college-avatar" />
                <div className="cc-college-info">
                  <span className="cc-college-name">{name}</span>
                  <span className="cc-college-sub">{sub}</span>
                </div>
                <span className="cc-college-time">{time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
