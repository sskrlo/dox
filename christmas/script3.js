// Set up the canvas
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

// Set up the particle class
class Particle {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.dx = Math.random() * 4 - 2;
		this.dy = Math.random() * 4 - 2;
		this.lifespan = 1000; // 3 seconds
		this.birthdate = new Date().getTime();
		this.opacity = 1;
	}

	draw() {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
		context.fill();
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		const age = new Date().getTime() - this.birthdate;
		if (age > this.lifespan) {
			this.opacity -= 0.01;
			if (this.opacity <= 0) {
				this.radius = 0;
			}
		}
	}

	setColor() {
		const pixelData = context.getImageData(this.x, this.y, 1, 1).data;
		const r = pixelData[0];
		const g = pixelData[1];
		const b = pixelData[2];
		this.color = {
			r: 255 - r,
			g: 255 - g,
			b: 255 - b
		};
	}
}

// Set maxParticles as a predefined variable
const maxParticles = 250;

// Create an array to store the particles
const particles = [];

// Flag to track whether the mouse is moving
let isMouseMoving = false;

// Generate particles when the mouse is moving
function generateParticles() {
	if (isMouseMoving && particles.length < maxParticles) {
		const particle = new Particle(event.x, event.y, Math.random() * 5 + 1, {});
		particle.setColor();
		particles.push(particle);
	}
}

// Start generating particles on mousemove events
window.addEventListener('mousemove', function(event) {
	isMouseMoving = true;
	generateParticles();
});

// Stop generating particles when the mouse stops moving
window.addEventListener('mouseout', function() {
	isMouseMoving = false;
});

// Animate the particles
function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();
		if (particles[i].radius <= 0) {
			particles.splice(i, 1);
			i--;
		}
	}
}

animate();
