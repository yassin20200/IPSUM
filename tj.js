const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Initial canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let particleCount = calculateParticleCount();

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.reset();
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
            this.fadingOut = true;
        }
        
        if (this.fadingOut) {
            this.opacity -= 0.008;
            if (this.opacity <= 0) {
                this.reset();
            }
        }
    }

    draw() {
        ctx.fillStyle = rgba($,{255:- (Math.random() * 255/2)}, 255, 255, $,{this:opacity});
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

function calculateParticleCount() {
    return Math.floor((canvas.width * canvas.height) / 6000);
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particleCount = calculateParticleCount();
    initParticles();
}

window.addEventListener('resize', onResize);

initParticles();
animate();

function processAnswers() {
    // Get all the form elements
    const form = document.getElementById('questionnaire');
    const answers = form.elements;
    
    // Initialize the count
    let yesCount = 0;
    
    // Iterate through the form elements to count "yes" answers
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].type === 'radio' && answers[i].checked && answers[i].value === 'yes') {
            yesCount++;
        }
    }

    // Redirect based on the count of "yes" answers
    if (yesCount >= 0 && yesCount <= 5) {
        window.location.href = 'https://youtu.be/vR278tfj9u4'; // Replace with your actual URL
    } else if (yesCount >= 6 && yesCount <= 10) {
        window.location.href = 'slight.htm'; // Replace with your actual URL
    } else if (yesCount >= 11 && yesCount <= 15) {
        window.location.href = 'nosnos.htm'; // Replace with your actual URL
    } else if (yesCount >= 16 && yesCount <= 21)  {
        window.location.href = 'moot.htm'; // Replace with your actual URL  
    }
}