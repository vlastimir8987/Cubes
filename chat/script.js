document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const chatContainer = document.getElementById('chatContainer');
    let isDevMode = false;

    // Загрузка сообщений при загрузке страницы
    loadMessages();

    // Отправка сообщения
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const messageText = document.getElementById('message').value;
        
        if (username && messageText) {
            addMessage(username, messageText);
            document.getElementById('message').value = '';
        }
    });

    // Активация режима разработчика
    document.getElementById('devForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('devPassword').value;
        
        if (password === "8987") {
            isDevMode = true;
            document.body.classList.add('dev-mode');
            alert("Режим удаления активирован! Теперь можно удалять сообщения.");
            document.getElementById('devPassword').value = '';
        } else {
            alert("Неверный пароль!");
        }
    });

    // Добавление сообщения
    function addMessage(username, text) {
        const message = {
            id: Date.now(),
            username,
            text,
            time: new Date().toLocaleTimeString()
        };
        
        let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        
        renderMessage(message);
    }

    // Загрузка сообщений
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        chatContainer.innerHTML = '';
        messages.forEach(renderMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Отображение сообщения
    function renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <div class="username">${message.username}</div>
            <div class="text">${message.text}</div>
            <div class="time">${message.time}</div>
            <button class="delete-btn" onclick="deleteMessage(${message.id})">×</button>
        `;
        chatContainer.appendChild(messageElement);
    }
});

// Удаление сообщения (глобальная функция)
function deleteMessage(id) {
    if (!document.body.classList.contains('dev-mode')) {
        alert("Сначала активируйте режим удаления!");
        return;
    }
    
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages = messages.filter(msg => msg.id !== id);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    
    // Перезагружаем чат
    document.getElementById('chatContainer').innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <div class="username">${msg.username}</div>
            <div class="text">${msg.text}</div>
            <div class="time">${msg.time}</div>
            <button class="delete-btn" onclick="deleteMessage(${msg.id})">×</button>
        `;
        document.getElementById('chatContainer').appendChild(messageElement);
    });
}