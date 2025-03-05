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
        clearStars();

        if (mode === MODES.NIGHT) {
            body.classList.add("night-mode");
            generateStars();
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

        if (isNight) {
            generateStars();
        } else {
            clearStars();
        }
    }

    function updateButtonText(mode) {
        if (mode === MODES.NIGHT) {
            modeSwitch.textContent = "Mode: Night 🌙";
        } else if (mode === MODES.DAY) {
            modeSwitch.textContent = "Mode: Day ☀";
        } else {
            modeSwitch.textContent = "Mode: Adaptive ⏳";
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

    // Star Generation
    function generateStars() {
        const starCount = Math.floor(Math.random() * 50) + 50; // 50-100 stars
        const nightSky = document.createElement("div");
        nightSky.classList.add("night-sky");
    
        const starColors = ["#e3d6ee", "#e0f4ea", "#a2a2fd", "#a980c8", "#7bd4a7", "#f3f3fd"];
    
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
    
            const xPos = Math.random() * window.innerWidth;
            const yPos = Math.random() * window.innerHeight * 0.8; // Avoid bottom area
            const size = Math.random() * 3 + 1; // Random size (1px - 4px)
            const twinkleDuration = Math.random() * 3 + 2; // 2s - 5s twinkle
            const randomColor = starColors[Math.floor(Math.random() * starColors.length)];
    
            star.style.left = `${xPos}px`;
            star.style.top = `${yPos}px`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.backgroundColor = randomColor; // Assign random color
            star.style.animation = `twinkle ${twinkleDuration}s infinite alternate`;
    
            nightSky.appendChild(star);
        }
    
        document.body.appendChild(nightSky);
    }
    

    function clearStars() {
        const existingSky = document.querySelector(".night-sky");
        if (existingSky) {
            existingSky.remove();
        }
    }

    // Run check every 5 minutes
    setInterval(checkTimeForAdaptiveMode, 1 * 10 * 1000);

    // Load initial mode
    applyMode(currentMode);

    modeSwitch.addEventListener("click", toggleMode);
});
