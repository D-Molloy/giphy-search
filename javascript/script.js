
var politicians = ["Donald Trump", "Hillary Clinton", "Bernie Sanders", "Barack Obama", "Joe Biden", "John Boehner", "Bill Clinton", "George W Bush", "Chris Christie"];
// still image - response.data[0].images.fixed_height_still.url
// // GIF - response.data[0].images.fixed_height.url

var currentResponse;
var gifClick=false;

function displayGifs() {
	// event.preventDefault();
    $('.gif-display').empty();   
	var userSubmit = $(this).attr("data-name");
	$('.search-title').text("Displaying GIFs of: "+ userSubmit);
	console.log(userSubmit);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userSubmit + "&limit=11&api_key=6181b0ebaf0342f1b3f5f8e23474b3fe"

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
		currentResponse = response;
		console.log(currentResponse);
		
		/// change out 20 for i < response.length
		for (var i = 0; i <= 10; i++) {
			var gifDiv = $('<div class="item">');
			var rating = response.data[i].rating;
			var p = $("<p>").text("Rating: " + rating);
			var gifImg = $('<img>');
			gifImg.addClass('gif-img');
			gifImg.attr('src', response.data[i].images.fixed_height_still.url);
			gifDiv.append(p);
			gifDiv.append(gifImg);
			$('.gif-display').append(gifDiv);
			// console.log(gifImg);
			// gifImg.text(response.data[0].images.fixed_height_still.url);
		}
		return currentResponse;
	});
}

function switchUrl(){

	var gifIndex = $(this).index();

	if (gifClick == false){
		$(this).children('img').attr("src", currentResponse.data[gifIndex].images.fixed_height.url);
		gifClick = true;
	} else {
		$(this).children('img').attr("src", currentResponse.data[gifIndex].images.fixed_height_still.url);
		gifClick = false;
	}
	console.log(gifIndex);
	// var clickedGif = $(this).attr("src", currentResponse.data[gifIndex].images.fixed_height.url);
}

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

//prepend the img tag with a p tag ("Rating: [object rating")
// creat a div instead of an image, add a p and an image tag inside the div

//copy code from 13 - button triggered AJAx
}

$('.submit-btn').on('click', function(event){
	event.preventDefault();
	var userPick = $('.entry-form').val().trim();
	if (userPick != ""){
	
	politicians.push(userPick);
	
	} else {
		alert("Please enter a name!");
	}
	renderButtons();
});

$(document).on('keyup', function (e) {
	event.preventDefault();
	
    if (e.keyCode == 13) {
    	var userPick = $('.entry-form').val().trim();
    	if (userPick != "") {
        	politicians.push(userPick);
        	renderButtons();
        } else {
        	alert("Please enter a name!");
    	} 	
	}
	
});


$(window).load(function(){
	renderButtons();
})
$(document).on("click", ".politician", displayGifs);
$(document).on("click", ".item", switchUrl);




