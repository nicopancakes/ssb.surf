(function () {
  const track = document.getElementById("slidesTrack");
  const slides = track ? track.querySelectorAll(".slide") : [];
  const dotsContainer = document.getElementById("slideDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let current = 0;
  let timer = null;

  if (!slides.length || !track) return;

  slides.forEach(function (_, i) {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Slide " + (i + 1));
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", function () {
      goTo(i);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("button");

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = "translateX(-" + (current * 100) + "%)";
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });
    resetTimer();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  goTo(0);
})();

const mobileBtn = document.getElementById("mobileMenuBtn");
const secondaryNav = document.getElementById("secondaryNav");

if (mobileBtn && secondaryNav) {
  mobileBtn.addEventListener("click", function () {
    secondaryNav.classList.toggle("open");
  });

  secondaryNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      secondaryNav.classList.remove("open");
    });
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  });
});
