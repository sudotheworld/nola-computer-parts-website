jQuery.noConflict(),function(a){a.fn.extend({easyResponsiveTabs:function(b){var c={type:"default",width:"auto",fit:!0,closed:!1,activate:function(){}},b=a.extend(c,b),d=b,e=d.type,f=d.fit,g=d.width,h="vertical",i="accordion";a(this).bind("tabactivate",function(a,c){"function"==typeof b.activate&&b.activate.call(c,a)}),this.each(function(){function c(){e==h&&d.addClass("resp-vtabs"),1==f&&d.css({width:"100%",margin:"0px"}),e==i&&(d.addClass("resp-easy-accordion"),d.find(".resp-tabs-list").css("display","none"))}var d=a(this),j=d.find("ul.resp-tabs-list");d.find("ul.resp-tabs-list li").addClass("resp-tab-item"),d.css({display:"block",width:g}),d.find(".resp-tabs-container > div").addClass("resp-tab-content"),c();var k;d.find(".resp-tab-content").before("<h2 class='resp-accordion' role='tab'><span class='resp-arrow'></span></h2>");var l=0;d.find(".resp-accordion").each(function(){k=a(this);var b=d.find(".resp-tab-item:eq("+l+")").html();d.find(".resp-accordion:eq("+l+")").append(b),k.attr("aria-controls","tab_item-"+l),l++});var m,n=0;d.find(".resp-tab-item").each(function(){$tabItem=a(this),$tabItem.attr("aria-controls","tab_item-"+n),$tabItem.attr("role","tab"),b.closed===!0||"accordion"===b.closed&&!j.is(":visible")||"tabs"===b.closed&&j.is(":visible")||(d.find(".resp-tab-item").first().addClass("resp-tab-active"),d.find(".resp-accordion").first().addClass("resp-tab-active"),d.find(".resp-tab-content").first().addClass("resp-tab-content-active").attr("style","display:block"));var c=0;d.find(".resp-tab-content").each(function(){m=a(this),m.attr("aria-labelledby","tab_item-"+c),c++}),n++}),d.find("[role=tab]").each(function(){var b=a(this);b.click(function(){var c=b.attr("aria-controls");return b.hasClass("resp-accordion")&&b.hasClass("resp-tab-active")?(d.find(".resp-tab-content-active").slideUp("",function(){a(this).addClass("resp-accordion-closed")}),b.removeClass("resp-tab-active"),!1):(!b.hasClass("resp-tab-active")&&b.hasClass("resp-accordion")?(d.find(".resp-tab-active").removeClass("resp-tab-active"),d.find(".resp-tab-content-active").slideUp().removeClass("resp-tab-content-active resp-accordion-closed"),d.find("[aria-controls="+c+"]").addClass("resp-tab-active"),d.find(".resp-tab-content[aria-labelledby = "+c+"]").slideDown().addClass("resp-tab-content-active")):(d.find(".resp-tab-active").removeClass("resp-tab-active"),d.find(".resp-tab-content-active").removeAttr("style").removeClass("resp-tab-content-active").removeClass("resp-accordion-closed"),d.find("[aria-controls="+c+"]").addClass("resp-tab-active"),d.find(".resp-tab-content[aria-labelledby = "+c+"]").addClass("resp-tab-content-active").attr("style","display:block")),void b.trigger("tabactivate",b))}),a(window).resize(function(){d.find(".resp-accordion-closed").removeAttr("style")})})})}})}(jQuery);
jQuery(window).resize(function() {addResponsiveData();});
jQuery(document).ready(function () {addResponsiveData();});
function addResponsiveData()
{
	if (jQuery(window).width() <= 968) {
		jQuery('.footer #horizontalTab .countrySwithcerBlockMobile').remove();
		var menuHtml = jQuery('.nav-container .header #nav').html();
		var mobileHtml = jQuery('#mask #menu #content1 .cms-menu').html();
		jQuery('#mask #menu #content1').html(menuHtml + '<li class="cms-menu">' + mobileHtml + '</li>');
	}
}
jQuery(document).on('click','.menu-inherit>li>a',function(e){
	jQuery(this).next().slideToggle();
	jQuery(this).toggleClass('innav-open');
});
jQuery(document).on('click','.menu-inherit>li>ul>li>a',function(e){
	jQuery(this).parent().find('ul.submenu').slideToggle();
	jQuery(this).parent().find('ul.submenu').find('ul.dp-menu-drop').css('display','none');
	jQuery(this).toggleClass('innav-open');
	if(!jQuery(this).hasClass('innav-open')){
		jQuery(this).next().find('a').removeClass('innav-open');
	}
});
jQuery(document).on('click','.menu-inherit>li>ul>li>ul>li.dp-menu>a', function(e) {
	jQuery(this).removeAttr('href');
	jQuery(this).parent().find('ul.submenu').show();
	jQuery(this).parent().find('ul.dp-menu-drop').slideToggle();
	jQuery(this).toggleClass('innav-open');
});
// Detect Menu Click on iPad Screen
jQuery(document).ready(function(e){
jQuery(".menu-inherit>li:not(.noclickablecategory)>a").removeAttr("href");
if (jQuery(window).width() <= 1150) {
	jQuery("#nav>li").each(function(e) {
		var datCatAttr = jQuery(this).attr("data-cat");
		if (typeof datCatAttr !== 'undefined' && datCatAttr !== false) {
			jQuery("#nav>li:not('.noclickablecategory')>a").removeAttr("href");
		}
	});
	}
});
