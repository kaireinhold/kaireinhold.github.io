document.addEventListener("DOMContentLoaded", () => {
    const cloudContainer = document.querySelector(".cloud-container");

    function createCloud() {
        const cloud = document.createElement("img");
        cloud.src = `Images/cloud_${Math.floor(Math.random() * 5)}.png`;
        cloud.classList.add("cloud");

        // Randomize size and position
        const size = Math.random() * 100 + 100; // Between 100px and 200px
        cloud.style.width = `${size}px`;
        cloud.style.top = `${Math.random() * 80}vh`; // Random vertical position
        cloud.style.left = `-${size + 30}px`; // Start off-screen

        // Random animation duration between 20-40s
        const animationDuration = Math.random() * 20 + 20;
        cloud.style.animationDuration = `${animationDuration}s`;

        cloudContainer.appendChild(cloud);

        // Remove the cloud only after it has fully completed its animation
        setTimeout(() => cloud.remove(), animationDuration * 1000);
    }

    setInterval(createCloud, 3000); // Generate a cloud every 3 seconds
});
