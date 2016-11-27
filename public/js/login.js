(function ($) {
    /*login fields*/
    var loginEmailField = $("#loginEmail");
    var loginPassField = $("#loginPassword");
    var loginRemCheckBox = $("#login-remember-checkbox");
    var loginButton = $("#login-button");
    /*signup fields*/ 
    var signupEmailField = $("#signupEmail");
    var signupPassField = $("#signupPassword");
    var signupNameField = $("#signupName");
    var signupRemCheckBox = $("#signup-remember-checkbox");
    var signupButton = $("#signup-button");

/*authenticate user login*/
/*
    loginButton.on("click", () => {
        var emailValue = loginEmailField.val();
        var passValue = loginPassField.val();
        var rememberMe = false;

        if (loginRemCheckBox.is(':checked')) {
            rememberMe = true;
        }

        var credentials = {
            username: emailValue,
            password: passValue
        };

        if (emailValue && passValue) {
            var requestConfig = {
                method: "POST",
                url: "/auth/",
                contentType: 'application/json',
                data: JSON.stringify(credentials)
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                //logged in successfully
                window.location.assign("/customers/home" + responseMessage.message);
            },function () {
               // alert("Sorry, we don't recognize those credentials. Please check them and try again!");
                //login failed, prompt user to check credentials and retry
                $("#errorModal").modal();
                $('.login-error').removeClass('hidden');
            });

        }

        return false;
    });
*/
/*create new user*/ 
    signupButton.on("click", () => {
        var emailValue = signupEmailField.val();
        var passValue = signupPassField.val();
        var nameValue = signupNameField.val();
        var rememberMe = false;

        if (signupRemCheckBox.is(':checked')) {
            rememberMe = true;
        }

        var credentials = {
            name: nameValue,
            username: emailValue,
            pass: passValue
        };

        if (emailValue && passValue) {
            var requestConfig = {
                method: "POST",
                url: "/customers/new",
                contentType: 'application/json',
                data: JSON.stringify(credentials)
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage);
            });

        }

        return false;
    });

/*Flip to sign up card*/ 
    $('.new-signup').click(function(){
        $('.flip').find('.login-signup').addClass('flipped');
        return false;
    });
/*Flip back to login card*/ 
    $('.back-to-login').click(function(){
        $('.flip').find('.login-signup').removeClass('flipped');
        return false;
    });


})(window.jQuery);