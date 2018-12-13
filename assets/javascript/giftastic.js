$(document).ready(function () {

    //Global arrays
    var animalNames = [];
    var favGifArray = [];

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
   

    //Event listener for submit button
    $("#submit").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var myAnimal = $("#animal-input").val().trim().toLowerCase();

        // The animal name  from the textbox is then added to the 'animalNames' array
        if ((animalNames.indexOf(myAnimal) === -1) && (myAnimal !== "")) {
            animalNames.push(myAnimal);
            $("#buttons-view").empty();
            renderButtons(animalNames);
            localStorage.setItem("animal-names", JSON.stringify(animalNames));
        }
        $("#animal-input").val("");
    });
 
    $(document.body).on("click", ".animal", function (e) {

        e.preventDefault();
        var animalName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=Td4vzREgP7eMrMjXa2UVC0jd2FUaDkRw";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#col-0").empty();
            $("#col-1").empty();
            $("#col-2").empty();
            
            
            for (var i = 0; i <= response.data.length; i++) {
                var colIndex = i % 3;
                var buttonId = 'favGif-' + i;
                var gifId  = 'gif-'+i;
                
    
                $("#col-" + colIndex).append($("<div> Rating : " + response.data[i].rating + "</div>"));
                $("#col-" + colIndex).append($("<div><img class = 'img-fluid  gif' id = '"+gifId+"' src = ' "
                    + response.data[i].images.fixed_height.url + " '/> <div>"));
                $("#col-" + colIndex).append($("<button class ='add-favourite' id = '"+buttonId+"'> Add Favourite </button>"));
                
                
                //Event listener for add favourite button
                $("#"+buttonId+"").on('click', function() {
    
                    var id = $(this).attr('id');
                    var splittedString = id.split('-');
                    var seq = splittedString[1];
                    var favGifId = response.data[seq].id;
                    var j = favGifArray.findIndex(j=> j.id === favGifId); 

                  // if statement to initialize favGif Array to its initial state (with no elements in the array)
                  if(favGifArray === null){
                    favGifArray = [];
                  }
                  // this else if statement prevents from adding same gif to favGifArray
                  else if(j === -1){
                   
                   //appends favourite gif to a new div
                   $("#fav-gif").append($("<div id = 'Gif-"+favGifId+"'><img class = 'img-fluid gif' id = 'favGif' src = ' " + response.data[seq].images.fixed_height.url+ " '/></div>"));
                   
                   //adding new element (favourite gif) to the favGifArray
                   favGifArray.push(response.data[seq]); 

                   //creating a remove button to a new div.
                   $("#fav-gif").append("<div><button class = 'btn remove-button' 'data-id = "+favGifId+"'> Remove Gif </button></div>");
                   
                   //Event listener to remove favourite gif
                   $(".remove-button").on("click", function(e){
                            var gifId = $(this).attr("data-id");
                            $(`#Gif-${favGifId}`).remove();
                            $(this).remove();
                            j = favGifArray.findIndex(j => j.id === gifId);
                            favGifArray.splice(j,1);
                   });
               
                 }
                //css styling for favourite gif section
                $("#favGif").css({
                    'width' : `${120}px`,
                    'height' : `${100}px`
                }) ;
                $(".remove-button").css({
                    'heigth' : `${30}px`,
                    'margin-top': `${1}%`,
                    'background-color' : 'teal',
                    'color' : 'aliceblue'
                }) ;
              
                console.log(response.data[seq].id);
                console.log(favGifArray);
                localStorage.setItem("favourite-giffs", JSON.stringify(favGifArray));
                });

                // Event listener function to pause the gifs
                $("#"+gifId+"").on("click", function () {
                    
                    var id = $(this).attr('id');
                    var splittedString = id.split('-');
                    var seq = splittedString[1];

                    var animateSrc = response.data[seq].images.fixed_height.url;
                    var stillSrc =   response.data[seq].images.fixed_height_still.url;
                    var state = $(this).attr("data-state");

                    if (state === "still") {

                        $(this).attr({
                            "data-state": "animate",
                            src: animateSrc
                        })
                    } else {
                        $(this).attr({
                            "data-state": "still",
                            src: stillSrc
                        })
                    }
                
                });
               
            }
           
            localStorage.clear();     
            localStorage.setItem("animal-names", JSON.stringify(animalNames));
        });
    });
    // favGifArray = JSON.parse(localStorage.getItem("favourite-giffs"));
    animalNames = JSON.parse(localStorage.getItem("animal-names")) || ["dog", "cat", "horse", "robin", "peacock", "pigeon"];
    renderButtons(animalNames);
   console.log(favGifArray);
 
});
