let isManualMode = false;  // This will track if the user manually toggled the mode

// Apply the night mode based on the current time or saved preference
function applyNightMode() {
    // If manual mode is set (via button toggle), use that preference
    if (isManualMode || localStorage.getItem("nightMode") !== null) {
        const nightMode = localStorage.getItem("nightMode");
        if (nightMode === "true") {
            document.body.classList.add("night-mode");
        } else {
            document.body.classList.remove("night-mode");
        }
        return;  // Skip the time-based logic since the mode is manually set or saved
    }

    // Time-based logic (only runs if no manual toggle was made)
    const hour = new Date().getHours();
    const body = document.body;
    
    const isNight = hour >= 19 || hour < 7;

    if (isNight) {
        body.classList.add("night-mode");
    } else {
        body.classList.remove("night-mode");
    }
}

// Function to toggle night mode manually
function toggleNightMode() {
    const body = document.body;
    body.classList.toggle("night-mode");
    
    // Save the preference to localStorage
    if (body.classList.contains("night-mode")) {
        localStorage.setItem("nightMode", "true");
    } else {
        localStorage.setItem("nightMode", "false");
    }

    isManualMode = true;  // Set flag that the user manually toggled the mode
}

// Function to smoothly transition between modes
function checkTimeChange() {
    const prevMode = document.body.classList.contains("night-mode");
    applyNightMode();  // This will only apply if isManualMode is false
    const newMode = document.body.classList.contains("night-mode");

    // Only animate if the mode actually changes
    if (prevMode !== newMode) {
        document.body.classList.add("transition-mode");
        setTimeout(() => {
            document.body.classList.remove("transition-mode");
        }, 1000); // Matches CSS transition duration
    }
}

// Set up event listener for manual toggle button
document.addEventListener("DOMContentLoaded", () => {
    // Apply night mode based on the saved preference or time when the page loads
    applyNightMode();

    // Toggle night mode when the button is clicked
    const toggleButton = document.getElementById('mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleNightMode);
    }

    // Check for time change every minute, but respect manual mode
    setInterval(checkTimeChange, 1000);
});
