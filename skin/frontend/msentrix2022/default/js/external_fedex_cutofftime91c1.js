//<![CDATA[
function pad2(number) {
    return (number < 10 ? '0' : '') + number;
}

//Ajax call to load timer popup
var cutoff_xhr = null;
function openfedextimer() {
    if (cutoff_xhr != null) {
        cutoff_xhr.abort();
        cutoff_xhr = null;
    }
    if (!jQuery('.cutoff-times-block').hasClass("no-visible")) {
        return false;
    }
    cutoff_xhr = jQuery.ajax({
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptyloadTimerPopupUrl);
        },
        url: loadTimerPopupUrl,
        data: 'form_key=' + FORM_KEY,
        success: function(returndata) {
            returndata = jQuery.parseJSON(returndata);
            if (returndata.ERROR) {
                alert(returndata.ERROR);
            }
            if (returndata.timer_html) {
                jQuery('.cutoff-times-block').removeClass("no-visible");
                jQuery('.cutoff-times-block').html(returndata.timer_html);
                startCountdownTimers();
            }
        }
    });
}

function getShippingCarrierClass(methodType, shippingDesc) {
    let shippingCarrierCls = '';
    methodType = methodType.toLowerCase();
    if (methodType.indexOf('fedex') !== -1) {
        shippingCarrierCls = 'fedex-top-icon';
        if (shippingDesc.indexOf('ground') !== -1) {
            shippingCarrierCls = 'fedexground-top-icon';
        }
    } else if (methodType.indexOf('ups') !== -1) {
        shippingCarrierCls = 'ups-top-icon';
    } else if (methodType.indexOf('amazon') !== -1) {
        shippingCarrierCls = 'aws-top-icon';
    } else if (methodType.indexOf('dhl') !== -1) {
        shippingCarrierCls = 'dhl-top-icon';
    } else if (methodType.indexOf('royalmail') !== -1) {
        shippingCarrierCls = 'royalmail-top-icon';
    } else if (methodType.indexOf('postnl') !== -1) {
        shippingCarrierCls = 'postnl-top-icon';
    } else if (methodType.indexOf('usps') !== -1) {
        shippingCarrierCls = 'usps-top-icon';
    } else if (methodType.indexOf('') !== -1) {
        shippingCarrierCls = 'default-top-icon';
    }
    
    return shippingCarrierCls;
}

//Ajax call to save selected method data in cookie
var timercookie_xhr = null;
jQuery(document).off('click', '.cutofftime').on('click', '.cutofftime', function() {
    if (timercookie_xhr != null) {
        timercookie_xhr.abort();
        timercookie_xhr = null;
    }
    var thisElm = jQuery(this);
    var shipMethod = thisElm.attr("data-shipmethod");
    var methodType = thisElm.attr("data-class");
    var shippingDesc = thisElm.next().find('.opt-txt').html();
    let carrierClass = getShippingCarrierClass(methodType, shippingDesc);
    jQuery('.msfedex-timer').find('#cutofftime_image').removeClass('fd-icon').removeClass('ups-icon').removeClass('usps-icon').removeClass('instore-icon').removeClass('amazon-icon').removeClass('dhl-icon').removeClass('royalmail-icon').removeClass('postnl-icon').removeClass('default-icon').addClass(thisElm.attr('data-image'));
    if (thisElm.length) {
        var selHtml = '<strong class="method-change">' + thisElm.attr('data-class') + '</strong>' + thisElm.parent().find('.opt-txt').html();
    } else {
        var selHtml = '<strong class="method-change"></strong>';
    }

    jQuery('.msfedex-timer').find('span.ship-truck-icon').removeClass('fedexground-top-icon').removeClass('fedex-top-icon').removeClass('ups-top-icon').removeClass('usps-top-icon').removeClass('aws-top-icon').removeClass('dhl-top-icon').removeClass('royalmail-top-icon').removeClass('postnl-top-icon').removeClass('default-top-icon').addClass(carrierClass);

    jQuery('.msfedex-timer').find('#cutofftime_name').removeClass('fd-icon').removeClass('ups-icon').removeClass('usps-icon').removeClass('instore-icon').removeClass('amazon-icon').removeClass('dhl-icon').removeClass('royalmail-icon').removeClass('postnl-icon').removeClass('default-icon').html(selHtml);
    var h = thisElm.parent().find('.hours-1').text().replace('hours', '');
    if (h != '') {
        jQuery('.msfedex-timer').find('.fd-timer').html('<strong>' + h + '</strong><span>:</span><strong>' +
            thisElm.parent().find('.minute-1').text().replace('minutes', '') +
            '</strong>');
        jQuery(document).find('.msfedex-timer').removeClass('anyforders');
    } else {
        jQuery('.msfedex-timerblock').find('.fd-timer').html(thisElm.parent().find('.count-down-timer').html());
        jQuery(document).find('.msfedex-timer').addClass('anyforders');
    }

    var currencySymbol = jQuery('.free-del .free-prize').text().match(/[^\d.]+/)[0];
    jQuery('input[name="cutofftime"]').removeAttr('checked');
    jQuery(this).attr('checked', 'checked');
    if (jQuery('.cutoff-domestic .select-del-opt li input[checked="checked"]').parent().find('.nomargin-msg').length == 0) {
        jQuery('.free-del').show();
        jQuery('.free-del-res').css('display', 'block');
        var freeabove = jQuery(this).attr('data-free');
        if (freeabove != 0) {
            jQuery('.free-del .free-prize').html(currencySymbol + freeabove);
            jQuery('.free-del-res .free-prize').html(currencySymbol + freeabove);
        } else {
            jQuery('.free-del').hide();
            jQuery('.free-del-res').css('display', 'none');
        }
    } else {
        jQuery('.free-del').hide();
        jQuery('.free-del-res').css('display', 'none');
    }
    var freeabove = jQuery(this).attr('data-free');
    if (freeabove != 0) {
        jQuery('.free-del .free-prize').html(currencySymbol + freeabove);
        jQuery('.free-del-res .free-prize').html(currencySymbol + freeabove);
    } else {
        jQuery('.free-del').hide();
        jQuery('.free-del-res').css('display', 'none');
    }

    // Do not call set cookie fn on page load.
    if (!thisElm.hasClass("timer-on-load")) {
        timer_xhr = jQuery.ajax({
            type: 'POST',
            beforeSend: function(request) {
                request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptysetTimerCookiepUrl);
            },
            url: setTimerCookiepUrl,
            data: 'shipmethod=' + shipMethod + '&methodtype=' + methodType + '&shippingdesc=' + shippingDesc + '&form_key=' + FORM_KEY,
        });
    }
});

jQuery(document).on('click', '.cutoffbtn button', function() {
    jQuery('.cutoffbtn button').removeClass('cutoffbtnactive');
    jQuery(this).addClass('cutoffbtnactive');
    jQuery('.cutoff-domestic').find('li[data-type="' + jQuery(this).attr('value') + '"]').show();
    jQuery('.cutoff-domestic').find('li[data-type!="' + jQuery(this).attr('value') + '"]').hide();
    if (jQuery(this).attr('value') == 'exp') {
        jQuery('.cutoff-type-img').removeClass('van-img');
        jQuery('.cutoff-type-img').addClass('air-img');
        jQuery('.cutoff-domestic').find('#int_priority_time').show();
        jQuery('.cutoff-domestic').find('#int_economy_time').show();
    } else {
        jQuery('.cutoff-type-img').addClass('van-img');
        jQuery('.cutoff-type-img').removeClass('air-img');
        jQuery('.cutoff-domestic').find('#int_priority_time').hide();
        jQuery('.cutoff-domestic').find('#int_economy_time').hide();
    }
});

function startCountdownTimers(onPageLoad = false) {
    // Get all timer list items
    let timerItems = document.getElementsByClassName('cutoff-methods-li');

    // Iterate over each timer item
    for (let i = 0; i < timerItems.length; i++) {
        let timerItem = timerItems[i];

        // Get the input element and cutoff end time
        let input = timerItem.querySelector('input.cutofftime');
        let cutoffEndTime = input.dataset.cutoff_end_time;

        let shipMethod = input.dataset.shipmethod;        
        let cust_to_time = input.dataset.cust_to_time;
        let cust_to_day = input.dataset.cust_to_day;
        let cutoff_start_on = input.dataset.cutoff_start_on;

        let now = moment.tz(new Date().getTime(), timezone);
        let edt = now.format("M/D/YYYY HH:mm:ss");
        // let now = new Date(edt).getTime();
        let dow = new Date().getDay();

        let enableCutoffTimer = input.dataset.enable_cutoff_timer;    
        let temporaryDisableTimer = input.dataset.temporary_disable_timer; 
        let temporaryDisableMessage = timerItem.querySelector('input.temporary_disable_message').value;

        if(enableCutoffTimer == 1 && temporaryDisableTimer == 1)
        {
            jQuery('#'+ shipMethod +'_timer').find('.count-down-timer').html('<p class="anyfutherorder" title="'+temporaryDisableMessage+'">'+temporaryDisableMessage+'</p>');
        }
        else {
            if(cutoff_start_on != ''){
                let further_ship_on = ''+Translator.translate('TOMORROW')+'';
                further_ship_on = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][cutoff_start_on];
                if(cutoff_start_on == (dow + 1)) {
                    further_ship_on = ''+Translator.translate('TOMORROW')+''; 
                }
                jQuery('#'+ shipMethod +'_timer').find('.count-down-timer').html('<p class="anyfutherorder" title="'+further_ship_on+'">'+further_ship_on+'</p>').addClass('nomargin-msg');
            }else{
                // Get the countdown timer elements
                let hourElement = timerItem.querySelector('.hours-1');
                let minuteElement = timerItem.querySelector('.minute-1');
                let secondElement = timerItem.querySelector('.second-1');

                // Start the countdown timer
                startTimerCutoff(cutoffEndTime, hourElement, minuteElement, secondElement, timerItem, shipMethod);
            }
        }
    }

    if(onPageLoad === true){
        let currentSelected = jQuery('.cutoff-domestic .select-del-opt li input[checked="checked"]');
        if (currentSelected.length === 0) {
            let allOptions = jQuery('.cutoff-domestic .select-del-opt li input.cutofftime')
                .filter(function () {
                    const $li = jQuery(this).closest('li');
                    return $li.attr('data-type') === 'dom' || $li.attr('data-type') === 'exp';
                })
                .get();
            // Sort based on data-group_sort (ascending)
            allOptions.sort(function (a, b) {
                return parseFloat(jQuery(a).attr('data-group_sort')) - parseFloat(jQuery(b).attr('data-group_sort'));
            });
            // Find the first non-disabled input (optional enhancement)
            currentSelected = jQuery(allOptions[0]); // Wrap first DOM element back in jQuery
        }
        if(currentSelected.length > 0){
            currentSelected.addClass('timer-on-load');
            currentSelected.prop('checked', true).trigger('click');
        }else{
            jQuery(".msfedex-timer").removeClass('no-display').addClass('disp_block');
            jQuery(".msfedex-timerblock").removeClass('disp_block').addClass('no-display');
        }
    }
}

/* Timer data load - function for on page load and on popup load */
function startTimerCutoff(endTime, hourElement, minuteElement, secondElement, timerItem, shipMethod) {
    // Convert cutoff end time to a Date object
    let endTimeObj = new Date(endTime).getTime();    

    // Update the countdown timer every second
    let intervalId = setInterval(function() {

        var now = moment.tz(new Date().getTime(), timezone);
        var edt = now.format("M/D/YYYY HH:mm:ss");
        var now = new Date(edt).getTime();
        let remainingTime = endTimeObj - now;

        // Check if the remaining time is greater than 0
        if (remainingTime > 0) {
          // Calculate the total seconds, minutes, hours, and days
          let addedDay = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
          let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

          if(hours >= 0)  {
                hours = pad2(hours + (addedDay * 24));
                var minutes = pad2(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)));
                var seconds = pad2(Math.floor((remainingTime % (1000 * 60)) / 1000));
                if(hours == '00' && minutes == '00' && seconds == '00'){
                    jQuery('#'+ shipMethod +'_timer').find('.count-down-timer').html('<p class="anyfutherorder">'+Translator.translate('ANY FURTHER ORDERS WILL GET SHIPPED TOMORROW')+'</p>').addClass('nomargin-msg');
                }
                else{
                    jQuery('#'+ shipMethod +'_timer').find('.count-down-timer').html('<span class="hours-1">'+hours + '<small>hours</small></span><span class="minute-1">' + minutes + '<small>minutes</small></span><span class="second-1 no-border">' + seconds + '<small>seconds</small></span>').removeClass('nomargin-msg');
                }
            } else {
                jQuery('#'+ shipMethod +'_timer').find('.count-down-timer').html('<p class="anyfutherorder">'+Translator.translate('ANY FURTHER ORDERS WILL GET SHIPPED TOMORROW')+'</p>').addClass('nomargin-msg');
            }
        } else {
          clearInterval(intervalId);
          jQuery('#'+ shipMethod +'_timer').find('.count-down-timer').html('<p class="anyfutherorder">'+Translator.translate('ANY FURTHER ORDERS WILL GET SHIPPED TOMORROW')+'</p>').addClass('nomargin-msg');
          timerItem.querySelector('.default-timer').textContent = Translator.translate('No timer');
        }

        /* Default timer update */
        let currentSelected = jQuery('.cutoff-domestic .select-del-opt li input[checked="checked"]');
        jQuery('.msfedex-timer').find('span.ship-truck-icon').removeClass('fedexground-top-icon').removeClass('fedex-top-icon').removeClass('ups-top-icon').removeClass('usps-top-icon').removeClass('aws-top-icon').removeClass('dhl-top-icon').removeClass('royalmail-top-icon').removeClass('postnl-top-icon').removeClass('default-top-icon').addClass(currentSelected.attr('data-top_icon'));
        jQuery('.msfedex-timer').find('#cutofftime_image').removeClass('fd-icon').removeClass('ups-icon').removeClass('usps-icon').removeClass('instore-icon').removeClass('amazon-icon').removeClass('dhl-icon').removeClass('royalmail-icon').removeClass('postnl-icon').removeClass('default-icon').addClass(currentSelected.attr('data-image'));
        
        let selHtml = '<strong class="method-change"></strong>'; 
        if (currentSelected.length) {
            selHtml = '<strong class="method-change">'+currentSelected.attr('data-class')+'</strong>'+currentSelected.parent().find('.opt-txt').html(); 
        }
        jQuery('.msfedex-timer').find('#cutofftime_name').removeClass('fd-icon').removeClass('ups-icon').removeClass('usps-icon').removeClass('instore-icon').removeClass('amazon-icon').removeClass('dhl-icon').removeClass('royalmail-icon').removeClass('postnl-icon').removeClass('default-icon').html(selHtml);
        let h = currentSelected.parent().find('.hours-1').text().replace('hours','');

        if (h != '') {
            jQuery('.msfedex-timer').find('.fd-timer').html('<strong>'+h +'</strong><span>:</span><strong>'+ currentSelected.parent().find('.minute-1').text().replace('minutes','') +'</strong><span>:</span><strong>'+ currentSelected.parent().find('.second-1').text().replace('seconds',''));
            jQuery(document).find('.msfedex-timer').removeClass('anyforders');
        } else {
            jQuery('.msfedex-timer').find('.fd-timer').html(currentSelected.parent().find('.count-down-timer').html());
            jQuery(document).find('.msfedex-timer').addClass('anyforders');
        }
    }, 1000);
}

function lockstatuscheck(data, url, id, maxqty, qty, lockstatus = false) {
    if (lockstatus == true) {
        jQuery(document).find('#lockship_purchase_url').val(url);
        jQuery(document).find('#lockship_purchase_id').val(id);
        jQuery(document).find('#lockship_purchase_maxqty').val(maxqty);
        jQuery(document).find('#lockship_purchase_maxpurchase').val(qty);
        jQuery(document).find('.shipmethod-productpopup').show();
    } else {
        jQuery(document).find('#lockship_purchase_url').val('');
        jQuery(document).find('#lockship_purchase_id').val('');
        jQuery(document).find('#lockship_purchase_maxqty').val('');
        jQuery(document).find('#lockship_purchase_maxpurchase').val('');
    }
}
jQuery(document).on('click', '#lockship-addto', function() {
    addToCartLockShip();
});

function addToCartLockShip() {
    jQuery(document).find('.shipmethod-productpopup').hide();
    var url = jQuery(document).find('#lockship_purchase_url').val();
    var lockship_purchase_id = jQuery(document).find('#lockship_purchase_id').val();
    var maxqty = parseInt(jQuery(document).find('#lockship_purchase_maxqty').val());
    if (url == 'quickorder') {
        if (typeof submitQuickorderForm !== 'undefined' && jQuery.isFunction(submitQuickorderForm)) {
            submitQuickorderForm(true);
        }
    } else if (url == 'bulkcart') {
        var addtoqty = jQuery(document).find('#lockship_purchase_maxpurchase').val();
        var productids = lockship_purchase_id.split(',');
        var productqtys = addtoqty.split(',');
        var productqtysnew = [];
        jQuery.each(productids, function(index, productid) {
            productqtysnew[productid] = productqtys[index];
        });
        jQuery.each(productids, function(index, productid) {
            jQuery(document).find('#displayqty_' + productid).html(productqtysnew[productid]).show();
            // jQuery("div[id^='displayqty_"+productid+"-']").html(productqtysnew[productid]).show();
            jQuery("div[id^='displayqty_" + productid + "-']").each(function(index) {
                var mainElm = jQuery(this);
                var alreadyAdded = false;
                jQuery("div[id^='displayqty_" + productid + "-']").each(function(index) {
                    var checkElm = jQuery(this);
                    if (checkElm.html() != '') {
                        alreadyAdded = true;
                    }
                });
                if (alreadyAdded == false) {
                    mainElm.html(productqtysnew[productid]).show();
                }
            });
        });
        if (typeof setCustomProductId !== 'undefined' && jQuery.isFunction(setCustomProductId)) {
            setCustomProductId(false, true);
        }
    } else {
        var addtoqty = parseInt(jQuery(document).find('#lockship_purchase_maxpurchase').val());
        var productid = lockship_purchase_id;
        var id = parseInt(lockship_purchase_id);
        if (lockship_purchase_id.indexOf('-') > -1) {
            id = lockship_purchase_id;
            productid = lockship_purchase_id.split("-")[0];
        }
        if (url && id) {
            //Add to cart for Home Page deals of the day section
            if (jQuery(document).find('.lockshippurchasedeals').length && typeof setLocationAjaxDeals !== 'undefined' && jQuery.isFunction(setLocationAjaxDeals)) {
                var element = jQuery(document).find('.lockshippurchasedeals');
                element.parent().parent().find('input.qty').val(addtoqty);
                setLocationAjaxDeals(url, id, maxqty, element, false, true);
            } else if (jQuery(document).find('.lockshippurchasecls').length && typeof setLocationAjaxH !== 'undefined' && jQuery.isFunction(setLocationAjaxH)) {
                //Add to cart for MS Home Page
                var element = jQuery(document).find('.lockshippurchasecls');
                element.parent().parent().find('input.qty').val(addtoqty);

                setLocationAjaxH(element, url, id, maxqty, false, true);
            } else if (typeof setLocationAjax !== 'undefined' && jQuery.isFunction(setLocationAjax)) {
                jQuery('#qty_' + id).val(addtoqty);
                const urlParams = getUrlParams(url);
                setLocationAjax(url, id, maxqty, false, true, false,false,false,'','',urlParams.updatItem, urlParams.plus, urlParams.minus);
            }
        }
    }
}
jQuery(document).on('click', '.prship-close, .pr-canselbtn', function() {
    jQuery(document).find('.shipmethod-productpopup').hide();
    jQuery(document).find('#lockship_purchase_url').val('');
    jQuery(document).find('#lockship_purchase_id').val('');
    jQuery(document).find('#lockship_purchase_maxqty').val('');
    jQuery(document).find('#lockship_purchase_maxpurchase').val('');
});

function copyToClipboard(elementId) {  
    var textToCopy = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(textToCopy).then(function() {
    });
}  
//]]>