// Вставь сюда свой OpenAI ключ
const OPENAI_API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chatMessages = document.getElementById("chatMessages");

  // Сообщение пользователя
  const userMsg = document.createElement("div");
  userMsg.className = "message user-message";
  userMsg.textContent = message;
  chatMessages.appendChild(userMsg);
  input.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Сообщение бота (с стадиями)
  const botMsg = document.createElement("div");
  botMsg.className = "message bot-message";
  botMsg.textContent = "🤖 Думаю...";
  chatMessages.appendChild(botMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Отправка запроса к ChatGPT
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: message}],
        max_tokens: 150
      })
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;

    botMsg.textContent = answer;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (err) {
    botMsg.textContent = "❌ Ошибка при подключении к ChatGPT";
    console.error(err);
  }
  }
