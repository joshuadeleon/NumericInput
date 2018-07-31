///////////////////////////////////////////////////////////////
//  Author: Vivek Shrinivasan
//  File: numeric.js
//  Description: Allows only numeric input in an element.
//  
//  Inspired by Joshua De Leon's code 
//   https://github.com/joshuadeleon/NumericInput
///////////////////////////////////////////////////////////////

//  Sets a keypress event for the selected element allowing only numbers. Typically this would only be bound to a textbox.
(function($) {
  // Plugin defaults
  var defaults = {
    min: -1,
    max: 1
  };
  var ascii_digits = [48, 57];
  var ascii_dot = 189;   // .
  var ascii_neg = 190;   // -
  var pattern = /^-?\d+\.?\d+$/;
  var non_numeric = /[^0-9-.]+/;

  // Plugin definition
  //  min: (int/float) If set, when the user leaves the input if the entered value is too low it will be set to this value
  //  max: (int/float) If set, when the user leaves the input if the entered value is too high it will be set to this value
  $.fn.numeric = function(options) {
    var $this = this;
    var settings = $.extend({}, defaults, options);
    var min = settings.min;
    var max = settings.max;

    if(min == max) {
      throw ('The minimum value cannot be the same as the max value');
    } else if(min > max) { //If the values are swapped we swap them back
      var temp = min;
      min = max;
      max = temp;
    }

    // beautify the input type
    $this.addClass('numeric');

    // attach an event of `keyup` on the element
    //  after the input has been inputted in the textbox
    $this.on('keyup', function(event) {
      var input_code = event.which;
      var val = $(this).val();
      if(
        (input_code < ascii_digits[0] || input_code > ascii_digits[1]) &&
        (input_code != ascii_dot && input_code != ascii_neg)
      ) {
        // remove chars which aren't numbers `0-9` or `-` or a `.`
        $(this).val(val.replace(non_numeric, ''));
      }
      return true;
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

}(jQuery));
