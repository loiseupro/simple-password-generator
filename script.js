$(document).ready(function(){

	/* Default options */
	var length = 12;
	var with_letters = 1;
	var with_numbers = 1;
	var with_symbols = 1;

	/* Array values definition */
	var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var symbols = ['[', '!', '@', '#', '$', '%', '^', '(', ')', '_', '+', '|', '-', '=', ';', ':', '?' ];
	var letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

	/* Check if value is numeric */
	function isNumeric(str) {
		if (typeof str != "string") return false; 
		return !isNaN(str) && !isNaN(parseFloat(str));
	}

	/* Suffle string */
	function shuffle(value){
		return value.split('').sort(function(){return 0.5-Math.random()}).join('');
	}

	/* Generate password */
	function generate(){
		
		var result = '';
		var pos = 0;
		var toLower = true;

		while(result.length < length){

			var temp = '';

			if(pos == 0 && with_numbers == 1){					
				temp = numbers[Math.floor(Math.random()*numbers.length)];					
			}else if(pos == 1 && with_symbols == 1){
				temp = symbols[Math.floor(Math.random()*symbols.length)];					
			}else if(pos == 2 && with_letters == 1){
				temp = letters[Math.floor(Math.random()*letters.length)];				
			}
			
			if(typeof temp === 'string'){
				if(toLower){
					temp = temp.toLowerCase();
					toLower = false;
				}else{
					toLower = true;
				}
			}

			result += temp;
			pos++;
			if(pos == 3 ) pos = 0;									

		}

		$("#result").html(shuffle(result));
		var actual = $("#result").text();			
		$("#history").prepend('<p class="copy">'+actual+'</p>');

	}

	/* Detect options */
	function runProcess(){
		length = $('input[name=length]', '#theForm').val();		
		with_letters = $('input[name=include_letter]:checked', '#theForm').val();
		with_numbers = $('input[name=include_number]:checked', '#theForm').val();
		with_symbols = $('input[name=include_symbol]:checked', '#theForm').val();	

		if(!with_letters && !with_numbers && !with_symbols){
			alert('You must select some group of characters!');	
			return false;
		}

		/* Check */
		if(length.length > 0){
			if(!isNumeric(length) || length <= 0){
				alert('The length field does not contain a valid value');	
				return false;		
			}			
			generate();			
		}

	}

	/* Show copied msg */
	function showCopiedMsg(){
		$(".copied-msg-container").removeClass("hidden");
		setTimeout(hideCopiedMsg, 1500)
	}

	/* Hide copied msg */
	function hideCopiedMsg(){
		$(".copied-msg-container").addClass("hidden");
	}	

	/* Detect click buttons */
	$("#generate").click(function(){
		runProcess();
	});

	/* Set default length and clear history */
	$("#clear").click(function(){
		$('input[name=length]', '#theForm').val(12);
		$("#history").html('');
		runProcess();
	});

	/* Detect and copy msg in items with class .copy */
	$(document).on('click', '.copy', function (event) {
		var $tempElement = $("<input>");
		$("body").append($tempElement);
		$tempElement.val($(this).closest(".copy").text()).select();
		document.execCommand("Copy");
		$tempElement.remove();
		showCopiedMsg();
	});

	/* Decrease length value */	
	$(document).on('click', '.btn-decrease', function (event) {
		var length_value = $('input[name=length]', '#theForm').val();
		if(length_value > 1) $('input[name=length]', '#theForm').val(length_value-1);
	});

	/* Increase length value */	
	$(document).on('click', '.btn-increase', function (event) {
		var length_value = parseInt($('input[name=length]', '#theForm').val());
		if(length_value > 0) $('input[name=length]', '#theForm').val(length_value+1);
	});

	/* Init */
	$('input[name=include_letter]').prop('checked', true);
	$('input[name=include_number]').prop('checked', true);
	$('input[name=include_symbol]').prop('checked', true);
	runProcess();

});