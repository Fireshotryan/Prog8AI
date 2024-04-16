export default class ChatHistory {
    constructor(chatHistoryElement) {
        this.chatHistoryElement = chatHistoryElement;
    }

    addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', isUser ? 'user-message' : 'motivator-message');

        // Split the message into the motivational message and dog images
        const [motivationalMessage, dogImages] = message.split('\n\nDog Images:');

        // Create elements for the motivational message
        const motivationalMessageElement = document.createElement('div');
        motivationalMessageElement.textContent = motivationalMessage;

        // Append the motivational message element to the message container
        messageElement.appendChild(motivationalMessageElement);

        // Check if the input contains the word "dog" and if there are dog images
        if (dogImages && motivationalMessage.toLowerCase().includes('dog')) {
            const imagesContainer = document.createElement('div');
            imagesContainer.classList.add('dog-images');

            const imageUrls = dogImages.split(', ');
            imageUrls.forEach(url => {
                const imageElement = document.createElement('img');
                imageElement.src = url;
                imagesContainer.appendChild(imageElement);
            });

            // Append the images container to the message container
            messageElement.appendChild(imagesContainer);
        }

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
