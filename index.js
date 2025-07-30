// const slides = document.querySelector(".reviews-container")
// const dots = document.querySelectorAll(".dot");

document.addEventListener("DOMContentLoaded", () => {
  const navDropdown = document.querySelector(".nav-sidebar");
  const navOpen = document.querySelector(".menu-open");
  const navClose = document.querySelector(".menu-close");
  const overlay = document.querySelector(".wrapper");
  const emailForm = document.getElementById("form");
  const emailInput = document.getElementById("email");
  const errorMessage = document.querySelector(".errorMsg");
  const slidesContainer = document.querySelector(".reviews-container");
  const slideElements = document.querySelectorAll(".each-review");
  const dotsContainer = document.querySelector(".dots");

  // Initialize counts
  let index = 0;
  let dots = [];
  let slidesPerPage = 1;
  let totalPages = 1;

  // Toggle navigation sidebar
  navOpen.addEventListener("click", () => {
    overlay.classList.add("cover");
    navDropdown.classList.add("open");
    navClose.classList.add("open");
    navOpen.classList.add("close");
  })

  navClose.addEventListener("click", () => {
    overlay.classList.remove("cover");
    navDropdown.classList.remove("open");
    navClose.classList.remove("open");
    navOpen.classList.remove("close");
  })

  function calculateSlidesPerPage() {
    const containerWidth = slidesContainer.offsetWidth;
    const slideWidth = slideElements[0].offsetWidth;
    return Math.floor(containerWidth / slideWidth) || 1;
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    dots = [];

    slidesPerPage = calculateSlidesPerPage();
    totalPages = Math.ceil(slideElements.length / slidesPerPage);

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        index = i;
        updateSlider(index);
      });

      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  }

  function updateSlider(i) {
    const shift = (100 / slidesPerPage) * i;
    slidesContainer.style.transform = `translateX(-${shift}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === i);
    });
  }

  function isMobile() {
    return window.innerWidth <= 768;
  }

  if (isMobile()) {
    setInterval(() => {
      index = (index + 1) % totalPages;
      updateSlider(index);
    }, 3000);
  }

  window.addEventListener("resize", () => {
    createDots();
    updateSlider(index);
  });

  createDots();

  // Email validation and submission
  emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      errorMessage.textContent = "Please insert a valid email";
      emailInput.style.borderColor = "var(--Bright-Red)";
    } else {
      errorMessage.textContent = "";
      emailInput.style.borderColor = "var(--Dark-Grayish-Blue)";
      // Here you can handle the form submission, e.g., send the email to a server
      console.log("Email submitted:", emailValue);
      emailInput.value = ""; // Clear the input field after submission
    }
  })
});



// Initialize count
// let index = 0

// function updateSlider(i){
//   slides.style.transform = `translateX(-${i * 100}%)`;
//   dots.forEach((dot, index) => {
//     dot.classList.remove("active");
//     if (index === i) {
//       dot.classList.add("active");
//     }
//   });
// };

// dots.forEach((dot, i) => {
//   dot.addEventListener("click", () => {
//     index = i;
//     updateSlider(index);
//   });
// }
// );

// function isMobile() {
//   return window.innerWidth <= 768;
// }
// if (isMobile()) {
//   setInterval(() => {
//     index = (index + 1) % dots.length;
//     updateSlider(index);
//   }, 3000);