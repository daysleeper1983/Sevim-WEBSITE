document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Gallery filter buttons
  var filterButtons = document.querySelectorAll("[data-filter]");
  var galleryItems = document.querySelectorAll("[data-category]");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var value = btn.getAttribute("data-filter");
      galleryItems.forEach(function (item) {
        var show = value === "all" || item.getAttribute("data-category") === value;
        item.style.display = show ? "" : "none";
      });
    });
  });

  // Simple lightbox
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    var lightboxCaption = lightbox.querySelector(".lightbox-caption");
    var closeBtn = lightbox.querySelector(".lightbox-close");

    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var full = item.getAttribute("data-full") || item.querySelector("img").src;
        var caption = item.getAttribute("data-caption") || "";
        lightboxImg.src = full;
        lightboxImg.alt = caption;
        lightboxCaption.textContent = caption;
        lightbox.classList.add("is-open");
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightboxImg.src = "";
    }
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }
});
