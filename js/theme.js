const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    updateThemeIcon(true);
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

    updateThemeIcon(isDark);
});


function updateThemeIcon(isDark) {

    const icon = themeToggle.querySelector("i");

    if (isDark) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }
}

const texts = [
  "Full-Stack Software Engineer",
  ".NET & React Developer",
  "Clean Architecture Systems"
];

const typingText = document.getElementById("typing-text");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    // كتابة الجملة
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    // بعد انتهاء الكتابة
    if (charIndex === currentText.length) {
      isDeleting = true;

      // وقت الانتظار قبل الحذف
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    // حذف الجملة
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    // بعد انتهاء الحذف
    if (charIndex === 0) {
      isDeleting = false;

      // الانتقال للجملة التالية
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  // سرعة الكتابة والحذف
  setTimeout(typeEffect, isDeleting ? 50 : 90);
}

typeEffect();

// ================= PROJECT SCROLL REVEAL =================

const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;

        // إضافة تأخير بسيط لكل Card
        const index = Array.from(projectCards).indexOf(card);

        setTimeout(() => {
          card.classList.add("show");
        }, index * 150);

        // تشغيل الحركة مرة واحدة فقط
        observer.unobserve(card);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

projectCards.forEach((card) => {
  projectObserver.observe(card);
});