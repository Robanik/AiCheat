function getBotResponse(userMessage, callback) {
    const stages = [
        "🤖 Читаю твоё сообщение...",
        "🤖 Проверяю разрешения...",
        "🤖 Думаю над ответом..."
    ];

    let stageIndex = 0;

    function nextStage() {
        if (stageIndex < stages.length) {
            callback(stages[stageIndex], false); // false = не финальный
            stageIndex++;
            setTimeout(nextStage, 1500);
        } else {
            let response = "🤖 Я пока не знаю ответа, но учусь!";
            for (let item of knowledge) {
                if (userMessage.toLowerCase().includes(item.question)) {
                    response = item.answer;
                    break;
                }
            }
            callback(response, true); // true = финальный ответ
        }
    }

    nextStage();
}
