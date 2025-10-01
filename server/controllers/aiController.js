// server/controllers/aiController.js - THÊM HÀM SUGGESTIONS THỰC TẾ
import Event from '../models/Event.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

console.log('🔍 aiController - Environment check:');
console.log('GEMINI_API_KEY in aiController:', 
  process.env.GEMINI_API_KEY ? 
  `✅ Found (${process.env.GEMINI_API_KEY.substring(0, 10)}...)` : 
  '❌ MISSING'
);

// 🆕 VALIDATE API KEY
let genAI = null;
let geminiAvailable = false;

if (process.env.GEMINI_API_KEY) {
  try {
    if (!process.env.GEMINI_API_KEY.startsWith('AIza')) {
      console.error('❌ Invalid Gemini API Key format');
    } else {
      genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      geminiAvailable = true;
      console.log('✅ Gemini AI initialized successfully');
    }
  } catch (error) {
    console.error('❌ Failed to initialize Gemini:', error.message);
  }
} else {
  console.error('❌ GEMINI_API_KEY is missing in environment variables');
}

const validateAndTruncateTitle = (title, maxLength = 32) => {
  if (!title || typeof title !== 'string') {
    return 'Sự kiện mới';
  }
  
  if (title.length <= maxLength) {
    return title;
  }
  
  // Cắt bớt và thêm ... nếu vượt quá độ dài
  const truncated = title.substring(0, maxLength - 3) + '...';
  console.log(`✂️ Title truncated: "${title}" -> "${truncated}"`);
  return truncated;
};

// 🆕 ENHANCED FALLBACK TITLE GENERATOR
const generateSmartEventTitle = (start, end, context) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  const hour = startDate.getHours();
  let timeOfDay = "trong ngày";
  let activityType = "Sự kiện";
  
  if (hour < 6) {
    timeOfDay = "sáng sớm";
    activityType = "Việc cá nhân";
  } else if (hour < 9) {
    timeOfDay = "buổi sáng"; 
    activityType = "Cuộc họp";
  } else if (hour < 12) {
    timeOfDay = "giữa sáng";
    activityType = "Công việc";
  } else if (hour < 14) {
    timeOfDay = "buổi trưa";
    activityType = "Bữa trưa";
  } else if (hour < 17) {
    timeOfDay = "buổi chiều";
    activityType = "Cuộc họp";
  } else if (hour < 20) {
    timeOfDay = "buổi tối";
    activityType = "Sự kiện";
  } else {
    timeOfDay = "tối muộn";
    activityType = "Việc riêng";
  }

  const dayNames = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const dayName = dayNames[startDate.getDay()];

  // Tạo title thông minh dựa trên context
  let title = "";
  if (context && context.trim()) {
    const contextLower = context.toLowerCase();
    
    if (contextLower.includes('họp') || contextLower.includes('meeting')) {
      activityType = "Cuộc họp";
    } else if (contextLower.includes('làm việc') || contextLower.includes('work')) {
      activityType = "Công việc";
    } else if (contextLower.includes('ăn') || contextLower.includes('lunch') || contextLower.includes('dinner')) {
      activityType = "Bữa ăn";
    } else if (contextLower.includes('hẹn') || contextLower.includes('appointment')) {
      activityType = "Cuộc hẹn";
    } else if (contextLower.includes('học') || contextLower.includes('study')) {
      activityType = "Học tập";
    }
    
    const keywords = context.split(' ').slice(0, 2).join(' ');
    title = `${activityType} ${timeOfDay}: ${keywords}`;
  } else {
    const baseTitles = [
      `${activityType} ${timeOfDay}`,
      `Kế hoạch ${dayName.toLowerCase()}`,
      `Lịch trình ${timeOfDay}`,
      `Công việc quan trọng`,
      `Hẹn ${timeOfDay}`
    ];
    title = baseTitles[Math.floor(Math.random() * baseTitles.length)];
  }
  
  if (title.length > 32) {
    title = title.substring(0, 29) + '...';
  }
  
  let description = "";
  if (context && context.trim()) {
    description = context.length > 100 ? context.substring(0, 100) + '...' : context;
  } else {
    description = `${activityType} được lên lịch vào ${timeOfDay} ${dayName.toLowerCase()}`;
  }

  console.log(`🎯 Generated title: "${title}"`);
  
  return {
    title: title,
    description: description
  };
};

const callGemini = async (prompt, maxRetries = 2) => {
  if (!genAI) {
    throw new Error('Gemini AI không được cấu hình');
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Gemini attempt ${attempt} for prompt: ${prompt.substring(0, 100)}...`);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      console.log(`🚀 Using model: gemini-2.0-flash`);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();

      console.log("✅ Gemini response received");
      console.log("📄 Raw response:", content.substring(0, 200) + "...");

      // 🆕 IMPROVED JSON PARSING - Xử lý markdown code blocks
      let jsonString = content.trim();
      
      // Loại bỏ markdown code blocks nếu có
      if (jsonString.startsWith('```json')) {
        jsonString = jsonString.replace(/```json\s*/, '').replace(/\s*```/, '');
      } else if (jsonString.startsWith('```')) {
        jsonString = jsonString.replace(/```\s*/, '').replace(/\s*```/, '');
      }
      
      // Loại bỏ các ký tự không cần thiết ở đầu và cuối
      jsonString = jsonString.trim();
      
      try {
        const parsed = JSON.parse(jsonString);
        console.log("✅ Successfully parsed JSON from Gemini");
        return parsed;
      } catch (parseError) {
        console.error("❌ JSON parse error:", parseError.message);
        console.log("📄 Content that failed to parse:", jsonString);
        
        // 🆕 THỬ TÌM JSON OBJECT TRONG RESPONSE
        const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]);
            console.log("✅ Successfully extracted JSON from response");
            return parsed;
          } catch (secondParseError) {
            console.error("❌ Second JSON parse error:", secondParseError.message);
          }
        }
        
        throw new Error(`Không thể parse JSON từ response: ${parseError.message}`);
      }

    } catch (error) {
      console.error(`❌ Gemini attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) throw error;
      await new Promise(res => setTimeout(res, 1000 * attempt));
    }
  }
};

const generateEventTitle = async (req, res) => {
  const { start, end, context } = req.body;

  try {
    if (!start || !end) {
      return res.status(400).json({
        ok: false,
        msg: "Thiếu thời gian bắt đầu hoặc kết thúc"
      });
    }

    let result;
    let source = "gemini";
    let note = "AI đã tạo tiêu đề thông minh";

    if (geminiAvailable && genAI) {
      try {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const formatDate = (date) => {
          return date.toLocaleString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: false
          });
        };

        const startStr = formatDate(startDate);
        const endStr = formatDate(endDate);

        // 🆕 PROMPT CÓ THÊM GIỚI HẠN KÝ TỰ
        const prompt = `
Hãy tạo tiêu đề sự kiện bằng tiếng Việt dựa trên thông tin:

THỜI GIAN: ${startStr} đến ${endStr}
NGỮ CẢNH: ${context || "Không có mô tả cụ thể"}

YÊU CẦU QUAN TRỌNG:
- Tiêu đề: ngắn gọn 5-8 từ, TỐI ĐA 25 KÝ TỰ, tự nhiên như con người
- Mô tả: 1 câu mô tả ngắn gọn
- TRẢ VỀ ĐỊNH DẠNG JSON: {"title": "tiêu đề", "description": "mô tả"}

Ví dụ: {"title": "Cuộc họp chiều thứ ba", "description": "Họp về dự án mới với team"}
CHỈ TRẢ VỀ JSON, KHÔNG TEXT NÀO KHÁC.
        `;

        console.log("🤖 Calling Gemini AI...");
        result = await callGemini(prompt);
        
        console.log("✅ Gemini AI success!");

        // 🆕 VALIDATE TITLE LENGTH
        if (result.title) {
          const originalTitle = result.title;
          result.title = validateAndTruncateTitle(result.title, 32);
          
          if (result.title !== originalTitle) {
            console.log(`✂️ Generated title truncated: "${originalTitle}" -> "${result.title}"`);
          }
        }

      } catch (aiError) {
        console.log("🔄 Gemini failed, using smart fallback");
        result = generateSmartEventTitle(start, end, context);
        source = "smart_fallback";
        note = `AI tạm lỗi, đã dùng fallback thông minh`;
      }
    } else {
      console.log('🔄 Using smart fallback generator');
      result = generateSmartEventTitle(start, end, context);
      source = "smart_fallback";
      note = "AI chưa được cấu hình";
    }

    res.json({
      ok: true,
      title: result.title,
      description: result.description || "",
      source: source,
      note: note
    });

  } catch (error) {
    console.error("❌ Unexpected error:", error);
    
    const fallbackResult = generateSmartEventTitle(start, end, context);
    res.json({
      ok: true,
      title: fallbackResult.title,
      description: fallbackResult.description,
      source: "fallback",
      note: "Lỗi hệ thống"
    });
  }
};

const generateEventSuggestions = async (req, res) => {
  try {
    const { userPreferences } = req.body;
    const userId = req.uid;

    console.log("🤖 Generating random AI event suggestions for user:", userId);

    let suggestions = [];
    let source = "gemini";

    if (geminiAvailable && genAI) {
      try {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        const prompt = `
Bạn là trợ lý lập kế hoạch thông minh. Hãy tạo 5-7 gợi ý sự kiện NGẪU NHIÊN và ĐA DẠNG bằng tiếng Việt cho tuần tới.

YÊU CẦU QUAN TRỌNG:
- Mỗi sự kiện phải có: title, start (ISO string), end (ISO string), notes
- Thời gian trong 7 ngày tới (từ ${new Date().toLocaleDateString('vi-VN')} đến ${nextWeek.toLocaleDateString('vi-VN')})
- Đa dạng loại sự kiện: công việc, cá nhân, giải trí, học tập, sức khỏe
- TIÊU ĐỀ PHẢI NGẮN GỌN (tối đa 25 ký tự) - RẤT QUAN TRỌNG!
- Mô tả ngắn gọn trong notes

VÍ DỤ FORMAT JSON:
{
  "suggestions": [
    {
      "title": "Họp team dự án mới",
      "start": "2025-01-15T09:00:00",
      "end": "2025-01-15T10:30:00",
      "notes": "Brainstorm ý tưởng cho dự án mới với team"
    },
    {
      "title": "Tập gym buổi tối", 
      "start": "2025-01-16T18:00:00",
      "end": "2025-01-16T19:30:00",
      "notes": "Tập luyện thể dục để giữ sức khỏe"
    }
  ]
}

CHỈ TRẢ VỀ JSON, không giải thích, không markdown, không text nào khác.
        `;

        console.log("🤖 Generating random creative suggestions with Gemini...");
        const result = await callGemini(prompt);
        
        if (result && result.suggestions && Array.isArray(result.suggestions)) {
          suggestions = result.suggestions;
          console.log(`✅ Generated ${suggestions.length} random AI suggestions`);
          
          // 🆕 VALIDATE VÀ FIX TITLES & DATES
          suggestions = suggestions.map((suggestion, index) => {
            // Validate và truncate title nếu cần
            const validatedTitle = validateAndTruncateTitle(suggestion.title, 32);
            
            // Đảm bảo dates là ISO strings hợp lệ
            let startDate, endDate;
            try {
              startDate = suggestion.start ? new Date(suggestion.start) : new Date();
              endDate = suggestion.end ? new Date(suggestion.end) : new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hour
            } catch (e) {
              console.warn("⚠️ Invalid date in suggestion, using fallback dates");
              startDate = new Date();
              startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7));
              startDate.setHours(9 + Math.floor(Math.random() * 8), 0, 0, 0);
              
              endDate = new Date(startDate);
              endDate.setHours(startDate.getHours() + 1 + Math.floor(Math.random() * 3));
            }
            
            // Log nếu title bị truncate
            if (validatedTitle !== suggestion.title) {
              console.log(`✂️ Suggestion ${index + 1} title truncated: "${suggestion.title}" -> "${validatedTitle}"`);
            }
            
            return {
              ...suggestion,
              title: validatedTitle,
              start: startDate.toISOString(),
              end: endDate.toISOString()
            };
          });
          
        } else {
          console.error("❌ Invalid response format from Gemini:", result);
          throw new Error("Định dạng response từ AI không hợp lệ");
        }

      } catch (aiError) {
        console.log("🔄 AI failed, using intelligent random generator:", aiError.message);
        suggestions = generateFallbackSuggestions();
        source = "smart_fallback";
      }
    } else {
      console.log('🔄 Using intelligent random suggestions generator');
      suggestions = generateFallbackSuggestions();
      source = "random_intelligent";
    }

    console.log(`🎯 Final suggestions count: ${suggestions.length}, source: ${source}`);
    
    res.json({
      ok: true,
      suggestions: suggestions,
      count: suggestions.length,
      source: source
    });

  } catch (error) {
    console.error("❌ Error generating suggestions:", error);
    
    const fallbackSuggestions = generateFallbackSuggestions();
    res.json({
      ok: true,
      suggestions: fallbackSuggestions,
      count: fallbackSuggestions.length,
      source: "fallback",
      note: "Đã tạo gợi ý ngẫu nhiên thông minh"
    });
  }
};

const generateFallbackSuggestions = () => {
  const now = new Date();
  const suggestions = [
    {
      title: "Lên kế hoạch tuần mới",
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0).toISOString(),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0).toISOString(),
      notes: "Xem xét công việc và mục tiêu cho tuần tới"
    },
    {
      title: "Tập thể dục buổi sáng",
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 7, 0).toISOString(),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 8, 0).toISOString(),
      notes: "Hoạt động thể chất để bắt đầu ngày mới"
    },
    {
      title: "Đọc sách và học tập",
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 20, 0).toISOString(),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 21, 0).toISOString(),
      notes: "Dành thời gian phát triển bản thân"
    },
    {
      title: "Họp với đối tác",
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 14, 0).toISOString(),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 15, 30).toISOString(),
      notes: "Thảo luận về hợp tác kinh doanh mới"
    },
    {
      title: "Nghỉ ngơi cuối tuần",
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 10, 0).toISOString(),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 12, 0).toISOString(),
      notes: "Thư giãn và tận hưởng thời gian rảnh"
    }
  ];

  // 🆕 ĐẢM BẢO TẤT CẢ TITLES ĐỀU TRONG GIỚI HẠN
  return suggestions.map(suggestion => ({
    ...suggestion,
    title: validateAndTruncateTitle(suggestion.title, 32)
  }));
};

const analyzeEventPatterns = async (req, res) => {
  res.status(501).json({
    ok: false,
    msg: "Tính năng đang được cải thiện",
    patterns: null,
  });
};

export {
  generateEventTitle,
  generateEventSuggestions,
  analyzeEventPatterns
};