(function ($, window) {
	$('#show-update-form-button').click(() => {
		 $('#update-success').addClass('hidden');
		$('#update-form').removeClass('hidden');
		$('#show-update-form-button').addClass('hidden');
		$('#goal-form').addClass('hidden');
		$('#show-goal-form-button').removeClass('hidden');
	})
	$('#show-goal-form-button').click(() => {
		$('#update-success').addClass('hidden');
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

	var signupRemCheckBox = $("#update-remember-checkbox");

	var idField = $('#nodeUUID');
	var updateUsername = $("#username");
    var updatePassword = $("#password");
    var updateFirstName = $("#firstName");
    var updateMiddleInit= $("#middleInit");
    var updateLastName = $("#lastName");
    var updateDOB = $("#DOB");
    var updateNoDependents = $("#noDependents");
    var updateZipCode = $("#zipCode");
    var updateMonthlyIncome = $("#monthlyIncome");
    var updateRetirementAge = $("#desiredRetirementAge");
    var updateStocks = $("#stocks");
    var updateBonds =  $("#bonds");
    var updateCash = $("#cash");
    var updateRetirementAccounts = $("#retirementAccounts");
    var updateAnnuities = $("#annuities");
    var updateProperty = $("#property");
    var updateOther = $("#other");
    var updateSavingsRateOfIncome = $("#savingsRateOfIncome");
    var updateCar = $("#car");
    var updateRentOrMortgage = $("#rentOrMortgage");
    var updateGroceries = $("#groceries");
    var updateBills = $("#bills");
    var updateOtherExpenses = $("#otherExpenses");
    var updateMortage = $("#mortgage");
    var updateHomeEquityLoans = $("#homeEquityLoans");
    var updateStudentLoans = $("#studentLoans");
    var updateCreditCardDebt =$("#creditCardDebt");
    var updateOtherDebt = $("#otherDebt");
	

	$('#update-form').submit((event) => {
        event.preventDefault();
        var id = idField.val();
        var password = updatePassword.val();
        var username = updateUsername.val();
        var firstName = updateFirstName.val();
        var middleInit = updateMiddleInit.val();
        var lastName = updateLastName.val();
        var  DOB = updateDOB.val();
        var noDependents = updateNoDependents.val();
        var zipCode = updateZipCode.val();
        var monthlyIncome = updateMonthlyIncome.val();
        var desiredRetirementAge = updateRetirementAge.val();
        var savingsRateOfIncome = updateSavingsRateOfIncome.val();
        var stocks = updateStocks.val();
        var bonds = updateBonds.val();
        var cash = updateCash.val();
        var retirementAccounts = updateRetirementAccounts.val();
        var annuities = updateAnnuities.val();
        var property = updateProperty.val();
        var other = updateOther.val();
        var car = updateCar.val();
        var rentOrMortgage = updateRentOrMortgage.val();
        var groceries = updateGroceries.val();
        var bills = updateBills.val();
        var otherExpenses = updateOtherExpenses.val();
        var mortgage = updateMortage.val();
        var homeEquityLoans = updateHomeEquityLoans.val();
        var studentLoans = updateStudentLoans.val();
        var creditCardDebt = updateCreditCardDebt.val();
        var otherDebt = updateOtherDebt.val();


        var rememberMe = false;

        if (signupRemCheckBox.is(':checked')) {
            rememberMe = true;
        }

        var credentials = {
            id: id,
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
                success: function(responseMessage) {
                    alert("Financial information successfully updated.");
                }
            };
            
            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage);
                 /*var loginRequest = {
                        method: "POST",
                        url: "/login",
                        contentType: 'application/json',
                        data: JSON.stringify({username: credentials.username, password: credentials.password}),
                 };
                    $.ajax(loginRequest).then(function (response) {
                        window.location.assign("/customers/home");
                    });*/
            });
            
        return false;
    });




	











})(window.jQuery, window);