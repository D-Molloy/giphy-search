// the default array of politicians
var politicians = ["Donald Trump", "Hillary Clinton", "Bernie Sanders", "Barack Obama", "Jeb Bush", "Paul Ryan"];

var currentResponse;
var gifClick=false;

// function that display gifs in the gif-display gif
function displayGifs() {
	$('.gif-display').empty();   
	//store the name of the politician in the userSubmit var
	var userSubmit = $(this).attr("data-name");
	//display who the user clicked on (shown in the bottom box)
	$('.search-title').text("Displaying GIFs of "+ userSubmit);
	// generate the query URL
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSubmit + "&limit=11&api_key=6181b0ebaf0342f1b3f5f8e23474b3fe"
	//run a ajax call to get info on the selected politician
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
		//store the response object in a variable to use in switchURL()
		currentResponse = response;
		//loop through the object creating a div, p, and img for eacch index and append it to gif-display
		for (var i = 0; i <= 10; i++) {
			var gifDiv = $('<div class="item">');
			var rating = response.data[i].rating;
			var p = $("<p class='rating-text'>").text("Rating: " + rating.toUpperCase());
			var gifImg = $('<img>');
			gifImg.addClass('gif-img');
			gifImg.attr('src', response.data[i].images.fixed_height_still.url);
			gifDiv.append(p);
			gifDiv.append(gifImg);
			$('.gif-display').append(gifDiv);
		}
		return currentResponse;
	});
}

//function called between still and animated gifs.  Uses the gifClick variable to see if the image is currently still/animated
function switchUrl(){
	//store the index of the div that was clicked 
	var gifIndex = $(this).index();

	if (gifClick == false){
		$(this).children('img').attr("src", currentResponse.data[gifIndex].images.fixed_height.url);
		gifClick = true;
	} else {
		$(this).children('img').attr("src", currentResponse.data[gifIndex].images.fixed_height_still.url);
		gifClick = false;
	}
}

//function that displays the current array of politicians in the btn-display div
function renderButtons(){
	$('.btn-display').empty();
	event.preventDefault();

	for (var i = 0; i < politicians.length; i++) {
		var polBtn = $('<button>');
		polBtn.addClass('politician');
		polBtn.attr('data-name', politicians[i]);
		polBtn.text(politicians[i]);
		$('.btn-display').append(polBtn);
		console.log(polBtn);
	}
}

//event handler for clicking the submit button in the form.  Checks to make sure that something has been typed prior to adding to the array and clears the input field if there was a valid input. Alerts if the field is empty.
$('.submit-btn').on('click', function(event){
	event.preventDefault();
	var userPick = $('.entry-form').val().trim();
	if (userPick != ""){
	politicians.push(userPick);
	renderButtons();
	$('.entry-form').val('');
	// $(".entry-form").trigger("reset");
	} else {
		alert("Please enter a name!");
	}
});

//event handler that allows users to press enter to submit a new politician and clears the input field if there was a valid input.  Alerts if the field is empty.
$(document).on('keyup', function (e) {
	event.preventDefault();
    if (e.keyCode == 13) {
    	var userPick = $('.entry-form').val().trim();
    	if (userPick != "") {
        	politicians.push(userPick);
        	renderButtons();
        	$('.entry-form').val('');
        } else {
        	alert("Please enter a name!");
    	} 	
	}
});

// call renderButtons() when the page loads
$(window).load(function(){
	renderButtons();
});
// when the user clicks on a politician button, call displayGifs
$(document).on("click", ".politician", displayGifs);
// when the user clicks on a gif, call switcURL to switch between still/animated gifs 
$(document).on("click", ".item", switchUrl);




