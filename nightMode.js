function applyNightMode() {
    const hour = new Date().getHours();
    const body = document.body;

    if (hour >= 19 || hour < 7) {
        body.classList.add("night-mode");
    } else {
        body.classList.remove("night-mode");
    }
}

document.addEventListener("DOMContentLoaded", applyNightMode);
