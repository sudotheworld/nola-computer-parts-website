jQuery(document).ready(function() {
    if (jQuery('.quotecartid').length) {
        jQuery('.ms-header .cartlink-' + jQuery('.quotecartid').val()).parent().addClass('iscartactive');
    }
    jQuery('.header-top').find('.minilogo').html(jQuery('.header-bottom').find('.logo').html());
    jQuery("#toTop").hide();
    jQuery(function() {
        jQuery(window).scroll(function() {
            if (jQuery(window).scrollTop() > 500) {
                jQuery("#toTop").fadeIn(500);
            } else {
                jQuery("#toTop").fadeOut(500);
            }
        });
        jQuery("#toTop").click(function() {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    });
    jQuery("#showmenu").click(function(e) {
        e.preventDefault();
        jQuery("#showmenu").toggleClass('removemenu');
        jQuery("#mask").toggleClass("no-display");
        jQuery(this).closest('body').toggleClass('overelay');
    });
    var lastwidth = jQuery(window).width();
    jQuery(window).resize(function() {
        if (jQuery(this).width() != lastwidth) {
            if (jQuery(window).width() > 980) {
                jQuery("#mask").addClass("no-display");
                jQuery("#showmenu").hide();
                jQuery('body').removeClass('overelay');
            } else {
                jQuery("#mask").addClass("no-display");
                jQuery("#showmenu").show();
                jQuery('body').removeClass('overelay');
                jQuery("#showmenu").removeClass('removemenu');
            }
        }
    });
    jQuery("#menu span:not(.new-spouse)").click(function(event) {
        if (jQuery(this).parent().parent().attr('class') == 'category_nav' && jQuery(this).attr('class') != 'active') {
            jQuery('.category_nav > li > ul').hide();
            jQuery('.category_nav > li > span.active').removeClass('active');
            jQuery('.category_nav > li > span b').removeClass('minus');
            jQuery('.category_nav > li > span b').addClass('plus');
        }
        if (jQuery(this).attr('class') == 'toogleclass') {
            if (jQuery(this).next().css('display') != 'block') {
                jQuery(this).prev().show();
            } else {
                jQuery(this).prev().hide();
            }
        } else {
            jQuery(this).prev().hide();
        }
        event.preventDefault();
        if (jQuery(this).next('ul').length) {
            jQuery(this).next().slideToggle('fast');
            var classname = jQuery(this).find('b').attr('class');
            if (classname == 'plus') {
                jQuery(this).find('b').removeClass('plus');
                jQuery(this).addClass('active');
                jQuery(this).find('b').addClass('minus');
            }
            if (classname == 'minus') {
                jQuery(this).find('b').removeClass('minus');
                jQuery(this).removeClass('active');
                jQuery(this).find('b').addClass('plus');
            }
        }
    });
});
/*---- footer responsive accordion js----*/
jQuery(document).ready(function(){
    jQuery(".new-footer-main .footer-boxes-2").on("click", ".show-nav", function() {
        if(jQuery(this).hasClass('active')){
            jQuery(this).removeClass("active").next().slideUp(300);
        }
        else{
            jQuery(".new-footer-main .footer-boxes-2 .accordion").slideUp(300);
            jQuery('.show-nav').removeClass('active');
            jQuery(this).addClass("active").next().slideDown();
        }
    });
});

/*---- Optimize Menu Script And Remove Inline CSS From Topmenu.php DT:23-may-2017 Over----*/
jQuery(document).on('click', 'body', function(e) {
    if (jQuery(e.target).hasClass('reslogin')) {
        return true;
    } else if (jQuery(e.target).hasClass('loginlink')) {
        return false;
    }
    if (!jQuery(e.target).closest('.header-login').length) {
        jQuery('.header-login').slideUp('slow');
    }
    if (!jQuery(e.target).closest('.acc_dropdown').length) {
        jQuery('.acc_drop').slideUp('slow');
        jQuery('.header .links li.acc_dropdown a').removeClass("drop_open");
    }
});
jQuery(document).on('touchstart', '.sub-cat-wrap li', function(e) {
    jQuery(this).addClass('hover-class');
    jQuery('.child-cat-wrapper').removeClass('hover-class');
});
jQuery(document).on('touchend', '.sub-cat-wrap li', function(e) {
    jQuery(this).removeClass('hover-class');
    jQuery('.child-cat-wrapper').removeClass('hover-class');
    var LocationHref = jQuery(this).find('a').attr('href');
});
jQuery('#nav .nav-3').on('click', function() {
    jQuery('#lcd-buyback').show();
});
jQuery(function() {
    jQuery('img.lazyimage').lazyload({
        effect: "fadeIn",
        event: "scroll",
        placeholder: 'data:image/gif;base64,R0lGODlh7wDvAPUAAN/f3/n5+d7e3rW1tezs7PPz8wAAAOvr69ra2iwsLC0tLWhoaMTExMPDw4yMjHx8fKenp/T09Pj4+GdnZ+Li4nBwcLa2tgoKCv///1ZWVtnZ2UpKSm9vb0FBQRUVFcHBwYuLi1VVVc7Ozp6entPT0+bm5s3Nzfv7+zc3N+fn54WFheHh4TY2Njg4OPz8/Lq6uh4eHunp6X19fUhISNLS0pubm5SUlJ2dnZycnElJSWZmZpWVlWVlZYaGhgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wt4bXAgZGF0YXhtcP8/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG10YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53Lm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZjphYm91dD0iIiD/eG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1uczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1NTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJGRDkzNzI5ODM2RDExRTNCRURERENBN0U4ODU0MEFDIiB4/21wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyRkQ5MzcyQTgzNkQxMUUzQkVERERDQTdFODg1NEFDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paToyRkQ5MzcyNzgzNkQxMUUzQkVERERDQTdFODg1NDBBQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRkQ5MzcyODgzNkQxMUUzQkVERERDQTdFODg1NDBBQyIvPiA8L3JmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPf8iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19XU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYGBQQDAgEAACH5BAQKAP8ALAAAAADvAO8AAAb/QIxwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgz+mLBgoLGJR6JNFCQgEGRAR+HvJigQiTJBkRmGMiQEgODCRNgCmGQoKRK/wMza2KQgVPCzpdDYAA9IBQBTghHFegEAXSCUCE7itrsaZLABQMeNK4IOYTAApZbfU4AijLjgLcERJ712AAmAqAJipQAAOCExA9vLZgcYgOBEZ4ayvIVwHQihcADDDchsLhEgIs0AptgcqDyRwYD4nIWfbW0aSmVGfMt8ER1ar8NUy+GPVl2X4pkSSvRfbq3YqOjU45dDdLzRcrEaycHHtE489HLITofcpu1kOjIqzc3klw1BuTWn4ulUL17dOHal58fn74946bvr2v/XmD+eNrf7cfvvd63fP8ABijggAQWaOCBCCao4IIMNujggxBGKOGEFFZo4YUYZqjhhhx26FHhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w01mjjjTjmqOOOPPbo449ABinkkEQWaeSRSCap5JJMNunkk1BGKeWUVFZp5ZVYZqnlllyKEQQAIfkEBQoAFgAsZwBjACAAIAAABvJAjHBILFY4hKJyyRQiFhNEkdFUAgYf4jNKrCgeVS2WMtRMFlIhI5GohImMsfOcxmwUrMIb/iHNuRgQeA57fH0YZoAseIVTWIh0GA54DUYyWgAlAWIDJxIIGp94GUQjHgYGVE6ZmZ6rVhsragmoBgpWrHpvBDO1HoRMuW8ttRNJVQcAEm8NBjN1jWGqTQfL0dSs2cqNAtol3sKF3ePf29fn6NwC1pvYewTh2K3y87vZS/dl7fuI+xrxiOqtMqcrXoxx7CK4wlQtoDWB+pDV6+aPoDhNZQhCtKcR40B+YeAlhAgqYUiLFNYVIZPulcmWLvcEAQAh+QQFCgANACxoAGMAHwAfAAAG4kCMcEgkDiyBonLJxBCOhyKiqQTEiM9BdDiaQKjY6zBLGCImixF4bE06oUMVWrI2t99aIQONrAsJd2RCHAsPfmFXggNoGkU4NXYNbn+BZQQLEw5GHQoKNJSBf3RSKmUYNCGdChlSbWJrHKodX0uuk0w8CbqaYAAnazQJFRSHdZ/FdVlHywhtzqNrAwbT1NPOtnXS1dS3yDTL4FPI406+yb+92E3XTIACd2vu8KDzr0WAbPXz5WL4J++m6BUQ5QIdKEpJ3HUL2K7SK3XJ7OlbSGVivm7r7PG7iLGWxmYUySH0EwQAIfkEBQoAEAAsaABjAB8AIAAABuhAjHBIJAIAp6JyyRQeJUVCMwqAUKFD04A0NSK9gSFhsO2Kn+ek8GMZqM0YtPMbJyPgZ4FaTn7hwXNQCGRSYWt+cylYiW+HiGsPCxMUiXJxhkYfhisOE54gVJZdN54TDwxMR3RTNqVuUwSrTSsTIwcuf2aUuXgMvg3ADCsCqqqLXQ0KCcrLysXGvczNypi8dcG/K9ZGf7JMAwaTXcOiSzAG6A6p0LoK6AYwr5WrVkuFGAMe7xl5xwXl7DAsuIBOTDVGAeSIImAKlkI6AeFQWGWpnEOKGL3NkrVQY6p6aQBti+NxJMlGU4IAACH5BAUKAA8ALGgAZAAfAB8AAAbTwIdwSCw+AkWkccl8CJRCwrNJVEqGSEEVMKU2r0kuxouNmrdd8jIb5WqpYOPh6EQWxOHiuyzHDwUvAxYFa14BMSdtgoJqcCKLLyuFjQ8miwhqcV+CmpRfTAedlBIiCBqnpwSTZAgTrq8LHE6eRAKwsRwVVbRSqKhztLWNhGoNCQ4RXimUGwnOEKt0rCEK1RsMwUMDMJiVHc7HcnBOBgY5RCAszny70kQ55QNVIDhkqnIXBjDZWAJ7E+Uc8JMGxUO5e4bEuRsQMFMjBQZG8IMyMBqZIAAh+QQFCgAeACxnAGQAIAAfAAAG0UCPcEgkBoSSonI5LCiPS0CSyYR6pkoANVrder/gsFAr9hKG5CO5GCEKllPr9c1OCaTfQ94OwBv/YAd3fXKAYYKEGGVbJ4SLj01/WHsEiIJ6cIcDm5ybdGhlJ52dVxJQk4F3lZWQbK1bABMDqE9lKgsTFQ2vWQ64CyoIjIZDDBsUYw+/EHkebxq4GhQKCRVEAxy4ZtcGBgMeFQkKu02bgUIW3d8RKAobi6gD6kIO4syv8t5DHdROren60NnDN29IhgTf/hXkZeTCBQQYIkqcODEIACH5BAUKAA8ALGcAYwAgACAAAAblwIdwSCwKisikMhlYOoURJUCCLDydAQHg+kwdq9wl9RElh89Q9LApRVuHKTOWvCUQm1vksezOJ79qcGOBRm6Eh2onUAESg1wYjYyRig+Aco8AmZqaiHSbnGV8Zy6Tk52XYWxYAwguYZZLHwOzFGKJDLMWH3Z3sGQwA3oqB1C5FjRXGQYGDBQODhQEEws3RBq5XcsKDw0JCQwPI9MIvX5KCsvkDN7gEhULPWoDyxNC6woN9gsL+Wcey8S4sRsiY58jJyCWORhyr1+laS/CjDAAg0hDIg74IeqG75QRFixWmKHEJ4KkIAAh+QQFCgAnACxoAGMAHgAgAAAG38CTcEgkAorIpFIoEZwkRehyWEg6A8jIlMkdHpECwlZYGp+cZmI1PV6z2WLqs2s1S8nqcvEbfR+MZ2+CcHGDhod9c4gBWHhogo+AkWmNj2FPjX5pCIhZExcWbWEYSyAeBgYeogAAmUMNCqgGCgyrrK1DGbIeI0wbtVEfUk1huCeyE4UPCQkkBwMDBAEWAyZ5rEIPGZxeCgkhZxMLnCLQf1QFbkgZzBTh40LQH2ywCg5kC/Bn5mkdzGsI8ml4xW8LBGYQvAikUnDKgG9GFhIs9CbgBG6dmFTgII0UqSwYggAAIfkEBQoAEgAsZwBjACAAIAAABuhAjHBILAIEp6JyyRweA82oM2ZEEg+AgvRqnWq922kX8xRDw8JyeqxGkwXUdfKdcnMJ8vw1cj+vx3pmYikHc2R8SnF/WYlHgFEEcHASTZJ1UpFtlY9MjHafRgOiowMIoEUXBqqrBg5ujrACqayqrmixsKSjpqeYvZUgLAxhnlEQHQkJHVsxjn5GIckKGTTElkoPCskdA0MqvEYug19C2ii2QhALCyt07lxjNQ/tTusgZKJ4mc9pUg7r+iwM0OfMDoB13fANFITmAcA0+eYUDNMAoZOIDKWYWKDiikB9gUARwPhLCUl+RYIAACH5BAUKABgALGcAYwAgACAAAAbpQIxwSCwKAK6icskcCpaSpjIyFUal0sABSXxeMV+sEjAMd8XEq7qo5aKl7rfDISaDAXb2kGEweAZpgYJWUzB9Bi0Ib2WMRA4XhwsHaHkCAVAhhy11iwAKBhZveWIMi0wrDA2qqyumEq9gUSgKtLUKEG9mQywJvb4JuKaVR6mrqa1oSWy6pq4DFYrNTQ0PExMPncpLINbXFJ1MEAvjDyJWHwRTcU9L5ANfqe8nEQUnjYRKLxCTZR8DgBKOXJJGhNWdOGCk/YsW0A0VhRDeWRFIUAiAhWXwDByEJcC/NBorMmm4USTIUcyGBAEAIfkEBRQAFAAsZwBjAB8AHgAABuJAinBILApPxqSSQSBKAMmA0vgwwIxQY2RKBBkMjmEAEJNyuZ5v03nmDr6Zo0AgIdLbRMVXw6YI2hAQRQhfCn1+WkM0CQkdDUQTX48UdXiUGwqZOitHLQOWfgVEECiZCQ6ioFwPjAo6qmcCIQoMlgeWNLBFEQi9vghreAUSxMUVE8gLyhO1wknHy8mTbWNkQnPYv8C2R9S6XCcIA8FT4ZVTKy8DFi+45Qzr6+TfAvEvMXLnSuFiQ/HbcgCcGNgNDxl94awh2sWQCxmFBb89uQMOFLZUSCgpUnXgYCJFf2yF/BYEADs='
    });
});
jQuery(document).ready(function() {
    jQuery('#horizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        closed: 'accordion', // Start closed if in accordion view
        activate: function(event) { // Callback function if tab is switched
            var $tab = jQuery(this);
            var $info = jQuery('#tabInfo');
            var $name = jQuery('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });
    jQuery('#verticalTab').easyResponsiveTabs({
        type: 'vertical',
        width: 'auto',
        fit: true
    });
});
var scrolled = false;
jQuery('.nav-container #header_message').hide();
jQuery(window).scroll(function() {
    if (150 < jQuery(window).scrollTop() && !scrolled) {
        jQuery('.nav-container #header_message').show();
        jQuery('.nav-container').addClass('sticky').animate({
            'top': '0px'
        });
        scrolled = true;
    }
    if (150 > jQuery(window).scrollTop() && scrolled) {
        jQuery('.nav-container').removeClass('sticky').css('top', '-100px');
        jQuery('.nav-container #header_message').hide();
        scrolled = false;
    }
});
jQuery('.header .links li.profile_dropdown ul.profile_drop').hide();
jQuery(document).on('click', '.header .links li.profile_dropdown a', function(event) {
    jQuery(this).toggleClass('drop_open');
    jQuery('.header .links li.profile_dropdown ul.profile_drop').slideToggle(500);
});
jQuery('li.acc_dropdown').find('ul.acc_drop').hide();
jQuery(document).on('click', '.header .links li.acc_dropdown a', function() {
    var thisElm = jQuery(this);
    if (thisElm.parent().parent().hasClass('acc_drop')) {
        if (jQuery(this).hasClass('logoutbtn-loggedout')) {
            jQuery('#lcd-buyback').show();
        }
    } else {
        if (jQuery('.header .links li.acc_dropdown ul.acc_drop').is(":visible")) {
            jQuery('.header .links li.acc_dropdown ul.acc_drop').slideUp('slow');
            thisElm.removeClass("drop_open");
        } else {
            jQuery('.header .links li.acc_dropdown ul.acc_drop').slideDown('slow');
            thisElm.addClass("drop_open");
        }
    }
});
jQuery(document).on('keydown', function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '27') {
        if (jQuery(document).find('#msloginform').is(':visible') && jQuery(document).find('button.performLoginBtn').is(':visible')) {
            jQuery(document).find('.loginpop-close').trigger('click');
        }
    } else if (keycode == '13') {
        if (jQuery(document).find('#msloginform').is(':visible') && jQuery(document).find('button.performLoginBtn').is(':visible')) {
            e.preventDefault();
            jQuery(document).find('#performLoginBtn').trigger('click');
        }
    }
});
jQuery(window).on('load', function() {
    var currentMenuTab = jQuery("input[name='mobileMenuRadio']:checked").val();
    jQuery(document).find('.menuContentTab').hide();
    jQuery(document).find('#' + currentMenuTab).show();
});
jQuery(document).on('change', "input[name='mobileMenuRadio']", function() {
    var currentMenuTab = jQuery("input[name='mobileMenuRadio']:checked").val();
    if (currentMenuTab == 'content2') {
        if (customerIsLoggedIn == 1) {
            jQuery(document).find('.menuContentTab').hide();
            jQuery(document).find('#' + currentMenuTab).show();
        } else {
            window.location.href = customerLoginUrl;
        }
    } else {
        jQuery(document).find('.menuContentTab').hide();
        jQuery(document).find('#' + currentMenuTab).show();
    }
});
jQuery(document).on('click', '.loginpop-close', function() {
    jQuery(document).find('#msloginform').html('');
    jQuery(document).find('#msloginform').hide();
});
jQuery(document).on('click', '.togglepass', function() {
    jQuery(this).toggleClass('toggshow');
    if (!jQuery(this).hasClass('toggshow')) {
        jQuery(this).siblings("#pass").attr('type', 'password');
        jQuery(this).siblings("#loginpassword").attr('type', 'password');
    } else {
        jQuery(this).siblings("#pass").removeAttr('type');
        jQuery(this).siblings("#loginpassword").removeAttr('type');
    }
});

jQuery(document).on('click', '.spmicons', function(){
    if(jQuery(this).hasClass('sp-mailicons')){
        jQuery(this).addClass('sp-callicons');
        jQuery(this).removeClass('sp-mailicons');
        jQuery(this).parent().removeClass("notrdisplay");
        jQuery(this).parent().find('.sp-emailpadding').removeClass('no-display');
        jQuery(this).parent().find('input[name=subscription_email]').removeClass('no-display');
        jQuery(this).parent().find('input[name=subscription_pre_mobile]').addClass('no-display');
        jQuery(this).parent().find('input[name=subscription_mobile]').addClass('no-display');
        //jQuery('<td style="padding-bottom:5px;"></td>').insertBefore(jQuery(this).parent().find('.sp-emailpadding').parent());
    }
    else if(jQuery(this).hasClass('sp-callicons')){
        jQuery(this).parent().addClass("notrdisplay");
        jQuery(this).addClass('sp-mailicons');
        jQuery(this).removeClass('sp-callicons');
        jQuery(this).parent().find('.sp-emailpadding').addClass('no-display');
        jQuery(this).parent().find('input[name=subscription_email]').addClass('no-display');
        jQuery(this).parent().find('input[name=subscription_pre_mobile]').removeClass('no-display');
        jQuery(this).parent().find('input[name=subscription_mobile]').removeClass('no-display');
    }
});
jQuery(document).ready(function() {
    const ftElements = jQuery('.contact-us-main>.contact-us-popup');
    const ftElementsArray = ftElements.toArray();
    jQuery('.contact-us-main>.contact-us-popup').remove();
    jQuery(document).on('click', '.contact-us-main .contact-us-txt', function(){
        if(jQuery(this).index() in ftElementsArray){
            jQuery(this).after(ftElementsArray).slideDown();
        }
        jQuery(this).next().attr('aria-hidden', 'true');
    });
    jQuery(document).on('click', '.new-footer-main .footer-boxes-2 .footer-links-2>li a.con-bottom', function(){
        jQuery(this).parent().attr('aria-hidden', 'false');
        jQuery('.contact-us-main>.contact-us-popup').remove();
    })
});