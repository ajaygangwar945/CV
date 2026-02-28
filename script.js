document.addEventListener('DOMContentLoaded', () => {
    // Initialize VanillaTilt for the 3D card effect
    VanillaTilt.init(document.querySelectorAll(".custom-tilt"), {
        max: 15,          // max tilt rotation (deg)
        speed: 400,       // Speed of the enter/exit transition
        glare: true,      // if it should have a "glare" effect
        "max-glare": 0.3, // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
        perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1.05,      // 2 = 200%, 1.5 = 150%, etc..
        gyroscope: true,  // Boolean to enable/disable device orientation detection,
    });

    // Custom mouse tracking glow effect for the cards
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Close modal if clicked outside of content
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Modal Logic
function openModal(pdfUrl) {
    const modal = document.getElementById('cvModal');
    const iframe = document.getElementById('cvIframe');
    iframe.src = pdfUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('cvModal');
    const iframe = document.getElementById('cvIframe');
    modal.classList.remove('active');
    // small delay before removing src to allow opacity transition
    setTimeout(() => {
        iframe.src = '';
        document.body.style.overflow = 'auto'; // allow background scrolling
    }, 300);
}
