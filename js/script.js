document.addEventListener("DOMContentLoaded", () => {
  const emblaNode = document.querySelector(".embla");
  const viewportNode = emblaNode.querySelector(".embla-viewport");
  const prevBtnNode = document.querySelector(".embla-button-prev");
  const nextBtnNode = document.querySelector(".embla-button-next");
  const dotsContainer = document.querySelector(".embla-dots");
  const hamburguer = document.querySelector(".hamburguer");
  const nav = document.querySelector(".nav");

  // Toggle nav menu
  hamburguer.addEventListener("click", () => nav.classList.toggle("active"));

  // Close nav menu when clicking outside of it
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !hamburguer.contains(event.target)) {
      nav.classList.remove("active");
    }
  });

  const OPTIONS = { loop: true };
  const embla = EmblaCarousel(viewportNode, OPTIONS);

  const slideCount = embla.slideNodes().length;
  const dots = [];

  // Create dots dynamically
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("button");
    dot.classList.add("embla-dot");
    dotsContainer.appendChild(dot);
    dots.push(dot);

    dot.addEventListener("click", () => {
      embla.scrollTo(i);
      setSelectedDot(i);
      resetAutoplay();
    });
  }

  // Set the selected dot
  function setSelectedDot(selectedIndex) {
    dots.forEach((dot, index) => {
      dot.classList.toggle("embla-dot--selected", index === selectedIndex);
    });
  }

  // Navigation functions
  function scrollPrev() {
    embla.scrollPrev();
    resetAutoplay();
  }

  function scrollNext() {
    embla.scrollNext();
    resetAutoplay();
  }

  prevBtnNode.addEventListener("click", scrollPrev);
  nextBtnNode.addEventListener("click", scrollNext);

  // Autoplay functions
  let autoplayInterval = null;

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      embla.scrollNext();
    }, 3000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Update selected dot on scroll
  embla.on("select", () => {
    const selectedIndex = embla.selectedScrollSnap();
    setSelectedDot(selectedIndex);
  });

  // Start autoplay
  startAutoplay();

  // Pause autoplay on button interaction
  prevBtnNode.addEventListener("click", stopAutoplay);
  nextBtnNode.addEventListener("click", stopAutoplay);

  // Reset autoplay on dot click
  dots.forEach((dot) => {
    dot.addEventListener("click", resetAutoplay);
  });
});
