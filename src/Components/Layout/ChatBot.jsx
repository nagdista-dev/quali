import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Send,
  User,
  Bot,
  PlusCircle,
  Smile,
  Search,
  Image as ImageIcon,
  FileText,
  X,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [activeCollege, setActiveCollege] = useState(null);

  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const headers = useMemo(() => {
    return {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  // 2. Fetch messages for the active college
  const fetchMessages = async (collegeId) => {
    try {
      const res = await axios.get(`https://qualefai.runasp.net/api/Chat/${collegeId}/messages`, { headers });
      const fetchedMessages = res.data.map((msg) => ({
        id: msg.id,
        sender: msg.senderId === activeCollege?.receiverId ? "bot" : "user",
        text: msg.content || msg.message,
        type: msg.fileUrl ? "image" : "text",
        fileUrl: msg.fileUrl
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  // 1. Fetch available colleges to chat with
  useEffect(() => {
    const fetchCollegesAndMessages = async () => {
      try {
        const res = await axios.get("https://qualefai.runasp.net/api/Chat/colleges", { headers });
        const colleges = res.data;
        if (colleges && colleges.length > 0) {
          const firstCollege = colleges[0];
          setActiveCollege(firstCollege);
          fetchMessages(firstCollege.id || firstCollege.collegeId);
        } else {
          // Fallback static message if no colleges
          setMessages([
            {
              id: 1,
              sender: "bot",
              text: "مرحباً! لا توجد جهات اتصال متاحة حالياً للمراسلة.",
              type: "text",
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching colleges", error);
        // Fallback for UI testing
        setMessages([
          {
            id: 1,
            sender: "bot",
            text: "مرحباً، كيف يمكنني مساعدتك؟",
            type: "text",
          }
        ]);
      }
    };
    fetchCollegesAndMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headers]);

  // 3. Handle Send message
  const handleSend = async () => {
    if (inputValue.trim() === "") return;

    // Optimistic UI update
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      type: "text",
    };
    setMessages((prev) => [...prev, newMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setShowEmojiPicker(false);

    try {
      const formData = new FormData();
      formData.append("Content", currentInput);
      if (activeCollege) {
        formData.append("CollegeId", activeCollege.id || activeCollege.collegeId || 1);
        formData.append("ReceiverId", activeCollege.receiverId || 1);
      } else {
        // Dummy fallback values if no active college
        formData.append("CollegeId", 1);
        formData.append("ReceiverId", 1);
      }

      await axios.post("https://qualefai.runasp.net/api/Chat/send", formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      // Optionally refresh messages
      if (activeCollege) {
        fetchMessages(activeCollege.id || activeCollege.collegeId);
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setInputValue((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        text: file.name,
        fileUrl: fileUrl,
        type: file.type.startsWith("image/") ? "image" : "file",
      };
      setMessages((prev) => [...prev, newMessage]);
      setShowAttachMenu(false);

      try {
        const formData = new FormData();
        formData.append("Content", file.name);
        formData.append("file", file);
        if (activeCollege) {
          formData.append("CollegeId", activeCollege.id || activeCollege.collegeId || 1);
          formData.append("ReceiverId", activeCollege.receiverId || 1);
        } else {
          formData.append("CollegeId", 1);
          formData.append("ReceiverId", 1);
        }

        await axios.post("https://qualefai.runasp.net/api/Chat/send", formData, {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };

  return (
    <div className="main-container" dir="rtl">
      <div className="page-header">
        <h1>مساعدة</h1>
        <p>نحن نقدم دعمًا موثوقًا وحلولًا مخصصة لضمان حل مشكلاتك بسرعة وكفاءة.</p>
      </div>

      <div className="chat-interface">
        <div className="chat-header">
          <span>{activeCollege ? activeCollege.name || "فريق الدعم" : "فريق الدعم"}</span>
        </div>

        <div className="messages-area">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}
            >
              <div className="avatar">
                {msg.sender === "user" ? <User size={20} /> : <Bot size={20} />}
              </div>

              <div className="message-bubble">
                {msg.type === "image" ? (
                  <div className="image-preview">
                    <img src={msg.fileUrl} alt="uploaded" />
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="input-area">
          {showEmojiPicker && (
            <div className="emoji-picker-wrapper">
              <div className="emoji-header">
                <span onClick={() => setShowEmojiPicker(false)} style={{ cursor: "pointer" }}>
                  <X size={16} />
                </span>
              </div>
              <EmojiPicker onEmojiClick={onEmojiClick} height={350} width="100%" />
            </div>
          )}

          {showAttachMenu && (
            <div className="attach-menu">
              <button onClick={() => fileInputRef.current.click()}>
                <ImageIcon size={20} /> صور وفيديو
              </button>
              <button onClick={() => alert("ميزة المستندات قادمة قريباً!")}>
                <FileText size={20} /> مستند
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />

          <div className="extra-icons">
            <div
              className="icon-btn"
              onClick={() => {
                setShowEmojiPicker(!showEmojiPicker);
                setShowAttachMenu(false);
              }}
            >
              <Smile size={24} color="#fff" />
            </div>

            <div
              className="icon-btn"
              onClick={() => {
                setShowAttachMenu(!showAttachMenu);
                setShowEmojiPicker(false);
              }}
            >
              <PlusCircle size={24} color="#fff" />
            </div>
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="اكتب رسالة..."
            />
          </div>

          <button className="send-btn" onClick={handleSend}>
            <Send size={24} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

