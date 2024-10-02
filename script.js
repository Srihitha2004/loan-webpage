document.getElementById('send-btn').addEventListener('click', function() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        addMessage(userInput, 'user-message');
        document.getElementById('user-input').value = '';

        fetch('chatbot.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.reply, 'bot-message');
        })
        .catch(error => console.error('Error:', error));
    }
});

function addMessage(message, className) {
    var messageElement = document.createElement('div');
    messageElement.className = 'message ' + className;
    messageElement.textContent = message;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

