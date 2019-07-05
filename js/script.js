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

  // Get the colors-js-puns div and set the firstElementChild.innerText 
  //to Color: Please select a T-shirt theme
  $("#colors-js-puns")[0].firstElementChild.innerText =
    "Color: Please select a T-shirt theme";

   // Hide the select theme option
  $("#design")[0][0].style.display = "none";

  // Hide the colors in the color dropdown menu
  for (let i = 0; i < $("#color")[0].length; i++) {
    $("#color")[0][i].style.display = "none";
  }

  //Hide the color select menu, extra credit.
    //$("#color")[0].style.display = "none";

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
           $("#credit-card").hide();
           $('div p:contains("If you selected the PayPal")').show();
           $('div p:contains("If you selected the Bitcoin")').hide();
       }
       else if ($(this).val() == "bitcoin") {

           // Hide the credit card section & paypal section
            $("#credit-card").hide();
        
           $('div p:contains("If you selected the PayPal")').hide();

           // Show the Bitcoin section
           $('div p:contains("If you selected the Bitcoin")').show();
       }
   }); 
    
 // Function to validate the name field
 function validateName() {

  // Create an errorSpan
  let errorSpan = $("<span>");

  // Set the errorSpan id to nameErrorSpan
  errorSpan.attr("id", "nameErrorSpan");

  // Set the text of the error span to Name field cannot be blank
  errorSpan.text("Name field cannot be blank");

  // Set the css color attribute of the errorSpan to red
  errorSpan.css("color", "red");

  // If the name field is blank
  if ($("#name").val() == "") {

      // Remove errorSpan if it exists
      $("#nameErrorSpan").remove();

      // Append the errorSpan after the name field
      $("#name").after(errorSpan);

      return false;
  }
  else {

      // Name is not blank, remove errorSpan
      $("#nameErrorSpan").remove();

      return true;
  }

  return true;
    
}

// Function to validate e-mail
function validateEmail() {

  // Get the e-mail value
  var emailValue = $("#mail").val();

  // Get the index of the @
  var atPosition = emailValue.indexOf("@");

  // Get the index of the .
  var dotPosition = emailValue.lastIndexOf(".");

  // Create an errorSpan
  let errorSpan = $("<span>");

  // Set the errorSpan id to emailErrorSpan
  errorSpan.attr("id", "emailErrorSpan");

  // Set the text of the error span to Email is not valid
  errorSpan.text("Email is not valid");

  // Set the css color attribute of the errorSpan to red
  errorSpan.css("color", "red");

  // If the at symbol index is less than 1 or the dot index is less than the at symbol index + 2 or
  // the dot index + 2 is greater than or equal to the emailValue length, the email is not valid
  if (atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= emailValue.length) {

      // Remove errorSpan if it exists
      $("#emailErrorSpan").remove();

      // Append the errorSpan after the e-mail field
      $("#mail").after(errorSpan);

      return false;
  }
  else {

      // Email is valid, remove errorSpan
      $("#emailErrorSpan").remove();

      return true;
  }
}

// Function to validate at least one checkbox under register for activites
function validateCheckBoxesForRegisterForActivities() {

  let foundCheckedBox = false;

  // Create an errorSpan
  let errorSpan = $("<span>");

  // Set the errorSpan id to checkBoxErrorSpan
  errorSpan.attr("id", "checkBoxErrorSpan");

  // Set the text of the error span to At least one check box activity must be selected
  errorSpan.text("At least one check box activity must be selected");

  // Set the css color attribute of the errorSpan to red
  errorSpan.css("color", "red");

  // Loop through all the checkboxes
  for (let m = 0; m < $(":checkbox").length; m++) {

      if ($(":checkbox")[m].checked) {
          foundCheckedBox = true;
          break;
      }
  }

  if (!foundCheckedBox) {

      // Remove errorSpan if it exists
      $("#checkBoxErrorSpan").remove();

      // Append the errorSpan in the activities field
      $(".activities").append(errorSpan);

      return false;
  }
  else {

      // At least one checkbox activity is selected, remove errorSpan
      $("#checkBoxErrorSpan").remove();

      return true;
  }

}

// Function to validate the credit card if the credit card payment option is selected
function validateCreditCard() {

  let creditCardTestFailed = false;
  let zipCodeTestFailed = false;
  let cvvTestFailed = false;

  if ($("#payment")[0].value == "credit card") {

      // Create regular expression for credit card number between 13 to 16 digits
      let regexCreditCard = new RegExp("^[0-9]{13,16}$");

      // Create an  errorCreditCardSpan
      let errorCreditCardSpan = $("<span>");

      // Set the  errorCreditCardSpan id to creditCardErrorSpan
      errorCreditCardSpan.attr("id", "creditCardErrorSpan");

      if ($("#cc-num").val() == "") {
          // Set the text of the errorCreditCardSpan to Please enter a credit card number. for extra credit
          errorCreditCardSpan.text("Please enter a credit card number.")
      }
      else {
          // Set the text of the errorCreditCardSpan to Please enter a number that is between 13 and 16 digits long. for extra credit
          errorCreditCardSpan.text("Please enter a number that is between 13 and 16 digits long.");
      }

      // Set the css color attribute of the errorCreditCardSpan to red
      errorCreditCardSpan.css("color", "red");

      // Test the credit card value, if it does not match 13 to 16 digits, it failed
      if (!regexCreditCard.test($("#cc-num").val())) {

          creditCardTestFailed = true;

          // Remove creditCardErrorSpan if it exists
          $("#creditCardErrorSpan").remove();

          // Add the creditCardErrorSpan after credit card field
          $("#cc-num").after(errorCreditCardSpan);

      }
      else {

          // The credit card test passed
          $("#creditCardErrorSpan").remove();

          creditCardTestFailed = false;
      }

      // Create regular expression for a zip code to have 5 digits
      let regexZipCode = new RegExp("^[0-9]{5}$");

      // Create an  errorZipCodeSpan
      let errorZipCodeSpan = $("<span>");

      // Set the  errorZipCodeSpan id to zipCodeErrorSpan
      errorZipCodeSpan.attr("id", "zipCodeErrorSpan");

      // Set the text of the errorZipCodeSpan to the Zip Code nmust contain 5 digits
      errorZipCodeSpan.text("The Zip Code must contain 5 digits");

      // Set the css color attribute of the errorZipCodeSpan to red
      errorZipCodeSpan.css("color", "red");

      // Test the zip code value, if it does not match 5 digits, it failed
      if (!regexZipCode.test($("#zip").val())) {

          zipCodeTestFailed = true;

          // Remove zipCodeErrorSpan if it exists
          $("#zipCodeErrorSpan").remove();

          // Add the errorZipCodeSpan after zip code field
          $("#zip").after(errorZipCodeSpan);

      }
      else {

          // The zip code test passed
          $("#zipCodeErrorSpan").remove();

          zipCodeTestFailed = false;
      }

      // Create regular expression for the cvv to have 3 digits
      let regexCVV = new RegExp("^[0-9]{3}$");

      // Create an  errorCVVSpan
      let errorCVVSpan = $("<span>");

      // Set the  errorCVVSpan id to cvvErrorSpan
      errorCVVSpan.attr("id", "cvvErrorSpan");

      // Set the text of the errorCVVSpan to the CVV nmust contain 3 digits
      errorCVVSpan.text("The CVV must contain 3 digits");

      // Set the css color attribute of the errorCVVSpan to red
      errorCVVSpan.css("color", "red");

      // Test the cvv value, if it does not match 3 digits, it failed
      if (!regexCVV.test($("#cvv").val())) {

          cvvTestFailed = true;

          // Remove cvvErrorSpan if it exists
          $("#cvvErrorSpan").remove();

          // Add the errorCVVSpan after cvv field
          $("#cvv").after(errorCVVSpan);

      }
      else {

          // The cvv test passed
          $("#cvvErrorSpan").remove();

          cvvTestFailed = false;
      }

  }
  else {

      return true;
  }

  if (creditCardTestFailed || zipCodeTestFailed || cvvTestFailed)
      return false;
  else
      return true;
}

$("button").on("click", function (event) {

  if (!validateName()) {
      event.preventDefault();
  }

  if (!validateEmail()) {
      event.preventDefault();
  }

  if (!validateCheckBoxesForRegisterForActivities()) {
      event.preventDefault();
  }

  if (!validateCreditCard()) {
      event.preventDefault();
  }
});

// Real time validation for the email input for extra credit
$("#mail").on("input", validateEmail);
});





