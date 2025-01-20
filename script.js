// Password (change this to your desired password)
const PASSWORD = "birthday123";

// Function to unlock the website
function unlockWebsite() {
  const passwordInput = document.getElementById("password-input").value;
  const errorMessage = document.getElementById("error-message");

  if (passwordInput === PASSWORD) {
    document.getElementById("lock-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    startConfetti();
  } else {
    errorMessage.style.display = "block";
  }
}

// Lightbox Functions
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Quote Carousel Functions
let currentQuoteIndex = 0;
const quotes = document.querySelectorAll(".quote");

function showQuote(index) {
  quotes.forEach((quote, i) => {
    quote.classList.toggle("active", i === index);
  });
}

function nextQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  showQuote(currentQuoteIndex);
}

function prevQuote() {
  currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
  showQuote(currentQuoteIndex);
}

// Confetti Animation
function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiPieces = [];
  const colors = ["#ff6f61", "#ffcc00", "#00ccff", "#ff00cc"];

  class Confetti {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height - canvas.height;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.size = Math.random() * 10 + 5;
      this.speed = Math.random() * 3 + 2;
      this.angle = Math.random() * 360;
    }

    update() {
      this.y += this.speed;
      this.angle += 0.1;
      if (this.y > canvas.height) {
        this.y = -this.size;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  function createConfetti() {
    for (let i = 0; i < 100; i++) {
      confettiPieces.push(new Confetti());
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach((piece) => {
      piece.update();
      piece.draw();
    });
    requestAnimationFrame(animateConfetti);
  }

  createConfetti();
  animateConfetti();
}