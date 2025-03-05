document.addEventListener("DOMContentLoaded", () => {
    const cloudContainer = document.querySelector(".cloud-container");

    function createCloud() {
        const cloud = document.createElement("img");
        cloud.src = `Images/cloud_${Math.floor(Math.random() * 5)}.png`;
        cloud.classList.add("cloud");

        const size = Math.random() * 100 + 100;
        cloud.style.width = `${size}px`;
        cloud.style.top = `${Math.random() * 100}%`;
        cloud.style.left = `-${size - 20}px`;
        // Random animation duration between 20-40s
        const animationDuration = Math.random() * 20 + 20;
        cloud.style.animationDuration = `${animationDuration}s`;

        cloudContainer.appendChild(cloud);

        if (cloud.style.left > 0) {
            return
        } else {
            setTimeout(() => cloud.remove(), animationDuration * 10000);
        }
    }
    setInterval(createCloud, 3000);
});
