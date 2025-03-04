document.addEventListener("DOMContentLoaded", () => {
    const cloudContainer = document.querySelector(".cloud-container");

    function createCloud() {
        const cloud = document.createElement("img");
        cloud.src = `Images/cloud${Math.floor(Math.random() * 3) + 1}.png`;
        cloud.classList.add("cloud");

        // Randomize size and position
        const size = Math.random() * 100 + 100; // Between 100px and 200px
        cloud.style.width = `${size}px`;
        cloud.style.top = `${Math.random() * 80}vh`; // Random vertical position
        cloud.style.left = `-${size}px`; // Start off-screen
        cloud.style.animationDuration = `${Math.random() * 20 + 20}s`; // Speed between 20-40s

        cloudContainer.appendChild(cloud);

        // Remove the cloud after animation ends
        setTimeout(() => cloud.remove(), 40000);
    }

    setInterval(createCloud, 5000); // Generate a cloud every 5 seconds
});
