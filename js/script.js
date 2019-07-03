let totalActivityCost = 0;

$(document).ready(function() {
  $("form:first *:input[type!=hidden]:first").focus();

  // Add an change event for the Job role dropdown
  $("#title").on("change", function() {
    // If the other value is selected, show the other-title input
    if ($(this).val() == "other") {
      // Show other-title input
      $("#other-title").show();
    }
  });

  // Hide the select theme option
  $("#design")[0][0].style.display = "none";

  // Get the colors-js-puns div and set the firstElementChild.innerText to Color: Please select a T-shirt theme
  $("#colors-js-puns")[0].firstElementChild.innerText =
    "Color: Please select a T-shirt theme";

  // Hide the colors in the color dropdown menu
  for (let i = 0; i < $("#color")[0].length; i++) {
    $("#color")[0][i].style.display = "none";
  }

  // Add a change event for the design dropsown
  $("#design").on("change", function() {
    // If js puns is selected
    if ($(this).val() == "js puns") {
      // Hide the three heart js options and show the three js puns options
      // and update the Color field to the first available color
      for (let j = 0; j < $("#color")[0].length; j++) {
        if (
          $("#color")[0][j].value == "cornflowerblue" ||
          $("#color")[0][j].value == "darkslategrey" ||
          $("#color")[0][j].value == "gold"
        ) {
          $("#colors-js-puns")[0].firstElementChild.innerText =
            "Color: Cornflower Blue";
          $("#color")[0][j].style.display = "block";
        } else {
          $("#color")[0][j].style.display = "none";
        }
      }

      $("#color")[0].value = "cornflowerblue";
    } else if ($(this).val() == "heart js") {
      // Hide the three js puns options and show the three heart js options
      // and update the Color field to the first available color
      for (let k = 0; k < $("#color")[0].length; k++) {
        if (
          $("#color")[0][k].value == "tomato" ||
          $("#color")[0][k].value == "steelblue" ||
          $("#color")[0][k].value == "dimgrey"
        ) {
          $("#colors-js-puns")[0].firstElementChild.innerText = "Color: Tomato";
          $("#color")[0][k].style.display = "block";
        } else {
          $("#color")[0][k].style.display = "none";
        }
      }

      $("#color")[0].value = "tomato";
    }
  });

  //Add span
  $('.activities').append("<span id= 'totalCost'></span>");
  

  // Added a change event for the checkboxes in the activities section
  $(":checkbox").on("change", function() {
    
    let parentLabelText = $(this)[0].parentElement.innerText; // Get the parent label text of the selected checkbox
    let dollarIndex = parentLabelText.indexOf("$");  // Get the dollar index in the selected checkbox parent label text
    let activityCost = parentLabelText.slice(dollarIndex + 1);  // Get the activity cost from the selected checkbox parent label text

    //let totalActivityCost = 0;

    // If the selected check box is checked, add the activity cost to the total activity cost
        if ($(this)[0].checked) {
      totalActivityCost += parseInt(activityCost);
    }   else {
      totalActivityCost -= parseInt(activityCost);
    }
      let spanTotalActivity = $('#totalCost');

    spanTotalActivity.text("Total: $ " + totalActivityCost);  //Assign the total activity cost to the span Total Activity

    
    let selectedCheckboxEmDashIndex = parentLabelText.indexOf("\u2014");  // Get the emDash index from the selected checkbox parent label text

    // Get the comma index from the selected checkbox parent label text
    let selectedCheckboxCommaIndex = parentLabelText.indexOf(",");

    // Get the day and time from the selected checkbox parent label text
    let selectedCheckboxDayAndTime = parentLabelText.slice(selectedCheckboxEmDashIndex + 1, selectedCheckboxCommaIndex);

    // Loop through all the checkboxes
      for (let j = 0; j < $(":checkbox").length; j++) {
      // Get the parent label text of the checkbox
      let checkBoxParentLabelText = $(":checkbox")[j].parentElement.innerText;

      // Get the emDash index from the checkbox parent label text
     let checkBoxEmDashIndex = checkBoxParentLabelText.indexOf("\u2014");

      // Get the comma index from the checkbox parent label text
      let checkBoxCommaIndex = checkBoxParentLabelText.indexOf(",");

      // Get the day and time from the checkbox parent label text
      let checkBoxDayAndTime = checkBoxParentLabelText.slice(checkBoxEmDashIndex + 1, checkBoxCommaIndex);

       //If the selected checkbox day and time is equal to the checkbox day and time and the checkboxes are not the same
        if (selectedCheckboxDayAndTime == checkBoxDayAndTime && parentLabelText != checkBoxParentLabelText) {
        if ($(this)[0].checked) {
          $(":checkbox")[j].disabled = true;
        } else {
         $(":checkbox")[j].disabled = false;
        }
     }
    }
  });


  $('div p:contains("If you selected the PayPal")').hide();
  $('div p:contains("If you selected the Bitcoin")').hide();

  
   $('#payment option:first').hide();
   $("#payment").on("change", function () {    // Add an change event for the payment  select dropdown
       if ($(this).val() == "credit card") {
           // Show the credit card section
           $("#credit-card").show();
       }
       else if ($(this).val() == "paypal") {

           //When paypal is selected, credit card & bitcoin are hidden
           $('div p:contains("If you selected the PayPal")').show();
           $('div p:contains("If you selected the Bitcoin")').hide();
       }
       else if ($(this).val() == "bitcoin") {

           // Hide the credit card section & paypal section
        
           $('div p:contains("If you selected the PayPal")').hide();

           // Show the Bitcoin section
           $('div p:contains("If you selected the Bitcoin")').show();
       }
   }); 
    

});


