// ===== GPTR 1.5 Flash (продвинутая версия) =====
const GPTR = (() => {
    const memory = []; // История сообщений
    const maxMemory = 5000; // примерно 5000 слов реально для браузера

    const responses = [
        { triggers: ["привет", "здравствуй"], replies: ["Я — gptr 1.5 flash, созданный robanik. Привет!"] },
        { triggers: ["код", "скрипт"], replies: [
            "```javascript\nconsole.log('Я — gptr 1.5 flash, созданный robanik');\n```",
            "```python\nprint('Я — gptr 1.5 flash, созданный robanik')\n```"
        ]},
        { triggers: ["инструкция"], replies: ["Я могу выполнять команды и выдавать код с кнопкой 'Скопировать'."] },
    ];

    const fallback = [
        "Я — gptr 1.5 flash, созданный robanik. Я не совсем понял команду.",
        "Команда принята, но нужно точнее сформулировать запрос.",
        "Я слушаю тебя. Скажи команду ещё раз."
    ];

    function addMessage(text, sender, container) {
        const msg = document.createElement('div');
        msg.className = 'message ' + sender;

        if(text.includes('```')) {
            let codeContent = text.replace(/```/g, '');
            const pre = document.createElement('pre');
            pre.textContent = codeContent;

            const btn = document.createElement('button');
            btn.textContent = 'Скопировать';
            btn.className = 'copy-btn';
            btn.onclick = () => { navigator.clipboard.writeText(codeContent); };

            pre.appendChild(btn);
            msg.appendChild(pre);
        } else {
            msg.textContent = text;
        }

        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;
    }

    function remember(input) {
        memory.push(input);
        let words = memory.join(' ').split(/\s+/);
        if(words.length > maxMemory) {
            memory.splice(0, words.length - maxMemory);
        }
    }

    async function simulateThinking(container) {
        const steps = [
            "«в мыслях...»",
            "«пользователь хочет код»",
            "«обдумываю промпт»",
            "«смотрю на шаблоны»",
            "«анализирую и создаю код»",
            "«готовлю ответ»"
        ];
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        container.appendChild(aiMsg);
        container.scrollTop = container.scrollHeight;

        for(const step of steps) {
            aiMsg.textContent = step;
            container.scrollTop = container.scrollHeight;
            await new Promise(r => setTimeout(r, 1500)); // пауза 1.5 сек
        }

        return aiMsg;
    }

    function getResponse(input) {
        input = input.toLowerCase();
        for (const r of responses) {
            for (const t of r.triggers) {
                if(input.includes(t)) {
                    return r.replies[Math.floor(Math.random()*r.replies.length)];
                }
            }
        }
        return fallback[Math.floor(Math.random()*fallback.length)];
    }

    async function respond(input, container) {
        remember(input);
        const aiMsg = await simulateThinking(container);
        const response = getResponse(input);
        aiMsg.textContent = '';
        addMessage(response, 'ai', container);
    }

    return { respond, addMessage };
})();
