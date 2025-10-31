jQuery(document).ready(function(){

    var expDivElm = jQuery(document).find('.bundle-ex-co-btn');
    var sidebarElm = jQuery(document).find('.main-container .main .sidebar');
    var colMainElm = jQuery(document).find('.main-container .main .col-main');    

    function windowSize() {
        windowWidth = window.innerWidth ? window.innerWidth : jQuery(window).width();
        checkWindowWidth();
    }

    function checkWindowWidth() {
        if(windowWidth <= 1024){
            jQuery(expDivElm).removeClass("expanded-bundle-block");
            jQuery(sidebarElm).removeClass("r-sidemenu");
            jQuery(colMainElm).removeClass("expanded-main");
        }
    };

    jQuery(window).resize(function() {
        windowSize();
    });

});
