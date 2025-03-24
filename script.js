document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('darkModeToggle');

  if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function () {
          document.body.classList.toggle('dark-mode');
          // Optional: Zustand speichern
          const isDark = document.body.classList.contains('dark-mode');
          localStorage.setItem('darkMode', isDark);
      });

      // Zustand beim Laden wiederherstellen
      if (localStorage.getItem('darkMode') === 'true') {
          document.body.classList.add('dark-mode');
      }
  }
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Skript erfolgreich geladen!");

    /* ------------------------------
       🏠 BURGER-MENÜ (MOBIL)
    ------------------------------ */
    const burgerMenu = document.querySelector(".burger-menu");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!burgerMenu || !mobileMenu) {
        console.error("❌ Fehler: Burger-Menü oder mobile Navigation nicht gefunden!");
    } else {
        console.log("✔️ Burger-Icon und mobiles Menü gefunden.");

        burgerMenu.addEventListener("click", function () {
            console.log("🍔 Burger-Menü wurde geklickt.");
            mobileMenu.classList.toggle("show");

            if (mobileMenu.classList.contains("show")) {
                console.log("✔️ Mobile-Menü ist jetzt sichtbar.");
            } else {
                console.log("❌ Mobile-Menü wird nicht angezeigt.");
            }
        });
    }

    /* ------------------------------
       📞 Floating-Kontakt-Button
    ------------------------------ */
    const floatingButton = document.getElementById("floating-button");
    const contactOptions = document.getElementById("contact-options");

    if (floatingButton && contactOptions) {
        floatingButton.addEventListener("click", function (event) {
            event.stopPropagation();
            contactOptions.classList.toggle("show");
            console.log("📞 Floating-Kontakt-Button toggled.");
        });

        document.addEventListener("click", function (event) {
            if (!floatingButton.contains(event.target) && !contactOptions.contains(event.target)) {
                contactOptions.classList.remove("show");
            }
        });
    } else {
        console.warn("⚠️ Floating-Kontakt-Button oder Kontakt-Menü nicht gefunden!");
    }
});
    
    
    
    
  
    /* ------------------------------
       Fade-In Effekt für Elemente
    ------------------------------ */
    const fadeInElements = document.querySelectorAll(".fade-in");
    function checkFadeIn() {
      fadeInElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("show");
        }
      });
    }
    window.addEventListener("scroll", checkFadeIn);
    checkFadeIn();
  
    /* ------------------------------
       Testimonial Slider Funktion
    ------------------------------ */
    function setupTestimonials(prevId, nextId, containerSelector) {
      const container = document.querySelector(`.${containerSelector}`);
      if (!container) {
        console.warn(`⚠️ Testimonial-Container "${containerSelector}" nicht gefunden.`);
        return;
      }
      const testimonials = container.querySelectorAll(".testimonial");
      const prevButton = document.getElementById(prevId);
      const nextButton = document.getElementById(nextId);
      if (testimonials.length === 0) {
        console.warn(`⚠️ Keine Testimonials im Container "${containerSelector}" gefunden.`);
        return;
      }
      if (!prevButton || !nextButton) {
        console.warn(`⚠️ Testimonial-Buttons nicht gefunden für Container "${containerSelector}".`);
        return;
      }
      let currentTestimonial = 0;
      function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
          testimonial.classList.toggle("active", i === index);
        });
      }
      prevButton.addEventListener("click", function () {
        currentTestimonial = (currentTestimonial === 0) ? testimonials.length - 1 : currentTestimonial - 1;
        showTestimonial(currentTestimonial);
      });
      nextButton.addEventListener("click", function () {
        currentTestimonial = (currentTestimonial === testimonials.length - 1) ? 0 : currentTestimonial + 1;
        showTestimonial(currentTestimonial);
      });
      // Automatisches Durchwechseln alle 5 Sekunden:
      setInterval(() => {
        currentTestimonial = (currentTestimonial === testimonials.length - 1) ? 0 : currentTestimonial + 1;
        showTestimonial(currentTestimonial);
      }, 5000);
      showTestimonial(currentTestimonial);
    }
  
    // Beispielaufrufe: Passe diese IDs und Container-Klassen an deine HTML-Struktur an!
    setupTestimonials("prevTestimonial", "nextTestimonial", "testimonial-slider");
    setupTestimonials("prevTestimonialAbout", "nextTestimonialAbout", "testimonial-slider-about");
  
    /* ------------------------------
       FAQ Accordion Funktion
    ------------------------------ */
    const faqItems = document.querySelectorAll(".faq-item");
    console.log(`📌 Anzahl FAQ-Elemente gefunden: ${faqItems.length}`);
    if (faqItems.length === 0) {
      console.warn("⚠️ Keine FAQ-Elemente gefunden. Bitte überprüfe deine HTML-Struktur.");
    } else {
      faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".icon");
        if (!question || !answer || !icon) {
          console.warn("⚠️ Ein FAQ-Element hat fehlende Unterelemente.");
          return;
        }
        // Setze initiale max-height auf 0, um die Antwort zu verbergen
        answer.style.maxHeight = "0px";
        question.addEventListener("click", function () {
          const isOpen = item.classList.contains("open");
          // Schließe alle anderen FAQ-Items
          faqItems.forEach(other => {
            if (other !== item) {
              other.classList.remove("open");
              const otherAnswer = other.querySelector(".faq-answer");
              const otherIcon = other.querySelector(".icon");
              if (otherAnswer) {
                otherAnswer.style.maxHeight = "0px";
              }
              if (otherIcon) {
                otherIcon.textContent = "+";
              }
            }
          });
          // Öffne oder schließe das aktuelle FAQ-Item
          if (!isOpen) {
            item.classList.add("open");
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = "−";
          } else {
            item.classList.remove("open");
            answer.style.maxHeight = "0px";
            icon.textContent = "+";
          }
        });
      });
      console.log("✅ FAQ-Skript vollständig geladen und aktiv.");
    }
  
    /* ------------------------------
       Captcha für Kontaktformular
    ------------------------------ */
    const captchaQuestion = document.getElementById("captcha-question");
    if (captchaQuestion) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const correctAnswer = num1 + num2;
      captchaQuestion.textContent = `${num1} + ${num2} = ?`;
      const contactForm = document.getElementById("contact-form");
      if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
          const userAnswer = document.getElementById("captcha").value;
          if (parseInt(userAnswer) !== correctAnswer) {
            event.preventDefault();
            document.getElementById("captcha-error").style.display = "block";
          }
        });
      }
    }
  
    /* ------------------------------
       Parallax-Effekt für hero-about Hintergrund
    ------------------------------ */
    document.addEventListener("scroll", function () {
      const heroSection = document.querySelector(".hero-about");
      if (heroSection) {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    });
  ;
   /* ------------------------------
       Kontaktformular
    ------------------------------ */

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    // Funktion zur Fehlermeldung
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add("error");
        const errorText = formGroup.querySelector(".error-message");
        errorText.innerText = message;
    }

    // Funktion zum Entfernen der Fehlermeldung
    function clearError(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove("error");
        const errorText = formGroup.querySelector(".error-message");
        errorText.innerText = "";
    }

    // Live-Validierung
    nameInput.addEventListener("input", function () {
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Bitte Ihren Namen eingeben.");
        } else {
            clearError(nameInput);
        }
    });

    emailInput.addEventListener("input", function () {
        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, "Bitte eine gültige E-Mail-Adresse eingeben.");
        } else {
            clearError(emailInput);
        }
    });

    phoneInput.addEventListener("input", function () {
        const phonePattern = /^[0-9\\s+()-]+$/;
        if (!phonePattern.test(phoneInput.value.trim())) {
            showError(phoneInput, "Nur Zahlen, Leerzeichen, +, - und () erlaubt.");
        } else {
            clearError(phoneInput);
        }
    });

    messageInput.addEventListener("input", function () {
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, "Nachricht muss mindestens 10 Zeichen enthalten.");
        } else {
            clearError(messageInput);
        }
    });

    // Formular beim Absenden validieren
    form.addEventListener("submit", function (event) {
        let valid = true;

        if (nameInput.value.trim() === "") {
            showError(nameInput, "Bitte Ihren Namen eingeben.");
            valid = false;
        }

        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, "Bitte eine gültige E-Mail-Adresse eingeben.");
            valid = false;
        }

        const phonePattern = /^[0-9\\s+()-]+$/;
        if (!phonePattern.test(phoneInput.value.trim())) {
            showError(phoneInput, "Nur Zahlen, Leerzeichen, +, - und () erlaubt.");
            valid = false;
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageInput, "Nachricht muss mindestens 10 Zeichen enthalten.");
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
      const body = document.body;
      const toggleButton = document.getElementById("darkModeToggle");
      const toggleIcon = document.getElementById("toggleIcon");
      const toggleText = document.getElementById("toggleText");
    
      // Dark Mode Status aus dem localStorage
      const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    
      if (darkModeEnabled) {
        body.classList.add("dark-mode");
        toggleIcon.textContent = "☀️";
        toggleText.textContent = "Hellmodus";
      }
    
      toggleButton.addEventListener("click", () => {
        const isDark = body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", isDark);
    
        toggleIcon.textContent = isDark ? "☀️" : "🌙";
        toggleText.textContent = isDark ? "Hellmodus" : "Dunkelmodus";
      });
    });
    
  
  
  



    
});
