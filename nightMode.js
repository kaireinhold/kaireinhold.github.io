document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const modeSwitch = document.createElement("button");
    modeSwitch.id = "mode-toggle";
    modeSwitch.classList.add("pixel-button");
    document.body.prepend(modeSwitch); // Add the button at the top

    const MODES = {
        ADAPTIVE: "adaptive",
        NIGHT: "night",
        DAY: "day"
    };

    let currentMode = localStorage.getItem("displayMode") || MODES.ADAPTIVE;

    function applyMode(mode) {
        body.classList.remove("night-mode", "day-mode");

        if (mode === MODES.NIGHT) {
            body.classList.add("night-mode");
        } else if (mode === MODES.DAY) {
            body.classList.add("day-mode");
        } else {
            applyTimeBasedMode();
        }

        updateButtonText(mode);
        localStorage.setItem("displayMode", mode);
    }

    function applyTimeBasedMode() {
        const hour = new Date().getHours();
        const isNight = hour >= 19 || hour < 7;
        body.classList.add(isNight ? "night-mode" : "day-mode");
    }

    function updateButtonText(mode) {
        if (mode === MODES.NIGHT) {
            modeSwitch.textContent = "Mode: Night";
        } else if (mode === MODES.DAY) {
            modeSwitch.textContent = "Mode: Day";
        } else {
            modeSwitch.textContent = "Mode: Adaptive";
        }
    }

    function toggleMode() {
        if (currentMode === MODES.ADAPTIVE) {
            currentMode = MODES.NIGHT;
        } else if (currentMode === MODES.NIGHT) {
            currentMode = MODES.DAY;
        } else {
            currentMode = MODES.ADAPTIVE;
        }

        applyMode(currentMode);
    }

    function checkTimeForAdaptiveMode() {
        if (currentMode === MODES.ADAPTIVE) {
            const hour = new Date().getHours();
            const isNight = hour >= 19 || hour < 7;
            const expectedClass = isNight ? "night-mode" : "day-mode";

            if (!body.classList.contains(expectedClass)) {
                applyMode(MODES.ADAPTIVE);
            }
        }
    }

    // Run check every 5 minutes
    setInterval(checkTimeForAdaptiveMode, 1 * 10 * 1000);

    // Load initial mode
    applyMode(currentMode);

    modeSwitch.addEventListener("click", toggleMode);
});
