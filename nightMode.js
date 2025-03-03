function applyNightMode() {
    const hour = new Date().getHours();
    const body = document.body;
    
    const isNight = hour >= 19 || hour < 7;

    if (isNight) {
        body.classList.add("night-mode");
    } else {
        body.classList.remove("night-mode");
    }
}

// Function to smoothly transition between modes
function checkTimeChange() {
    const prevMode = document.body.classList.contains("night-mode");
    applyNightMode();
    const newMode = document.body.classList.contains("night-mode");

    // Only animate if the mode actually changes
    if (prevMode !== newMode) {
        document.body.classList.add("transition-mode");
        setTimeout(() => {
            document.body.classList.remove("transition-mode");
        }, 1000); // Matches CSS transition duration
    }
}

// Run on load and check every minute
document.addEventListener("DOMContentLoaded", () => {
    applyNightMode();
    setInterval(checkTimeChange, 1000);
});
