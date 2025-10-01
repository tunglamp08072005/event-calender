// client/src/components/Calendar/AISuggestions.jsx - ĐÃ SỬA
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import { eventStartLoading } from '../../actions/event'; // 🆕 THÊM IMPORT

const AISuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const generateAISuggestions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL =
        process.env.REACT_APP_API_URL || "http://localhost:5000/api";

      const response = await fetch(`${API_BASE_URL}/ai/suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify({
          userPreferences: "analyze from existing events",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.ok) {
        setSuggestions(data.suggestions || []);
      } else {
        console.error("AI suggestion error:", data.msg);
        Swal.fire('Lỗi', data.msg || "Không thể tạo gợi ý AI", 'error');
      }
    } catch (error) {
      console.error("AI suggestion error:", error);
      Swal.fire('Lỗi', "Lỗi kết nối AI, vui lòng thử lại", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUseSuggestion = async (suggestion) => {
    const token = localStorage.getItem("token");
    const API_BASE_URL =
      process.env.REACT_APP_API_URL || "http://localhost:5000/api";

    const eventWithDates = {
      ...suggestion,
      start: new Date(suggestion.start),
      end: new Date(suggestion.end),
    };

    try {
      const resp = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(eventWithDates),
      });

      const body = await resp.json();

      if (body.ok) {
        // 🟢 QUAN TRỌNG: Load lại toàn bộ events từ server
        dispatch(eventStartLoading());
        
        // 🟢 Hiển thị thông báo thành công
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: `Đã thêm "${suggestion.title}" vào lịch`,
          timer: 2000,
          showConfirmButton: false
        });

        // 🟢 Tùy chọn: Xóa suggestion khỏi danh sách sau khi thêm
        setSuggestions(prev => prev.filter(s => s !== suggestion));
        
      } else {
        Swal.fire('Lỗi', body.msg || "Không thể thêm sự kiện AI", 'error');
      }
    } catch (err) {
      console.error("❌ Error adding AI event:", err);
      Swal.fire('Lỗi', "Lỗi khi thêm sự kiện", 'error');
    }
  };

  return (
    <div className="ai-suggestions">
      <div className="ai-suggestions__header">
        <h3>🤖 Gợi ý Sự kiện Thông minh</h3>
        <p>AI sẽ phân tích lịch trình hiện tại và đề xuất sự kiện phù hợp</p>
      </div>

      <button
        className="btn btn-ai-primary"
        onClick={generateAISuggestions}
        disabled={loading}
      >
        {loading ? "🤖 AI đang phân tích..." : "🎯 Tạo gợi ý thông minh"}
      </button>

      {suggestions.length > 0 && (
        <div className="suggestions-list">
          <h4>Đề xuất từ AI ({suggestions.length}):</h4>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="suggestion-item">
              <div className="suggestion-content">
                <h5>{suggestion.title}</h5>
                <p className="suggestion-time">
                  📅 {moment(suggestion.start).format("DD/MM/YYYY HH:mm")} -{" "}
                  {moment(suggestion.end).format("DD/MM/YYYY HH:mm")}
                </p>
                {suggestion.notes && (
                  <p className="suggestion-notes">{suggestion.notes}</p>
                )}
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleUseSuggestion(suggestion)}
              >
                Thêm vào lịch
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AISuggestions;