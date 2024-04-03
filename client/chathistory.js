export default class ChatHistory {
    constructor(chatHistoryElement) {
        this.chatHistoryElement = chatHistoryElement;
    }

    addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', isUser ? 'user-message' : 'motivator-message');

        // Split the message into the motivational message and the quote
        const [motivationalMessage, quote] = message.split('\n\n');

        // Create elements for the motivational message and the quote
        const motivationalMessageElement = document.createElement('div');
        motivationalMessageElement.textContent = motivationalMessage;

        const quoteElement = document.createElement('div');
        quoteElement.textContent = quote;
        quoteElement.classList.add('quote'); // Add a class for styling

        // Append elements to the message container
        messageElement.appendChild(motivationalMessageElement);
        messageElement.appendChild(quoteElement);

        // Append the message container to the chat history
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
