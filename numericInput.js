///////////////////////////////////////////////////////////////
//  Original Author: Joshua De Leon
//  Modified By: Vivek Shrinivasan
//  File: numericInput.js
//  Description: Allows only numeric input in an element.
//  
//  If you happen upon this code, enjoy it, learn from it, and 
//  if possible please credit me: www.transtatic.com
///////////////////////////////////////////////////////////////

//  Sets a keypress event for the selected element allowing only numbers. Typically this would only be bound to a textbox.
(function($) {
  // Plugin defaults
  var defaults = {
    allowFloat: false,
    allowNegative: false,
    min: 0,
    max: 1
  };
  var ascii_digits = [48, 57];

  // Plugin definition
  //  allowFloat: (boolean) Allows floating point (real) numbers. If set to false only integers will be allowed. Default: false.
  //  allowNegative: (boolean) Allows negative values. If set to false only positive number input will be allowed. Default: false.
  //  min: (int/float) If set, when the user leaves the input if the entered value is too low it will be set to this value
  //  max: (int/float) If set, when the user leaves the input if the entered value is too high it will be set to this value
  $.fn.numericInput = function(options) {
    var $this = this;
    var settings = $.extend({}, defaults, options);
    var allowFloat = settings.allowFloat;
    var allowNegative = settings.allowNegative;
    var min = settings.min;
    var max = settings.max;
    var ascii_digits = [47, 58];
    var pattern = /^-?\d+\.?\d+$/;

    if(min == max) {
      throw ('The minimum value cannot be the same as the max value');
    } else if(min > max) { //If the values are swapped we swap them back
      var temp = min;
      min = max;
      max = temp;
    }

    // beautify the input type
    // add a class
    $this.addClass('numericInput');

    // attach an event of `keyup` on the element
    //  after the input has been inputted in the textbox
    $this.on('keyup', function(event) {
      var inputCode = event.which;
      var currentValue = $($this).val();

      if(inputCode > 0 && (inputCode < ascii_digits[0] || inputCode > ascii_digits[1])) {
        // Checks the if the character code is not a digit
        if(allowFloat == true && inputCode == 46) {
          // Conditions for a period (decimal point)
          //Disallows a period before a negative
          if(allowNegative == true && getCaret($this) == 0 && currentValue.charAt(0) == '-')
            return false;

          //Disallows more than one decimal point.
          if(currentValue.match(/[.]/))
            return false;
        } else if(allowNegative == true && inputCode == 45) { // Conditions for a decimal point
          if(currentValue.charAt(0) == '-')
            return false;

          if(getCaret($this) != 0)
            return false;
        } else if(inputCode == 8 || inputCode == 67 || inputCode == 86) {
          // Allows backspace , ctrl+c ,ctrl+v (copy & paste)
          return true;
        } else {
          // Disallow non-numeric
          return false;
        }
      } else if(inputCode > 0 && (inputCode >= ascii_digits[0] && inputCode <= ascii_digits[1])) { // Disallows numbers before a negative.
        if(allowNegative == true && currentValue.charAt(0) == '-' && getCaret($this) == 0)
          return false;
      }
    });

    // attach `blur` event
    $this.on('blur', function(event) {
      var val = $(this).val();
      var change = min;
      var passed = pattern.test(val);

      // if value not in range between `min` and `max`, then limit it
      if(passed) change = (val < min) ? min : (val > max) ? max : val;
      $(this).val(change);
    });

    return $this;
  };

  // Private function for selecting cursor position. Makes IE play nice.
  //  http://stackoverflow.com/questions/263743/how-to-get-caret-position-in-textarea
  function getCaret(element) {
    if(element.selectionStart)
      return element.selectionStart;

    else if(document.selection) { //IE specific
      element.focus();

      var r = document.selection.createRange();
      if(r == null)
        return 0;

      var re = element.createTextRange(),
        rc = re.duplicate();
      re.moveToBookmark(r.getBookmark());
      rc.setEndPoint('EndToStart', re);
      return rc.text.length;
    }

    return 0;
  };
}(jQuery));
