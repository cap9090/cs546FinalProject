(function ($) {
    /*login fields*/

    var loginEmailField = $("#loginEmail");
    var loginPassField = $("#loginPassword");
    var loginRemCheckBox = $("#login-remember-checkbox");
    var loginButton = $("#login-button");
    /*signup fields*/

    var signupRemCheckBox = $("#signup-remember-checkbox");
    var signupButton = $("#signup-button");
    var signupUsername = $("#username");
    var signupPassword = $("#password");
    var signupFirstName = $("#firstName");
    var signupMiddleInit= $("#middleInit");
    var signupLastName = $("#lastName");
    var signupDOB = $("DOB");
    var signupNoDependents = $("#noDependents");
    var signupZipCode = $("zipCode");
    var signupMonthlyIncome = $("#monthlyIncome");
    var signupRetirmentAge = $("desiredRetirementAge");
    var signupStocks = $("stocks");
    var signupBonds =  $("bonds");
    var signupCash = $("cash");
    var signupRetirementAccounts = $("retirementAccounts");
    var signupAnnuities = $("annuites");
    var signupProperty = $("property");
    var signupOther = $("other");
    var signupSavingsRateOfIncome = $("savingsRateOfIncome");
    var signupCar = $("car");
    var signupRentOrMortgage = $("rentOrMortgage");
    var signupGroceries = $("groceries");
    var signupBills = $("bills");
    var signupOtherExpenses = $("otherExpenses");
    var signupMortage = $("mortgage");
    var signupHomeEquityLoans = $("homeEquityLoans");
    var signupStudentLoans = $("studentLoans");
    var signupCreditCardDebt =$("creditCardDebt");
    var signupOtherDebt = $("otherDebt");



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

        var password = signupPassword.val();
        var username = signupUsername.val();
        var firstName = signupFirstName.val();
        var middleInit = signupMiddleInit.val();
        var lastName = signupLastName.val();
        var  DOB = signupDOB.val();
        var noDependents = signupNoDependents.val();
        var zipCode = signupZipCode.val();
        var monthlyIncome = signupMonthlyIncome.val();
        var desiredRetirementAge = signupRetirementAccounts.val();
        var savingsRateOfIncome = signupSavingsRateOfIncome.val();
        var stocks = signupStocks.val();
        var bonds = signupBonds.val();
        var cash = signupCash.val();
        var retirementAccounts = signupRetirementAccounts.val();
        var annuities = signupAnnuities.val();
        var property = signupProperty.val();
        var other = signupOther.val();
        var car = signupCar.val();
        var rentOrMortgage = signupRentOrMortgage.val();
        var groceries = signupGroceries.val();
        var bills = signupBills.val();
        var otherExpenses = signupOtherExpenses.val();
        var mortgage = signupMortage.val();
        var homeEquityLoans = signupHomeEquityLoans.val();
        var studentLoans = signupStudentLoans.val();
        var creditCardDebt = signupCreditCardDebt.val();
        var otherDebt = signupOtherDebt.val();


        var rememberMe = false;

        if (signupRemCheckBox.is(':checked')) {
            rememberMe = true;
        }

        var credentials = {
            password: password,
            username: username,
            profile: {
                firstName: firstName,
                middleInit: middleInit,
                lastName: lastName,
                DOB: DOB,
                noDependents, noDependents,
                zipCode: zipCode,
                monthlyIncome: monthlyIncome,
                desiredRetirementAge: desiredRetirementAge,
                savingsRateOfIncome: savingsRateOfIncome,
                assets : {
                  stocks: stocks,
                  bonds: bonds,
                  cash: cash,
                  retirementAccounts: retirementAccounts,
                  annuities: annuities,
                  property: property,
                  other: other
                },
                monthlyCosts: {
                  car: car,
                  rentOrMortgage: rentOrMortgage,
                  groceries: groceries,
                  bills: bills,
                  otherExpenses: otherExpenses
                },
                liability: {
                  mortgage:mortgage,
                  homeEquityLoans: homeEquityLoans,
                  studentLoans: studentLoans,
                  creditCardDebt: creditCardDebt,
                  otherDebt: otherDebt
                }

              }
            };

        if (true) {
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
