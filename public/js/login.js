(function ($) {
    var emailField = $("#inputEmail");
    var passField = $("#inputPassword");
    var remCheckBox = $("#remember-checkbox");
    var submitButton = $("#submit-button");

    submitButton.on("click", () => {
        var emailValue = emailField.val();
        var passValue = passField.val();
        var rememberMe = false;

        if (remCheckBox.is(':checked')) {
            rememberMe = true;
        }

        var credentials = {
            username: emailValue,
            pass: passValue
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
            });

        }

        return false;
    });

})(window.jQuery);