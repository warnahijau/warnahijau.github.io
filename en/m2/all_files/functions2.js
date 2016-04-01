
$(document).ready(function() {

	var cdn = "all_files";

	$('#step1 span').click(function() {
		$('#step1').hide();
    $('#babe_step1').hide();

		$('#step1_ind .step_ind').css('background-image', "url('all_files/button_1.png')");
		$('#step2_ind .step_ind').css('background-image', "url('all_files/active_button_2.png')");

		$('#step2').fadeIn();
		$('#babe_step2').fadeIn();
		
	});

	$('#step2 span').click(function() {
		$('#step2').hide();
		$('#babe_step2').hide();

		$('#step2_ind .step_ind').css('background-image', "url('all_files/button_2.png')");
		$('#step3_ind .step_ind').css('background-image', "url('all_files/active_button_3.png')");
		
		$('#step4').fadeIn();
		$('#babe_step3').fadeIn();
	});

	$('#step3 span').click(function() {
		$('#step4').hide();
		$('#babe_step3').hide();

		$('#step3_ind .step_ind').css('background-image', "url('all_files/button_3.png')");
		$('#step4_ind .step_ind').css('background-image', "url('all_files/active_button_4.png')");
		
		$('#step4').fadeIn();
		$('#babe_step4').fadeIn();
	});

	$('#step4btn1').click(function() {
		$('#step4').hide();
		$('#babe_step3').hide();
   // $('#agreebtn').attr('href',$('#step4btn1').attr('data-url'));

		$('#step3_ind .step_ind').css('background-image', "url('all_files/button_3.png')");
		$('#step4_ind .step_ind').css('background-image', "url('all_files/active_button_4.png')");
		
		$('#babe_step4').fadeIn();
		validate();
	});

	$('#step4btn2').click(function() {
		$('#step4').hide();
		$('#babe_step3').hide();
   // $('#agreebtn').attr('href',$('#step4btn2').attr('data-url'));

		$('#step3_ind .step_ind').css('background-image', "url('all_files/button_3.png')");
		$('#step4_ind .step_ind').css('background-image', "url('all_files/active_button_4.png')");
		
		$('#babe_step4').fadeIn();
		validate();
	});
	
	function validate() {
	
		$('#step5').fadeIn();
		
		$('#v1h').fadeIn();
		
		setTimeout(function(){  $('#v1h').hide(); $('#v2h').fadeIn(); $('#v1b').slideDown(); }, 1200);
		setTimeout(function(){  $('#v2h').hide(); $('#v3h').fadeIn(); $('#v2b').slideDown(); }, 2400);
		setTimeout(function(){  $('#v3h').hide(); $('#v4h').fadeIn(); $('#v3b').slideDown(); $('#v4b').slideDown(); $('#rules').slideDown(); $('#cta').slideDown(); }, 3600);
	}
	
});