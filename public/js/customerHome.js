(function ($, window) {
	$('#show-update-form-button').click(() => {
		$('#update-form').removeClass('hidden');
		$('#show-update-form-button').addClass('hidden');
		$('#goal-form').addClass('hidden');
		$('#show-goal-form-button').removeClass('hidden');
	})
	$('#show-goal-form-button').click(() => {
		$('#goal-form').removeClass('hidden');
		$('#show-goal-form-button').addClass('hidden');
		$('#update-form').addClass('hidden');
		$('#show-update-form-button').removeClass('hidden');
		
	})
	



	//create dropdown for retirement years
	$(function(){
		var $select = $(".retirementYears");
		for (i=1;i<=50;i++){
			$select.append($('<option></option>').val(i).html(i))
		}
	});


	/*

	var signupUsername = $("#username");
    var signupPassword = $("#password");
    var signupFirstName = $("#firstName");
    var signupMiddleInit= $("#middleInit");
    var signupLastName = $("#lastName");
    var signupDOB = $("#DOB");
    var signupNoDependents = $("#noDependents");
    var signupZipCode = $("#zipCode");
    var signupMonthlyIncome = $("#monthlyIncome");
    var signupRetirementAge = $("#desiredRetirementAge");
    var signupStocks = $("#stocks");
    var signupBonds =  $("#bonds");
    var signupCash = $("#cash");
    var signupRetirementAccounts = $("#retirementAccounts");
    var signupAnnuities = $("#annuities");
    var signupProperty = $("#property");
    var signupOther = $("#other");
    var signupSavingsRateOfIncome = $("#savingsRateOfIncome");
    var signupCar = $("#car");
    var signupRentOrMortgage = $("#rentOrMortgage");
    var signupGroceries = $("#groceries");
    var signupBills = $("#bills");
    var signupOtherExpenses = $("#otherExpenses");
    var signupMortage = $("#mortgage");
    var signupHomeEquityLoans = $("#homeEquityLoans");
    var signupStudentLoans = $("#studentLoans");
    var signupCreditCardDebt =$("#creditCardDebt");
    var signupOtherDebt = $("#otherDebt");
	

	('#update-form').submit((event) => {
        event.preventDefault();
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

     
            var requestConfig = {
                method: "PUT",
                url: "/customers/update",
                contentType: 'application/json',
                data: JSON.stringify(credentials),
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                 var loginRequest = {
                        method: "POST",
                        url: "/login",
                        contentType: 'application/json',
                        data: JSON.stringify({username: credentials.username, password: credentials.password}),
                    };
                    $.ajax(loginRequest).then(function (response) {
                        window.location.assign("/customers/home");
                        console.log(response);
                    });
            });

        return false;
    });




	*/











})(window.jQuery, window);