$(document).ready(function () {
  
    var animalNames = ["dog", "cat", "horse", "robin", "peacock", "pigeon"];

    // Function for displaying animal data
    var renderButtons = function (animalNames) {
        console.log(animalNames)
        // Looping through the array of movies
        for (var i = 0; i < animalNames.length; i++) {

            var button = $("<button id = 'button-input'>");
            // Adding a class of animal to button
            button.addClass("animal");
            // Adding a data-attribute
            button.attr("data-name", animalNames[i]);
            // Providing the initial button text
            button.text(animalNames[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(button);
        }
    }
    $("#submit").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var myAnimal = $("#animal-input").val().trim().toLowerCase();

        // The animal name  from the textbox is then added to the 'animalNames' array
        if ((animalNames.indexOf(myAnimal) === -1) && (myAnimal !== "")){
            animalNames.push(myAnimal);
            $("#buttons-view").empty();
            renderButtons(animalNames);
           // localStorage.setItem("animal-names", JSON.stringify(animalNames));
        }
       
        // Calls renderButtons which handles the processing of 'animalNames' array
        $("#animal-input").val("");
    });

    // Calls the renderButtons function to display the intial buttons
    $(document.body).on("click", ".animal", function (e) {

        e.preventDefault();
        var animalName = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=Td4vzREgP7eMrMjXa2UVC0jd2FUaDkRw";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $("#col-0").empty();
            $("#col-1").empty();
            $("#col-2").empty();

            for (var i = 0; i <= response.data.length; i++) {
                var colIndex = i % 3;
                
                $("#col-" + colIndex).append($("<div> Rating : " + response.data[i].rating + "</div>"));
                $("#col-" + colIndex).append("<div><img class = 'img-fluid' src = ' "
                    + response.data[i].images.fixed_height.url + " '/><div>");
            }
            localStorage.clear();
            localStorage.setItem("animal-names", JSON.stringify(animalNames));
        });
    });

  // animalNames = JSON.parse(localStorage.getItem("animal-names")) || ["dog", "cat", "horse", "robin", "peacock", "pigeon"];
    renderButtons(animalNames);
  
});
