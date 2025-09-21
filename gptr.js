<input type="text" id="userInput" placeholder="Напиши сообщение..." />
<button id="sendBtn">Отправить</button>

<script>
const OPENAI_API_KEY = "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";

document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  console.log("Отправка запроса:", message);

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
    console.log("Ответ GPT:", data.choices[0].message.content);
  } catch (err) {
    console.error(err);
  }
});
</script>
