export default class ChatHistory {
    constructor(chatHistoryElement) {
        this.chatHistoryElement = chatHistoryElement;
    }

    addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', isUser ? 'user-message' : 'motivator-message');
        messageElement.textContent = message;
        this.chatHistoryElement.appendChild(messageElement);
        this.scrollToBottom();
    }

    removeMessage(index) {
        const messages = this.chatHistoryElement.querySelectorAll('.message');
        if (messages[index]) {
            messages[index].remove();
        }
    }

    scrollToBottom() {
        this.chatHistoryElement.scrollTop = this.chatHistoryElement.scrollHeight;
    }
}