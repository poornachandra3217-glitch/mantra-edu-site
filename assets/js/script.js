/* =========================================================
   MANTRA LEARNING ACADEMY — Shared JavaScript
   Features: mobile menu toggle, FAQ accordion, form validation
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Mobile navigation toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile menu after a link is chosen
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2. FAQ accordion (Courses page) ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", function () {
      var isOpen = item.getAttribute("data-open") === "true";

      // Close any other open FAQ items (single-open accordion behaviour)
      faqItems.forEach(function (other) {
        other.setAttribute("data-open", "false");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      item.setAttribute("data-open", isOpen ? "false" : "true");
      question.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });

  /* ---------- 3. Registration form validation (Contact page) ---------- */
  var form = document.getElementById("registration-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var fields = [
        { id: "reg-name", type: "text" },
        { id: "reg-email", type: "email" },
        { id: "reg-phone", type: "phone" },
        { id: "reg-course", type: "select" },
        { id: "reg-message", type: "text" }
      ];

      fields.forEach(function (f) {
        var input = document.getElementById(f.id);
        if (!input) return;
        var fieldWrap = input.closest(".field");
        var value = input.value.trim();
        var fieldValid = true;

        if (value === "") {
          fieldValid = false;
        } else if (f.type === "email") {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          fieldValid = emailPattern.test(value);
        } else if (f.type === "phone") {
          var phonePattern = /^[0-9+\-\s]{7,15}$/;
          fieldValid = phonePattern.test(value);
        }

        if (fieldValid) {
          fieldWrap.classList.remove("invalid");
        } else {
          fieldWrap.classList.add("invalid");
          valid = false;
        }
      });

      var statusBox = document.getElementById("form-status");
      if (valid) {
        statusBox.textContent = "Thank you! Your registration request has been received. Our admissions team will contact you within 2 working days.";
        statusBox.className = "form-status show success";
        form.reset();
      } else {
        statusBox.textContent = "Please correct the highlighted fields and submit again.";
        statusBox.className = "form-status show";
        statusBox.style.background = "#f6e2df";
        statusBox.style.color = "#8a2f16";
        statusBox.style.border = "1px solid #8a2f16";
      }
    });
  }

});
