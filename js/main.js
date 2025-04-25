// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const themeButton = document.getElementById('changeTheme');
    
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