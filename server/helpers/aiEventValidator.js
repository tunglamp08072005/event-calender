const detectEventConflicts = (newEvent, existingEvents) => {
  // AI-powered conflict detection
  const conflicts = existingEvents.filter(existing => {
    const timeConflict = 
      newEvent.start < existing.end && 
      newEvent.end > existing.start;
    
    // AI: Phát hiện conflict về nội dung
    const titleSimilarity = calculateSimilarity(
      newEvent.title, 
      existing.title
    );
    
    return timeConflict || titleSimilarity > 0.7;
  });

  return conflicts;
};

const calculateSimilarity = (str1, str2) => {
  // Simple similarity calculation - có thể thay bằng AI model
  const words1 = str1.toLowerCase().split(' ');
  const words2 = str2.toLowerCase().split(' ');
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
};

module.exports = { detectEventConflicts };