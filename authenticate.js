$(document).ready(function () {
    
    const $form = $('#form');
    const $emailInput = $('#email');
    const $errorMessage = $('.error');
    const $errorMessageMobile = $('.mobile-error');
    const $errorMessageWeb = $('.web-error');

    $form.attr('novalidate', 'novalidate');

    $form.on('submit', function(event) {
        event.preventDefault();
        updateScreenRenders();
    });

    function updateScreenRenders() {
        const emailValue = $emailInput.val().trim();
        const isWideScreen = window.innerWidth >= 1440;
        const { showError, errorText } = validateEmail(emailValue);

        $emailInput.toggleClass('error-input', showError);
        $errorMessage.text(errorText);

        if (showError) {
            $errorMessageWeb.toggle(isWideScreen);
            $errorMessageMobile.toggle(!isWideScreen);
        } else {
            $errorMessageWeb.add($errorMessageMobile).hide();
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            return { showError: true, errorText: 'Email address is required' };
        }
        return emailRegex.test(email)
            ? { showError: false, errorText: '' }
            : { showError: true, errorText: 'Please provide a valid email address' };
    }

    $(window).on('resize', $.throttle(250, updateScreenRenders));
});
