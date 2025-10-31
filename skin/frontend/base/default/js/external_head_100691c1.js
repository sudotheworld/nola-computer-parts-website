var jQuery = jQuery.noConflict(true);
//<![CDATA[
(function() {
    var lastTouch = 0;
    function preventZoom(e) {
        var t2 = e.timeStamp;
        var t1 = lastTouch || t2;
        var dt = t2 - t1;
        var fingers = e.touches.length;
        lastTouch = t2;

        if (!dt || dt >= 300 || fingers > 1) {
            return;
        }
        resetPreventZoom();
        e.preventDefault();
        e.target.click();
    }
    function resetPreventZoom() {
        lastTouch = 0;
    }
    document.addEventListener('touchstart', preventZoom, false);
    document.addEventListener('touchmove', resetPreventZoom, false);
})();
//]]>
jQuery(document).off('click','.showfullcart').on('click','.showfullcart', function() {
  jQuery('.block-cart').removeClass('iscartactive');
  jQuery('.block-cart .block-content').removeAttr('style');
  let currElement = jQuery(this);
  let cartId = jQuery(this).attr('data-class');
  let quoteId = jQuery(this).attr('data-id'); 
  let cartDiv = jQuery(this).parent();
  let cartBlock = cartDiv.find('.showcart-'+cartId);
  jQuery(this).parent().addClass('iscartactive');
  if (cartBlock.hasClass("no-display")) {
    if (cartBlock.html()) {
      var hovercart = cartDiv.addClass('hovercart').find('.block-content');
      hovercart.removeClass("no-display");
      hovercart.addClass("display_cart");
      hovercart.removeAttr('style');
      hovercart.show();
      jQuery(document).find(".msfedex-mobile").removeClass('smdispnone');
    } else {
      cartDiv.addClass('animated-show-cart');
      cartDiv.find('.no-login-cart').hide();
      jQuery.ajax({
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + loadTopCartPopupEnc);
        },
        url: loadTopCartPopup,
        data: 'cartid='+cartId+'&quoteId='+quoteId+'&isajax=true&form_key=' + FORM_KEY,
        success: function(data) {
            data = jQuery.parseJSON(data);
            jQuery(document).find(".msfedex-mobile").addClass('smdispnone');
            cartDiv.find('.no-login-cart').show();
            cartDiv.find('.block-content').replaceWith(data.sidebar);
            var countProduct = cartDiv.find('.block-content .cart-title').length;
            if (!countProduct) {
              cartDiv.find('.no-login-cart').text('0');
            } else {
              cartDiv.find('.no-login-cart').text(cartDiv.find('.block-content .cart-title').attr('data-id'));
            }
            var totalPrice = cartDiv.find('.block-content .subtotal .price').length;
            if (totalPrice) {
              cartDiv.find('.np-cart .price').html(cartDiv.find('.block-content .subtotal .price').html());
            }
            var hovercart = cartDiv.addClass('hovercart').find('.block-content');
            hovercart.removeClass("no-display");
            hovercart.addClass("display_cart");
            hovercart.removeAttr('style');
            if(jQuery(document).find("#accesories-product-popup").length > 0){
              hovercart.hide();
            }else{
              hovercart.show();
            }
            jQuery(".block-cart").removeClass('animated-show-cart');
        }
    });
    }
  } else {
    cartBlock.removeClass("display_cart").addClass("no-display").removeAttr('style');
    jQuery(document).find(".msfedex-mobile").removeClass('smdispnone');
  }

  jQuery('.showfullcart').each(function(){
    if(!jQuery(this).parent().hasClass('iscartactive')){
      let cartId = jQuery(this).attr('data-class');
      let cartDiv = jQuery(this).parent();
      let cartBlock = cartDiv.find('.showcart-'+cartId);
      if (!cartBlock.hasClass("no-display")) {
        cartBlock.removeClass("display_cart").addClass("no-display").removeAttr('style');
        jQuery(document).find(".msfedex-mobile").removeClass('smdispnone');
      }
    }
  });
});
jQuery(document).off('click','ul.cart-tabs li a').on('click','ul.cart-tabs li a', function() {
  if (!jQuery(this).attr('class')) {
    var cartId = jQuery(this).attr('data-id');
    jQuery('.cart-m-wrapper .block-cart:nth-child('+cartId+')').find('a.showfullcart').click();
  }
});
jQuery(document).on('click', '.close-cart', function() {
  jQuery(this).parent().parent().hide();
  jQuery(this).parent().parent().parent().parent().removeClass("m-cflex");
});

jQuery(window).resize(function() {
  setTimeout(function(){
    jQuery(".topcart #cartblock").find('#cart-button').attr('href','javascript:void(0)');
  },500);
});
jQuery(document).ready(function(){
    setTimeout(function(){
        jQuery(".topcart #cartblock").find('#cart-button').attr('href','javascript:void(0)');
    },500);

});

/* check value key which is pressed */
jQuery(document).off('keyup','.checkValidation').on('keyup','.checkValidation',function(e){
  var thisEl        = jQuery(this);
  if (thisEl.is(':visible')) {
      var thisVal       = thisEl.val().trim();
      var thisvalLength = thisVal.length;
      var hasError = 0;
      var isRequired    = jQuery(this).attr('data-isrequired');
      if(isRequired == undefined){ isRequired = ''; }
      var minLen = thisEl.attr('data-min');
      if(minLen == undefined){ minLen = ''; }
      var maxLen = thisEl.attr('data-max');
      if(maxLen == undefined){ maxLen = ''; }

      // Check if the current element has the class 'iti__tel-input'
      var isTelInput = thisEl.hasClass('iti__tel-input');

      // if (e.which == 13) { return false; } // ignore ENTER key event 
                              
      var pattern = thisEl.attr('data-pattern');
      if(pattern == undefined){ pattern = ''; } 

      var checkpattern = thisEl.attr('data-checkpattern');
      if(checkpattern == undefined){ checkpattern = ''; } 
      if(pattern != ''){
        var subPattern = pattern.replace( /(^.*\[|\].*$)/g, '' );
        subPattern = subPattern.replace(/\d+/g, '');
        subPattern = "(["+subPattern+"])\\1{5,}";
        subPattern = subPattern.toString();
      
        var regex = new RegExp(pattern);
        var regexSub = new RegExp(subPattern);

        // variable for validation error msg
        var error = pattern.slice(1,-2);
        if(pattern.replace('\\','') == '^S[a-zA-Z0-9 ]+$' && thisEl.val().length != thisEl.val().trim().length){
          validationPassed(thisEl,isTelInput);
          thisEl.addClass('validation-failed');
          if(jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').length > 0){
            jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').addClass('disable');
          }
          var validationMessage = '<div class="validation-advice">'+Translator.translate('You can not use whitespace in entering zip code.')+'</div>';
          setValidationMessage(thisEl, validationMessage, isTelInput);
          hasError++;
        } else if (!regex.test(thisVal) && thisVal != '') {
          validationPassed(thisEl,isTelInput);
          thisEl.addClass('validation-failed');
          if(jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').length > 0){
            jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').addClass('disable');
          }
          if(pattern=='^(?!0(x09|x0D)|[@+=-]).*$'){
            var validationMessage = '<div class="validation-advice">'+Translator.translate('Please enter valid company name.')+'</div>';
            setValidationMessage(thisEl, validationMessage, isTelInput);
          }
          else{
            var validationMessage = '<div class="validation-advice">'+Translator.translate('Please use letters only in')+' '+ error +' !!</div>';
            setValidationMessage(thisEl, validationMessage, isTelInput);
          }
          
          hasError++;
        }else if (regexSub.test(thisVal) && checkpattern == 1 && thisVal != '') {
          validationPassed(thisEl,isTelInput);
          thisEl.addClass('validation-failed');
          if(jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').length > 0){
            jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').addClass('disable');
          }
          var validationMessage = '<div class="validation-advice">'+Translator.translate('You can not use consecutive characters more then 5 times !!')+'</div>';
          setValidationMessage(thisEl, validationMessage, isTelInput);
          hasError++;
        }
      }

      if(hasError == 0 && isRequired == 1 && thisVal == ''){
        validationPassed(thisEl,isTelInput);
        thisEl.addClass('validation-failed');
        if(jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').length > 0){
          jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').addClass('disable');
        }
        var validationMessage = '<div class="validation-advice">'+Translator.translate('This is a required field.')+'</div>';
        setValidationMessage(thisEl, validationMessage, isTelInput);

        hasError++;
      }else if(hasError == 0 && minLen > 0 && thisVal != '' && thisvalLength > 0 && thisvalLength < minLen){
        validationPassed(thisEl,isTelInput);
        thisEl.addClass('validation-failed');
        if(jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').length > 0){
          jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').addClass('disable');
        }
        var validationMessage = '<div class="validation-advice">'+Translator.translate('Can not input less than ')+''+ minLen +''+Translator.translate(' characters.')+'</div>';
        setValidationMessage(thisEl, validationMessage, isTelInput);
        hasError++;
      }else if(hasError == 0 && maxLen > 0 && thisVal != '' && thisvalLength > 0 && thisvalLength > maxLen){
        validationPassed(thisEl,isTelInput);
        thisEl.addClass('validation-failed');
        if(jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').length > 0){
          jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').addClass('disable');
        }
        var validationMessage = '<div class="validation-advice">'+Translator.translate('Can not input more than ')+' '+ maxLen +''+Translator.translate(' characters.')+'</div>';
        setValidationMessage(thisEl, validationMessage, isTelInput);
        hasError++;
      }
      if(hasError == 0){
        validationPassed(thisEl,isTelInput);
      }
    }else{
      if(jQuery("#restock-notification-popup").length > 0){
        // Check if the current element has the class 'iti__tel-input'
        var isTelInput = thisEl.hasClass('iti__tel-input');
        validationPassed(thisEl,isTelInput);
      }
    }
});

// Function to move the validation message based on input element class
function setValidationMessage(inputEl, message, isTelInput) {
  if (isTelInput) {
      inputEl.closest('.iti').after(message);
  } else {
      inputEl.after(message);
  }
}

// Function to initialize intl-tel-input on a given input selector and return the instance
function initializeIntlTelInput(selector,defaultCountry = 'us', phoneLengths = {}) {
  var inputElement = document.querySelector(selector);
  
  if (!inputElement) {
    return null;
  }

  // Initialize intl-tel-input.
  var iti =  window.intlTelInput(inputElement, {
      initialCountry: defaultCountry,
      separateDialCode: true,
  });

  function applyPhoneInputAttributes(){
    var countryData = iti.getSelectedCountryData();
    var countryCode = countryData.iso2.toUpperCase();
    var lengths = phoneLengths[countryCode] || phoneLengths['default'] || { min: 3, max: 10 };

    inputElement.setAttribute('minlength', lengths.min);
    inputElement.setAttribute('maxlength', lengths.max);
    inputElement.setAttribute('data-min', lengths.min);
    inputElement.setAttribute('data-max', lengths.max);

  }

  // Initial callback
  applyPhoneInputAttributes();

  // On country change
  inputElement.addEventListener('countrychange', applyPhoneInputAttributes);

  const input = inputElement;

  // ===== locking logic =====
  let lockCountryAfterUserPick = true;            // become true once user picks from dropdown
  let manualCountryIso2 = iti.getSelectedCountryData().iso2;
  let suppressReapply = false;                     // prevent recursion when we call setCountry()

  // 1) detect user picking a country from the dropdown (pointerdown covers mouse/touch)
  document.addEventListener('pointerdown', (ev) => {
    const countryEl = ev.target.closest && ev.target.closest('.iti__country');
    if (countryEl) {
      const iso = countryEl.getAttribute('data-country-code') || countryEl.dataset.countryCode;
      if (iso) {
        manualCountryIso2 = iso;
        lockCountryAfterUserPick = true;
      }
    }
  }, true); // capture phase to get it early

  // 2) when a country change event happens, if we've locked, force the chosen country back
  input.addEventListener('countrychange', () => {
    if (suppressReapply) return;
    const currentIso = iti.getSelectedCountryData().iso2;
    if (lockCountryAfterUserPick && currentIso !== manualCountryIso2) {
      suppressReapply = true;
      // schedule after browser/UI updates (so we don't lose the race)
      requestAnimationFrame(() => {
        iti.setCountry(manualCountryIso2);
        // small timeout to let library finish anything else
        suppressReapply = false;
      });
    } else {
      // if not locked, keep manualCountryIso2 in sync with latest
      manualCountryIso2 = currentIso;
    }
  });

  // 3) MutationObserver fallback (some internal code mutates DOM directly)
  // observe the flag container so we can revert if the plugin changes the DOM
  (function observeFlagChanges() {
    // the plugin wraps the input in a .iti element - find the flag container
    const itiWrapper = input.closest && input.closest('.iti');
    const flagContainer = (itiWrapper && itiWrapper.querySelector('.iti__flag-container')) || itiWrapper || input.parentNode;
    if (!flagContainer || !('MutationObserver' in window)) return;

    const mo = new MutationObserver(() => {
      if (suppressReapply || !lockCountryAfterUserPick) return;
      const selectedFlag = (itiWrapper && itiWrapper.querySelector('.iti__selected-flag')) || flagContainer.querySelector('.iti__selected-flag');
      if (!selectedFlag) return;
      const currentIso = selectedFlag.getAttribute('data-country-code') || selectedFlag.dataset.countryCode;
      if (currentIso && currentIso !== manualCountryIso2) {
        suppressReapply = true;
        requestAnimationFrame(() => {
          iti.setCountry(manualCountryIso2);
          suppressReapply = false;
        });
      }
    });

    mo.observe(flagContainer, { attributes: true, subtree: true, childList: true, attributeFilter: ['class', 'data-country-code'] });
  })();

  // expose a safe programmatic setter
  iti.setCountryProgrammatically = function (iso2) {
    suppressReapply = true;                   // block the revert logic
    iti.setCountry(iso2);
    requestAnimationFrame(() => {
      suppressReapply = false;
      manualCountryIso2 = iso2.toLowerCase(); // keep state in sync
    });
  };

  inputElement._iti = iti;
  
  return iti;
}

function validationPassed(thisEl,isTelInput=false){
    thisEl.removeClass('validation-failed');

    if(thisEl.closest('.iti').next('.validation-advice').length > 0 && isTelInput){
      thisEl.closest('.iti').next('.validation-advice').remove();
    } else{
      thisEl.parent().find('.validation-advice').remove();
    }
    if(jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').length > 0){
      jQuery("#restock-notification-popup").find('.notify-me-btn-subscribe').removeClass('disable');
    }
}

/* check password strength same as in php */
function checkpasswordstrength(pwd) {
  var nScore=0, nLength=0, nAlphaUC=0, nAlphaLC=0, nNumber=0, nSymbol=0, nMidChar=0, nRequirements=0, nAlphasOnly=0, nNumbersOnly=0, nUnqChar=0, nRepChar=0, nRepInc=0, nConsecAlphaUC=0, nConsecAlphaLC=0, nConsecNumber=0, nConsecSymbol=0, nConsecCharType=0, nSeqAlpha=0, nSeqNumber=0, nSeqSymbol=0, nSeqChar=0, nReqChar=0, nMultConsecCharType=0;
  var nMultRepChar=1, nMultConsecSymbol=1;
  var nMultMidChar=2, nMultRequirements=2, nMultConsecAlphaUC=2, nMultConsecAlphaLC=2, nMultConsecNumber=2;
  var nReqCharType=3, nMultAlphaUC=3, nMultAlphaLC=3, nMultSeqAlpha=3, nMultSeqNumber=3, nMultSeqSymbol=3;
  var nMultLength=4, nMultNumber=4;
  var nMultSymbol=6;
  var nTmpAlphaUC="", nTmpAlphaLC="", nTmpNumber="", nTmpSymbol="";
  var sAlphas = "abcdefghijklmnopqrstuvwxyz";
  var sNumerics = "01234567890";
  var sSymbols = ")!@#$%^&*()";
  var sComplexity = "Too Short";
  var nMinPwdLen = customerMinPasswordLength;
  if (pwd) {
   nScore = parseInt(pwd.length * nMultLength);
   nLength = pwd.length;
   var arrPwd = pwd.replace(/\s+/g,"").split(/\s*/);
   var arrPwdLen = arrPwd.length;
   
   /* Loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches */
   for (var a = 0; a < arrPwdLen; a++) {
     if (arrPwd[a].match(/[A-Z]/g)) {
      if (nTmpAlphaUC !== "") { 
        if ((nTmpAlphaUC + 1) == a) { 
          nConsecAlphaUC++; 
          nConsecCharType++; 
        } 
      }
      nTmpAlphaUC = a;
      nAlphaUC++;
     }else if (arrPwd[a].match(/[a-z]/g)) {
      if (nTmpAlphaLC !== "") { 
        if ((nTmpAlphaLC + 1) == a) { 
          nConsecAlphaLC++; 
          nConsecCharType++; 
        } 
      }
      nTmpAlphaLC = a;
      nAlphaLC++;
     }else if (arrPwd[a].match(/[0-9]/g)) { 
      if (a > 0 && a < (arrPwdLen - 1)) { 
        nMidChar++; 
      }
      if (nTmpNumber !== "") { 
        if ((nTmpNumber + 1) == a) { 
          nConsecNumber++; 
          nConsecCharType++; 
        } 
      }
      nTmpNumber = a;
      nNumber++;
     }else if (arrPwd[a].match(/[^a-zA-Z0-9_]/g)) { 
      if (a > 0 && a < (arrPwdLen - 1)) { 
        nMidChar++; 
      }
      if (nTmpSymbol !== "") { 
        if ((nTmpSymbol + 1) == a) { 
          nConsecSymbol++; 
          nConsecCharType++; 
        } 
      }
      nTmpSymbol = a;
      nSymbol++;
     }
     /* Internal loop through password to check for repeat characters */
     var bCharExists = false;
     for (var b=0; b < arrPwdLen; b++) {
       if (arrPwd[a] == arrPwd[b] && a != b) { /* repeat character exists */
         bCharExists = true;
         nRepInc += Math.abs(arrPwdLen/(b-a));
       }
     }
     if (bCharExists) { 
       nRepChar++; 
       nUnqChar = arrPwdLen-nRepChar;
       nRepInc = (nUnqChar) ? Math.ceil(nRepInc/nUnqChar) : Math.ceil(nRepInc); 
     }
   }
   
   /* Check for sequential alpha string patterns (forward and reverse) */
   for (var s=0; s < 23; s++) {
     var sFwd = sAlphas.substring(s,parseInt(s+3));
     var sRev = sFwd.strReverse();
     if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqAlpha++; nSeqChar++;}
   }
   
   /* Check for sequential numeric string patterns (forward and reverse) */
   for (var s=0; s < 8; s++) {
     var sFwd = sNumerics.substring(s,parseInt(s+3));
     var sRev = sFwd.strReverse();
     if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqNumber++; nSeqChar++;}
   }
   
   /* Check for sequential symbol string patterns (forward and reverse) */
   for (var s=0; s < 8; s++) {
     var sFwd = sSymbols.substring(s,parseInt(s+3));
     var sRev = sFwd.strReverse();
     if (pwd.toLowerCase().indexOf(sFwd) != -1 || pwd.toLowerCase().indexOf(sRev) != -1) { nSeqSymbol++; nSeqChar++;}
   }
   
  /* Modify overall score value based on usage vs requirements */
   /* General point assignment */
   if (nAlphaUC > 0 && nAlphaUC < nLength) { 
     nScore = parseInt(nScore + ((nLength - nAlphaUC) * 2));
   }
   if (nAlphaLC > 0 && nAlphaLC < nLength) { 
     nScore = parseInt(nScore + ((nLength - nAlphaLC) * 2)); 
   }
   if (nNumber > 0 && nNumber < nLength) { 
     nScore = parseInt(nScore + (nNumber * nMultNumber));
   }
   if (nSymbol > 0) {  
     nScore = parseInt(nScore + (nSymbol * nMultSymbol));
   }
   if (nMidChar > 0) { 
     nScore = parseInt(nScore + (nMidChar * nMultMidChar));
   }
   /* Point deductions for poor practices */
   if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {  // Only Letters
     nScore = parseInt(nScore - nLength);
     nAlphasOnly = nLength;
   }
   if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {  // Only Numbers
     nScore = parseInt(nScore - nLength); 
     nNumbersOnly = nLength;
   }
   if (nRepChar > 0) {  // Same character exists more than once
     nScore = parseInt(nScore - nRepInc);
   }
   if (nConsecAlphaUC > 0) {  // Consecutive Uppercase Letters exist
     nScore = parseInt(nScore - (nConsecAlphaUC * nMultConsecAlphaUC));
   }
   if (nConsecAlphaLC > 0) {  // Consecutive Lowercase Letters exist
     nScore = parseInt(nScore - (nConsecAlphaLC * nMultConsecAlphaLC)); 
   }
   if (nConsecNumber > 0) {  // Consecutive Numbers exist
     nScore = parseInt(nScore - (nConsecNumber * nMultConsecNumber));  
   }
   if (nSeqAlpha > 0) {  // Sequential alpha strings exist (3 characters or more)
     nScore = parseInt(nScore - (nSeqAlpha * nMultSeqAlpha)); 
   }
   if (nSeqNumber > 0) {  // Sequential numeric strings exist (3 characters or more)
     nScore = parseInt(nScore - (nSeqNumber * nMultSeqNumber)); 
   }
   if (nSeqSymbol > 0) {  // Sequential symbol strings exist (3 characters or more)
     nScore = parseInt(nScore - (nSeqSymbol * nMultSeqSymbol)); 
   }

   /* Determine if mandatory requirements have been met and set image indicators accordingly */
   var arrChars = [nLength,nAlphaUC,nAlphaLC,nNumber,nSymbol];
   var arrCharsIds = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol"];
   var arrCharsLen = arrChars.length;
   for (var c=0; c < arrCharsLen; c++) {
     if (arrCharsIds[c] == "nLength") { 
      var minVal = parseInt(nMinPwdLen - 1); 
     } else { 
      var minVal = 0; 
     }
     if ((arrChars[c] == parseInt(minVal + 1))  || (arrChars[c] > parseInt(minVal + 1))) { 
      nReqChar++;
     }
   }
   nRequirements = nReqChar;
   if (pwd.length >= nMinPwdLen) { var nMinReqChars = 3; } else { var nMinReqChars = 4; }
   if (nRequirements > nMinReqChars) {  // One or more required characters exist
     nScore = parseInt(nScore + (nRequirements * 2)); 
   }
   
   /* Determine complexity based on overall score */
   if (nScore > 100) { nScore = 100; } else if (nScore < 0) { nScore = 0; }
   if (nScore >= 0 && nScore < 20) { sComplexity = "Very Weak"; }
   else if (nScore >= 20 && nScore < 40) { sComplexity = "Weak"; }
   else if (nScore >= 40 && nScore < 60) { sComplexity = "Good"; }
   else if (nScore >= 60 && nScore < 80) { sComplexity = "Strong"; }
   else if (nScore >= 80 && nScore <= 100) { sComplexity = "Very Strong"; }
  if(nAlphaUC > 0 && nAlphaLC > 0 && nNumber > 0 && nSymbol > 0 && nLength >= nMinPwdLen ){
      return nScore;
    }else{
      return 0;
    }
  }
}
String.prototype.strReverse = function() {
   var newstring = "";
   for (var s=0; s < this.length; s++) {
     newstring = this.charAt(s) + newstring;
   }
   return newstring;
}; 

/* Cart popup decrease qty */
function cartblockdecreaseQty(pid) {
    if (jQuery('#qty_cart_' + pid).val() > 0) {
        var decreaseQty = parseInt(jQuery('#qty_cart_' + pid).val()) - 1;
        jQuery('#qty_cart_' + pid).val(decreaseQty);
        var quoteitemId = jQuery('#cartpopup_quoteitemid_' + pid).val();
        var hidecart = jQuery('#hidcart_' + pid).val();
        /* Update hidden cart qty */
        updateCartPopup(updateCartQtyAjaxPopup, encrptyupdateCartQtyAjaxPopup, pid, quoteitemId, hidecart);
    }
}

/* Cart popup increase qty */
function cartblockincreaseQty(pid) {
    var currentQty = parseInt(jQuery('#qty_cart_' + pid).val());
    if (!jQuery.isNumeric(currentQty)) {
        currentQty = 0;
    }
    var increaseQty = currentQty + 1;
    jQuery('#qty_cart_' + pid).val(increaseQty);
    var quoteitemId = jQuery('#cartpopup_quoteitemid_' + pid).val();
    var hidecart = jQuery('#hidcart_' + pid).val();
    /* Update hidden cart qty */
    updateCartPopup(updateCartQtyAjaxPopup, encrptyupdateCartQtyAjaxPopup, pid, quoteitemId, hidecart);
}

/* Update item page */
jQuery(document).off('focusout', "#cart-sidebar .input-text.qty").on('focusout', "#cart-sidebar .input-text.qty", function(event) {
    event.preventDefault();
    if (jQuery(this).next().val() != jQuery(this).val()) {
        var pid = jQuery(this).prev().parent().data('productid');
        var quoteitemId = jQuery('#cartpopup_quoteitemid_' + pid).val();
        var hidecart = jQuery('#hidcart_' + pid).val();
        updateCartPopup(updateCartQtyAjaxPopup, encrptyupdateCartQtyAjaxPopup, pid, quoteitemId, hidecart);
    }
});

/* Update cart for this page */
function updateCartPopup(url, action, pid, quoteitemId, hidecart) {
    var input = jQuery('#qty_cart_' + pid);
    var quoteid = input.attr('data-id');
    var qty = input.val();
    jQuery(".block-cart").addClass('animated-cart');
    jQuery.ajax({
        url: url,
        beforeSend: function(request) {
            request.setRequestHeader('anti-csrf-token', ENCRYPT_FORM_KEY + '@' + action);
        },
        data: 'quoteitemid=' + quoteitemId + '&form_key=' + FORM_KEY  + '&qty=' + qty + '&hidecart=' + hidecart + '&quoteid=' + quoteid,
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            setAjaxDataCartPopupAjax(data, pid);
            if(data.cart_quantities){
              showCartQuantities(data.cart_quantities);
            }
            if(jQuery(document).find('.qty-control-visible').length > 0) {
              jQuery(document).find('.qty-control-visible').each(function() {
                  var productId = jQuery(this).find('input[name="qty"]').attr('data-product-id');
                  setCartHtml(productId);
              });
            }
        }
    });
}

/* Set return data after ajax call */
function setAjaxDataCartPopupAjax(data, pid) {
    var hidecart = jQuery('#hidcart_' + pid).val();
    // remove all message blocks
    jQuery(document).find('.messages').remove();
    if (data.status == 'ERROR') {
        jQuery('#qty_cart_' + pid).val(hidecart);
        alert(data.message);
        jQuery(".block-cart").removeClass('animated-cart');
    } else {
        jQuery(".block-cart").removeClass('animated-cart');
        //update minicart for rwd theme
        if (data.minicart) {
            if (jQuery('.block-cart')) {
              let cartId = data.cartid;
              jQuery('a.cartlink-' + cartId).parent().replaceWith(data.minicart);
              jQuery('a.cartlink-' + cartId).parent().addClass('hovercart iscartactive');
              var hovercart = jQuery('a.cartlink-' + cartId).parent().find('.block-content');
              if(jQuery(document).find("#accesories-product-popup").length > 0){
                hovercart.hide();
              }else{
                hovercart.show();
              }
            }            
        }
        //update cart
        if (data.checkout) {
            if (jQuery('.cart').length) {
                jQuery('.cart').replaceWith(data.checkout);
            }
        }

        //update checkoutmethods
        if (data.checkoutmethods) {
            if (jQuery('.totals').length) {
              jQuery('.totals').find('ul.checkout-types').html('<li>' + data.checkoutmethods + '</li>');
            }
        }

        if (data.status == 'SUCCESS') {
            //Display Success message
            if(jQuery('.acc_qty_cart_' + pid).length){
              var cartItemCount = jQuery('#hidcart_' + pid).val();
              jQuery('.acc_qty_cart_' + pid).val(cartItemCount);
            }

            if (data.message) {
                if (data.couponcode == 1 && data.couponcode_cancel == 1) {
                    jQuery(document).find('.not-valid-message-coupon').empty();
                    jQuery(document).find('valid-message-coupon').empty();
                    jQuery('.discount-form').after('<div class="not-valid-message-coupon">' + data.message + '</div>');
                } else if (data.couponcode == 1) {
                    jQuery(document).find('.not-valid-message-coupon').empty();
                    jQuery(document).find('.valid-message-coupon').empty();
                    jQuery('.discount-form').after('<div class="valid-message-coupon">' + data.message + '</div>');
                } else {
                    jQuery('.uname').after('<ul class="messages"><li class="success-msg"><ul><li><span>' + data.message + '</span></li></ul></li></ul>');
                }
            }
        }
    }
}
jQuery(document).off('click', ".ms-header .ap-cart-640").on('click', ".ms-header .ap-cart-640", function(event) {
  jQuery(this).toggleClass("ap-card-dark");
  jQuery(this).next().toggleClass("m-cflex");
  jQuery(".msh-services>li>a").removeClass("active-tab-icon");  
});