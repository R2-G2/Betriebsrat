// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const themeButton = document.getElementById('changeTheme');
    const newTopicInput = document.getElementById('newTopic');
    const addTopicButton = document.getElementById('addTopic');
    
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Theme toggle functionality
    themeButton.addEventListener('click', () => {
        // Toggle dark theme class
        document.body.classList.toggle('dark-theme');
        
        // Save preference to localStorage
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        
        // Update button text
        themeButton.textContent = isDarkTheme ? 'Helles Design' : 'Dunkles Design';
    });
    
    // Set initial button text
    const isDarkTheme = document.body.classList.contains('dark-theme');
    themeButton.textContent = isDarkTheme ? 'Helles Design' : 'Dunkles Design';
    
    // Add current date to footer
    addDateToFooter();
    
    // Add topic submission functionality
    if (addTopicButton && newTopicInput) {
        addTopicButton.addEventListener('click', handleTopicSubmission);
        
        // Allow submission with Enter key
        newTopicInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                handleTopicSubmission();
            }
        });
    }
});

// Function to add current date to footer
function addDateToFooter() {
    const footer = document.querySelector('footer');
    const currentDate = new Date();
    
    // Create date options for German format
    const dateOptions = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    };
    
    const dateElement = document.createElement('p');
    dateElement.textContent = `Aktuelles Datum: ${currentDate.toLocaleDateString('de-DE', dateOptions)}`;
    footer.appendChild(dateElement);
}

// Function to handle topic submission
function handleTopicSubmission() {
    const newTopicInput = document.getElementById('newTopic');
    const newTopic = newTopicInput.value;
    
    // Check if addMeetingTopic function exists (defined in meeting-topics.js)
    if (typeof addMeetingTopic === 'function') {
        const result = addMeetingTopic(newTopic);
        
        // Show notification of the result
        showNotification(result.message, result.success);
        
        // Clear input if successful
        if (result.success) {
            newTopicInput.value = '';
        }
    } else {
        showNotification('Fehler: Themen-Funktionalität nicht verfügbar.', false);
    }
}

// Function to show notification
function showNotification(message, isSuccess) {
    // Find existing notification or create a new one
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        const form = document.querySelector('.topic-form');
        form.parentNode.insertBefore(notification, form.nextSibling);
    }
    
    // Set message and style based on success/error
    notification.textContent = message;
    notification.style.backgroundColor = isSuccess ? 'var(--secondary-color)' : '#e74c3c';
    
    // Show notification
    notification.classList.add('show');
    
    // Hide notification after a delay
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
} 