module.exports = {
	annuallyCompoundedTotal: (amount, interestRate, yearsToRetirement) => {
		return amount*Math.pow((1 + interestRate/100),yearsToRetirement);
	}
}

