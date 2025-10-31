jQuery(document).ready(function(){
    initializeVideoCarousel();
});

function initializeVideoCarousel() {

    const carousel = jQuery('#homepage_slider');
    const DEFAULT_DURATION = 5;
    const CIRCUMFERENCE = 138.23048;
    let currentInterval = null;

    carousel.owlCarousel({
        loop: true,
        nav: true,
        dots: true,
        onInitialized: function (event) {
            const initialIndex = event.item.index || 0;
            updateVideoPlayback(initialIndex);
        },
        responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 }
        }
    });

    function clearAllProgress() {
        if (currentInterval) clearInterval(currentInterval);
        currentInterval = null;

        carousel.find('.progress-circle').each(function () {
            jQuery(this).hide();
            jQuery(this).find('.progress-ring__circle').css('stroke-dashoffset', CIRCUMFERENCE);
            jQuery(this).siblings('.duration').text('');
        });
        carousel.find('video').each(function () {
            this.pause();
        });
    }

    function updateProgressBar(duration, currentTime, progressCircle) {

        const progress = (currentTime / duration) * 100;
        const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
        const secondsLeft = Math.ceil(duration - currentTime);
    
        jQuery(progressCircle).show().find('.progress-ring__circle').css('stroke-dashoffset', offset);
        jQuery(progressCircle).siblings('.duration').text(secondsLeft);
    }

    // Function to manage video playback based on current slide index
    function updateVideoPlayback(currentIndex) {

        clearAllProgress();

        const currentSlide = carousel.find('.owl-item').eq(currentIndex);
        const videoInCurrentSlide = currentSlide.find('video');
        const progressCircle = currentSlide.find('.progress-circle');

      
        if (videoInCurrentSlide.length > 0) {
            const video = videoInCurrentSlide.get(0);

            video.currentTime = 0;

            // Try to autoplay the video
            video.play().catch((error) => {
                console.log("Autoplay failed: ", error);
            });

            // Update progress bar on timeupdate
            jQuery(video).on('timeupdate', function() {
                updateProgressBar(video.duration, video.currentTime, progressCircle);
            });

            // Reset progress bar when video ends
            jQuery(video).on('ended', function() {
                jQuery(progressCircle).find('.progress-ring__circle').css('stroke-dashoffset', CIRCUMFERENCE);
            });

        } else{
            const durationTime = currentSlide.find('.slide-item').attr('data-duration');
            let duration = parseInt(durationTime) || DEFAULT_DURATION;
            let elapsed = 0;
            progressCircle.find('.progress-ring__circle').css('stroke-dashoffset', CIRCUMFERENCE);
            progressCircle.siblings('.duration').text(duration);
            progressCircle.show();
            currentInterval = setInterval(() => {
                elapsed += 1;
                updateProgressBar(duration, elapsed, progressCircle);
                if (elapsed > duration) {
                    clearInterval(currentInterval);
                    carousel.trigger("next.owl.carousel");
                }
            }, 1000);
        }
    }

    // Play/Pause button click handler
    carousel.find('.ag-play-btn, .ag-pause-btn').on('click', function() {
        const btn = jQuery(this);
        const video = btn.parent().siblings('video').get(0);
        
        if (btn.hasClass('ag-play-btn')) {
            // If it's a play button, pause the video and update class
            if (video) {
                video.pause();
            }
            btn.removeClass('ag-play-btn').addClass('ag-pause-btn');
        } else if (btn.hasClass('ag-pause-btn')) {
            // If it's a pause button, play the video and update class
            if (video) {
                video.play();
            }
            btn.removeClass('ag-pause-btn').addClass('ag-play-btn');
        }

    });

    // Trigger video playback when the slide changes
    carousel.on('changed.owl.carousel', function(event) {
        const currentIndex = event.item.index;
        updateVideoPlayback(currentIndex);
    });

    // Pause carousel autoplay when video plays, resume when paused/ended
    carousel.find('video').on('play', function() {
        carousel.trigger('stop.owl.autoplay');
    }).on('ended', function() {
        jQuery(this).parent().find('.progress-circle').hide();
        carousel.trigger("next.owl.carousel");
    }).on('pause', function() {
        carousel.trigger('stop.owl.autoplay');
        jQuery(this).parent().find('.progress-circle').show();
    })
}