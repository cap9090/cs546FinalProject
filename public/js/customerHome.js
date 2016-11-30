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

















})(window.jQuery, window);