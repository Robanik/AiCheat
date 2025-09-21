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

    print(f"[USER] {user_message}")  # лог на сервере

    # Эмуляция "думаю 5 сек"
    time.sleep(5)

    # Проверка разрешений (пример)
    if "запрещено" in user_message:
        return jsonify({"response": "🚫 Этот запрос не разрешён."})

    # Поиск ответа в базе
    response = None
    for item in knowledge.get("faq", []):
        if item["question"] in user_message:
            response = item["answer"]
            break

    if not response:
        response = "🤖 Я пока не знаю ответа, но учусь!"

    # Ещё 2 сек "размышлений"
    time.sleep(2)

    print(f"[BOT] {response}")  # лог на сервере
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
