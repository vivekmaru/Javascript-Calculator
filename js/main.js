(function () {
  // Main variables
  var btn = document.getElementsByClassName('btn');
  var clearAll = document.getElementById('clearAll');
  var result = document.getElementById('result');
  var expression = document.getElementById('expression');
  var sequence = '';

  // Buttons event listener
  for (i = 0; i < btn.length; i++) {
    if (btn[i].addEventListener) {
      btn[i].addEventListener('click', type, false);
    } else {
      btn[i].attachEvent('onclick', type);
    }
  }

  // Clear All button event listener
  if (clearAll.addEventListener) {
    clearAll.addEventListener('click', clear, false);
  } else {
    clearAll.attachEvent('onclick', clet);
  }

  // Get the event target
  function getTarget(e) {
    if (!e) {
      e = window.event;
    }
    return e.target || e.srcElement;
  }

  // When buttons are clicked, type buttons' text
  function type(e) {
    e = getTarget(e);

    if (e.textContent !== '=' && e.textContent !== 'del' && e.textContent !== 'x') {
      sequence += e.textContent;
      expression.textContent = sequence.replace(/\*/g, 'x');

    } else if (e.textContent === 'x') {
      sequence += '*';
      expression.textContent = sequence.replace(/\*/g, 'x');

    } else if (e.textContent === '=') {
      // Check if numbers are written correctly (not more than a decimal point per number)
      var point = 0; // decimal points counter
      // Loop through the sequence looking for decimal points
      for (j = 0; j < sequence.length; j++) {
        var char = sequence[j]; // char = current character

        if (char === '.') {
          point++;

          if (point > 1) {
            result.textContent = 'Error: more than one decimal point per number';
            return;
          }

          // If char is an operand, reset the point counter
        } else if (char === '*' || char === '/' || char === '+' || char === '-') {
          point = 0;
        }
      }

      // Try eval and check if it return an error
      try {
        result.textContent = eval(sequence);
        sequence = eval(sequence);
      } catch (err) {
        result.textContent = 'Error: too many operands';
        return;
      }

    } else if (e.textContent === 'del') {
      // If sequence is still a string (not a number result from eval)
      if (typeof sequence === 'string' && expression.textContent.length > 1) {
        sequence = sequence.slice(0, -1);
        expression.textContent = sequence.replace(/\*/g, 'x');

      } else {
        sequence = '';
        expression.textContent = '0';
        result.textContent = '0';
      }
    }
  }

  function clear() {
    sequence = '';
    expression.textContent = '0';
    result.textContent = '0';
  }


})();