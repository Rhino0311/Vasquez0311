$(document).ready(function() {

	var marvel = [
	"Juggernaut",
	"Magneto",
	"Mr. Sinister",
	"Weapon X",
	"Dr. Octopus",
	"Dr. Doom",
	"The Rhino",
	"Captain America",
	"Loki"
	]

	var selectedShow = "";
	var showImage = "";
	var stillUrl = "";
	var animatedUrl = "";
	var animated = false;
	var gifObjects = [];

	displayButtons();

	function displayButtons() {
		$(".button-area").empty();
		for (var i = 0; i < marvel.length; i++) {
			var buttonText = $("<button>");
			buttonText.text(marvel[i]);
			buttonText.attr("class", "btn btn-info gif-button gif-button" + i);
			buttonText.attr("type", "button");
			buttonText.attr("value", i);
			$(".button-area").append(buttonText);
		}
	};


	$(".add-show").on("click", function(event) {
		event.preventDefault();

		var newShow = $(".show-input").val().trim();

		if (newShow === "") {
			$(".show-input").placeholder = "Enter new character here";
		} else if (marvel.indexOf(newShow) != -1) {
			$(".show-input").placeholder = "Pick a new character";
			$(".show-input").val("")

		} else {
			marvel.push(newShow);
			$(".show-input").val("");


			displayButtons();
		}
	});


// resets values 
// pulls 10 gif images 

$(document).on("click", ".gif-button", function() {
	event.preventDefault();
	$(".gif-box").empty();
	var gifHeader = $("<div>");
	gifHeader.attr("class", "gif-header");
	gifHeader.text("Click any image to see it animate");
	$(".gif-box").append(gifHeader);


	selectedShow = "";
	showImage = "";
	stillUrl = "";
	animatedUrl = "";
	animated = false;
	gifObjects = [];

	selectedShow = $(this).html();

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        selectedShow + "&api_key=dc6zaTOxFJmzC&limit=10";

     // call to giphy api
     $.ajax ({
     	url: queryURL,
     	method: "GET"
     }).done(function(response){
     	var results = response.data;

// loops results and puts them on screen

for (var i = 0; i < results.length; i++) {
	var showDiv = $("<div>");
	showDiv.attr("class", "gif-image-div");
	var rating = $("<p>");
	rating.attr("class", "rating");
	rating.text("Rating: " + results[i].rating);
	showImage = $("<img>");
	showImage.attr("class", "single-image image" + i)
	showImage.attr("src", results[i].images.fixed_height_still.url);
	showImage.attr("data", i);
	showDiv.append(rating);
	showDiv.append(showImage);
	$(".gif-box").append(showDiv);


//retrieves still and gets it moving
stillUrl = results[i].images.fixed_height_still.url;
animatedUrl = results[i].images.fixed_height.url;



gifObjects.push({stillUrl: stillUrl, animatedUrl: animatedUrl, index: i, animated: false});


}

 })
});


$(document).on("click", ".single-image", function() {
	imageClicked = parseInt(this.getAttribute("data"));

	if (gifObjects[imageClicked].animated) {
		gifObjects[imageClicked].animated = false;
		this.src = gifObjects[imageClicked].stillUrl;
	} else {
		gifObjects[imageClicked].animated = true;
		this.src = gifObjects[imageClicked].animatedUrl;
	};
	});

});

	