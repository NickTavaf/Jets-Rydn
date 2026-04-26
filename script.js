// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active section highlight
const sections = ['section1'];
const navLinks = {
    section1: document.querySelector('a[href="#section1"]'),
};

window.addEventListener('scroll', () => {
    let current = null;
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 80) current = id;
    });
    sections.forEach(id => {
        navLinks[id].classList.toggle('active', id === current);
    });
});

// Shuffle function
function shuffleGrid() {
    document.querySelectorAll('.masonry').forEach(masonry => {
        const items = [...masonry.querySelectorAll('.masonry-item')];
        items.sort(() => Math.random() - 0.5);
        items.forEach(item => masonry.appendChild(item));
    });
}

// Shuffle on page load
shuffleGrid();

// Shuffle button
document.getElementById('btn-shuffle').addEventListener('click', e => {
    e.preventDefault();
    shuffleGrid();
});

// Re-order — restore original order
const originalOrder = [...document.querySelectorAll('#section1 .masonry-item')];
document.getElementById('btn-reorder').addEventListener('click', e => {
    e.preventDefault();
    const masonry = document.querySelector('#section1 .masonry');
    originalOrder.forEach(item => masonry.appendChild(item));
});

// Grid canvas
const btnGrid = document.getElementById('btn-grid');
const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');

function drawGrid() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;

    const nav = document.querySelector('nav');
    const navHeight = nav.offsetHeight;

    // Horizontal line flush under nav
    ctx.beginPath();
    ctx.moveTo(0, navHeight);
    ctx.lineTo(canvas.width, navHeight);
    ctx.stroke();

    // Vertical lines aligned to nav elements
    const navName = document.querySelector('.nav-name');
    const navLinksEl = document.querySelector('.nav-links');
    const navNumbers = document.querySelector('.nav-numbers');
    const navControls = document.querySelector('.nav-controls');

    [navName, navLinksEl, navNumbers, navControls].forEach(el => {
        if (!el) return;
        const rect = el.getBoundingClientRect();

        ctx.beginPath();
        ctx.moveTo(rect.left, 0);
        ctx.lineTo(rect.left, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rect.right, 0);
        ctx.lineTo(rect.right, canvas.height);
        ctx.stroke();
    });
}

btnGrid.addEventListener('click', e => {
    e.preventDefault();
    canvas.classList.toggle('active');
    btnGrid.classList.toggle('active');
    if (canvas.classList.contains('active')) drawGrid();
});

window.addEventListener('resize', () => {
    if (canvas.classList.contains('active')) drawGrid();
});