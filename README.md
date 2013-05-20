NumericInput
==============

A simple jQuery plug-in which sets an (input) element to only allow numbers.


Usage
--------------
To create an input element which only accepts positive integers simple use the .numericInput()
function.

`<script>
	$(function() {
		$("#elementID").numericInput();
	});
</script>`


Options
--------------

allowFloat: (boolean) Allows floating point numbers to be entered. Default: false.

allowNegative: (boolean) Allows negative numbers to be entered. Default: false.
