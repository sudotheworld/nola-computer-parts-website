function homeblockdecreaseQty(element) {
    var qty = parseInt(jQuery(element).parent().parent().find('input.qty').val());
    var DisplayQty = jQuery(element).parent().parent().parent().parent().find(".display_qty");
    if (qty > 0) {
        var decreaseQty = qty - 1;
        if (decreaseQty > 0) {
            DisplayQty.show().text(decreaseQty);
        } else {
            DisplayQty.hide().text();
        }
        jQuery(element).parent().parent().find('input.qty').val(decreaseQty);
    } else {
        DisplayQty.hide().text('');
        jQuery(element).parent().parent().find('input.qty').val(0);
    }
}

function homeblockincreaseQty(element) {
    var qty = parseInt(jQuery(element).parent().parent().find('input.qty').val());
    var increaseQty = parseInt(qty) + 1;
    var DisplayQty = jQuery(element).parent().parent().parent().parent().find(".display_qty");
    DisplayQty.show().text(increaseQty);
    jQuery(element).parent().parent().find('input.qty').val(increaseQty);
}

function setAjaxData(data, iframe, url = null, id = null, maxqty = null, recall = false, element = false, lockship = false, qty = null , productnotification = false) {
    jQuery("#lcd-buyback").hide();
    jQuery(document).find('.maxqtypurchasecls').removeClass('maxqtypurchasecls'); /* Remove all maxqtypurchasecls class */
    jQuery(document).find('.lockshippurchasecls').removeClass('lockshippurchasecls');
    jQuery(document).find('.notificationpurchasedeals').removeClass('notificationpurchasedeals'); 
    if(!recall && productnotification && data.product_notification){
        jQuery(element).addClass('notificationpurchasedeals');
        productnotificationcheck(data, url, id, maxqty, qty, data.product_notification,data.product_ship_lock,data.redirect_url);
    }else if (!recall && lockship && data.product_ship_lock){
        jQuery(element).addClass('lockshippurchasecls');
        lockstatuscheck(data, url, id, maxqty, qty, data.product_ship_lock);
    }else if (!recall && data.max_qty_purchase && url && id && url != 'bulkcart'){
        jQuery(element).addClass('maxqtypurchasecls');
        maxqtypurchase(data, url, id, maxqty, data.max_qty_purchase, data.requestLimit);
    } else if(!recall && url && id && url != 'bulkcart' && data.add_to_select) {
        addtoselectpopup(data,url,id,qty);
    } else if (data.status == 'ERROR') {
        if(data.is_loggedin == 0){
            jQuery(document).find('.lgnprfrmlink').trigger('click');
        }
        else{
            alert(data.message);
        }
    } else {
        if (jQuery('#cartQty')) {
            jQuery('#cartQty').show();
            jQuery('#cartQty').text(data.cartQuantity);
        }
        if (jQuery('.block-cart')) {
            let cartId = data.cartid;
            jQuery('a.cartlink-' + cartId).parent().replaceWith(data.sidebar);
            jQuery('a.cartlink-' + cartId).parent().addClass('hovercart');
            var hovercart = jQuery('a.cartlink-' + cartId).parent().find('.block-content');
            hovercart.show();
            setTimeout(function() {
                hovercart.hide();
            }, 3000);
            if(data.ecommerce){
                addToCartDataLayer = window.dataLayer || [];
                addToCartDataLayer.push({ ecommerce: null });
                addToCartDataLayer.push({
                    event: "add_to_cart",
                    ecommerce: data.ecommerce
                });
            }
        }
    }
}

function showHomeCartLoader(element){
    if(element.parent().hasClass('cartloader-box')){
            var html = `<div class="default-home-loader">
                            <span class="loader-icon"></span>
                            <div class="listingloader-inner"></div>
                        </div>`;
        element.parent().append(html);
    }
    element.hide();
}

function hideHomeCartLoader(element){
    element.parent().find('.default-home-loader').remove();
    element.show();
}
function setLocationAjaxH(element, url, id, maxqty = null, recall = false, lockship = false ,productnotification = false, flagpreorder = false, enrollPopup = false, coreFee = '') {
    if(enrollPopup) {
        if(coreFee != 0){
            jQuery("#gapp-info-popup").show();
            jQuery(document).find('#core_fee').html(coreFee);
            jQuery(document).off('click','#bestseller-addtobtn').on('click','#bestseller-addtobtn',function(e){
                setLocationAjaxH(element, url, id, maxqty, false, lockship, productnotification);
            });
            return false;
        } else {
            setLocationAjaxH(element, url, id, maxqty, false, lockship, productnotification);
            return false;
        }
    } else {
        jQuery('#close-gapp-popup').parent().parent().parent().hide();
    }
    
    showHomeCartLoader(jQuery(element))
    jQuery(document).find('.maxqtypurchasecls').removeClass('maxqtypurchasecls'); /* Remove all maxqtypurchasecls class */
    jQuery(document).find('.lockshippurchasecls').removeClass('lockshippurchasecls');
    var qty = jQuery(element).parent().parent().find('input.qty').val();
    if (qty == 0) {
        var qty = 1;
    }
    url += '?isAjax=1&qty=' + qty + '&productid=' + id + '&recall=' + recall + '&lockship=' + lockship + '&productnotification=' + productnotification + '&flagpreorder=' + flagpreorder;
    try {
        jQuery.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                jQuery(element).parent().parent().find('input.qty').val(0);
                setAjaxData(data, false, url, id, maxqty, recall, element, lockship, qty, productnotification);
                jQuery("#lcd-buyback").hide();
                jQuery(element).parent().parent().parent().parent().find(".display_qty").hide().text('');
                if(data.cart_quantities){
                    showCartQuantities(data.cart_quantities);
                }
                hideHomeCartLoader(jQuery(element));
            }
        });
    } catch (e) {}
}
jQuery(document).on('hover', '#cartblock', function() {
    jQuery('.block-cart').removeClass('hovercart');
});
jQuery(document).on('input keyup', '.qty', function() {
    if (isNaN(jQuery(this).val())) {
        jQuery(this).val('0');
    }
});

jQuery(document).off('click', '.view-price').on('click', '.view-price', function(){
    jQuery('#lcd-buyback').show();
    jQuery.ajax({
        url: checkAccessoriesUrl,
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptycheckAccessoriesUrl);
        },
        data: {
            'form_key': FORM_KEY
        },
        success: function(data) {
            returndata = jQuery.parseJSON(data);
            if (returndata.status == 'UNAUTHORIZED') {
                jQuery('#viewpriceconfirmboxunauthorized').show();
                jQuery('#viewpriceconfirmboxnotlogged').hide();
            }
            else if (returndata.status == 'NOTLOGGED') {
                jQuery('#viewpriceconfirmboxunauthorized').hide();
                jQuery('#viewpriceconfirmboxnotlogged').show();
            }
            jQuery('#lcd-buyback').hide();
        }
    });
});

jQuery(document).off('click','#close-gapp-popup').on('click','#close-gapp-popup',function(e){
    jQuery(this).parent().parent().parent().hide();
});

jQuery(document).off('click', '#gapp-link-inn').on('click', '#gapp-link-inn', function(e){
    jQuery('#lcd-buyback').show();
});

jQuery(document).off('click', '#gapp-link-cc').on('click', '#gapp-link-cc', function(e){
    jQuery('#lcd-buyback').show();
    alert('Your credit card expired! Please select another credit card.');
});