
$(document).ready(function() {
    // Enhanced FAQ Toggles with smooth animations
    $('.faq-question').on('click', function() {
        const $item = $(this).closest('.anaheim-faq-item');
        const $toggle = $(this).find('.faq-toggle i');
        const $answer = $item.find('.faq-answer');
        const isActive = $item.hasClass('active');

        // Close all FAQ items first
        $('.anaheim-faq-item').removeClass('active');
        $('.anaheim-faq-item .faq-toggle i').removeClass('fa-minus').addClass('fa-plus');

        // If this item wasn't active, open it
        if (!isActive) {
            $item.addClass('active');
            $toggle.removeClass('fa-plus').addClass('fa-minus');
        }
    });

    // Enhanced scroll animations for stats
    $(window).on('scroll', function() {
        $('.stat-item').each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 100) {
                $(this).addClass('animate-in');
            }
        });
    });

    // Track user engagement for analytics
    let engagementTimer = 0;
    setInterval(function() {
        engagementTimer += 5;
        if (engagementTimer === 30) {
            gtag('event', 'engagement', {
                'event_category': 'User Engagement',
                'event_label': '30 Second Page View',
                'value': 30
            });
        }
    }, 5000);
});

// Enhanced performance monitoring
window.addEventListener('load', function() {
    gtag('event', 'page_load_complete', {
        'event_category': 'Performance',
        'event_label': 'Hanford Page Load',
        'value': Date.now() - performance.navigationStart
    });
});
