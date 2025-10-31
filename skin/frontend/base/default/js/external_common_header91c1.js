//<![CDATA[
/*-- Media Query Disable SlidersCode Start --*/
jQuery(window).resize(function() {
    if(jQuery(window).width() < 1024){
        jQuery('#auguria-slider').remove();
    }
    if(jQuery(window).width() < 980 ){
        jQuery('.header-container .header-bottom').removeAttr("style");
    }
});
//]]>
/*-- Otp and Twofa Validation For Numeric --*/
function validateNumber(event)
 {
    if((event.clipboardData || window.event.clipboardData).getData('text').match(/[^\d]/)){
    event.preventDefault();
  }
} 
//]]>
/*-- Media Query Disable SlidersCode Over --*/
var scrolledmenu = false;
jQuery(window).scroll(function(){
    if (150 < jQuery(window).scrollTop() && !scrolledmenu) {
        jQuery('.header_message').addClass('sticky');
        scrolledmenu = true;
    }
    if (150 > jQuery(window).scrollTop() && scrolledmenu) {
        jQuery('.header_message').removeClass('sticky');
        scrolledmenu = false;
    }
});
//device menu jquery
jQuery(document).on('click','.devicemainmenu a',function() {
    jQuery('#lcd-buyback').show();
    var mobileview = 1;
    if(jQuery(window).width() > 1200) {
        var mobileview = 0;
    }
    if(jQuery(this).attr('href') !== undefined) {
        var url = jQuery(this).attr('href');
        if(url != 'javascript:;') {
            window.location.href = url;
        } else {
            var catname = jQuery(this).attr('data-title');
            var maincat = jQuery(this).attr('data-url');
            var params = jQuery(this).attr('data-params');
            jQuery.ajax({
                type: 'POST',
                url: deviceurl,
                data: 'categoryname='+catname+'&maincat='+maincat+'&view='+mobileview+'&params='+params,
                success: function(returndata) {
                    obj = jQuery.parseJSON(returndata);
                    if(obj.DEVICEURL) {
                        window.location.href = obj.DEVICEURL;
                    } else {
                        jQuery('body').append(obj.HTML);
                        if(obj.LOGIN) {
                            jQuery('.dwpop_section-2 h5').remove();
                        }
                        jQuery('#lcd-buyback').hide();
                    }
                }
            });
        }
    } else {
       jQuery('#lcd-buyback').hide(); 
    }
});
jQuery(document).on('click','.dw_closepopups',function(){
    jQuery('.dw_overrely').remove();
    jQuery('.devicespopups').remove();
});
jQuery(window).on('load', function() {
    if(jQuery('.header div.loginas-detail').length) {
        var html = jQuery('.header div.loginas-detail').html();
        jQuery('.header-container .header-top').after('<div class="loginas-detail"><div class="loginas-wrap">'+html+'</div></div>')
        jQuery('.header div.loginas-detail').remove();
    }
})



//staymobile header page change start
  // Menu Hover Over
jQuery(document).ready(function() {
jQuery('#nav>li').mouseenter(
         function () {
          jQuery("#menu-overely").show();
          var hmheiht = jQuery(window).height();
          jQuery("#menu-overely").css("height", +hmheiht+"px");
         });
jQuery('#nav>li').mouseleave(function () {
          jQuery("#menu-overely").hide();
         }
).mouseleave();
});
//staymobile header page change end

//ifixandrepair header page change start

// Scroll Script For Deal Of The Day Start
jQuery(document).ready(function (){
    jQuery('#deal-top-blocks strong').click(function() {
    if(jQuery("#deal-demo-container").length > 0){
      var deal_offset = jQuery("#deal-demo-container").offset().top - 80;
      jQuery('html, body').animate({ scrollTop: deal_offset}, 500)
    }
  });  
});
//Scroll Script For Deal Of The Day End
//ifixandrepair header page change end

//staymobile home page change start
jQuery(function() {
  jQuery('#accordion .content').hide();
    jQuery('#accordion h2:first').addClass('active').next().slideDown('slow');
    jQuery('#accordion h2').click(function() {
    if(jQuery(this).next().is(':hidden')) {
      jQuery('#accordion h2').removeClass('active').next().slideUp('slow');
      jQuery(this).toggleClass('active').next().slideDown('slow');
    }
    });
});

jQuery(document).ready(function(){
  jQuery(".fancybox-media").click(function(){
    var href_id = jQuery(this).attr("href");
    var div_id = href_id.replace('#','');
    jQuery('#'+div_id).show();
});

jQuery("span.v-close").click(function(){
    jQuery(".videos-popup-bx").hide();;
  });    
});
// menu seaching funcationity logic start
var oldseachvalue = '';
var pointcount = 0;
var oldseach = '';
function menuSeaching(element){
    jQuery('.mdrop-menu-inner').removeClass('mdrop-menu-inner-open');
    var search_val = element.value.toLowerCase().replace(/^\s+/g, '');
    oldseach = element.value;
    // check seach box value exist or not
    if(search_val.length == 0){
        jQuery('.seach-notmatch-menu').removeClass( "seach-notmatch-menu" );
        jQuery('.seach-match-menu').removeClass( "seach-match-menu" );
        jQuery('.accessories-tabs-nav li').removeClass('active');
        return false;
    }
    jQuery('.ms-menucontainer #nav>li>ul.level0.slayouts-menu>li>a').each(function(){
        jQuery(this).parent().removeClass("mnu-pintab");
        jQuery(this).parent().parent().removeClass("ul-menudisabled");
    });
    var currenttab = jQuery(element).parents('ul[class="level0"]').eq(0); // get current active menu
    // if old seach value same than seaching algo apply other wise set active from prevoise finded
    if(oldseachvalue != search_val){
        jQuery(document).find('.seach-match-menu-hover').removeClass('seach-match-menu-hover');
        pointcount = 0;
        oldseachvalue = search_val;
        jQuery('.level0 li a').removeClass("seach-match-menu");
        jQuery('.level0 li .submenu li a,.level0 li ul li a').addClass("seach-notmatch-menu");
        jQuery('.level0 .bhover a').addClass("seach-notmatch-menu");
        jQuery('.mdrop-menu>a,.mback-btn,.dp-title>a').removeClass("seach-notmatch-menu");
        jQuery('.ms-menucontainer').find('.search-txt-box').val(oldseach); // set value in all box

        var allelement = jQuery('.level0 li a:menucontains("'+search_val+'")').removeClass( "seach-notmatch-menu" ).addClass("seach-match-menu");
        
        // New code to show/hide tabs
        var tabsToShow = jQuery('.accessories-sub-detail li').filter(function() {
            return jQuery(this).find('a').hasClass('seach-match-menu');
        });
        
        // If there are matching tabs, hide all and remove existing active class
        if (tabsToShow.length > 0) {
            jQuery('.accessories-sub-detail').hide();
            jQuery('.accessories-tabs-nav li').removeClass('active');
        }
        
        // Show parent elements of matching tabs
        tabsToShow.each(function() {
            var firstParentElement = tabsToShow.first().closest('.accessories-sub-detail');
            firstParentElement.show();
            var parentElement = jQuery(this).closest('.accessories-sub-detail');
            var tabId = parentElement.attr('id');
            parentElement.prev('.accessories-tabs-nav li').addClass('active');
            jQuery('.accessories-tabs-nav li').has('a[data-target="' + tabId + '"]').addClass('active');
            
        });
        
        jQuery('.mdrop-menu').addClass('seach-notmatch-menu');
        submenu = jQuery('.mdrop-menu .mdrop-menu-inner .submenu li .seach-match-menu');
        submenu.parents('.mdrop-menu').removeClass( "seach-notmatch-menu" ).addClass("seach-match-menu");
        jQuery('.mdrop-menu>a:menucontains("'+search_val+'")').parents('.mdrop-menu').removeClass( "seach-notmatch-menu" ).addClass("seach-match-menu");

    }else{
        return false;
    }
    var currentelement = allelement[pointcount];
    if(!currentelement){
        pointcount = 0;
        currentelement = allelement[pointcount];
    }
    // check seach element exist or not
    if(currentelement){
        var ele = jQuery(document).find(currentelement);
        
        var mainele = ele.parents('ul[class="level0"]').eq(0);
        if(ele != currenttab){
            jQuery(document).find(".main-menu-head").remove();
            jQuery('.li-hover').removeClass('li-hover');
            ele.parents().addClass('li-hover');
            jQuery('li .li-hover').removeClass('li-hover');
            var ele = ele.parents('.level0');
            var OldHTML = ele.html();
            ele.html("<div class='main-menu-head'><div class='menu-search-part'><div class='serch-box-new'><button></button><input type='text' value='"+ oldseach +"' name='menusearch' class='search-txt-box' id='myInput' onkeyup='menuSeaching(this)' placeholder='"+Translator.translate('What are you looking for?')+"' autocomplete='off'><button class='subtract-btn menu-reset-searching'></button></div></div><div class='menu-image-part'><a href='javascript:void(0);'></a></div><div class='new-img-class'></div><div class='horizontal-black-line'></div></div>"+OldHTML);
            jQuery("input[name=menusearch]").val(oldseach).focus();
            jQuery("input[name=menusearch]").selectRange(oldseach.length);
            var scrollele = jQuery('.seach-match-menu-hover');
            jQuery('.m-overflows').each(function(index, currentElement) {
                var scrollele = jQuery(this).find('li .seach-match-menu').parent()[0];
                if(jQuery(scrollele).parents('.m-overflows').length){
                    jQuery(this).animate({scrollTop: jQuery(scrollele).offset().top - jQuery(scrollele).parents('.m-overflows').offset().top }, "slow");
                }

            });
            
        }
        jQuery('.sview-seebtn a,.sview-title a').removeClass('seach-notmatch-menu');
        if(jQuery('.li-hover').hasClass('other-parts') || jQuery('.li-hover').hasClass('tools-accessories2')){
            jQuery('.li-hover>.level0>li[class!="sview-allmenu"]').addClass('seach-notmatch-menu');
            jQuery('.li-hover>.level0>li[class!="sview-allmenu"]').each(function(index, currentElement) {
                var element = jQuery(currentElement).find('li .seach-match-menu').parent()[0];
                var elementHtml = jQuery(currentElement).html();
                var label = jQuery(currentElement).attr('aria-labelledby');
                if(elementHtml.indexOf('seach-match-menu') != -1){
                    jQuery('li[aria-labelledby="'+label+'"]').removeClass('seach-notmatch-menu');
                    if(!jQuery('.mnu-pintab').length){
                        jQuery('li[aria-labelledby="'+label+'"]').addClass('mnu-pintab');
                        jQuery('li[aria-labelledby="'+label+'"]').parent().addClass("ul-menudisabled");
                    }
                } else {
                    jQuery('li[aria-labelledby="'+label+'"]').addClass('seach-notmatch-menu');
                }
            });
        }
        jQuery(document).find('a.seach-match-menu:visible').first().addClass('seach-match-menu-hover');
    }
}
function menuSeachingmobile(element){
    jQuery('.sview-allmenu').remove();
    jQuery('.hiddenMobileMenu').removeClass('hiddenMobileMenu');
    jQuery('.mdrop-menu').removeClass('seach-match-menu');
    jQuery('.mdrop-menu').removeClass('seach-notmatch-menu');
    jQuery('.mdrop-menu').removeAttr('style');
    jQuery(".mobile-nav li ul").removeAttr('style');
    jQuery('.level0 li .submenu li a,.level0 li ul li a').removeClass("seach-match-menu");
    jQuery(".mobile-nav li ul").removeClass("mnav-open");
    jQuery(".mobile-nav li").removeClass( "mnav-open li-hover");
    jQuery(".mobile-nav li ul li").removeClass("mnav-open");
    jQuery('.seach-notmatch-menu').show();
   

    var search_val = element.value.toLowerCase().replace(/^\s+/g, '');
    oldseach = element.value;    
    var currenttab = jQuery(element).parents('ul[class="level0"]').eq(0); // get current active menu
    jQuery('.level0 li .submenu li a,.level0 li ul li a').removeClass("seach-match-menu");
    jQuery('.level0 li .submenu li ul li .submenu li a').removeClass("seach-match-menu");
//     // if old seach value same than seaching algo apply other wise set active from prevoise finded
    jQuery(".mobile-nav .sview-ulimg>li>a").parent().show();
    if(oldseachvalue != search_val){
        jQuery(document).find('.seach-match-menu-hover').removeClass('seach-match-menu-hover');
        pointcount = 0;
        oldseachvalue = search_val;
        jQuery('.level0 li a').removeClass("seach-match-menu");
        jQuery('.level0 li .submenu li a,.level0 li ul li a').addClass("seach-notmatch-menu");
        jQuery('.level0 li .submenu li ul li .submenu li a').addClass("seach-notmatch-menu");
        jQuery('.level0 .bhover a').addClass("seach-notmatch-menu");
        jQuery('.mdrop-menu>a,.mback-btn,.dp-title>a').removeClass("seach-notmatch-menu");
        jQuery('.ms-menucontainer').find('.search-txt-box').val(oldseach); // set value in all box

        var allelement = jQuery('.mobile-nav .level0 li a:menucontains("'+search_val+'")').removeClass( "seach-notmatch-menu" ).addClass("seach-match-menu");
        if (jQuery(allelement).parent('li').find('ul').length > 0) {
            jQuery(allelement).parent('li').parent('ul').parent('li').parent('ul').parent('li').addClass('mnav-open li-hover');
            jQuery(allelement).parent('li').parent('ul').parent('li').parent('ul').show();
            jQuery(allelement).removeClass('seach-match-menu').parent('li').addClass('mnav-open li-hover');
            jQuery(allelement).parent('li').find('ul').show();
        }

        jQuery('.level0').each(function () {
            jQuery(this).parent('li').removeClass('mnav-open');
            jQuery(this).hide();
        });
    
        // Select the first <li> that has the class 'li-hover'
        var firstLiHover = jQuery('.li-hover').first();
    
        // Add the 'mnav-open' class and show its submenu
        firstLiHover.addClass('mnav-open');
        firstLiHover.find('.level0').show();
        
        jQuery('.sview-allmenu a:menucontains("'+search_val+'")').addClass( "seach-notmatch-menu" ).removeClass("seach-match-menu");
        jQuery('.mdrop-menu').addClass('seach-notmatch-menu');
        submenu = jQuery('.mdrop-menu .mdrop-menu-inner .submenu li .seach-match-menu');
        submenu.parents('.mdrop-menu').removeClass( "seach-notmatch-menu" ).addClass("seach-match-menu");
        jQuery('.mdrop-menu>a:menucontains("'+search_val+'")').parents('.mdrop-menu').removeClass( "seach-notmatch-menu" ).addClass("seach-match-menu");
        jQuery('.mdrop-menu-inner>a:menucontains("'+search_val+'")').parents('.mdrop-menu').removeClass( "seach-notmatch-menu" ).addClass("seach-match-menu");


        if(jQuery('.mobile-nav ul.sview-ulimg>li>a').hasClass("seach-notmatch-menu")){
            jQuery(".mobile-nav .sview-ulimg>li>a.seach-notmatch-menu").parent().hide();
        }
        
    }else{
        return false;
    }
    
    var currentelement = allelement[pointcount] ;
    if(!currentelement){
        pointcount = 0;
        currentelement = allelement[pointcount];
    }
    // check seach element exist or not

    jQuery(".mobile-nav li ul").removeClass("mnav-open");
    jQuery(".mobile-nav li").removeClass( "mnav-open li-hover");
    
    
    var ele = jQuery(document).find(currentelement);
    ele.parents('li').removeClass('hiddenMobileMenu');
    ele.parents('ul[class="level0"]').parents('li').removeClass('hiddenMobileMenu');
    ele.parents('ul[class="level0"]').parents('li').addClass('mnav-open li-hover');
    ele.parents('ul[class="level0"]').removeClass('hiddenMobileMenu');
    ele.parents('ul[class="level0"]').addClass('mnav-open');
    ele.parents('ul[class="level0"]').css({ display: "block" });
    ele.parents('ul').css({ display: "block" });
    ele.parents('.submenu').parents('li').removeClass('hiddenMobileMenu');
    ele.parents('.submenu').parents('li').addClass('mnav-open');
    ele.parents('li').parent('ul').parents('li').parent('ul').parents('li').removeClass('hiddenMobileMenu');
    ele.parents('li').parent('ul').parents('li').parent('ul').parents('li').addClass('mnav-open');

    // Hide The Pre-Owned Devices Menu when search anything.
    jQuery('#ms-mobilemenu .devicemainmenu').hide();


    var submenus = jQuery('#nav-mobile .submenu');

    // Hide the submenu if no result found.
    submenus.filter(function() {
        var length = jQuery(this).children('li.seach-match-menu').length;
        if(length) return false;
        if(jQuery(this).hasClass('sview-inul')) return false;
        return jQuery(this).children('li:not(.mdrop-menu)').filter(':has(a.seach-notmatch-menu)').length === jQuery(this).children('li:not(.mdrop-menu)').length;
    }).parent().addClass('hiddenMobileMenu');

    // Handle Other Parts Menu separately
    jQuery('.level0 .sview-inul').filter(function(){
        return jQuery(this).find('li a.seach-match-menu').length == 0;
    }).parent().addClass('hiddenMobileMenu');
    
    jQuery('.other-parts .level0').filter(function(){
        var sViewMenu = jQuery(this).find('.sview-allmenu>ul>li').length;
        var hidesViewMenu = jQuery(this).find('.sview-allmenu>ul>li.hiddenMobileMenu').length;
        if(sViewMenu === hidesViewMenu){
            jQuery(this).find('.sview-allmenu').addClass('hiddenMobileMenu');
        }
        return jQuery(this).children('li.hiddenMobileMenu').length === jQuery(this).children('li').length;
    }).parent().addClass('hiddenMobileMenu');

    // Hide the category if no result found in sub menus.
    jQuery('.level0').filter(function() {
        return jQuery(this).children('li.hiddenMobileMenu').length === jQuery(this).children('li').length;
    }).parent().addClass('hiddenMobileMenu');

    jQuery('.accessories-sub-detail').each(function() {
        var dataTitle = jQuery(this).data('title');
        if (dataTitle && dataTitle.toLowerCase().includes(search_val.toLowerCase())) {
            jQuery(this).addClass('active');
        }else{
            jQuery(this).removeClass('addClass');
        }

    });

    jQuery(".seach-notmatch-menu").each(function() {
        jQuery(this).parent('ul').hide();
        if(jQuery(this).parent('ul').parent('li').hasClass('mnav-open')){
            if(jQuery(this).parent('ul').parent('li').removeClass('mnav-open li-hover'));
        }
    });

    if(element.value == ""){
        jQuery('.hiddenMobileMenu').removeClass('hiddenMobileMenu');
        jQuery('.seach-notmatch-menu').show();
        jQuery('.level0 li .submenu li a,.level0 li ul li a').removeClass("seach-match-menu");
        jQuery('.level0 li .submenu li ul li .submenu li a').removeClass("seach-match-menu");
        jQuery(".mobile-nav li ul").removeClass("mnav-open");
        jQuery(".mobile-nav li").removeClass( "mnav-open li-hover");
        jQuery(".mobile-nav li ul li").removeClass("mnav-open");
        jQuery("input[name=menusearch]").val('').focus();
        jQuery("input[name=menusearch]").trigger('keyup');
        jQuery("input[name=menusearch]").trigger('input');
        jQuery("input[name=menusearch]").selectRange();
        // Show The Pre-Owned Devices Menu when not search anything.
        jQuery('#ms-mobilemenu .devicemainmenu').show();
        jQuery(document).find('.accessories-sub-detail').show();
        jQuery('.accessories-sub-detail').removeClass('active');
    }

    jQuery('.hiddenMobileMenu').removeClass('hiddenMobileMenu');
}

jQuery(document).ready(function(){
    jQuery('#nav-mobile .other-parts ul li .sview-inul').addClass('submenu');
    jQuery('.tools-accessories').on('click', function(event){
        jQuery('.tools-accessories>ul>li>ul').css({ display: "block" });
    });
    jQuery('.other-parts>ul>li>a').on('click',function(event){
        jQuery('.other-parts>ul>li>ul>li>ul').css({ display: "block" });
    });
    jQuery('.aicon-sothers').on('click',function(){
        jQuery('.aicon-sothers>.submenu>.mdrop-menu').removeClass("seach-match-menu");
        jQuery('.aicon-sothers>.submenu>.mdrop-menu').removeClass("seach-notmatch-menu");
    });
    jQuery('.aicon-motoothers').on('click',function(){
        jQuery('.aicon-motoothers>.submenu>.mdrop-menu').removeClass("seach-match-menu");
        jQuery('.aicon-motoothers>.submenu>.mdrop-menu').removeClass("seach-notmatch-menu");
    });
    jQuery('.aicon-lgothers').on('click',function(){
        jQuery('.aicon-lgothers>.submenu>.mdrop-menu').removeClass("seach-match-menu");
        jQuery('.aicon-lgothers>.submenu>.mdrop-menu').removeClass("seach-notmatch-menu");
    });
    jQuery('.aicon-bcomponent').on('click',function(){
        jQuery('.aicon-bcomponent>.submenu>.mdrop-menu').removeClass("seach-match-menu");
        jQuery('.aicon-bcomponent>.submenu>.mdrop-menu').removeClass("seach-notmatch-menu");
    });
    jQuery('.aicon-bothers').on('click',function(){
        jQuery('.aicon-bothers>.submenu>.mdrop-menu').removeClass("seach-match-menu");
        jQuery('.aicon-bothers>.submenu>.mdrop-menu').removeClass("seach-notmatch-menu");
    });

    jQuery('.aicon-rothers').on('click',function(){
        jQuery('.aicon-rothers>.submenu>.mdrop-menu').removeClass("seach-match-menu");
        jQuery('.aicon-rothers>.submenu>.mdrop-menu').removeClass("seach-notmatch-menu");
    });
    jQuery('.tools-accessories').on('click',function(){
        jQuery('.tools-accessories>ul>li>ul>li').removeClass("seach-match-menu");
        jQuery('.tools-accessories>ul>li>ul>li').removeClass("seach-notmatch-menu");
    });
    jQuery('.aicon-sothers>.submenu>li>a').on('click',function(event){
        jQuery('.aicon-sothers .submenu').css({ display: "block" });
        jQuery(this).closest('.mdrop-menu-inner').css({ display: "block" });
        jQuery('.aicon-sothers>ul>li>ul>li>ul').css({ display: "block" });
    });
    jQuery('.aicon-motoothers>.submenu>li>a').on('click',function(event){
        jQuery('.aicon-motoothers .submenu').css({ display: "block" });
        jQuery(this).closest('.mdrop-menu-inner').css({ display: "block" });
        jQuery('.aicon-motoothers>ul>li>ul>li>ul').css({ display: "block" });
    });
    jQuery('.aicon-lgothers>.submenu>li>a').on('click',function(event){
        jQuery('.aicon-lgothers .submenu').css({ display: "block" });
        jQuery(this).closest('.mdrop-menu-inner').css({ display: "block" });
        jQuery('.aicon-lgothers>ul>li>ul>li>ul').css({ display: "block" });
    });
    jQuery('.aicon-bcomponent>.submenu>li>a').on('click',function(event){
        jQuery('.aicon-bcomponent .submenu').css({ display: "block" });
        jQuery(this).closest('.mdrop-menu-inner').css({ display: "block" });
        jQuery('.aicon-bcomponent>ul>li>ul>li>ul').css({ display: "block" });
    });
    jQuery('.aicon-bothers>.submenu>li>a').on('click',function(event){
        jQuery('.aicon-bothers .submenu').css({ display: "block" });
        jQuery(this).closest('.mdrop-menu-inner').css({ display: "block" });
        jQuery('.aicon-bothers>ul>li>ul>li>ul').css({ display: "block" });
    });

    jQuery('.aicon-rothers>.submenu>li>a').on('click',function(event){
        jQuery('.aicon-rothers .submenu').css({ display: "block" });
        jQuery(this).closest('.mdrop-menu-inner').css({ display: "block" });
        jQuery('.aicon-rothers>ul>li>ul>li>ul').css({ display: "block" });
    });
  
    jQuery('.tools-accessories2>ul>li>a').on('click',function(event){
        jQuery(this).siblings('.sview-inul').children('li').children('.sview-ulimg').css({ background: "",display: "block" });
    });

    jQuery('.aicon-essentials>ul>li>a').on('click',function(event){
        jQuery(this).siblings('ul').children('li').children('.submenu').css({ background: "",display: "block" });
    });
    // menu hover open menu list
    jQuery('.ms-menucontainer #nav>li').off('click').on('click',function(event){
        if(jQuery('#repairmenu').length > 0 ){
            var menuArray = jQuery('#repairmenu').val().split(",");
        }
        if (jQuery(this).find('.level0').length == 0) {
            jQuery('.ms-container>#nav>li>.level0').remove();
            var indexPoint = jQuery(this).index();
            jQuery('.ms-container>#nav>li').each(function(){
                if(jQuery(this).index() in menuElementsArray){
                    if (indexPoint == jQuery(this).index()) {
                        if(menuElementsArray[jQuery(this).index()]){
                            jQuery(this).append("<ul class='level0'><div class='main-menu-head'><div class='menu-search-part'><div class='serch-box-new'><button></button><input type='text' value='"+ oldseach +"' name='menusearch' class='search-txt-box' id='myInput' onkeyup='menuSeaching(this)'  placeholder='"+Translator.translate('What are you looking for?')+"' autocomplete='off'><button class='subtract-btn menu-reset-searching'></button></div></div><div class='menu-image-part'><a href='javascript:void(0);'></a></div><div class='new-img-class'></div><div class='horizontal-black-line'></div></div>"+menuElementsArray[jQuery(this).index()].innerHTML+'<ul>');
                        }
                    } else {
                        if(menuElementsArray[jQuery(this).index()]){
                            jQuery(this).append("<ul class='level0'>"+menuElementsArray[jQuery(this).index()].innerHTML+'<ul>');
                        }
                    }
                }
                
            });
            jQuery("input[name=menusearch]").val(oldseach).focus();
            jQuery("input[name=menusearch]").selectRange(oldseach.length);
        }
        jQuery('.ms-menucontainer #nav>li.other-parts>ul.level0').addClass('slayouts-menu');
        jQuery('.ms-menucontainer #nav>li.tools-accessories2>ul.level0').addClass('slayouts-menu');
        if(jQuery(this).hasClass('li-hover')){
            jQuery("input[name=menusearch]").val(oldseach).focus();
            jQuery("input[name=menusearch]").selectRange(oldseach.length);
            return true;
        }
        jQuery('.ms-menucontainer #nav>li').attr("aria-hidden","false");
        jQuery(this).attr("aria-hidden","true");
        var headerheight = jQuery(this).closest(".ms-header").height();
        var screenheight = jQuery(document).height();
        var mnuheight = jQuery(this).parent().parent().parent().height();
        var windoweqheight = (screenheight - headerheight - mnuheight);
        if(jQuery(this).parent().parent().parent().hasClass("sticky-nav-1")){
           jQuery("#mmfilter_overleys").show().css("top",+(headerheight + mnuheight)+"px").css("height",+windoweqheight+'px');
        }else{
           jQuery("#mmfilter_overleys").show().css("top",+headerheight+"px").css("height",+windoweqheight+'px');
        }
        jQuery('.li-hover').removeClass('li-hover');        
        jQuery(this).addClass('li-hover');
        jQuery(this).find(".main-menu-head").remove();
        if(jQuery(this).find(".level0 .main-menu-head").length == 0){
            var OldHTML = jQuery(this).find(".level0").html();
            jQuery(this).find(".level0").html("<div class='main-menu-head'><div class='menu-search-part'><div class='serch-box-new'><button></button><input type='text' value='"+ oldseach +"' name='menusearch' class='search-txt-box' id='myInput' onkeyup='menuSeaching(this)' placeholder='"+Translator.translate('What are you looking for?')+"' autocomplete='off'><button class='subtract-btn menu-reset-searching'></button></div></div><div class='menu-image-part'><a href='javascript:void(0);'></a></div><div class='new-img-class'></div><div class='horizontal-black-line'></div></div>"+OldHTML);
            jQuery("input[name=menusearch]").val(oldseach).focus();
            jQuery("input[name=menusearch]").selectRange(oldseach.length);
        }
        jQuery('.level0 .li-hover').removeClass('li-hover');
        jQuery('.m-overflows').each(function(index, currentElement) {
            var scrollele = jQuery(this).find('li .seach-match-menu').parent()[0];
            if(jQuery(scrollele).parents('.m-overflows').length){
                jQuery(this).animate({scrollTop: jQuery(scrollele).offset().top - jQuery(scrollele).parents('.m-overflows').offset().top }, "slow");
            }

            });
        var search_val = jQuery('.search-txt-box');
        jQuery('.sview-seebtn,.sview-seebtn a,.sview-title a').removeClass('seach-notmatch-menu');
        if((jQuery('.li-hover').hasClass('other-parts') || jQuery('.li-hover').hasClass('tools-accessories2')) && search_val.length != 0){
            jQuery('.li-hover>.level0>li[class!="sview-allmenu"]').removeClass('seach-notmatch-menu');
            jQuery('.li-hover>.level0>li[class!="sview-allmenu"]').each(function(index, currentElement) {
                var element = jQuery(currentElement).find('li .seach-match-menu').parent()[0];
                if(jQuery(element).parent().parent().parent().parent().length){
                    jQuery(element).parent().parent().parent().parent().removeClass('seach-notmatch-menu');
                }else{
                    var label = jQuery(currentElement).attr('aria-labelledby');
                    jQuery('a[aria-label="'+label+'"]').removeClass('seach-notmatch-menu');
                }
            });
        }
        jQuery('.country-container,.cutoff-times-block').addClass('no-visible');
        if(menuArray){
            for (var i = 0; i < menuArray.length; i++) {
                if (menuArray[i] && jQuery("a[href='"+menuArray[i]+"']").length) {
                    jQuery("a[href='"+menuArray[i]+"']").addClass('repairlink');
                }
            }
        }
        var len = jQuery(this).find('.repairlink').length;
        if(len > 0){
            jQuery(this).find('.moto-alert').remove();
            jQuery(this).find('ul:last').append('<span class="moto-alert">'+Translator.translate('<b>* Disclaimer:</b> Right to repair laws are applicable to all models highlighted in blue.')+'</span>');
        }

        // Accessories tab JS start.
        jQuery(document).on('click', '.accessories-tabs-nav a', function() {
            var parent = jQuery(this).parent();
            var isNotMatchMenu = jQuery(this).hasClass('seach-notmatch-menu');
            if (isNotMatchMenu && parent.hasClass('active')) {
                let targetId = jQuery(this).data('target');
                jQuery('.accessories-content .tab-display').parent('.accessories-sub-detail').hide();
                jQuery('#' + targetId).show();
            } else if (isNotMatchMenu && !parent.hasClass('active')) {
                return false
            } else{
                let targetId = jQuery(this).data('target');
                jQuery('.accessories-content .tab-display').parent('.accessories-sub-detail').hide();
                jQuery('#' + targetId).show();
                jQuery('.accessories-tabs-nav li').removeClass('active');
                parent.addClass('active');
            }
        });
        // Accessories tab End.
        
    });
    jQuery(document).on('click', function (e) {
        if (jQuery(e.target).closest(".ms-menucontainer").length === 0) {
            jQuery(".ms-container #nav>li").removeClass('li-hover');
            jQuery(".ms-menucontainer #nav>li").attr("aria-hidden","false");
            jQuery("#mmfilter_overleys").hide().css("top","inherit").css("height","auto");
            jQuery('.ms-container>#nav>li>.level0').remove();
        }
    });

    jQuery('#nav-mobile li.other-parts').each(function() {
        if(jQuery(this).find('ul').length > 0) {
            jQuery(this).addClass('has-submenu').removeClass('no-submenu');
        }else{
            jQuery(this).addClass('no-submenu').removeClass('has-submenu');
        }
    });
});

jQuery(document).on('DOMSubtreeModified','.cart-m-wrapper .block-cart', function() {
    var cartQty = 0;
    jQuery('.cart-m-wrapper .block-cart').each(function(){
        cartQty += parseInt(jQuery(this).find('a span.no-login-cart').text());
    });
    var prevQty = parseInt(jQuery('a.ap-cart-640 .sp-count').text());
    if (prevQty != cartQty) {
        jQuery('.ap-cart-640 .sp-count').text(cartQty);
    }
})
jQuery(document).on('mouseover', '.hover-show-img li a', function() {
    jQuery('.img-box-m[alt="' + jQuery(this).attr("title") + '"]').css( "opacity", "1" );
});

jQuery(document).on('mouseout', '.hover-show-img li a', function() {
    jQuery('.img-box-m[alt="' + jQuery(this).attr("title") + '"]').css( "opacity", "0" );
});


jQuery(document).on('mouseover', '.level0 li', function() {
    if(jQuery(this).hasClass('sview-allmenu')){
        jQuery(this).show();
    }else{
        jQuery('.level0 .sview-allmenu').hide();
    }
});

jQuery(document).on('mouseout', '.level0 li', function() {
    if(jQuery(this).hasClass('sview-allmenu')){
        jQuery(this).hide();
    }else{
        jQuery('.level0 .sview-allmenu').show();
    }
});

jQuery(document).on('mouseover', '.hover-show-img a', function() {
    var image = jQuery(this).closest('li').data('hover-image'); // Correctly retrieve the data-hover-image attribute
    if (image) {
        var sviewUl = jQuery(this).closest('ul.sview-inul');
        jQuery(sviewUl).find('.hover-image').remove(); // Remove any existing hover-image
        sviewUl.append('<li class="svireew-row hover-image"><img class="hover-image" src="' + image + '" alt="Hover Image" /></li>'); // Append the image
    }
});

jQuery(document).on('mouseout', '.hover-show-img a', function() {
    var sviewUl = jQuery(this).closest('ul.sview-inul');
    jQuery(sviewUl).find('.hover-image').remove(); // Remove the hover image on mouseout
});

// seach box coursor set at end of character
jQuery.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if(this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};
// seachbox value reset
jQuery(document).on("click", ".menu-reset-searching", function(){
    jQuery('.level0 li .submenu li a,.level0 li ul li a').removeClass("seach-match-menu");
    jQuery('.level0 li .submenu li ul li .submenu li a').removeClass("seach-match-menu");
    jQuery(".mobile-nav li ul").removeClass("mnav-open");
    jQuery(".mobile-nav li").removeClass( "mnav-open li-hover");
    jQuery(".mobile-nav li ul li").removeClass("mnav-open");
    jQuery('.seach-notmatch-menu').show();
    jQuery("input[name=menusearch]").val('').focus();
    jQuery("input[name=menusearch]").trigger('keyup');
    jQuery("input[name=menusearch]").trigger('input');
    jQuery("input[name=menusearch]").selectRange();
});
// menu seaching funcationity logic End
//staymobile home page change end
var date = new Date();
date.setTime(date.getTime() + (1*24*60*60*1000));
expires = "; expires=" + date.toUTCString();
document.cookie = "c2NyZWVud2lkdGg=" + window.screen.width + expires + "; path=/;secure";
document.cookie = "frontend=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

// Header Country Elements Loads When Click

jQuery(document).ready(function(e) {
    var countryId = jQuery(document).find('#country_id_hidden').val();
    var popupText = '';
    if (countryId == 'GB') {
        popupText = 'MobileSentrix UK';
    } else if (countryId == 'CA') {
        popupText = 'MobileSentrix CA';
    } else if (countryId == 'NL') {
        popupText = 'MobileSentrix Europe';
    }
    
    jQuery(document).on("click", '.country-picker>a', function(){
        jQuery(this).toggleClass('country-open');
        var popupCountryElement = jQuery('.country-picker .country-container'); 
        var ukHtml = '';
        var caHtml = '';
        var euHtml = '';
        if (countryId == 'GB') {
            var ukHtml = "<li class='cs-uk'><input type='radio' name='country-selection' id='uk-2'><label aria-label='Canada country-image' for='uk-2'></label><span>"+Translator.translate('UK')+"</span></li>";
        }
        if (countryId == 'CA') {
            var caHtml = "<li class='cs-can'><input type='radio' name='country-selection' id='can-2'><label aria-label='Canada country-image' for='can-2'></label><span>"+Translator.translate('Canada')+"</span></li>";
        }

        if (countryId == 'NL') {
            var euHtml = "<li class='cs-nl'><input type='radio' name='country-selection' id='nl-2'><label aria-label='EU country-image' for='nl-2'></label><span>"+Translator.translate('EU')+"</span></li>";
        }

        var countryPopupData = "<div class='country-container no-visible' aria-describedby='ca-country-selection'><p>"+Translator.translate('You are shopping on')+" <span>"+Translator.translate(popupText)+"</span><div style='display:none;'><ul class='country-ul'><li><input type='radio' name='country' id='Eng-en'><label for='Eng-en'>"+Translator.translate('English - EN')+"</label></li><li><input type='radio' name='country' id='Eng-es'><label for='Eng-es'>"+Translator.translate('English - ES')+"</label></li><li><input type='radio' name='country' id='Eng-fr'><label for='Eng-fr'>"+Translator.translate('English - FR')+"</label></li></ul></div><h5>"+Translator.translate('Change Warehouse')+"</h5><ul class='choose-country'><li class='cs-usa'><input type='radio' name='country-selection' id='usa-1'><label aria-label='USA country-image' for='usa-1'></label><span>"+Translator.translate('USA')+"</span></li>"+caHtml+ukHtml+euHtml+"</ul><p class='cs-note'>"+Translator.translate('NOTE: Changing the country / region may affect factors such as pricing, shipping options and product availability.')+"</p><div class='checkbox-cn'><input type='checkbox' value='preffered_wharehouse' name='preffered_wharehouse' id='iuse'><label for='iuse'>"+Translator.translate('Use this as my preferred warehouse')+"</label></div><div class='clear'></div><button class='confirm_cbutton_header' disabled>"+Translator.translate('Confirm')+"</button></div>";

        if(typeof popupCountryElement != 'undefined' && popupCountryElement.length) {
         jQuery('.country-picker .country-container').remove();
        }
        else {
            jQuery(this).after(countryPopupData);
        }
        jQuery(this).parent().find(".country-container").toggleClass("no-visible");
        if (jQuery(this).parent().hasClass('hide')) {
            jQuery(this).parent().addClass('us-warehouse');
            jQuery(this).parent().removeClass('hide');
        }
    });
});

if ('NodeList' in window) {
    if (!NodeList.prototype.each && NodeList.prototype.forEach) {
        NodeList.prototype.each = NodeList.prototype.forEach;
    }
}
var loginWidgetId;
var onloadCallbackLogin = function() {
    if (jQuery(document).find('#siteKeyV2invisible_loginPopup').length) {
        var siteKeyV2invisibleQo = jQuery(document).find('#siteKeyV2invisible_loginPopup').val();
        try {
            var targetElement = document.getElementById('g-recaptcha-element-loginPopup');
            if (!targetElement.hasChildNodes()) {
                loginWidgetId = grecaptcha.render('g-recaptcha-element-loginPopup', {
                'sitekey': siteKeyV2invisibleQo,
                'size': 'invisible',
                'callback': loginPopCheckAuth
            });
        }

        }catch (error) {
            console.log("Error rendering reCAPTCHA: ", error);
        }
    }
};

jQuery(document).on('click', '.loginCaptcha', function(event) {
    event.preventDefault();
    if (jQuery(document).find('#siteKeyV2invisible_loginPopup').length) {
        grecaptcha.execute(loginWidgetId);
    } else {
        loginPopCheckAuth();

    }
});

function loginPopCheckAuth() {
    if (jQuery(document).find('#siteKeyV2invisible_loginPopup').length) {
        grecaptcha.reset(loginWidgetId);
    }
    if(jQuery("#msloginform").children().length == 0){
        jQuery('#login-form').submit();
    }
    else if(jQuery("#msloginform").children().length > 0){
        loginPopupAjax();
    }
}

        
function loginPopupAjax(){
    jQuery('#lcd-buyback').show().css('z-index',100000000);
    if (jQuery('#loginemail').val() == '' || jQuery('#loginpassword').val() == '') {
        jQuery(document).find('.loginpop-error').html(Translator.translate('Please enter proper login details')).show();
        jQuery('#lcd-buyback').hide();
        setTimeout(function(){
            if(jQuery(document).find('.loginpop-error')){
            jQuery(document).find('.loginpop-error').html('').hide();
            }
        },10000);
        return false;
    } else {
        var logInAction = jQuery('form#ms-customerLoginPopupform').attr('action');
        var loginFormData = jQuery('form#ms-customerLoginPopupform').serializeArray().reduce(function(obj, item) {
        if(item.name == "useremail" || item.name == "userpassword"){
        obj[item.name] = btoa(encodeURIComponent(item.value));
        }else {
        obj[item.name] = item.value;
        }
        return obj;
        },{});
        jQuery.ajax({
        type      :   'POST',
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + encryptionKey);
        },
        cache     :   false,
        dataType  :   "json",
        data      :   loginFormData,
        url       :   logInAction,
        success :   function(returndata) {
            if(returndata.status == 'ERROR'){
            if(returndata.updateFk && returndata.updateFk != ''){
                jQuery(document).find('#ms-customerLoginPopupform-fk').val(returndata.updateFk);
            }
            if(returndata.redirectUrl){
                window.location.href = returndata.redirectUrl;
            }else{
                if(returndata.loginAttemptCount == 1)
                {

                    jQuery(document).find('.warning-msg .alert-message').html(`
                        <h3 class="warring">${returndata.error}</h3><p>We\'ve noticed unsuccessful login attempts to your account. After three failed attempts, your account will be locked for security. <br><br>Avoid this by using the <b>"Forgot Password"</b> option to reset your credentials. For further help, contact our <a href="javascript:;" class="contact-reamaze">customer support team</a>.</p>`);
                    jQuery(document).find('.warning-msg').show();
                    jQuery('#lcd-buyback').hide();
                    jQuery(document).find('.login-deatils-wrapper').hide();
                    jQuery(document).find('.loginpop-error').hide();
                }else if(returndata.loginAttemptCount >= 3)
                {
                    jQuery(document).find('.alert-popup-message').html('<div class="alert-popup-message-inner"><h3 class="error">'+returndata.error+'</h3><p>Your account is locked for your security. Please <a href="javascript:;" class="contact-reamaze">contact our customer support</a> for assistance. During this time, you will not be able to log in.</p></div>').show();
                    jQuery('#lcd-buyback').hide();
                    jQuery('.login-popup-wrapper').remove();
                    jQuery(document).find('.loginpop-error').hide();
                }else{
                    jQuery(document).find('.loginpop-error').html(returndata.error).show();
                    jQuery('#lcd-buyback').hide();
                    setTimeout(function(){
                    jQuery(document).find('.loginpop-error').html('').hide();
                    },10000);
                }  
                return false;
            }
            }else if(returndata.status == 'SUCCESS'){
            if(jQuery(document).find('.loginpop-error')){
                jQuery(document).find('.loginpop-error').html('').hide();
                jQuery(document).find('.loginpop-success').html(returndata.error).show();
            }
            if(typeof reviewurl !== 'undefined'){
                if(reviewurl.includes("refererurl") == true){
                window.location.href = window.location.href ;
            }else{
                window.location.href = returndata.redirectUrl;
            }
            }
            else{
                window.location.href = returndata.redirectUrl;
            }
            debugger;
            
            }
        },
        error   :   function(jqXHR, textStatus, errorThrown){
             // You can get the error response text from jqXHR
            var errorMessage = jqXHR.responseText || 'An error occurred. Please try again later.';
            jQuery(document).find('.loginpop-error').html(errorMessage).show();
            jQuery('#lcd-buyback').hide();
            setTimeout(function(){
            jQuery(document).find('.loginpop-error').html('').hide();
            },10000);
            return false;
        }
        });
    }
}
jQuery(document).off('click', ".back_btn").on('click', ".back_btn", function(){
    jQuery(document).find('.login-deatils-wrapper').show();
    jQuery(document).find('.warning-msg').hide();
    jQuery(document).find('.warning-msg .alert-message').html('')

})

//Expresscheckout manage if all profile disabled or not then redirect.
jQuery(document).ready(function() {
    jQuery(document).off('click', ".expresscheckout").on('click', ".expresscheckout", function(){
        jQuery('#exp-shipping-address, #exp_add_to_previous').niceSelect('destroy');
        jQuery("#exp-shipping-address, #exp_add_to_previous").val('');
        jQuery('#exp-shipping-address, #exp_add_to_previous').niceSelect();
        jQuery("#primary-ship-method, .exp_pre_shipping").hide();
        jQuery('#btn_save_to_quote').addClass('btn-disabled');
        jQuery('#checkoutloader').show();
        jQuery.ajax({
            type: 'POST',
            beforeSend: function(request) {
                request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptycheckProfileExist);
            },
            url: checkProfileExist,
            data: 'form_key=' + FORM_KEY,
            success: function(returndata) {
                jQuery('#checkoutloader').hide();
                var data = jQuery.parseJSON(returndata);
                if(data.status == 1){
                    jQuery("#ship-add-error-message").text('').hide();
                    jQuery('.express-checkout-shipping').show();  
                    var optionsHtml = '';
                    optionsHtml += '<option value="">'+Translator.translate('Select a shipping address')+'</option>';
                    data.shippingData.forEach(function(option) {
                            optionsHtml += '<option value="' + option.value + '"'
                                + ' data-shipmethodname="' + option.shipMethodName + '"'
                                + ' data-profileid="' + option.profileId + '"'
                                + ' data-shipmethod="' + option.shipMethod + '">'
                                + option.addressData
                                + '</option>';
                        });
                        jQuery('#exp-shipping-address').niceSelect('destroy');
                        jQuery('#exp-shipping-address').html(optionsHtml);
                        jQuery('#exp-shipping-address').niceSelect();                
                                    
                    return;
                }else if(data.redirectUrl == 'home'){
                    jQuery('#setup-express-checkout-button').hide();
                    jQuery('.express-checkout-popup,#setup-express-checkout-button-home').show();
                    return;
                }else{
                    jQuery('.express-checkout-popup,#setup-express-checkout-button').show();
                    jQuery('#setup-express-checkout-button-home').hide();
                    return;
                }
            },
            error: function() {
                jQuery('#checkoutloader').hide();
                jQuery('#common-error-message').text(Translator.translate('Error in check profile exist.'));
                return;
            }
        });
    });
});

//Expresscheckout redirect to address page.
jQuery(document).off('click','#setup-express-checkout-button').on('click','#setup-express-checkout-button',function(){        
    jQuery.ajax({
        url: getAddress,  // Replace with your server endpoint
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptygetAddress);
        },
        type: 'POST',
        data: 'form_key=' + FORM_KEY,
        success: function(returndata) {
            var response = jQuery.parseJSON(returndata);
            if (response.redirectUrl && response.newContent) {
                window.location.href = response.redirectUrl;
                sessionStorage.setItem('newContent', response.newContent);
            } 
        },
        error: function() {
            jQuery('#checkoutloader').hide();
            jQuery('.checkout-common-popup').show();
            jQuery('#common-error-message').text(Translator.translate('Error in getting address.'));
            return;
        }
    });
});

jQuery(document).ready(function(e) {
    const newContent = sessionStorage.getItem('newContent');
    if (newContent) {
        jQuery('.express-checkout-main').html(newContent);
        jQuery('#btn-next-shipping').addClass('btn-disabled');
        sessionStorage.removeItem('newContent');  // Clear the stored content
    }
});

jQuery(document).on('click', '.express-checkout-shipping .close-btn', function(){
    jQuery('.express-checkout-shipping').hide();
    jQuery("#ship-add-error-message").text('').hide();
    jQuery('#exp-shipping-address, #exp_add_to_previous').niceSelect('destroy');
    jQuery("#exp-shipping-address, #exp_add_to_previous").val('');
    jQuery('#exp-shipping-address, #exp_add_to_previous').niceSelect();
});

function hideInternationShippingPopup(){
    jQuery("#international-shipping-method").hide();
    if(jQuery('#international-shipping-method').hasClass('exp-checkout')){
        jQuery('#international-shipping-method').removeClass('exp-checkout');
        jQuery('.express-checkout-shipping').show();
    }
}


jQuery(document).on('click', '.express-checkout-popup .close-btn', function(){
    jQuery('.express-checkout-popup').hide();
});

// Expresscheckout redirect to profile home page.
jQuery(document).off('click','#setup-express-checkout-button-home').on('click','#setup-express-checkout-button-home',function(){        
    jQuery.ajax({
        url: getProfile,  // Replace with your server endpoint
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptygetProfile);
        },
        type: 'POST',
        data: 'form_key=' + FORM_KEY,
        success: function(returndata) {
            jQuery('.express-checkout-popup-home').hide();
            if (returndata.currentUrl) {
                window.location.href = returndata.currentUrl;
            } 
        },
        error: function() {
            jQuery('#checkoutloader').hide();
            jQuery('.checkout-common-popup').show();
            jQuery('#common-error-message').text(Translator.translate('Error in getting address.'));
            return;
        }
    });
});

// Expresscheckout onchange shipping display add to existing orders.
jQuery(document).off('change','#exp-shipping-address').on('change','#exp-shipping-address',function(){
    jQuery(".exp_pre_shipping").hide();
    jQuery("#checkoutloader").show();
    jQuery('#exp_add_to_previous').html('');
    var shippingId      = jQuery('#exp-shipping-address').val();
    var selected        = jQuery(this).find(':selected');
    var shippingmethod  = selected.data('shipmethodname');

    var shippingmethodCode = selected.data('shipmethod');

    if(!shippingId){
        jQuery('#checkoutloader').hide();
        jQuery('#btn_save_to_quote').addClass('btn-disabled').removeClass('btn-primary');
         jQuery("#primary-ship-method").hide();
        return;
    }
    jQuery.ajax({
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptycheckaddtoexistorder);
        },
        url: expAddtoExistOrder,
        data: 'form_key=' + FORM_KEY + '&shipping_Id=' + shippingId + '&shippingmethod=' + shippingmethodCode,
        success: function(returndata) {
            jQuery('#checkoutloader').hide();
            const optionsArray = jQuery.parseJSON(returndata);
            
            
            if (! optionsArray.status) {
                if(optionsArray.productList){
                    var popuphtml = '';
                    popuphtml += '<ul class="international-table-header">';
                        popuphtml += '<li class="g-product-name">';
                            popuphtml += '<span>Product Name</span>';
                        popuphtml += '</li>';
                        popuphtml += '<li class="g-product-sku">';
                            popuphtml += '<span>SKU</span>';
                        popuphtml += '</li>';
                        popuphtml += '<li class="g-product-qty">';
                            popuphtml += '<span>Qty</span>';
                        popuphtml += '</li>';
                    popuphtml += '</ul>';


                    jQuery.each(optionsArray.productList, function(index, product) {
                        popuphtml += '<ul>';
                            popuphtml += '<li class="g-product-name">';
                                popuphtml += '<span class="flex-name">Product Name</span>';
                                popuphtml += '<p>'+product.name+'</p>';
                            popuphtml += '</li>';
                            popuphtml += '<li class="g-product-sku">';
                                popuphtml += '<span class="flex-name">SKU</span>';
                                popuphtml += '<p class="df-color">'+product.sku+'</p>';
                            popuphtml += '</li>';
                            popuphtml += '<li class="g-product-qty">';
                                popuphtml += '<span class="flex-name">Qty</span>';
                                popuphtml += '<p>'+product.qty+'</p>';
                            popuphtml += '</li>';
                        popuphtml += '</ul>';
                    });
                    jQuery('.express-checkout-shipping').hide();
                    jQuery('#international-shipping-method').addClass('exp-checkout').show();
                    jQuery('#internationalTable').html(popuphtml);
                    jQuery('#internationalErrorMsg').text(optionsArray.message);
                }else{
                    jQuery('#ship-add-error-message').text(Translator.translate(optionsArray.message)).show();
                    jQuery('#btn_save_to_quote').addClass('btn-disabled').removeClass('btn-primary');
                    jQuery("#primary-ship-method").hide();
                    jQuery("#primary-ship-method span").html('');
                    jQuery(".exp_pre_shipping").hide();
                    jQuery('#exp_add_to_previous').html('');
                }
            }else{
                jQuery('#ship-add-error-message').text('').hide();
                if(shippingId){
                    jQuery('#btn_save_to_quote').removeClass('btn-disabled').addClass('btn-primary');
                }else{
                    jQuery('#btn_save_to_quote').addClass('btn-disabled').removeClass('btn-primary');
                }
                jQuery("#primary-ship-method").show();
                if(shippingmethod){
                    jQuery("#primary-ship-method span").html(shippingmethod);
                }
                if(optionsArray.orders && optionsArray.orders.length != 0){
                    jQuery(".exp_pre_shipping").show();

                    jQuery('#exp_add_to_previous').append('<option value="">'+Translator.translate('Please select previous order')+'</option>');
                    jQuery.each(optionsArray.orders, function(index, option) {
                        jQuery('#exp_add_to_previous').append(jQuery('<option>', {
                            value: index,
                            text: option.increment_id + ' (' +option.label + ')'
                        }));
                        jQuery('#exp_add_to_previous').niceSelect('destroy');
                        jQuery('#exp_add_to_previous').niceSelect();
                    });
                        
                }
                    
            }
        },
        error: function() {
            jQuery('#checkoutloader').hide();
            jQuery('#common-error-message').text(Translator.translate('Error in check profile exist.'));
            return;
        }
    });
});


// Expresscheckout onclick button validate and save data to qoute.
jQuery(document).off('click','#btn_save_to_quote').on('click','#btn_save_to_quote',function(){
    jQuery(".exp_pre_shipping").hide();
    jQuery("#checkoutloader").show();
    var profileId        = jQuery("#exp-shipping-address").find(':selected').data('profileid');
    var parentOrder     = '';
    if(jQuery("#exp_add_to_previous").val()){
        parentOrder = jQuery("#exp_add_to_previous").val();
    }

    jQuery.ajax({
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptysavetoquote);
        },
        url: savetoquote,
        data: 'form_key=' + FORM_KEY + '&profile_id=' + profileId + '&parentOrder=' + parentOrder,
        success: function(returndata) {
            var obj = jQuery.parseJSON(returndata);
            if(obj.status){
                window.location.href = obj.redirectUrl;
            } else {
                jQuery('#checkoutloader').hide();
                jQuery('.checkout-common-popup').show();
                jQuery('#common-error-message').text(obj.message);
                return;        
            }
        },
        error: function() {
            jQuery('#checkoutloader').hide();
            jQuery('.checkout-common-popup').show();
            jQuery('#common-error-message').text(Translator.translate('Error in check profile exist.'));
            return;
        }
    });
});

// Add TO Existing option change
jQuery(document).off('change', '#exp_add_to_previous').on('change', '#exp_add_to_previous', function() {
    var orderId = jQuery(this).val().trim();
    if (orderId != '' && !orderId.match(/^\d+$/)) {
        jQuery('#exp_add_to_previous').prop('selected', false);
        jQuery('#exp_add_to_previous').val('');
        jQuery('.checkout-common-popup').show();
        jQuery('#common-error-message').text(Translator.translate('Selected order is invalid'));
        return false;
    } else if (orderId) {
        jQuery('#checkoutloader').show();
        jQuery.ajax({
            type: 'POST',
            beforeSend: function(request) {
                request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptytrackOrder);
            },
            url: trackOrder,
            data: 'orderid=' + orderId + '&form_key=' + FORM_KEY,
            success: function(returndata) {
                if (returndata) {
                    var obj = jQuery.parseJSON(returndata);
                    if (!obj.STATUS) {
                        jQuery('#checkoutloader').hide();
                        jQuery('.checkout-common-popup').show();
                        jQuery('#common-error-message').text(obj.MSG);
                        jQuery('#exp_add_to_previous').niceSelect('destroy');
                        jQuery("#exp_add_to_previous").val('');
                        jQuery('#exp_add_to_previous').niceSelect();
                        return false;
                    } else {
                        jQuery('#checkoutloader').hide();
                        jQuery('#primary-ship-method .shipping-method-name').html(Translator.translate('Add To My Existing Order'));
                    }
                } else {
                    jQuery('#checkoutloader').hide();
                }
            },
        });
    } else {
        var shipname = jQuery('#exp-shipping-address').find(':selected').attr('data-shipmethodname');
        jQuery('#primary-ship-method .shipping-method-name').html(shipname);
    }
});
jQuery(document).on("click", '.contact-reamaze', function(){
    jQuery('#lcd-buyback').hide();
    jQuery("#reamaze-widget-icon").trigger("click");
})

jQuery(document).on('change', '#include-vat-checkbox', function(e) {
    e.preventDefault();
    var isVatChecked = 0;
    var vatCheckbox = jQuery(this);
    if (vatCheckbox.length && vatCheckbox.is(':checked')) {
        isVatChecked = 1;
    }
    var isLogin = vatCheckbox.data('login');
    var baseCountryId = vatCheckbox.data('country-id');
    var taxRate = jQuery('#vat_rate').val();
    taxRate = parseFloat(taxRate);

    jQuery('.price-info-span').each(function () {

        var priceText = jQuery(this).text().trim();

        // Match currency + optional space + price
        var match = priceText.match(/^([^\d\s]+|\w{3})(\s?)([\d.,]+)/);
        if (!match) return;

        var currency = match[1];     // e.g., "€" or "HUF"
        var space = match[2];        // " " or ""
        var priceStr = match[3];     // e.g., "3,885.89"

        var hasComma = priceStr.includes(',');

        // Convert to number
        var cleanPrice = priceStr.replace(/,/g, ''); // remove comma
        var price = parseFloat(cleanPrice);

        if(isVatChecked) {
            if(jQuery(this).data('base-price')) {
                price = parseFloat(jQuery(this).data('base-price'));
            }
        } else {
            if(jQuery(this).data('converted-price')){
                price = parseFloat(jQuery(this).data('converted-price'));
            }
        }

        if (isNaN(price)) return;

        // Calculate VAT
        var finalPrice;

        if (isVatChecked) {
            finalPrice = (price + (price * taxRate));
        } else {
            finalPrice = price / (1 + taxRate);
        }
        // Round to exactly 2 decimal places
        jQuery(this).attr('data-converted-price', finalPrice);

        
        if (jQuery('.bcomp-screw-box').length > 0) 
        {
            // Js for board component
            if (jQuery('.bcomp-wrapper').length > 0) 
            {
                var qty = jQuery(this).closest('li').find('.display_qty').text().trim();        
                if(qty > 0)
                {
                    finalPrice = finalPrice * qty;
                    var part = jQuery(this).parent('.price').data('part'); 
                    setTotal(part);
                }
            }
            
            // Js for screw box
            if(jQuery('.screwbox-container').length > 0)
            {
                var qty = jQuery(this).closest('li.screw-li').find('input[name="qtyvalue"]').val();
                if(qty > 0)
                {
                    finalPrice = finalPrice * qty;
                }
            }
        }

        finalPrice = parseFloat(finalPrice).toFixed(2);

        // Add comma back if needed
        if (hasComma) {
            finalPrice = Number(finalPrice).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        jQuery(this).text(currency + space + finalPrice);
    });


    // === Update VAT Label Text (Inc. VAT / Ex VAT)
    var $label = vatCheckbox.closest('.vat-label-group').find('strong');
    if (isVatChecked) {
        $label.text('Inc. VAT');
    } else {
        $label.text('Ex VAT');
    }

    // === Update "Ex. VAT" / "Inc. VAT" label text
    jQuery('.ex-vat').each(function () {
        jQuery(this).text(isVatChecked ? 'Inc. VAT' : 'Ex VAT');
    });

    jQuery.ajax({
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptyvatdata);
        },
        url: setvatdata,
        data: 'vatdata=' + isVatChecked + '&form_key=' + FORM_KEY + '&isLogin=' + isLogin + '&baseCountryId=' + baseCountryId,
    });

    // JS for screw box
    updateScrewboxTotals("front"); 
    updateScrewboxTotals("back");

});

function convertPrice(amount) {
    const locale = jQuery('select[name="language"]').val(); // e.g., en_US
    const currency = jQuery('select[name="currency"]').val(); // e.g., USD, HUF
    const normalizedLocale = locale.replace('_', '-');

    const formatter = new Intl.NumberFormat(normalizedLocale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    const parts = formatter.formatToParts(amount);

    let symbol = '', number = '';
    parts.forEach(part => {
      if (part.type === 'currency') {
        symbol = part.value;
      } else {
        number += part.value;
      }
    });

    // Detect position of symbol in original string
    const formatted = formatter.format(amount);
    const isSymbolFirst = formatted.trim().startsWith(symbol);

    // If symbol is before, return symbol+number (e.g. "$123.00")
    // If symbol is after, return currency code + number (e.g. "HUF 123 000,00")
    return isSymbolFirst ? `${symbol}${number}` : `${currency} ${number}`;
}

function updateScrewboxTotals(side) {

    let totalPrice = 0;
    let container = side === "front" ? "#mylistfront" : "#mylistback";

    jQuery(container).find("li.screw-li").each(function() {
        let qty = parseInt(jQuery(this).find('input[name="qtyvalue"]').val()) || 0;
        let price = jQuery(this).find(".price-info-span").attr("data-converted-price");

        if (qty > 0) {
            totalPrice += (qty * price);
        }
    });

    let footer = side === "front" ? "#frontside_view" : "#backside_view";
    jQuery(footer).find(".scr_total span").text(convertPrice(totalPrice));
}