// Import jQuery
$(document).ready(function () {
    
    // Add novalidate attribute to the form
    $('#form').attr('novalidate', 'novalidate');

    $('#form').on('submit', function(event) {
        event.preventDefault();
        updateScreenRenders();
    });

    function updateScreenRenders() {
        const emailInput = $('#email');
        const errorMessageMobile = $('.mobile-error');
        const errorMessageWeb = $('.web-error');
    
        if (!validateEmail(emailInput.val().trim())) {
            if(getScreenDimensions().width > 1440) {
                errorMessageWeb.show();
                errorMessageMobile.hide();
            } else {
                errorMessageMobile.show();
                errorMessageWeb.hide();
            }
            emailInput.addClass('error-input');
        } else {
            errorMessageMobile.hide();
            errorMessageWeb.hide();
            emailInput.removeClass('error-input');
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function getScreenDimensions() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    $(window).on('resize', updateScreenRenders);
});
