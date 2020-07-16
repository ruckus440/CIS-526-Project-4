/** site.js
 * You should add your JavaScript code to this file.
 * See the assignment description in Guide for what
 * your code needs to accomplish.
 */
document.body.onload = getButtons;

//keep these
function ToggleShow(button) {

    var parent = button.parentElement;
    var divs = parent.querySelectorAll('.hideable');
    divs.forEach(function(item) {
        item.classList.toggle('show');
    })
}

function getButtons() {
    var buttons = document.querySelectorAll('.collapsible');
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
        button.onclick = function() { ToggleShow(button); };
    });
}

/*
function fetchStandards(){
  //var standardsJson;

  //remove
  fetch('standards.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        var standardDiv = document.createElement("div");
        standardDiv.className = "stdItem";
        var previousDiv;

        Object.keys(element).forEach(key => {
          var newDiv = document.createElement('div')
          newDiv.className = key
          newDiv.innerHTML = element[key]
          if (key == 'description' || key == 'concept' ||
              key == 'subconcept' || key == 'practices'){
            newDiv.classList.add("hideable");
          }

          if (key == 'subconcept'){
            previousDiv.appendChild(newDiv);
          }
          else {
            standardDiv.appendChild(newDiv);
          }
          previousDiv = newDiv;
        })

        var currentDiv = document.getElementById("stdDiv");
        currentDiv.appendChild(standardDiv);

        var button = document.createElement("button");
        button.className = "collapsible";

        standardDiv.appendChild(button);
    });
    getButtons();
  })
}*/


