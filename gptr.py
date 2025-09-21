// gptr.js - логика бота
function getBotResponse(userMessage, callback) {
    // Этапы обдумывания
    const stages = [
        "🤖 Читаю твоё сообщение...",
        "🤖 Проверяю разрешения...",
        "🤖 Думаю над ответом..."
    ];

    let stageIndex = 0;

    // Создаём "виртуальный" процесс обдумывания
    function nextStage() {
        if (stageIndex < stages.length) {
            callback(stages[stageIndex], false); // false = ещё не конечный ответ
            stageIndex++;
            setTimeout(nextStage, 1500); // 1.5 сек между стадиями
        } else {
            // После стадий ищем ответ в knowledge
            let response = "🤖 Я пока не знаю ответа, но учусь!";
            for (let item of knowledge) {
                if (userMessage.toLowerCase().includes(item.question)) {
                    response = item.answer;
                    break;
                }
            }
            callback(response, true); // true = конечный ответ
        }
    }

    nextStage();
}
