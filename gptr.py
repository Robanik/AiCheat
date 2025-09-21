from flask import Flask, request, jsonify
import time

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    # 1. "Чтение" запроса (5 сек)
    for i in range(5):
        time.sleep(1)  # читаем по секунде
        print(f"Читаю запрос... {i+1}/5")

    # 2. Проверка разрешений (эмуляция)
    permissions_ok = True  # можно сделать проверку по базе
    if not permissions_ok:
        return jsonify({"response": "🚫 У тебя нет разрешения задать этот вопрос."})

    # 3. Обдумывание ответа
    time.sleep(2)  # эмуляция размышлений

    # 4. Возврат ответа (позже подключим gptrd)
    bot_response = f"Я получил твоё сообщение: '{user_message}'. Сейчас я отвечаю из gptr."
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
