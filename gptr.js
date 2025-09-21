// Ищем лучший ответ по ключевым словам
function findAnswer(message) {
  const words = message.toLowerCase().replace(/[^\w\sа-яё]/gi, '').split(/\s+/);

  let bestMatch = null;
  let maxMatched = 0;

  for (let item of knowledge) {
    const matchedCount = item.keywords.filter(kw => words.includes(kw)).length;
    if (matchedCount === item.keywords.length && matchedCount > maxMatched) {
      bestMatch = item.answer;
      maxMatched = matchedCount;
    }
  }

  return bestMatch || "🤖 Я пока не знаю ответа, но учусь!";
}

// Основная функция с этапами обдумывания
function getBotResponse(userMessage, callback) {
  const stages = [
    "🤖 Читаю твоё сообщение...",
    "🤖 Проверяю разрешения...",
    "🤖 Думаю над ответом..."
  ];

  let stageIndex = 0;

  function nextStage() {
    if (stageIndex < stages.length) {
      callback(stages[stageIndex], false);
      stageIndex++;
      setTimeout(nextStage, 1200); // 1.2 сек на этап
    } else {
      const response = findAnswer(userMessage);
      callback(response, true);
    }
  }

  nextStage();
}
