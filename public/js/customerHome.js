(function ($, window) {
    //console.log(window.location.href)
    if (window.location.href.includes('/home')) {
        $('#myNavbar ul li.home').addClass('active');
        $('#myNavbar ul li.home').siblings().removeClass('active');
    }
    if (window.location.href.includes('/profile')) {
        $('#myNavbar ul li.profile').addClass('active');
        $('#myNavbar ul li.profile').siblings().removeClass('active');
    }
    if (window.location.href.includes('/goals')) {
        $('#myNavbar ul li.goals').addClass('active');
        $('#myNavbar ul li.goals').siblings().removeClass('active');
    }
    if (window.location.href.includes('/financialProducts')) {
        $('#myNavbar ul li.products').addClass('active');
        $('#myNavbar ul li.products').siblings().removeClass('active');
    }
    //show product details card for specifc tool
    $('.toggleDetails').on('click', function () {
        $("#detail" + this.id).removeClass('hidden');
    });
    //hide product details card for specific tool
    $('.no-product-message').on('click', function () {
        var detailId = $(this).closest('div').attr('id'); 
        $("#" + detailId).addClass('hidden');
    });

    //******GOAL: RETIREMENT**********************************************
    var retirementForm = $('#retirement-form');

    retirementForm.submit((event) => {
        event.preventDefault();
        console.log('here')
        var yearsAfterRetirement = $('#years-after-retirement').val();
        var incomeIncrease = $('#income-increase').val();
        var interestRate = $('#interest-rate').val();
        var requiredIncome = $('#required-income').val();

        var retirementData = {
            goal: 'retirement',
            data: {
                expectedYearsAfterRetirement: yearsAfterRetirement,
                expectedAnnualIncomeIncrease: incomeIncrease,
                interestRate: interestRate,
                incomeRequiredAfterRetirement: requiredIncome
            }
        }

        var retirementRequestConfig = {
            method: "POST",
            url: "/customers/calculations",
            contentType: 'application/json',
            data: JSON.stringify(retirementData)
        };

        $.ajax(retirementRequestConfig).then(function (responseMessage) {
            $('body').html(responseMessage);
        });
    });

    //******GOAL: HOUSE**********************************************
    var buyHouseForm = $('#buy-house-form');

    buyHouseForm.submit((event) => {
        event.preventDefault();

        var price = $('#house-price').val();
        var loanTerm = $('#house-loan-term').val();
        var interestRate = $('#house-finance-rate').val();
        var downPayment = $('#house-down-payment').val();

        var houseData = {
            goal: 'newHouse',
            data: {
                price: price,
                downPayment: downPayment,
                months: loanTerm,
                interestRate: interestRate
            }
        }

        var houseRequestConfig = {
            method: "POST",
            url: "/customers/calculations",
            contentType: 'application/json',
            data: JSON.stringify(houseData)
        };

        $.ajax(houseRequestConfig).then(function (responseMessage) {
            $('body').html(responseMessage);
        });
    });

    //******GOAL: CAR**********************************************
    var buyCarForm = $('#buy-car-form');

    buyCarForm.submit((event) => {
        event.preventDefault();

        var price = $('#car-price').val();
        var loanTerm = $('#car-loan-term').val();
        var interestRate = $('#car-finance-rate').val();
        var downPayment = $('#car-down-payment').val();

        var carData = {
            goal: 'newCar',
            data: {
                price: price,
                downPayment: downPayment,
                months: loanTerm,
                interestRate: interestRate
            }
        }

        var carRequestConfig = {
            method: "POST",
            url: "/customers/calculations",
            contentType: 'application/json',
            data: JSON.stringify(carData)
        };

        $.ajax(carRequestConfig).then(function (responseMessage) {
            console.log(responseMessage)
            $('body').html(responseMessage);
        });
    });










    //*****UPDATE INFO**********************************************

    var signupRemCheckBox = $("#update-remember-checkbox");
    //var idField = $('#nodeUUID');
    var updateUsername = $("#username");
    var updatePassword = $("#password");
    var updateFirstName = $("#firstName");
    var updateMiddleInit = $("#middleInit");
    var updateLastName = $("#lastName");
    //var updateDOB = $("#DOB");
    var updateYear = $("#year");
    var updateMonth = $("#month");
    var updateDay = $("#day");
    var updateNoDependents = $("#noDependents");
    var updateZipCode = $("#zipCode");
    var updateMonthlyIncome = $("#monthlyIncome");
    var updateRetirementAge = $("#desiredRetirementAge");
    var updateStocks = $("#stocks");
    var updateBonds = $("#bonds");
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
    var updateCreditCardDebt = $("#creditCardDebt");
    var updateOtherDebt = $("#otherDebt");

    var successText = document.getElementById("successText");
    var errorText = document.getElementById("errorText");

    $(document.body).click(function () {
        if (successText) {
            successText.classList.add("hidden");
        }
        if (errorText) {
            errorText.classList.add("hidden");
        }
    });

    $('#update-form').submit((event) => {
        event.preventDefault();
        //var id = idField.val();
        var password = updatePassword.val();
        var username = updateUsername.val();
        var firstName = updateFirstName.val();
        var middleInit = updateMiddleInit.val();
        var lastName = updateLastName.val();
        var year = updateYear.val();
        var month = updateMonth.val();
        var day = updateDay.val();
        var DOB = year + "-" + month + "-" + day;
        //var  DOB = updateDOB.val();
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
            //id: id,
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
                assets: {
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
                    mortgage: mortgage,
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
            success: function (responseMessage) {
                successText.classList.remove("hidden");
                //alert("Financial information successfully updated.");
            },
            error: function (responseMessage) {
                errorText.classList.remove("hidden");
            }
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            //console.log(responseMessage);
        });

        return false;
    });


})(window.jQuery, window);