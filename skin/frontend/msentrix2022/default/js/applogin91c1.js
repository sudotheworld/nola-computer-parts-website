let applogin_intr = null;
let applogin_reg_xhr = null;
let apploginqr_count = 0;
jQuery(document).off('click', '.allow-login-to-app').on('click', '.allow-login-to-app', function() {
    jQuery(document).find('#allow-login-popup').remove();
    clearInterval(applogin_intr);
    getAppLoginQrUpdate(1);
});

function getAppLoginQrUpdate(isInit = 0) {
    if(jQuery(document).find('#allow-login-popup').length){
        var qrImgElm = jQuery(document).find('#allow-login-qr');
    } else if(isInit === 0) {
        clearInterval(applogin_intr);
    }

    if (applogin_reg_xhr != null) {
        applogin_reg_xhr.abort();
        applogin_reg_xhr = null;
    }

    if(apploginqr_count >= 500){ // Close popup after 6 minutes.
        jQuery(document).find('#allow-login-popup').remove()
        clearInterval(applogin_intr);
        apploginqr_count = 0;
        return false;
    }

    apploginqr_count = apploginqr_count + 1;

    applogin_reg_xhr = jQuery.ajax({
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + encrptyappLoginQRUrl);
        },
        url: appLoginQRUrl,
        data: 'form_key=' + FORM_KEY + '&is_init='+isInit,
        success: function(returndata) {
            returndata = jQuery.parseJSON(returndata);
            if (returndata.ERROR) {
                alert(returndata.ERROR);
                return false;
            }
            if(returndata.CODEUSED){
                jQuery(document).find('#allow-login-popup').remove()
                clearInterval(applogin_intr);
                apploginqr_count = 0;
                return false;
            }
            if (returndata.applogin_html) {
                if(!jQuery(document).find('#allow-login-popup').length){
                    jQuery('body').append(returndata.applogin_html);
                    triggerAppLoginQrUpdate();
                }

                var qrImgElm = jQuery(document).find('#allow-login-qr');
                qrImgElm.attr('src', "data:image/png;base64," + returndata.appqr);
                jQuery(document).find('#allow-login-popup').show();
                qrImgElm.removeClass('has-loader');
                qrImgElm.parent().find('.loader').hide();
                jQuery(".ms-account>.myacc-container").addClass('no-visible');
            }
        }
    });
}

function triggerAppLoginQrUpdate() {
    applogin_intr = setInterval(function() {
        getAppLoginQrUpdate();
    }, 5000);
}

jQuery(document).off("click", "#close-allow-login-popup").on("click", "#close-allow-login-popup", function(){
    jQuery(document).find('#allow-login-popup').remove()
    clearInterval(applogin_intr);
    apploginqr_count = 0;
});


jQuery(document).keydown(function(event) {
    if (event.keyCode === 27) {
        jQuery(document).find('#allow-login-popup').remove()
        clearInterval(applogin_intr);
        apploginqr_count = 0;
    }
});

function throwAppReturnProcess(status, statusCode, successEvntData = {}) {
    var returnData = {};
    var msgStr = '';
    var actionType = '';
    var redirectUrl = '';
    var actionEvent = '';
    if(!status){
        if(statusCode === 'authentication-failed'){
            msgStr = 'Authentication failed. Try by login again.';
            actionType = 'redirect';
            redirectUrl = 'login';
        } else if(statusCode === 'cart-empty'){
            msgStr = 'Shopping cart is empty. You have no items in your shopping cart.';
            actionType = 'redirect';
            redirectUrl = 'cart';
            actionEvent = 'checkout';
        } else if(statusCode === 'cart-updated'){
            msgStr = 'Shopping cart is updated. Review your shopping cart.';
            actionType = 'redirect';
            redirectUrl = 'cart';
            actionEvent = 'checkout';
        }
    } else {
        if(statusCode === 'order-placed'){
            var orderData = {};
            if(jQuery.isEmptyObject(successEvntData) !== true){
                successEvntData = jQuery.parseJSON(successEvntData);
                orderData = successEvntData['order-success']
            }

            msgStr = 'Your order has been placed.';
            actionType = 'display-fullscreen';
            redirectUrl = '-';
            actionEvent = 'checkout';
            returnData['order_id'] = orderData.order_id;
            returnData['order_ref'] = orderData.order_ref;
        } else if (statusCode === 'order-success'){
            var orderData = {};
            if(jQuery.isEmptyObject(successEvntData) !== true){
                successEvntData = jQuery.parseJSON(successEvntData);
                orderData = successEvntData['order-success']
            }

            msgStr = 'Your order has been received.';
            actionType = 'redirect';
            redirectUrl = 'order-success';
            actionEvent = 'checkout';
            returnData['order_id'] = orderData.order_id;
            returnData['order_ref'] = orderData.order_ref;
        }
    }

    if(statusCode === 'continue-shopping'){
        msgStr = 'Continue to shop now.';
        actionType = 'redirect';
        redirectUrl = 'product-listing';
        actionEvent = '';
    }

    returnData['status'] = status;
    returnData['message'] = msgStr;
    returnData['event'] = actionEvent;
    returnData['action_type'] = actionType;
    returnData['redirect_to'] = redirectUrl;
    returnData['status_code'] = statusCode;

    console.log(JSON.stringify(returnData));

    window.onPostCheckout.postMessage(JSON.stringify(returnData));
}