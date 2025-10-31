jQuery(document).ready(function(e) {
    jQuery(document).on("click", ".mobile-nav>li>a", function() {
        jQuery("#recent-added-loader").remove();
        jQuery(".recent-loader-new").remove();
       
        jQuery(this).parent().toggleClass("mnav-open");
        jQuery(this).next().slideToggle();
        if (jQuery(this).parent().hasClass("mnav-open")) {
            jQuery(this).parent().attr("aria-hidden", "true");
        } else {
            jQuery(this).parent().attr("aria-hidden", "false");
        }
    });
    
    jQuery(document).on("click", ".mobile-nav>li>ul>li>a", function() {
        
        jQuery(this).parent().toggleClass("mnav-open");
        jQuery(this).next().slideToggle();
    });
    jQuery(document).on("click", ".mobile-nav>li>ul>li>ul>li.mdrop-menu>a", function() {
        jQuery(this).parent().toggleClass("mnav-open");
        jQuery(this).next().slideToggle();
    });
    jQuery(document).find('.mobile-nav>li').each(function() {
       if(jQuery(this).find('ul').lenght ==  0){
            jQuery(this).addClass('noclickablecategory');
       }
    });
    
    jQuery(document).on("click", ".mobile-nav>li>ul>li>ul.lg-menu-li>li>a", function() {
        jQuery(this).parent().toggleClass("mnav-open");
        jQuery(this).next().slideToggle(); 
    });
    /**/
    jQuery(document).on("click", ".mobile-nav>li>ul>li>ul.lg-menu-li>li>ul>li>a", function() {
        jQuery(this).parent().toggleClass("mnav-open");
    });
    jQuery(document).on("click", ".ms-menucontainer #nav>li>ul.level0>li>ul>li.mdrop-menu>a, .ms-menucontainer #nav>li.other-parts>ul.level0.slayouts-menu>li>ul.sview-inul>li.sview-row>ul>li.mdrop-menu>a", function() {
        jQuery(this).parent().find(".mdrop-menu-inner").addClass("mdrop-menu-inner-open");
        jQuery(this).closest(".new-accessories").addClass("removed-border");
        return false;
    });
    jQuery(document).on("click", ".ms-menucontainer #nav>li>ul.level0>li>ul>li.mdrop-menu>ul .mback-btn, .ms-menucontainer #nav>li.other-parts>ul.level0.slayouts-menu>li>ul.sview-inul>li.sview-row>ul>li.mdrop-menu>ul .mback-btn", function() {
        jQuery(this).parent().parent().removeClass("mdrop-menu-inner-open");
        jQuery(this).closest(".new-accessories").removeClass("removed-border");
        return false;
    });

    // Accesories.
    jQuery(document).on("click", ".ms-menucontainer #nav>li>ul.level0 .submenu.half-menu .mdrop-menu>a", function() {
        jQuery(this).parent().find(".mdrop-menu-inner").addClass("mdrop-menu-inner-open");
        return false;
    });
    jQuery(document).on("click", ".ms-menucontainer #nav>li>ul.level0 .submenu.half-menu .mdrop-menu ul .mback-btn", function() {
        jQuery(this).parent().parent().removeClass("mdrop-menu-inner-open");
        return false;
    });

    jQuery(document).on("click", ".ms-menucontainer #nav>li>ul.level0 .submenu.half-menu ul.shop-model li a.mback-btn.dp-title", function() {
        jQuery(this).parent().parent().parent().parent().parent().parent().removeClass("mdrop-menu-inner-open");
        return false;
    });
    // Accesories.

    jQuery(".ms-services>a").click(function(e) {
        jQuery(this).next().toggleClass("no-visible");
    });

    jQuery(".msh-services>li>a").on('click', function() {
        var liEl = jQuery(this).closest('li');
        liEl.siblings().find('.active-tab-icon').removeClass('active-tab-icon');
        jQuery(this).toggleClass('active-tab-icon');
        if(jQuery(".cart-m-wrapper").hasClass("m-cflex")){
            jQuery(".ap-cart-640").removeClass("ap-card-dark");
            jQuery(".cart-m-wrapper").removeClass("m-cflex");
        }
    });
    jQuery(".ms-account>a").click(function(e) {
        jQuery(this).next().toggleClass("no-visible");
    });

    /* Check user logged in */
    if (typeof loggedInUser !== 'undefined' && loggedInUser) {
            jQuery('.ms-services').find('.service_check_login').attr('href', url);
            jQuery('.ms-services').find('.service_check_login').removeClass('lgnprfrmlink');
    } else {
            jQuery('.ms-services').find('.service_check_login').addClass('lgnprfrmlink');
            jQuery('.ms-services').find('.service_check_login').attr('href', 'javascript:;');
    }
    headerresize();
});
jQuery(document).on('click', '.choose-country .cs-usa', function() {
    jQuery('.toggleCountry').removeClass("toggleCountry");
    jQuery(this).addClass("toggleCountry");
    jQuery('.confirm_cbutton_header').removeClass('disabled').removeAttr("disabled");
});
jQuery(document).on('click', '.choose-country .cs-can', function() {
    jQuery('.toggleCountry').removeClass("toggleCountry");
    jQuery(this).addClass("toggleCountry");
    jQuery('.confirm_cbutton_header').removeClass('disabled').removeAttr("disabled");
});
jQuery(document).on('click', '.choose-country .cs-uk', function() {
    jQuery('.toggleCountry').removeClass("toggleCountry");
    jQuery(this).addClass("toggleCountry");
    jQuery('.confirm_cbutton_header').removeClass('disabled').removeAttr("disabled");
});
jQuery(window).resize(function() {
    headerresize();
});

function headerresize() {
    if (jQuery(window).width() <= 1024 && jQuery('.msfedex-mobile .msfedex-timer').length <= 0) {
        jQuery('.ms-header .msfedex-mobile').html(jQuery('.ms-container .msfedex-destop').html());
        jQuery('.ms-container .msfedex-destop').html('');
        jQuery('.ms-header .msfedex-mobile .msfedex-timerblock').after(jQuery('.ms-container .vat-label-group-wrapper').html());
        jQuery('.ms-container .vat-label-group-wrapper').html('');
    } else if (jQuery(window).width() > 1024 && jQuery('.msfedex-destop .msfedex-timer').length <= 0) {
        jQuery('.ms-container .vat-label-group-wrapper').html('<div class="vat-label-group">' + jQuery('.ms-header .msfedex-mobile .vat-label-group').html() + '</div>');
        jQuery('.ms-header .msfedex-mobile .vat-label-group').remove();
        jQuery('.ms-container .msfedex-destop').html(jQuery('.ms-header .msfedex-mobile').html());
        jQuery('.ms-header .msfedex-mobile').html('');
    }
    if (jQuery(window).width() <= 1024 && jQuery('.motab-content #motab-01 #nav-mobile').length <= 0) {
        jQuery('#ms-mobilemenu #motab-01 #nav').removeClass('nav').attr('id', 'nav-mobile').attr('class', 'mobile-nav');
    }
}
jQuery(window).on('load', function() {
    if (jQuery('.links div.loginas-detail').length) {
        var html = jQuery('.links div.loginas-detail').html();
        jQuery('.cart-m-wrapper').after('<div class="loginas-detail"><div class="loginas-wrap">' + html + '</div></div>');
        jQuery('.links div.loginas-detail').remove();
    }
    if (jQuery('.links li.backtomyacc').length) {
        var href = jQuery('.links li.backtomyacc a').attr('href');
        jQuery('.sevices-list .backtolink a').attr('href', href.replace('www.', ''));
        jQuery('.links div.backtomyacc').remove();
        jQuery(".sevices-list .backtolink").removeClass('b-link-found');
    } else {
        jQuery('.sevices-list .backtolink').remove();
        jQuery(".sevices-list .backtolink").addClass('b-link-found');
    }
});

jQuery(document).ready(function(){
    var siteLogo = jQuery("#site-logo-image");
    var siteLHeight = siteLogo.height();
    var siteLWidth = siteLogo.width();
    siteLogo.attr('height', siteLHeight);
    siteLogo.attr('width', siteLWidth);
})
var sticky = 112;
jQuery(window).on('scroll', function() {
    if(jQuery(this).scrollTop() > sticky){
        jQuery('.ms-menucontainer').addClass('sticky-nav-1')
    } else{
        jQuery('.ms-menucontainer').removeClass('sticky-nav-1')
    }
});

jQuery(document).on('click', function(event) {
    if (!jQuery(event.target).closest(".ms-services,.ms-services>a").length) {
        jQuery(".ms-services>.mss-container").addClass('no-visible');
    }
    if (!jQuery(event.target).closest(".ms-account,.ms-account>a").length) {
        jQuery(".ms-account>.myacc-container").addClass('no-visible');
    }
    if (!jQuery(event.target).closest(".country-picker,.country-picker>a").length) {
        jQuery(".country-picker .country-container").addClass('no-visible');
        jQuery('.country-link').removeClass('country-open');
        jQuery('.country-picker .country-container').remove();
    }
    if (!jQuery(event.target).closest(".msfedex-timer,.msfedex-timer>a").length) {
        jQuery(".cutoff-times-block").addClass('no-visible');
    }
    if (!jQuery(event.target).closest(".msh-services>li.ms-searchbx>a,.ms-searchbox").length) {
        jQuery(".ms-container .ms-searchbox").removeClass("mssearch-visible");
    }
    if (!jQuery(event.target).closest(".contact-us-main").length) {
        jQuery(".contact-us-main .contact-us-popup").attr('aria-hidden', 'false');
        jQuery('.contact-us-main>.contact-us-popup').remove();
    }
    if (!jQuery(event.target).closest(".block-cart").length) {
        if (jQuery('.express-checkout-shipping').is(':visible')) {
            return;
        }

        if (jQuery('.express-checkout-popup').is(':visible')) {
            return;
        }

        jQuery('.block-cart .block-content').removeClass("display_cart").addClass("no-display").removeAttr('style');
        jQuery('.block-cart').removeClass('iscartactive');
        if (jQuery('.quotecartid').length) {
            jQuery('.ms-header .cartlink-' + jQuery('.quotecartid').val()).parent().addClass('iscartactive');
        }
    }
});
jQuery(function() {
    jQuery(document).off('click', '.tab-opt>li>a').on('click', '.tab-opt>li>a', function(e) {
        e.preventDefault(); // prenvent default anchor behavier
        if (jQuery(this).attr('redirect') == '1') {
            jQuery('#lcd-buyback').show();
            window.location.href = jQuery(this).attr('href');
            return false;
        }
        jQuery(".tab-opt>li").removeClass('ham-active'); // remove ative class from all li elements
        jQuery(this).parent().addClass('ham-active'); // add active class to current clicked li element

        jQuery(".motab-content > div").removeClass("ham-active"); // hide all content
        var hrefId = jQuery(this).attr('href'); // get id from href attrbute of clicked anchor tag
        jQuery(hrefId).addClass('ham-active'); // show id's content
        jQuery(hrefId).find('.myaccount-nav').show();
    });
    /**/
});

jQuery(document).ready(function(e) {
    const mobileMenuElements = jQuery('#ms-mobilemenu');
    const mobileMenuElementsArray = mobileMenuElements.toArray();
    jQuery('.ms-container>#nav>li>.level0').remove();
    jQuery('#ms-mobilemenu').remove();
    jQuery('#hmmenu-mobile').click(function() {
        jQuery('.mobile-nav>li>ul.level0>li>span.recent-loader').remove();
        if(jQuery(this).index() in mobileMenuElementsArray){
                jQuery('.ms-header').after("<div id='ms-mobilemenu' class='hamburgermenu'>"+mobileMenuElementsArray[jQuery(this).index()].innerHTML+'<div>');
        }
        jQuery("#ms-mobilemenu").addClass("hamburgermenu-open");
        /*ARIA-JS Attribute add*/
        jQuery(this).attr("aria-expanded", "true");

        // Load mobile menu.
        jQuery('.mobile-nav>li').each(function(){
            var index = jQuery(this).index();
            if (menuElementsArray[index] && typeof menuElementsArray[index].innerHTML !== 'undefined') {
                jQuery(this).append("<ul class='level0 slayouts-menu'>" + menuElementsArray[index].innerHTML + "</ul>");
            }
        });
        
        // Accessories new design mobile.
        if (jQuery(window).width() < 1024) {
            jQuery('.accessories-sub-detail').on('click', function() {
                var container = jQuery(this).parents('.level0'),
                    currId = jQuery(this).attr('id')
                container.find('.accessories-tabs-nav a').removeClass('active');
                jQuery(this).toggleClass('active');
                container.find('.accessories-tabs-nav a[href$="#'+ currId +'"]').addClass('active');
            });
        }
        // Accessories new design mobile.
    });
    jQuery(document).off('click', '#hmclose').on('click', '#hmclose', function() {
        jQuery('#ms-mobilemenu').removeClass("hamburgermenu-open");
        /*ARIA-JS Attribute remove*/
        jQuery("#hmmenu-mobile").attr("aria-expanded", "false");
        jQuery('#ms-mobilemenu').remove();
    })
    jQuery(document).off('click', '.ham-tabwrap .category_nav>li>span').on('click', '.ham-tabwrap .category_nav>li>span', function() {
        jQuery(this).parent().toggleClass("mnav-open");
        jQuery(this).next().slideToggle();
    });
    jQuery(".msh-services>li.ms-searchbx>a").click(function() {
        jQuery(".ms-container .ms-searchbox").toggleClass("mssearch-visible");
    });
    jQuery(".ms-header .input-text").focus(function() {
        jQuery(this).parent().addClass("form-searchwide");
    });
    jQuery(".ms-header .input-text").focusout(function() {
        jQuery(this).parent().removeClass("form-searchwide");
    });
    /*For menu pin logic*/
    jQuery(document).on('click', '.ms-menucontainer #nav>li>ul.level0.slayouts-menu>li>a', function() {
        if(jQuery(this).parent().parent().parent('li').hasClass('new-accessories')){
            jQuery(this).parent().parent().removeClass("ul-menudisabled");
            jQuery(this).parent().parent().find('li').removeClass("mnu-pintab");
        }else{
            jQuery(this).parent().parent().toggleClass("ul-menudisabled");
        }
        jQuery(this).parent().toggleClass("mnu-pintab");
    });
    jQuery(document).on('click', '.ms-menucontainer #nav>li>ul.level0.slayouts-menu>li.sview-allmenu>ul>li>ul>li.sview-seebtn>a', function() {
        var jumptomenu = jQuery(this).attr('aria-label');
        jQuery('.ms-menucontainer #nav>li>ul.level0.slayouts-menu>li[aria-labelledby=' + jumptomenu + ']').addClass("mnu-pintab");
        jQuery('.ms-menucontainer #nav>li>ul.level0.slayouts-menu>li[aria-labelledby=' + jumptomenu + ']').parent().toggleClass("ul-menudisabled");
    });
});