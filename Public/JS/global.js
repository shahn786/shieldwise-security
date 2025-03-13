
document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener("click", function() {
            mobileMenu.classList.toggle("active");
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    if (anchorLinks.length > 0) {
        anchorLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute("href");
                if (!targetId || targetId === "#") return; // Skip empty or # only links
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
        });
    }
    
    console.log("Global script loaded successfully");
});
