from flask import Flask, request, jsonify
import time
import json

app = Flask(__name__)

# Загружаем базу данных (gptrd)
with open("gptrd.json", "r", encoding="utf-8") as f:
    knowledge = json.load(f)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "").lower()

    # 1. Чтение запроса (5 сек, но реально просто эмуляция)
    for i in range(5):
        time.sleep(1)
        print(f"Читаю запрос... {i+1}/5")

    # 2. Проверка разрешений (заглушка)
    if "запрещено" in user_message:
        return jsonify({"response": "🚫 Этот запрос не разрешён."})

    # 3. Подбор ответа из базы gptrd
    response = None
    for item in knowledge.get("faq", []):
        if item["question"] in user_message:
            response = item["answer"]
            break

    if not response:
        response = "🤖 Я пока не знаю ответа, но учусь!"

    # 4. "Обдумывание"
    time.sleep(2)

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
