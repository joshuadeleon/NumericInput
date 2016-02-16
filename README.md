NumericInput
==============

A simple jQuery plug-in which sets an (input) element to only allow numbers.


### Options ###

allowFloat: (boolean) Allows floating point numbers to be entered. Default: false.

allowNegative: (boolean) Allows negative numbers to be entered. Default: false.

useCommaInsteadOfDot: (boolean) Allowd , and disallows . to be entered. Default: false.

### Usage ###

Given the following input element
    `<input id="elementID" type="text" />`

To create an input element which only accepts positive integers simple use the .numericInput()
function.

    <script type="text/javascript" src="../numericInput.min.js"></script>
    <script>
		$(function() {
			$("#elementID").numericInput();
		});
    </script>


To create an input element which accepts positive or negative integer set the `allowNegative` option
to `true`

    $("#elementID").numericInput({ allowNegative: true });
	 
To create an input element which accepts positive numbers (floating point) set the `allowFloat` option to 
`true`

    $("#elementID").numericInput({ allowFloat: true });
	 
To create an input element which accepts any number (positive or negative floating point) set both 
`allowFloat` and `allowNegative` to `true`

	$("#elementID").numericInput({ allowFloat: true, allowNegative: true });
	
To allow a comma instead of a dot as decimal separator set the `useCommaInsteadOfDot` option to `true`

	$("#elementID").numericInput({ useCommaInsteadOfDot: true });