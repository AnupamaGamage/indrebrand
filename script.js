// Function to show a custom message box
function showMessageBox(message) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.classList.remove('hidden');
    messageBox.classList.add('show');

    // Hide the message box after 3 seconds
    setTimeout(() => {
        messageBox.classList.remove('show');
        messageBox.classList.add('hidden');
    }, 3000);
}

// Function to handle "Add to Cart" button clicks
function addToCart(productName, price) {
    console.log(`Added ${productName} to cart. Price: $${price.toFixed(2)}`);
    showMessageBox(`${productName} added to cart!`);
    // In a real application, you would add logic here to:
    // 1. Update a shopping cart state/array
    // 2. Persist cart data (e.g., to local storage or a backend)
    // 3. Update a cart icon/counter
}

// Custom Mouse Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.getElementById('custom-cursor');

    // Detect if device is touch-enabled
    const isTouchDevice = ('ontouchstart' in window) ||
                          (navigator.maxTouchPoints > 0) ||
                          (navigator.msMaxTouchPoints > 0) ||
                          window.matchMedia('(pointer: coarse)').matches; // Modern touch detection

    if (isTouchDevice) {
        document.body.style.cursor = 'default'; // Ensure default cursor for touch
        if (customCursor) { // Check if customCursor element exists
            customCursor.style.display = 'none'; // Hide custom cursor
        }
    } else {
        document.addEventListener('mousemove', (e) => {
            if (customCursor) { // Check if customCursor element exists
                customCursor.style.left = `${e.clientX}px`;
                customCursor.style.top = `${e.clientY}px`;
                customCursor.style.display = 'block'; // Show cursor on mousemove
            }
        });

        document.body.addEventListener('mouseleave', () => {
            if (customCursor) {
                customCursor.style.display = 'none';
            }
        });
        document.body.addEventListener('mouseenter', () => {
            if (customCursor) {
                customCursor.style.display = 'block';
            }
        });
    }


    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamically generate blinking cyan dots for the hero section
    const dotContainer = document.getElementById('dot-container');
    const numberOfDots = 200; // Adjust for density

    if (dotContainer) { // Ensure container exists before adding dots
        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('blinking-dot');

            // Random positioning
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.top = `${Math.random() * 100}%`;

            // Random size
            dot.style.width = `${2 + Math.random() * 4}px`; // 2px to 6px
            dot.style.height = dot.style.width;

            // Random animation duration and delay
            dot.style.setProperty('--animation-duration', `${3 + Math.random() * 7}s`); // 3s to 10s
            dot.style.setProperty('--animation-delay', `${Math.random() * 5}s`); // 0s to 5s

            dotContainer.appendChild(dot);
        }
    }

    // Make hero title letters interactive
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) { // Ensure heroTitle exists
        // Function to wrap each letter with a span and add event listeners
        function makeLettersInteractive(element) {
            let newHTML = '';
            Array.from(element.childNodes).forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    // Wrap individual characters of text nodes
                    node.textContent.split('').forEach(char => {
                        newHTML += `<span class="hero-letter-glow">${char}</span>`;
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // For existing spans like the fuchsia-colored brand name
                    if (node.classList.contains('text-fuchsia-400')) {
                        let fuchsiaContent = '';
                        Array.from(node.childNodes).forEach(fuchsiaChildNode => {
                            if (fuchsiaChildNode.nodeType === Node.TEXT_NODE) {
                                fuchsiaChildNode.textContent.split('').forEach(char => {
                                    fuchsiaContent += `<span class="hero-letter-glow">${char}</span>`;
                                });
                            } else {
                                fuchsiaContent += fuchsiaChildNode.outerHTML; // Keep other elements as is
                            }
                        });
                        newHTML += `<span class="text-fuchsia-400">${fuchsiaContent}</span>`;
                    } else {
                        // For other elements, keep them as is
                        newHTML += node.outerHTML;
                    }
                }
            });
            element.innerHTML = newHTML;
        }

        makeLettersInteractive(heroTitle);
    }
});