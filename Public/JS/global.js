document.querySelectorAll('a[href^="/services#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').split('#')[1];
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Update URL without reloading
    history.pushState(null, '', this.getAttribute('href'));
  });
});


// javacript for button in los angles 

document.addEventListener("DOMContentLoaded", function () {
    const scrollButton = document.querySelector(".cta-button");
    const targetSection = document.querySelector("#all-services-section");

    if (scrollButton && targetSection) {
        scrollButton.addEventListener("click", function (event) {
            event.preventDefault();
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
    
    // Add error handling for document queries
    console.log("Global script loaded successfully");
});
