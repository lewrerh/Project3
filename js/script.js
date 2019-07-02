$(document).ready(function() {
$('form:first *:input[type!=hidden]:first').focus();

// Add an change event for the Job role dropdown
    $("#title").on("change", function () {

        // If the other value is selected, show the other-title input
        if ($(this).val() == "other") {

            // Show other-title input
            $("#other-title").show();
        }
    });

    // Hide the select theme option
    $("#design")[0][0].style.display = "none";

    // Get the colors-js-puns div and set the firstElementChild.innerText to Color: Please select a T-shirt theme
    $("#colors-js-puns")[0].firstElementChild.innerText = "Color: Please select a T-shirt theme";

    // Hide the colors in the color dropdown menu
    for (let i = 0; i < $("#color")[0].length; i++) {
        $("#color")[0][i].style.display = "none";
    }

    // Add a change event for the design dropsown
    $("#design").on("change", function () {

        // If js puns is selected
        if ($(this).val() == "js puns") {

            // Hide the three heart js options and show the three js puns options
            // and update the Color field to the first available color
            for (let j = 0; j < $("#color")[0].length; j++) {

                if ($("#color")[0][j].value == "cornflowerblue" || $("#color")[0][j].value == "darkslategrey" ||
                    $("#color")[0][j].value == "gold") {
                    $("#colors-js-puns")[0].firstElementChild.innerText = "Color: Cornflower Blue";
                    $("#color")[0][j].style.display = "block";
                }
                else {
                    $("#color")[0][j].style.display = "none";
                }
            }

            $("#color")[0].value = "cornflowerblue";

        }
        else if ($(this).val() == "heart js"){

            // Hide the three js puns options and show the three heart js options
            // and update the Color field to the first available color
            for (let k = 0; k < $("#color")[0].length; k++) {

                if ($("#color")[0][k].value == "tomato" || $("#color")[0][k].value == "steelblue" ||
                    $("#color")[0][k].value == "dimgrey") {
                    $("#colors-js-puns")[0].firstElementChild.innerText = "Color: Tomato";
                    $("#color")[0][k].style.display = "block";
                }
                else {
                    $("#color")[0][k].style.display = "none";
                }
            }

            $("#color")[0].value = "tomato";
        }

    });

});

