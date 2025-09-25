document.addEventListener("DOMContentLoaded", () => {
  const bars = Array.from(document.querySelectorAll("#barHtml, #barCss, #barJs, #barPy"));

  bars.forEach(bar => {
    bar.style.width = "0%";
    bar.dataset.animated = "false";
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting && el.dataset.animated !== "true") {
          const target = el.getAttribute("data-width") || "0%";
          el.style.width = target;
          el.dataset.animated = "true";

          const percentSpan = el.parentElement.nextElementSibling;
          if (percentSpan) percentSpan.textContent = target;

          obs.unobserve(el);
        }
      });
    }, { threshold: 0.35 });
    bars.forEach(b => observer.observe(b));
  } else {
    const tryAnimate = () => {
      const triggerBottom = window.innerHeight * 0.8;
      bars.forEach(b => {
        if (b.dataset.animated === "true") return;
        const top = b.getBoundingClientRect().top;
        if (top < triggerBottom) {
          const target = b.getAttribute("data-width") || "0%";
          b.style.width = target;
          b.dataset.animated = "true";

          const percentSpan = b.parentElement.nextElementSibling;
          if (percentSpan) percentSpan.textContent = target;
        }
      });
    };
    window.addEventListener("scroll", tryAnimate);
    window.addEventListener("load", tryAnimate);
    tryAnimate();
  }
});
