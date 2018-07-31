# NumericInput


A simple jQuery plug-in which sets an (input) element to only allow numbers and floating points.


### Options ###

`min`: The minimum value that can be entered into the textbox, if set to null any number is valid. Default: -1

`max`: The maximum value that can be entered into the textbox, if set to null any number is valid. Default: 1

### Usage ###

Given the following input element

```html
<input id="elementID" type="text" />
```

To create an input element which only accepts positive integers simple use the `.numeric` function like

```html
<script type="text/javascript" src="numeric.js"></script>
<script type="text/javascript">
  $(function() {
    $("#elementID").numeric({
      min: -100,
      max: 100
    });
  });
</script>
```

